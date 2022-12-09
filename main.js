const keysPressed = {}
let optionPosition = 0
let enterNow = null
let g_letterDelay

const delay = t => new Promise(resolve => setTimeout(resolve, t*1000));

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
        const actionName = positions[optionPosition]
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
            if (optionPosition >= 3) {
                optionPosition = 0
                return
            }
            optionPosition++
        }
    },
    ArrowLeft() {
        if (enterNow = 'selectAction') {    
            if (optionPosition <= 0) {
                optionPosition = 3
                return
            }
            optionPosition--
        }
    },
    Enter() {
        if (enterActions[enterNow])
            enterActions[enterNow]()
    }
}

const handleActions = {
    atacar() {
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
    axios.get('batalha.html')
    .then((response) => {
        const html = response.data
        document.body.innerHTML = html
        startBattle(enemy)
    })
    .catch((error) => {
        console.log(`erro :( \n${error})`);
    })
    actionsAppearDuration = 3
    delay(actionsAppearDuration).then(() => enterNow = 'selectAction')
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
            .textContent = `${ weakness }`
        document.getElementById('enemyHP')
            .textContent = `100/100`
    })
}

const enterActions = {
    selectAction() {
        removeActionsAnimation()
        const action = positions[optionPosition]
        if (handleActions[action]) {
            handleActions[action]()
        }
    },
    dialogue() {
        console.log('a');
        g_letterDelay = 0
    }
}