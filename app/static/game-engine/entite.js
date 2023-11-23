import move from '/static/game-engine/keyEvent.js'

export class Entite{
    constructor(x,y, {collisionBlock}) {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.position = {
            x: x,
            y: y
        }

        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        this.width = 10
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

        this.ladder = false
        this.key = null;
    }

    draw() {
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
            const type = collisionBlock.type

            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height > collisionBlock.position.y &&
                this.position.y < collisionBlock.position.y + collisionBlock.height
                ) {
                    
                    if (type == "block") {
                        this.ladder = false
                        if (this.velocity.x < -0) { // Le joueur va vers la gauche
                            this.position.x = collisionBlock.position.x + collisionBlock.width
                            break
                        }
                        if (this.velocity.x > 0) { // Le joueur va vers la droite
                            this.position.x = collisionBlock.position.x - this.width
                            break
                        }
                    }
                    if (type == "ladder") {
                        if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                            this.position.x + this.width >= collisionBlock.position.x &&
                            this.position.y + this.height > collisionBlock.position.y &&
                            this.position.y < collisionBlock.position.y + collisionBlock.height
                        ){
                            // Si sur une echelle exit la function
                            this.ladder = true
                            return
                        } 
                    }
            }
        }
        // Si on est pas sur une echelle reset ladder status pour reactiver la gravité
        this.ladder = false
    }

    applyGravity() {
        if (!this.ladder){
            this.velocity.y += this.gravity
            this.position.y += this.velocity.y
        }
    }

    checkYCollision() {
        for (let i = 0; i < this.collisionBlock.length; i++) {
            const collisionBlock = this.collisionBlock[i];
            const type = collisionBlock.type
            if (this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.x < collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width > collisionBlock.position.x 
            ) {
                if (type == "ladder") {
                    if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                        this.position.x + this.width >= collisionBlock.position.x  &&
                        this.position.y + this.height > collisionBlock.position.y &&
                        this.position.y < collisionBlock.position.y + collisionBlock.height
                    ){
                        this.ladder = true
                        // Si sur une echelle exit la function
                        return                    
                    }
                }
                if (type == "block") {
                    this.ladder = false
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
                } 
                 
            }
        }
        // Si on est pas sur une echelle reset ladder status pour reactiver la gravité
        this.ladder = false
    }
}
    
