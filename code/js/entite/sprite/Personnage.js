import { Entite } from "../Entite.js";
import {TiledImage} from "./SpriteEngine/TiledImage.js"
import {move} from "./move/deplacement.js"

export class Personnage extends Entite {

    constructor(){
        super()

        this.idle = true;
        this.running = false


        // Sprite settings
        let columnCount = 13; 
		let rowCount = 21; // lignes
		let refreshDelay = 100;
		let loopColumns = true;
		let scale = 1.0;// Échelle à laquelle l'image de sprite doit être affichée

		this.node = document.createElement("div");//cree un div
        this.node.id = "perso"
		document.querySelector("#game").append(this.node);//ajoute le div dans le noeudd

        this.nodeArme = document.createElement("div");//cree un div
        this.nodeArme.id = "weapon"
		document.querySelector("#game").append("#weapon");//ajoute le div dans le noeudd

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

        if (!this.falling) {
            switch (move) {
                case 65:
                    if (!this.running && !this.orientation) {
                        this.hero = new TiledImage("images/Sprite/Body/Ivory/Run.png", 8, 4, 100, true, 1.0, this.node);
		                this.hero.changeRow(1)
                        this.hero.changeMinMaxInterval(0, 6)
                        this.hero.addImage("images/Sprite/Head/Ivory/Run.png")
                        this.running = true
                    }
                    
                    
                    console.log("LEFT")
                    this.orientation = false;
                    this.x -= this.speed;
                    break;
                case 68:
                    if (!this.running && this.orientation) {
                        this.hero = new TiledImage("images/Sprite/Body/Ivory/Run.png", 8, 4, 100, true, 1.0, this.node);
		                this.hero.changeRow(3)
                        this.hero.changeMinMaxInterval(0, 6)
                        this.hero.addImage("images/Sprite/Head/Ivory/Run.png")
                        this.running = true
                    }
                    
                    console.log("RIGHT")
                    this.orientation = true;
                    this.x += this.speed;
                    break;
                case 87:
                    // this.y -= this.speed
                    // if (this.orientation) {
                    //     this.hero.changeRow(3);  
                    // } else {
                    //     this.hero.changeRow(1);  
                    // }
                    
                    break;
                case 32:
                    // console.log("attack")
                    // if (this.orientation) {
                    //     this.hero.changeRow(15);
                    // } else {
                    //     this.hero.changeRow(13);
                    // }
                    break;
                case 16:
                    console.log("defense")
                    break;
                default:
                    // if (this.y < this.ground) {
                    //     console.log("fall")
                    //     this.falling = true;
                    // } else{
                    //     this.falling = false;
                    //     if (this.orientation) {
                    //         this.hero.changeRow(11);  
                    //     } else {
                    //         this.hero.changeRow(9);  
                    //     }
                    //     this.hero.setPaused(true);
                    //     console.log("Not moving")
                        break;
                    // }      
            }
        } else {
            if (this.orientation) {
                this.hero.changeRow(3);  
            } else {
                this.hero.changeRow(1);  
            }
            this.y += 2
            this.falling = this.y >= this.ground ? false : true;
        }
        
        
        

        
        
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.hero.tick(this.x, this.y);
    }
}