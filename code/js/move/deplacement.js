export let move;

document.addEventListener("keydown", e => {
	move = e.keyCode
})

document.addEventListener("keyup", e => {
	move = false
})