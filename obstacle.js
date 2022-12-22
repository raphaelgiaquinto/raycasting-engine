class Obstacle{

    constructor(a, b, color) {
        this.a = a;
        this.b = b;
        this.color = color;
    }
    
    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }
}