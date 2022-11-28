const keysPressed = {}
let optionOpsition = 0
let enterNow = 'selectAction'

const positions = {
    0: 'atacar',
    1: 'dancar',
    2: 'fugir',
    3: 'especial'
}

document.addEventListener('keydown', ({ key }) => {
    if (handleKeys[key]) {
        keysPressed[key] = true
        handleKeys[key]()
        const actionName = positions[optionOpsition]
        const selectedAction = document.getElementById(actionName)
        resetActionsAnimation()
        selectedAction.classList.add('selected')
    }
})

document.addEventListener('keyup', ({ key }) => {
    if (handleKeys[key]) {
        keysPressed[key] = false
    }
})

const handleKeys = {
    ArrowRight() {
        if (enterNow = 'selectAction') {
            if (optionOpsition >= 3) {
                optionOpsition = 0
                return
            }
            optionOpsition++
        }
    },
    ArrowLeft() {
        if (enterNow = 'selectAction') {    
            if (optionOpsition <= 0) {
                optionOpsition = 3
                return
            }
            optionOpsition--
        }
    },
    Enter() {
        enterActions[enterNow]()
    }
}

const handleActions = {
    atacar() {
        loadMessage({message: 'FAZ O URRO! ', time: 0.1})
        attack.shrek()
    },
    dancar() {

    },
    fugir() {

    },
    especial() {

    }
}

function loadBattle(enemy) {
    axios.get('/batalha.html')
    .then((response) => {
        const html = response.data
        document.body.innerHTML = html
        startBattle(enemy)
    })
    .catch((error) => {
        console.log(`erro :( \n${error})`);
    })
}

function startBattle(enemy) {
    const enemyImg = document.getElementById("enemy")
    enemyImg.src = `/img/${enemy}.png`
    loadBattleInfos(enemy)
}

function loadBattleInfos(enemy) {
    axios.get(`${enemy}.json`)
    .then(({ data }) => {
        const enemy = JSON.parse(JSON.stringify(data))
        const { name, description, weakness } = enemy
        document.getElementById('enemyName')
            .textContent = name
        document.getElementById('enemyDescription')
            .textContent = description
        document.getElementById('enemyWeakness')
            .textContent = `Fraqueza: ${ weakness }`
        document.getElementById('enemyHP')
            .textContent = `100/100`
    })
}

function loadMessage({message, time}) {
    changeToDialogue()
    message = Array.from(message)
    setTimeout(() => {
        showMessage({message: message, letterPosition: 0}, time)
    }, 500);
}

function showMessage({ message, letterPosition }, time) {
    const letter = message[letterPosition]
    if (!letter) {
        if (!keysPressed['Enter']) 
            return setTimeout(() => enterNow = 'dialogueFinal', 100)
        else 
            return setTimeout(() => 
                showMessage({ message: message, letterPosition: letterPosition }, time), 100)
    }
    if (letter == ' ') 
        return showLetter(message, letterPosition, letter, time ,{ fast: true })
    if (keysPressed['Enter'])
        return showLetter(message, letterPosition, letter, time, { fast: true })
    return showLetter(message, letterPosition, letter, time ,{ fast: false })
}

function showLetter(message, letterPosition, letter, time, { fast }) {
    const dialogue = document.getElementById('dialogueBox')
    fast = Number(!fast)
    setTimeout(() => {
        dialogue.textContent += letter
        return showMessage({ message: message, letterPosition: ++letterPosition }, time)
    }, time*1000*fast)
}

const enterActions = {
    selectAction() {
        removeActionsAnimation()
        const action = positions[optionOpsition]
        if (handleActions[action]) {
            handleActions[action]()
        }
    },
    dialogue() {
        
    },
    dialogueFinal() {
        changeToActions()
    },
    talk() {

    }
}

function resetActionsAnimation() {
    const allActions = document.getElementsByClassName('action')
    Array.from(allActions).forEach(action => {
        action.classList.remove('selected')
    })
}