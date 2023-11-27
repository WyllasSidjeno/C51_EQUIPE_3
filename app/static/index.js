import map from '/static/map_1_matrix.json' assert { type: 'json' }
import { LevelGenerator } from '/static/game-engine/levelGenerator.js';
import { Entite } from '/static/game-engine/entite.js';
import keys from './game-engine/keyEvent.js';

const BLOCK_SIZE = 101
const TEMPSINTERVALLE = 20;
const ENTITY_MOVE_X = 1;
const ENTITY_MOVE_Y = 1;
const FLECHEGAUCHE = 37;
const FLECHEDROITE = 39;
const FLECHEBAS = 40;
const FLECHEHAUT = 38;

let lvlGen
let level = 0

let zoneDeJeu
let joueur
let intervalle

let collisionBlock = []
let collisionDoor = []
let collisionLadder = []

let canvas = document.querySelector('#game')
let ctx = canvas.getContext('2d')

let canvasBg = document.querySelector('#game-bg')
let ctxBg = canvasBg.getContext('2d')

ctxBg.imageSmoothingEnabled = true
ctx.imageSmoothingEnabled = true

let mapBorder = {
    top: canvas.height / 2,
    bottom: canvas.height / 2,
    left: canvas.width / 2,
    right: canvas.width / 2
}

let cameraMove = {
    xAxisTanslation: false,
    yAxisTranslation: false,
    position: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
}


window.addEventListener('load', () => {
    

    lvlGen = new LevelGenerator(map)
    console.log(map)

    level = 5

    collisionBlock = lvlGen.parseLevel2D(level)
    
    console.log(collisionBlock)

    collisionBlock.forEach(e => {
        if (e.position.x < mapBorder.left) mapBorder.left = e.position.x
        if (e.position.x + e.width > mapBorder.right) mapBorder.right = e.position.x + e.width
        if (e.position.y < mapBorder.top) mapBorder.top = e.position.y
        if (e.position.y + e.height > mapBorder.bottom) mapBorder.bottom = e.position.y + e.height
    })

    if (mapBorder.right > canvas.width) cameraMove.xAxisTanslation = true
    if (mapBorder.bottom > canvas.height) cameraMove.yAxisTranslation = true

    cameraMove.position.left = mapBorder.left
    cameraMove.position.right = canvas.width
    cameraMove.position.top = mapBorder.top
    cameraMove.position.bottom = canvas.height

    

    console.log(cameraMove)
    console.log(mapBorder)

    // ctx.fillStyle = "green"
    joueur = new Entite(100, 60, {collisionBlock , collisionDoor, collisionLadder})
    // joueur.draw(ctx)

    animate()

    
})

const animate = () => {
    window.requestAnimationFrame(animate)

    // Clear et reaffiche l'image de background du niveau
    ctxBg.clearRect(0, 0, canvas.width, canvas.height)
    lvlGen.draw_level(ctxBg, level)

    // Efface le personnage pour le redessinner a sa position actuelle
    ctx.clearRect(0, 0, canvas.width, canvas.height * 2)

    joueur.velocity.x = 0
    if (keys.left){
        // Update du sprite personnage
        joueur.hero.changeRow(11)
        // mouvement de camera vers la droite
        if (cameraMove.xAxisTanslation &&
            joueur.position.x < canvas.width / 3 + cameraMove.position.left &&
            cameraMove.position.left > mapBorder.left) {
                cameraMove.position.left -= ENTITY_MOVE_X
                cameraMove.position.right -= ENTITY_MOVE_X
                ctx.translate(ENTITY_MOVE_X, 0)
                ctxBg.translate(ENTITY_MOVE_X, 0)
            }
        joueur.velocity.x = -ENTITY_MOVE_X
    } 
    if (keys.right) {
        // Update du sprite personnage
        joueur.hero.changeRow(11)
        // mouvement de camera vers la gauche
        if (cameraMove.xAxisTanslation &&
            joueur.position.x > canvas.width /2 &&
            cameraMove.position.right + joueur.width < mapBorder.right) {
                cameraMove.position.right += ENTITY_MOVE_X
                cameraMove.position.left += ENTITY_MOVE_X
                ctx.translate(-ENTITY_MOVE_X, 0)
                ctxBg.translate(-ENTITY_MOVE_X, 0)
            }
        joueur.velocity.x = ENTITY_MOVE_X
    } 
    if (keys.up) {
        // mouvement de camera vers le bas
        if (cameraMove.yAxisTranslation &&
            joueur.position.y < canvas.height / 3 + cameraMove.position.top &&
            cameraMove.position.top > mapBorder.top) {
                cameraMove.position.top -= ENTITY_MOVE_Y
                cameraMove.position.bottom -= ENTITY_MOVE_Y
                ctx.translate(0, ENTITY_MOVE_Y)
                ctxBg.translate(0, ENTITY_MOVE_Y)
            }
        if (joueur.ladder) joueur.position.y -= ENTITY_MOVE_Y
        else if (!joueur.state.jumping) {
            joueur.velocity.y = -10
            joueur.state.jumping = true
        } 
        else keys.up = false
    }
    if (keys.down && joueur.ladder) {
        // mouvement de camera vers le haut
        if (cameraMove.yAxisTranslation &&
            joueur.position.y > canvas.height / 2 &&
            cameraMove.position.bottom + joueur.height < mapBorder.bottom + joueur.height) {
                cameraMove.position.top += ENTITY_MOVE_Y
                cameraMove.position.bottom += ENTITY_MOVE_Y
                ctx.translate(0, -ENTITY_MOVE_Y)
                ctxBg.translate(0, -ENTITY_MOVE_Y)
            }
        joueur.position.y += ENTITY_MOVE_Y
        
    }

    // mouvement de camera vers le haut car joueur chute
    if (joueur.velocity.y < 0) {
        if (cameraMove.yAxisTranslation &&
            joueur.position.y > canvas.height / 2 &&
            cameraMove.position.bottom + joueur.height < mapBorder.bottom + joueur.height) {
                cameraMove.position.top += ENTITY_MOVE_Y
                cameraMove.position.bottom += ENTITY_MOVE_Y
                ctx.translate(0, -ENTITY_MOVE_Y)
                ctxBg.translate(0, -ENTITY_MOVE_Y)
            }
    }

    joueur.move(keys)
    joueur.draw()
    
} 
