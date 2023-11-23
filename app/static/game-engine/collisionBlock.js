export class collisionBlock {
    constructor({position}, type) {
        this.position = position
        this.width = 16
        this.height = 16
        this.type = type
    }

    draw(ctx) {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
