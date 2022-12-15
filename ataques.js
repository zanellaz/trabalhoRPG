const shrek = {
    hp: 100,
    maxHp: 100,
    damage: 20,
    defense: 1,
    habilities: {
        Estudo: false,
        AntiRadiacao: false
    },
    font: "Shrek"
}

const enemys = {
    kogos: {
        hp: 100,
        maxHp: 100,
        damage: 15,
        defense: 5,
        font: "Roboto"
    },
    manoel: {
        hp: 150,
        maxHp: 150,
        damage: 20,
        defense: 10,
        font: 'Miniver'
    },
    erico: {
        hp: 200,
        maxHp: 200,
        damage: 20,
        defense: 15,
        font: 'Roboto'
    },
    sans: {
        hp: 1000,
        maxHp: 1000,
        damage: 100,
        defense: 19,
        font: 'Comic Sans MS'
    },
}

let actualEnemy

const attack = {
    async shrek() {
        changeDialogueFont(shrek.font)
        characterImage('shrekAtaque')
        const allMessages = await getAtackMessages('shrek')
        const messages = randomMessage(allMessages)
        await loadMessages(messages)
        actualEnemy = getEnemy()
        const realDamage = shrek.damage - enemys[actualEnemy].defense
        enemys[actualEnemy].hp -= realDamage
        reloadEnemyBar()
        characterImage('shrek')
        await attack[actualEnemy]()
        changeToActions()
    },
    async erico() {
        const { font, damage } = enemys.erico
        changeDialogueFont(font)
        enemyImage('ericoAtaque')
        const allMessages = await getAtackMessages('erico')
        const messages = randomMessage(allMessages)
        await loadMessages(messages)
        const realDamage = damage - shrek.defense
        shrek.hp -= realDamage
        reloadCharacterBar()
        enemyImage('erico')
    },
    async kogos() {
        const { font, damage } = enemys.kogos
        enemyImage('kogosAtaque')
        changeDialogueFont(font)
        const allMessages = await getAtackMessages('kogos')
        const messages = randomMessage(allMessages)
        await loadMessages(messages)
        const realDamage = damage - shrek.defense
        shrek.hp -= realDamage
        enemyImage('kogos')
        reloadCharacterBar()
    },
    async manoel() {
        const { font, damage } = enemys.manoel
        enemyImage('manoelAtaque')
        changeDialogueColor('blue')
        changeDialogueFont(font)
        const allMessages = await getAtackMessages('manoel')
        const messages = randomMessage(allMessages)
        await loadMessages(messages)
        const realDamage = damage - shrek.defense
        shrek.hp -= realDamage
        enemyImage('manoel')
        reloadCharacterBar()
        changeDialogueColor('black')
    },
    async sans() {
        const { font, damage } = enemys.sans
        enemyImage('sansAtaque')
        changeDialogueFont(font)
        const allMessages = await getAtackMessages('sans')
        const messages = randomMessage(allMessages)
        await loadMessages(messages)
        const realDamage = damage - shrek.defense
        shrek.hp -= realDamage
        enemyImage('sans')
        reloadCharacterBar()
    }
}

function reloadLifes() {
    enemys[actualEnemy].hp = enemys[actualEnemy].maxHp
    shrek.hp = shrek.maxHp
}

const special = {
    shrek() {
        chamaEspecial('shrek')
        audio('shrek')
    },
    burro() {
        chamaEspecial('burro')
        audio('burro')
    },
    kogos() {
        chamaEspecial('kogos')
        audio('kogos')
    },
    manoel() {
        chamaEspecial('manoel')
        audio('manoel')
    }
}

function chamaEspecial(character) {

}

function reloadEnemyBar() {
    const bar = document.getElementById('enemyHealth')
    const life = document.getElementById('enemyHP')
    let { hp, maxHp } = enemys[actualEnemy]
    hp = hp >= 0 ? hp : 0
    life.textContent = `${hp}/${maxHp}`
    const percentualHp = hp / (maxHp / 100)
    bar.style.width = `${percentualHp}%`
}

function reloadCharacterBar() {
    const bar = document.getElementById('characterHealth')
    const life = document.getElementById('characterHP')
    let { hp, maxHp } = shrek
    hp = hp >= 0 ? hp : 0
    life.textContent = `${hp}/${maxHp}`
    const percentualHp = hp / (maxHp / 100)
    bar.style.width = `${percentualHp}%`
}

function getEnemy() {
    const enemyImg = document.getElementById('enemy').src
    const enemy = enemyImg.split('/').pop()
    return enemy.replace('.png', '')
}

async function getAtackMessages(character) {
    let allMessages
    await axios.get(`${character}.json`)
        .then(({ data }) => {
            allMessages = JSON.parse(JSON.stringify(data)).messages
        })
    return allMessages
}

async function getDeadMessage(character) {
    let deadMessage
    await axios.get(`${character}.json`)
        .then(({ data }) => {
            deadMessage = JSON.parse(JSON.stringify(data)).deadMessage
        })
    return deadMessage
}

function randomMessage(messages) {
    const randomMessage = messages[Math.floor(Math.random()*messages.length)];
    return randomMessage
}