import move from '/static/game-engine/keyEvent.js'

export class Entite{
    constructor(x,y, {collisionBlock}) {
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
        console.log(this.sides)

        this.collisionBlock = collisionBlock

        this.index = null;

        this.key = null;
    }

    draw() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move() {
        this.ctx.clearRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x

        this.checkXCollision()
        this.applyGravity()
        this.checkYCollision()
        

    }

    checkXCollision() {
        // Collision detection along the x axis
        for (let i = 0; i < this.collisionBlock.length; i++) {
            const collisionBlock = this.collisionBlock[i];
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height > collisionBlock.position.y &&
                this.position.y < collisionBlock.position.y + collisionBlock.height
                ) {
                    this.index = i;
                    console.log('col X')
                    if (this.velocity.x < -0) { // Le joueur va vers la gauche
                        this.position.x = collisionBlock.position.x + collisionBlock.width
                        break
                    }
                    if (this.velocity.x > 0) { // Le joueur va vers la droite
                        this.position.x = collisionBlock.position.x - this.width
                        break
                    }    
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkYCollision() {
        for (let i = 0; i < this.collisionBlock.length; i++) {
            const collisionBlock = this.collisionBlock[i];
    
            if (this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.x < collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width > collisionBlock.position.x 
            ) {
                console.log('col Y')
                if (this.velocity.y > 0) { // Le joueur descend
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height;
                    break
                }
                if (this.velocity.y < 0) { // Le joueur monte
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height;
                    break
                }
                this.velocity.y = 0;
                break
            }
        }
    }
}
    
