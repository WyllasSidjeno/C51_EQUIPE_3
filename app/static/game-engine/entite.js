import move from '/static/game-engine/keyEvent.js'
import { TiledImage } from './TiledImage.js'

export class Entite{
    constructor(x,y, {collisionBlock}) {
        this.canvas = document.querySelector('#game')
        this.ctx = this.canvas.getContext('2d')
        this.position = {
            x: x,
            y: y
        }

        this.spriteSettings = {
            columnCount: 13,
            rowCount: 21,
            refreshDelay: 100,
            loopColumns: true,
            scale: 1.0
        }

        this.state = {
            idle: true,
            running: false,
            jumping: false,
            falling: false,
            attack: false
        }

        this.width = 14
        this.height = 24

        this.hero = new TiledImage(
            "/static/Sprite/base.png",
            this.spriteSettings.columnCount,
            this.spriteSettings.rowCount,
            this.spriteSettings.refreshDelay,
            this.spriteSettings.loopColumns,
            this.spriteSettings.scale,
            this.canvas);
		this.hero.changeRow(11)
        this.hero.changeMinMaxInterval(0, 8)
        this.hero.addImage('/static/Sprite/torso-base.png')
        this.hero.addImage('/static/Sprite/leg-base.png')
        this.hero.addImage('/static/Sprite/dagger.png')


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
        this.side = true
    }

    draw() {
        this.hero.tick(this.position.x + this.width /2, this.position.y + this.height /3, this.ctx)
        // this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move(keys) {
        if (keys.left){
            this.hero.setPaused(false)
            this.hero.changeRow(9)
            this.side = false
        } 
        else if (keys.right) {
            this.hero.setPaused(false)
            this.hero.changeRow(11)
            this.side = true
        } 
        else if (keys.up) {
            this.hero.setPaused(false)
            this.hero.changeRow(8)
        } 
        else if (keys.down) {
            this.hero.setPaused(false)
            this.hero.changeRow(8)
        } 
        else if (keys.attack) {
            console.log('attck')
            this.attack()
        }
        else if (!this.state.attack) {
            this.hero.setPaused(true)
        }

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

    attack() {
        this.hero.changeMinMaxInterval(0, 5)
        if (this.side) this.hero.changeRow(15)
        else this.hero.changeRow(13)

        this.state.attack = true

        setTimeout(() => {
            this.state.attack = false
        }, 1000)
        
        // this.hero.changeMinMaxInterval(0, 5)
    }
}
    
