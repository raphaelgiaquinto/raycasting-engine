class Intersection{

    static SCREEN_WIDTH;
    static SCREEN_HEIGHT;

    constructor(x, p, dist, color) {
        this.x = x;
        this.p = p;
        this.dist = dist;
        this.color = color;
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, Intersection.SCREEN_HEIGHT/2 - (Intersection.SCREEN_HEIGHT / this.dist) * 10);
        ctx.lineTo(this.x, Intersection.SCREEN_HEIGHT/2 + (Intersection.SCREEN_HEIGHT / this.dist) * 10);
        ctx.stroke();
    }
}