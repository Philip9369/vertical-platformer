    // SETUP FOR PLAY AREA 
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

let globalScrollX = 400
let globalScrollY = 0

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const gravity = 0.5

    // SPRITES
class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
        this.position.x = this.position.x - globalScrollX 
        this.position.y = this.position.y - globalScrollY 
    }
}

    // PLAYER CONTROL AND SPAWN 
class Player {
    constructor(position) {
        this.position = position
        this.height = 100
        this.xAcceleration = 0
    }
    draw() {
        // COLLISION CHECK
        if ( 1 === 2) c.fillStyle = 'red'
        else c.fillStyle = 'yellow'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }
    
    update() {
        this.draw()
        globalScrollY = this.position.y - 200
        globalScrollX = this.position.x - 350
        this.position.y += -globalScrollY + this.position.yAcceleration
        this.position.x += this.xAcceleration - globalScrollX

    // CONTROLL FOR JUMPS
    if (this.position.y + this.height + this.position.yAcceleration < (scaledCanvas.height * 4) ) {
        this.position.yAcceleration += gravity
    } else {
        this.position.yAcceleration = 0
        this.jumpAmount = 2
    }
}
}
// SPAWNS THE PLAYER
const player = new Player({
    x:400,
    y:-100,
    yAcceleration: 1,
})
// KEYS FOR THE GAME
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    },
    i: {
        pressed: false
    },
}

//SPAWN OTHER STUUF

const background = new Sprite({
    position: {
        x: 0,
        y:0,
    },
    imageSrc: './img/Background.png'
})

const platformCollisions = new Sprite({
    position: {
        // x: background.x,
        // y: background.y,
        x: 0,
        y: 0,
    },
    imageSrc: './img/platformCollisions.png'
})


//GLOBALLY ANIMATES AND FORWARDS THE GAME
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)
    
    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    platformCollisions.update()
    c.restore()
    
    player.update()
    
// PLAYER MOVEMENT
    player.xAcceleration = 0
    if(keys.d.pressed) player.xAcceleration = 5
    if(keys.a.pressed) player.xAcceleration = -5
    if(keys.i.pressed) 
        {
        console.log(globalScrollY) 
        console.log(scaledCanvas.height / 2)
        }
}

animate();
// PLAYER MOVEMENT
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
                keys.d.pressed = true
                break;
        case 'a':
                keys.a.pressed = true
                break;
        case 'i':
                keys.i.pressed = true
                break;
        case 'w':
            if (player.jumpAmount > 0) {
                keys.w.pressed = true
                player.position.yAcceleration = -15
                player.jumpAmount += -1
             }
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 'i':
            keys.i.pressed = false
            break;
        case 'w':
            keys.w.pressed = false
            break;
    }
})
