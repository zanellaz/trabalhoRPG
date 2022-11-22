const shrek = {
    HP: 100,
    Dano: 20,
    Defesa: 1,
    Habilidades: {
        Estudo: false,
        AntiRadiação: false
    }
}
let optionOpsition = 0

const positions = {
    0: 'atacar',
    1: 'dancar',
    2: 'fugir',
    3: 'especial'
}

document.addEventListener('keydown', ({ key }) => {
    if (handleKeys[key]) {
        handleKeys[key]()
        const actionName = positions[optionOpsition]
        const selectedAction = document.getElementById(actionName)
        resetActionsAnimation()
        selectedAction.style.fontSize = '4vh'
        selectedAction.style.fontWeight = 'bold'
    }
})

const handleKeys = {
    ArrowRight() {
        if (optionOpsition >= 3) {
            optionOpsition = 0
            return
        }
        optionOpsition++
    },
    ArrowLeft() {
        if (optionOpsition <= 0) {
            optionOpsition = 3
            return
        }
        optionOpsition--
    },
    Enter() {
        const action = positions[optionOpsition]
        if (handleActions[action]) {
            handleActions[action]()
        }
    }
}

const handleActions = {
    atacar() {

    },
    dancar() {

    },
    fugir() {

    },
    especial() {

    }
}

function resetActionsAnimation() {
    const allActions = document.getElementsByClassName('action')
    Array.from(allActions).forEach(action => {
        action.style.fontSize = '3vh'
        action.style.fontWeight = 'normal'
    })
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
}