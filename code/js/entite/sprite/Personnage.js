import { Entite } from "../Entite.js";
import {TiledImage} from "./SpriteEngine/TiledImage.js"
import {move} from "./move/deplacement.js"

export class Personnage extends Entite {

    constructor(){
        super()

        this.idle = true;
        this.running = false
        this.jumping = false


        // Sprite settings
        let columnCount = 13; 
		let rowCount = 21; // lignes
		let refreshDelay = 100;
		let loopColumns = true;
		let scale = 1.0;// Échelle à laquelle l'image de sprite doit être affichée

		this.node = document.createElement("div");//cree un div
        this.node.id = "perso"
		document.querySelector("#game").append(this.node);//ajoute le div dans le noeud

        this.hero = new TiledImage("images/Sprite/Body/Ivory/Idle.png", 3, 4, refreshDelay, loopColumns, scale, this.node);
		this.hero.changeRow(3)
        this.hero.changeMinMaxInterval(0, 6)
        this.hero.addImage("images/Sprite/Head/Ivory/Idle.png")

		

		this.x = 300;//position de depart en x
		this.y = 400;//position de depart en y

        this.ground = 400;

		this.speed = 1;

        // false for left - true for right
        this.orientation = true;
        this.falling = false;
    }

    tick(){

        if (move == 65 || move == 68){
            if (!this.running) {
                this.hero = new TiledImage("images/Sprite/Body/Ivory/Run.png", 8, 4, 100, true, 1.0, this.node);
                this.hero.changeRow(1)
                this.hero.changeMinMaxInterval(0, 6)
                this.hero.addImage("images/Sprite/Head/Ivory/Run.png")
                this.running = !this.running
            }
            if (move == 68) {
                this.x +=1
                this.orientation = true 
            }
            if (move == 65) {
                this.x -=1
                this.orientation = false 
            }
            this.hero.setFlipped(this.orientation)
        } else if (move == 87) {
            if (!this.jumping) {
                this.hero = new TiledImage("images/Sprite/Body/Ivory/Jump.png", 6, 4, 100, true, 1.0, this.node);
                this.hero.changeRow(1)
                this.hero.changeMinMaxInterval(0, 6)
                this.hero.addImage("images/Sprite/Head/Ivory/Jump.png")
                this.jumping = !this.jumping
            }
            this.hero.setFlipped(this.orientation)
            this.y -= 2
        }

        else {
            
            this.hero = new TiledImage("images/Sprite/Body/Ivory/Idle.png", 3, 4, 100, true, 1.0, this.node);
		    this.hero.changeRow(1)
            this.hero.changeMinMaxInterval(0, 6)
            this.hero.addImage("images/Sprite/Head/Ivory/Idle.png")

            this.running = false
            this.jumping = false
            this.hero.setFlipped(this.orientation)
        }
               
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.hero.tick(this.x, this.y);
    }
}