let spriteList = [];

// let leftArrowOn = false;
// let rightArrowOn = false;

window.addEventListener("load", () => {//gestionnaire d'événements qui s'exécute lorsque la page web est entièrement chargée (l'événement "load"). À ce moment-là, il crée une instance de la classe Skeleton et l'ajoute au tableau spriteList.
	spriteList.push(new Perso());

	tick();
});

const tick = () => {//mettre à jour le jeu à chaque "tick" (image). Elle parcourt la liste des objets Skeleton dans spriteList et appelle leur méthode tick() pour mettre à jour leur état. Si un squelette n'est plus "en vie" (c'est-à-dire que sa méthode tick() renvoie false), il est supprimé du tableau.
	 for (let i = 0; i < spriteList.length; i++) { //pas necessaire car mon squelette ne sort pas de lecran -> mais si je ne le met pas ca ne fonctionne pas...
	 	let alive = spriteList[i].tick();
	// 	// console.log(alive)
	// 	// if (!alive) {
	// 	// 	spriteList.splice(i, 1);
	// 	// 	i--;
	// 	// }
	 }

	window.requestAnimationFrame(tick);
}


//pour si on utilise des fleche------------------------------
// document.addEventListener("keydown", e => {
// 	if (e.key == "ArrowLeft") leftArrowOn = true;
// 	else if (e.key == "ArrowRight") rightArrowOn = true;
// });

// document.addEventListener("keyup", e => {
// 	if (e.key == "ArrowLeft") leftArrowOn = false;
// 	else if (e.key == "ArrowRight") rightArrowOn = false;
// });
//----------------------------------------------------------