import { Entite } from "/static/entite/Entite.js";
import {TiledImage} from "/static/entite/sprite/SpriteEngine/TiledImage.js"
import {move} from "/static/entite/sprite/move/deplacement.js"

export class Personnage extends Entite {

    constructor(x, y){
        super()

        // personnage state
        this.idle = true;
        this.running = false
        this.jumping = false
        this.falling = false
        this.attack = false
        this.atkCount = 0


        // Sprite settings
        this.columnCount = 13; 
		this.rowCount = 21; // lignes
		this.refreshDelay = 100;
		this.loopColumns = true;
		this.scale = 2.0;// Échelle à laquelle l'image de sprite doit être affichée

		// this.node = document.createElement("div");//cree un div
		this.node = document.querySelector('.game-container');//cree un div
        // console.log(this.node)
        // this.node.id = "perso"
		// document.querySelector("#game").append(this.node);//ajoute le div dans le noeud		

        // Def spritesheet
        this.hero = new TiledImage("/static/Sprite/base.png", this.columnCount, this.rowCount, this.refreshDelay, this.loopColumns, this.scale, this.node);
		this.hero.changeRow(11)
        this.hero.changeMinMaxInterval(0, 8)
        this.hero.addImage('/static/Sprite/torso-base.png')
        this.hero.addImage('/static/Sprite/leg-base.png')
        this.hero.addImage('/static/Sprite/dagger.png')

		this.x = x;//position de depart en x
		this.y = y;//position de depart en y

        this.ground = 400;
		this.speed = 1;

        // false for left - true for right
        this.orientation = true;
        this.falling = false;
    }

    tick(){

        if (move == 65 || move == 68){
            if (move == 68) {
                this.hero.changeRow(11)
                this.x +=1
                this.orientation = true 
            }
            if (move == 65) {
                this.orientation = false 
                this.hero.changeRow(9)
                this.x -=1
                
            }
            // this.hero.setFlipped(this.orientation)
        } 
        else if (move == 87) {
            this.jumping=true
            this.y -= 2
        } else if (move == 32) {
            if (this.orientation) {
                this.hero.changeRow(15)
            } else {
                this.hero.changeRow(13)
            }
            this.hero.changeMinMaxInterval(0, 5)
            this.attack = true
        }
        else {
            this.hero = new TiledImage("/static/Sprite/base.png", this.columnCount, this.rowCount, this.refreshDelay, this.loopColumns, this.scale, this.node);
		    this.hero.changeRow(11)
            this.hero.changeMinMaxInterval(0, 8)
            this.hero.addImage('/static/Sprite/torso-base.png')
            this.hero.addImage('/static/Sprite/leg-base.png')
            this.hero.addImage('/static/Sprite/dagger.png')
            if (this.attack && this.atkCount < 50) {
                this.atkCount += 1
            } else {
                if (this.orientation) {
                    this.hero.changeRow(11)
                } else {
                    this.hero.changeRow(9)
                }
                this.attack = false
                this.atkCount = 0
                
                this.hero.changeMinMaxInterval(0, 8)
            }
            
        
            this.running = false
            this.jumping = false

        }
               
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.hero.tick(this.x, this.y, );
    }
}