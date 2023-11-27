import {Entite} from './Entite.js';
import { TiledImage } from './TiledImage.js';
import { attaqueEnnemi } from '/static/index.js';

export class Ennemis extends Entite {
    constructor(x, y, {collisionBlock}) {
        super(x, y, {collisionBlock});
        // this.canvas = document.querySelector('#game');
        // this.x = x;
        // this.y = y;
        this.vaAGauche = true;
        this.tiledImage = new TiledImage("/static/Sprite/Ennemis/ennemis.png", 9, 3, 100, true, 10.0, this.canvas);
        this.tiledImage.changeRow(0);
        this.coups = 0;
        this.speedSkeleton = 1;

        this.width = 14;
        this.height = 24;

        this.spriteSettings = {
            columnCount: 13,
            rowCount: 21,
            refreshDelay: 100,
            loopColumns: true,
            scale: 1.0
        }
    }

    move() {
        if(this.vaAGauche){
			
			if(!attaqueEnnemi){
				this.tiledImage.changeRow(0);
				this.x -= this.speedSkeleton;
				if(this.x < 10){
					this.vaAGauche = false;
				}

			}
			else if (attaqueEnnemi) {//si on va a gauche
				
				this.tiledImage.changeRow(1);//1 car ligne 2
				this.coups++;
			}
		}
		else if(this.vaADroite){
			this.tiledImage.setFlipped(true);
			this.x += this.speedSkeleton;
			if(this.x >= 300){
				this.tiledImage.setFlipped(false);
				this.vaAGauche = true;
			}

		}
		this.tiledImage.tick(this.x, this.y);
		
		return true;
    }

    getNbrCoups() {
		return this.coups;
	}

    draw() {
        this.tiledImage.tick(this.position.x + this.width /2, this.position.y + this.height /3, this.ctx)
    }
}