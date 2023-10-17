import { Entite } from "../Entite.js";
import {TiledImage} from "../../SpriteEngine/TiledImage.js"
import {move} from "../../move/deplacement.js"

export class Personnage extends Entite {

    constructor(){
        super()

        let columnCount = 13; // colonnes
		let rowCount = 21; // lignes
		let refreshDelay = 100;// Délai entre les frames de l'animation (en millisecondes)
		let loopColumns = true;// Si les colonnes de l'image de sprite doivent boucler
		let scale = 1.0;// Échelle à laquelle l'image de sprite doit être affichée

		this.node = document.createElement("div");//cree un div
		document.querySelector("#game").append(this.node);//ajoute le div dans le noeud

		this.tiledImage = new TiledImage("images/perso.png", columnCount, rowCount, refreshDelay, loopColumns, scale, this.node);
		this.tiledImage.changeRow(9)
		this.tiledImage.changeMinMaxInterval(0, 6)

		this.x = 300;//position de depart en x
		this.y = 300;//position de depart en y

        console.log("SAAFAS")

		this.speed = 1;
    }

    tick(){
        if (move == 65) {
            console.log("LEFT")
            this.x -= this.speed;
			this.tiledImage.changeRow(9);
        }
        if (move == 68) {
            console.log("RIGHT")
            this.x += this.speed;
			this.tiledImage.changeRow(11);
        }
        if (move == 87) {
            this.y -= this.speed
            console.log(this.y)
        }
        if (move == 32) {
            console.log("attack")
        }
        if (move == 16) {
            console.log("defense")
        }
        
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.tiledImage.tick(this.x, this.y);
    }
}