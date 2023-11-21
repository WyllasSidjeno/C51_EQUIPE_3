import move from '/static/game-engine/keyEvent.js'

export class Entite{
    constructor(x,y) {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.position = {
            x: x,
            y: y
        }
        this.width = 16
        this.height = 16
        this.moveX = 0
        this.moveY = 0

        this.velocity = {
            x: 0,
            y: 0
        }

        this.gravity = 1

        this.sides = {
            top: this.position.y,
            bottom: this.position.y + this.height,
            left: this.position.x,
            right: this.position.x + this.width
        }

        this.key = null;
    }

    draw() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move() {
        this.ctx.clearRect(this.position.x, this.position.y, this.width, this.height)
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 

        this.sides.bottom = this.position.y + this.height

        if (this.sides.bottom + this.velocity.y < this.canvas.height) {
            this.velocity.y += this.gravity
            
            
        } else this.velocity.y = 0
    }
    
}