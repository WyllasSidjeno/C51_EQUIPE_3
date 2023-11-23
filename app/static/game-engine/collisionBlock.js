export class collisionBlock {
    constructor({position}) {
        this.position = position
        this.width = 16
        this.height = 16
    }

    draw(ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
