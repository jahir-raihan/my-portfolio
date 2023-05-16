const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
const background = new Sprite({
    position: {
        x: 0, 
        y: 0,
    },
    imageSrc: './Fighting Game/background.png'
})

const shop = new Sprite({
    position: {
        x: 600, 
        y: 146,
    },
    imageSrc: './Fighting Game/shop.png',
    scale: 2.6,
    framesMax:6
})
const player = new Fighter({
    position:{
        x: 0 ,
        y: 0
    },
    velocity : {
        x: 0,
        y: 10
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc: './Fighting Game/samuraiMack/Idle.png',
    scale:2.5,
    framesMax: 8,
    offset:{
        x:215,
        y:157
    },
    sprites: {
        idle: {
            imageSrc:'./Fighting Game/samuraiMack/Idle.png',
            framesMax:8

        },
        run: {
            imageSrc:'./Fighting Game/samuraiMack/Run.png',
            framesMax:8
        },
        jump: {
            imageSrc:'./Fighting Game/samuraiMack/Jump.png',
            framesMax:2
        },
        fall: {
            imageSrc:'./Fighting Game/samuraiMack/Fall.png',
            framesMax:2
        },
        attack1: {
            imageSrc:'./Fighting Game/samuraiMack/Attack1.png',
            framesMax:6
        },
        takeHit : {
            imageSrc: './Fighting Game/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death : {
            imageSrc: './Fighting Game/samuraiMack/Death.png',
            framesMax: 6
        },

        
        
    },
    attackBox : {
        offset:{
            x:100,
            y:50
        },
        width:150,
        height:50
    }
    
})

const enemy = new Fighter({
    position:{
        x: 400 ,
        y: 100
    },
    velocity : {
        x: 0,
        y: 0
    },
    offset:{
        x:-50,
        y:0
    },
    
    imageSrc: './Fighting Game/kenji/Idle.png',
    scale:2.5,
    framesMax: 4,
    offset:{
        x:215,
        y:167
    },
    sprites: {
        idle: {
            imageSrc:'./Fighting Game/kenji/Idle.png',
            framesMax:4

        },
        run: {
            imageSrc:'./Fighting Game/kenji/Run.png',
            framesMax:8
        },
        jump: {
            imageSrc:'./Fighting Game/kenji/Jump.png',
            framesMax:2
        },
        fall: {
            imageSrc:'./Fighting Game/kenji/Fall.png',
            framesMax:2
        },
        attack1: {
            imageSrc:'./Fighting Game/kenji/Attack1.png',
            framesMax:4
        },
        takeHit : {
            imageSrc: './Fighting Game/kenji/Take hit.png',
            framesMax: 3
        },
        death : {
            imageSrc: './Fighting Game/kenji/Death.png',
            framesMax: 7
        },

    },
    attackBox : {
        offset:{
            x:-170,
            y:50
        },
        width:170,
        height:50
    }
    
})
const keys = {
    a: {
        pressed : false 
    },
    d: {
        pressed : false
    },
    ArrowRight : {
        pressed: false

    },
    ArrowLeft : {
        pressed : true
    }
}


decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    // player movement
    enemy.velocity.x = 0
    player.velocity.x = 0
   
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')

    }else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }
    // jumping
    if (player.velocity.y < 0){
        player.switchSprite('jump')
    } else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }
    

    // enemy movement
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')

    }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }
    else{
        enemy.switchSprite('idle')
    }
      // jumping
      if (enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }

    // detect for collision & enemy gets hit
    if (rectangularCollision({rectangle1:player, rectangle2:enemy}) && player.isAttacking && player.framesCurrent === 4){
            enemy.takeHit()
            player.isAttacking = false
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }
    // if player misses 
    if (player.isAttacking && player.framesCurrent === 4){
        player.isAttacking = false
    }
    if (rectangularCollision({rectangle1:enemy, rectangle2:player}) && enemy.isAttacking && enemy.framesCurrent === 2)
    
    {
              
        console.log('enemy go')
        player.takeHit()
        enemy.isAttacking = false
       
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // if enemy misses 
     // if player misses 
     if (enemy.isAttacking && enemy.framesCurrent === 2){
        enemy.isAttacking = false
    }
    // end the game based on health
    if (enemy.health <= 0 || player.health <=0){
        determinWinner({player, enemy, timerid})

    }

}
animate()



window.addEventListener('keydown', (event) => {
   
    switch (event.key){

        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break 
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break 
        case 'w':
            player.velocity.y = -15
            break
        case ' ':
            player.attack()
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            
            break 
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break 
        case 'ArrowUp':
            enemy.velocity.y = -15
            break
        case 'ArrowDown':
            enemy.attack()
            break 

        
    }
})
window.addEventListener('keyup', (event) => {
    
    switch (event.key){

        case 'd':
            keys.d.pressed = false
            break 
        case 'a':
            keys.a.pressed = false
            break
      

        
    }
    // enemy keys
    switch (event.key){

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break 
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
      

        
    }


})