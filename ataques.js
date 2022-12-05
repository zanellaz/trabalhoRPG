const shrek = {
    hp: 100,
    damage: 20,
    defense: 1,
    habilities: {
        Estudo: false,
        AntiRadiacao: false
    }
}

const enemys = {
    "kogos": {
        hp: 100,
        damage: 15,
        defense: 15
    }
}

let actualEnemy

const attack = {
    shrek() {
        const messages = 
        [{
            text:'FAZ O URRO!', time: 0.1},
        { 
            text:'Seu bobalhão!!!!', time: 0.07
        }]
        loadMessages(messages)
        actualEnemy = getEnemy()
        console.log(actualEnemy);
        const realDamage = shrek.damage - enemys[actualEnemy].defense
        enemys[actualEnemy].hp -= realDamage
        reloadHealthBars()
    },
    burro() {

    },
    kogos() {

    },
    manoel() {

    }
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

function reloadHealthBars() {
    const enemyBar = document.getElementById('enemyHealthBar')
    const characterBar = document.getElementById('characterHealthBar')
    const enemyHp = enemys[actualEnemy].hp
    enemyBar.style.width = `${enemyHp}%`
    const characterHp = shrek.hp
    characterBar.style.width = `${characterHp}%`    
}

function getEnemy() {
    const enemyImg = document.getElementById('enemy').src
    const enemy = enemyImg.split('/').pop()
    return enemy.replace('.png', '')
}