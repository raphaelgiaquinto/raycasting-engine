const CAMERA_COLOR = "gray";
const RAY_COLOR = "red";

class Camera{
    constructor(x, y, nbRays) {
        this.pos = new Point(x, y);
        this.direction = new Point(1, 0);
        this.marker = new Point(x+50, y);
        this.rays = [];
        this.distProjection = 100;
        this.nbRays = nbRays;
        this.intersections = [];
        this.drawRays = false;
        this.computeRays();
    }

    drawCamera(ctx) {
        ctx.fillStyle = CAMERA_COLOR;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 5, 0, 360);
        ctx.fill();

        ctx.fillStyle = CAMERA_COLOR;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 5, 0, 360);
        ctx.fill();

        ctx.strokeStyle = CAMERA_COLOR;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.marker.x, this.marker.y);
        ctx.stroke();
        
        if(this.drawRays) {
            this.rays.forEach(ray => {
                ctx.strokeStyle = RAY_COLOR;
                ctx.beginPath();
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(ray.x, ray.y);
                ctx.stroke();
            });
        }
    }

    drawCameraView(ctx) {
        this.intersections.forEach(intersection => intersection.draw(ctx));
    }

    rotate(angle) {
        this.direction = rotate(this.direction, angle);
        this.marker = rotateAround(this.marker, this.pos, angle);
        for(var i = 0; i< this.rays.length; i++) {
            this.rays[i] = rotateAround(this.rays[i], this.pos, angle);
        }
    }

    forward() {
        this.pos.add(this.direction);
        this.marker.add(this.direction);
        this.rays.forEach(ray => ray.add(this.direction));
    }

    backward() {
        this.pos.sub(this.direction);
        this.marker.sub(this.direction);
        this.rays.forEach(ray => ray.sub(this.direction));
    }
    
    computeRays() {
        var angle = 60 / this.nbRays;
        var origin = new Point(this.marker.x + this.distProjection, this.marker.y - this.distProjection)
        for(var i = 0; i < this.nbRays; i++) {
            this.rays.push(origin);
            origin = rotateAround(origin, this.pos, angle);
        }
    }

    project(obstacles) {
        this.intersections = [];
        for(var i = 0; i < this.rays.length; i++) {
            for(var j = 0; j < obstacles.length; j++) {
                var intersection = intersect(this.pos, this.rays[i], obstacles[j].a,  obstacles[j].b);
                if(intersection) {
                    var dist = euclideanDist(this.pos, intersection);
                    var color = obstacles[j].color;
                    if(!this.intersections.find(inter => inter.x == i)) {
                        this.intersections.push(new Intersection(i, intersection, dist, color));
                    } else {
                        for(var k = 0; k < this.intersections.length; k++) {
                            if(this.intersections[k].x == i && this.intersections[k].dist > dist){
                                this.intersections[k].intersection = intersection;
                                this.intersections[k].dist = dist;
                                this.intersections[k].color = color;
                            }
                        }
                    }
                }
            }
        }
    }
}
