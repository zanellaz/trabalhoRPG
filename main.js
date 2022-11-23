const shrek = {
    HP: 100,
    Dano: 20,
    Defesa: 1,
    Habilidades: {
        Estudo: false,
        AntiRadiação: false
    }
}
let dialogo = false
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
        selectedAction.classList.add('selected')
    }
})

const handleKeys = {
    ArrowRight() {
        if (!!!dialogo) {
            if (optionOpsition >= 3) {
                optionOpsition = 0
                return
            }
            optionOpsition++
        }
    },
    ArrowLeft() {
        if (!!!dialogo) {    
            if (optionOpsition <= 0) {
                optionOpsition = 3
                return
            }
            optionOpsition--
        }
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
        mostraMensagem({message: 'FAZ O URRO! ', time: 0.1, special: true})
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
        action.classList.remove('selected')
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

function mostraMensagem({message, time, special}) {
    dialogo = true
    changeToDialogue()
    message = Array.from(message)
    const dialogue = document.getElementById('dialogueBox')
    for (let i = 0; i < message.length; i++) {
        const letter = message[i]
        setTimeout(() => dialogue.textContent += letter, (time*(i+1)*1000))
    }
}

function changeToDialogue() {
    const actions = document.getElementById('actions')
    const dialogue = document.getElementById('dialogueBox')
    actions.style.display = 'none'
    dialogue.style.display = 'flex'
}