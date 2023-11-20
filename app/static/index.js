import map from '/static/map_1_matrix.json' assert { type: 'json' }

const BLOCK_SIZE = 96
const TEMPSINTERVALLE = 20;
const ENTITY_MOVE_X = 1;
const ENTITY_MOVE_Y = 1;
const FLECHEGAUCHE = 37;
const FLECHEDROITE = 39;
const FLECHEBAS = 40;
const FLECHEHAUT = 38;

let zoneDeJeu
let joueur
let intervalle

window.addEventListener('load', () => {

    let topnav = document.querySelector('.topnav');
    let mute = document.querySelector('#muted');
    let volume = document.querySelector('#volumeOn');
    
    topnav.style.display = 'none';
    mute.style.display = 'none';
    volume.style.display = 'none';

    let level = 5

    zoneDeJeu = new ZoneDeJeu(map, level);
    zoneDeJeu.commencer();
    joueur = new ComponentJoueur(100, 100, 'red', 96, 96);
    
 })

const draw_matrice = (data, level) => {
    let worldData = data["levels"][level]
    let matrix = worldData["layerInstances"][0]

    let canvas = document.createElement('canvas')
    canvas.id = "matrix"
    canvas.style.position = "absolute"
    canvas.style.zIndex = 99999
    let width = BLOCK_SIZE * matrix["__cWid"]
    let height = BLOCK_SIZE * matrix["__cHei"]
    canvas.width = width
    canvas.height = height

    let count = 0
    let line = 0
    let row = 0
    let ctx = canvas.getContext("2d")   

    matrix["intGridCsv"].forEach(e => {
          
            switch (e) {
                case 1:
                    ctx.fillStyle = "black"
                    break;
                case 2:
                    ctx.fillStyle = "blue"
                    break;
                case 3:
                    ctx.fillStyle = "pink"
                    break;       
                default:
                    break;
            }

            if (e != 0) {
                ctx.fillRect(row, line, BLOCK_SIZE, BLOCK_SIZE)
            }

            if (matrix["__cWid"] - 1 == count){
                line += BLOCK_SIZE
                row = 0
                count = 0
            } else {
                row += BLOCK_SIZE        
                count += 1
            }
    });

    document.querySelector('body').append(canvas)
}

const mettreAJour = () => {
    zoneDeJeu.frameNo += 1;

    joueur.move();
    joueur.draw();
}



class ZoneDeJeu {
    constructor(map, level) {
        this.map = map
        this.level = level
        draw_matrice(map, level)
        this.canvas = document.getElementById("matrix");
        this.context = this.canvas.getContext("2d");
    }
    commencer() {
        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));

        intervalle = setInterval(mettreAJour, TEMPSINTERVALLE);
        this.frameNo = 0;
    }
    
    keydown(e) {
        this.key = e.keyCode;
    }
    keyup(e) {
        this.key = false;
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw() {
        draw_matrice(this.map, this.level) 
    }
}

class Component {
    constructor(x, y, couleur) {
        this.x = x;
        this.y = y;
        this.couleur = couleur;
    }
    draw() {
        zoneDeJeu.context.fillStyle = this.couleur;
    }
}

class ComponentEntite extends Component {
    constructor(x, y, couleur, largeur, hauteur) {
        super(x, y, couleur);
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.moveX = 0;
        this.moveY = 0;
    }
    draw() {
        super.draw();
        zoneDeJeu.context.fillRect(this.x, this.y, this.largeur, this.hauteur);
    }
    move() {
        this.moveX = 0;
        this.moveY = 0;
        if (zoneDeJeu.key && zoneDeJeu.key == this.gauche)
            this.moveX = -ENTITY_MOVE_X;
        if (zoneDeJeu.key && zoneDeJeu.key == this.droite)
            this.moveX = ENTITY_MOVE_X;
        if (zoneDeJeu.key && zoneDeJeu.key == this.haut)
            this.moveY = -ENTITY_MOVE_Y;
        if (zoneDeJeu.key && zoneDeJeu.key == this.bas)
            this.moveY = ENTITY_MOVE_Y;
        zoneDeJeu.context.clearRect(this.x, this.y, this.largeur, this.hauteur);
        this.x += this.moveX;
        this.y += this.moveY;
    }
}

class ComponentJoueur extends ComponentEntite {
    constructor(x, y, couleur, largeur, hauteur) {
        super(x, y, couleur, largeur, hauteur);
        this.gauche = FLECHEGAUCHE;
        this.droite = FLECHEDROITE;
        this.haut = FLECHEHAUT;
        this.bas = FLECHEBAS;
    }
}