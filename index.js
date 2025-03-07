    // SETUP FOR PLAY AREA 
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

    // PLAYER CONTROL AND SPAWN 
class Player {
    constructor(position) {
        this.position = position
        this.height = 100
        this.xAcceleration = 0
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
    this.draw()
    this.position.y += this.position.yAcceleration
    this.position.x += this.xAcceleration
    if (this.position.y + this.height + this.position.yAcceleration < canvas.height) {
        this.position.yAcceleration += gravity 
        console.log(this.position.yAcceleration)
    } else {
        this.position.yAcceleration = 0
        this.jumpAmount = 2
    }
}
}
// SPAWNS THE PLAYER
const player = new Player({
    x:100,
    y:100,
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
}


//GLOBALLY ANIMATES AND FORWARDS THE GAME
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    
// PLAYER MOVEMENT
    player.xAcceleration = 0
    if(keys.d.pressed) player.xAcceleration = 5
    if(keys.a.pressed) player.xAcceleration = -5
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
        case 'w':
            keys.w.pressed = false
            break;
    }
})
