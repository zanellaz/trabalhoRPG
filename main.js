const keysPressed = {}
let optionOpsition = 0
let enterNow = null

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
        if (enterActions[enterNow])
            enterActions[enterNow]()
        enterNow = null
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
    axios.get('/batalha.html')
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
            .textContent = `Fraqueza: ${ weakness }`
        document.getElementById('enemyHP')
            .textContent = `100/100`
    })
}

const enterActions = {
    selectAction() {
        removeActionsAnimation()
        const action = positions[optionOpsition]
        if (handleActions[action]) {
            handleActions[action]()
        }
    },
    talk() {

    }
}