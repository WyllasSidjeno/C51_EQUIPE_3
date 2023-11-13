class Perso {
	constructor() {
		let columnCount = 13; //9 colonnes sur img
		let rowCount = 21; //4lignes
		let refreshDelay = 100;// Délai entre les frames de l'animation (en millisecondes)
		let loopColumns = true;//Si les colonnes de l'image de sprite doivent boucler
		let scale = 1.0;//Échelle à laquelle l'image de sprite doit être affichée

		this.node = document.createElement("div");//cree un div
		document.querySelector("#game").append(this.node);//ajoute le div dans le noeud

		this.tiledImage = new TiledImage("images/perso.png", columnCount, rowCount, refreshDelay, loopColumns, scale, this.node);
		this.tiledImage.changeRow(21);//si elle est en commentaire mon squellette apparait de dos
		this.tiledImage.changeMinMaxInterval(0, 6);//8 car 9 colonne

		// this.tiledImage.addImage("images/item-hood-walk.png");
		// this.tiledImage.addImage("images/item-shield-walk.png");		

		this.x = 300;//position de depart en x
		this.y = 300;//position de depart en y


		//----------------------------MOI-------------------------------------------
		this.speedSkeleton = 1;
		this.vaAGauche = true;
		this.vaADroite = false;

	}

	tick () {
		// Gestion du déplacement du personnage en fonction des touches fléchées-----------
		// if (leftArrowOn) {//si on va a gauche
		// 	this.tiledImage.changeRow(1);//1 car ligne 2
		// 	this.x--;
		// }

		// if (rightArrowOn) {
		// 	this.tiledImage.changeRow(3);//3 car ligne 4
		// 	this.x++;
		// }

		// if (!leftArrowOn && !rightArrowOn) {//si on appui sur rien -> pause
		// 	this.tiledImage.setPaused(true);
		// }
		// else {
		// 	this.tiledImage.setPaused(false);
		// }
		//----------------------------------------------------------------------------------------

		//sans fleche---------------------------------------------------------------------

		//this.x -= this.speedSkeleton;
		if(this.vaAGauche){
			this.x -= this.speedSkeleton;
			this.tiledImage.changeRow(9);
			if(this.x < 10){
				this.vaAGauche = false;
				this.vaADroite = true;
			}
		}
		else if(this.vaADroite){
			this.x += this.speedSkeleton;
			this.tiledImage.changeRow(11);
			if(this.x > 100){
				this.vaADroite = false;
				this.vaAGauche = true;
			}
		}
           

		this.tiledImage.tick(this.x, this.y);
		return true;
	}
}