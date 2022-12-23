class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(point) {
        this.x += point.x;
        this.y += point.y;
    }
    sub(point) {
        this.x -= point.x;
        this.y -= point.y;
    }
    static add(a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    }
}

function radian(angle) {
    return angle * (Math.PI/180);
}

function rotate(p, angle) {
    var nx = (p.x * Math.cos(radian(angle))) - (p.y * Math.sin(radian(angle)));
    var ny = (p.y * Math.cos(radian(angle))) + (p.x * Math.sin(radian(angle)));
    return new Point(nx ,ny);
}

function rotateAround(p, o, angle) {
    var nx = Math.cos(radian(angle)) * (p.x-o.x) - Math.sin(radian(angle)) * (p.y-o.y) + o.x;
    var ny = Math.sin(radian(angle)) * (p.x-o.x) + Math.cos(radian(angle)) * (p.y-o.y) + o.y;
    return new Point(nx ,ny);
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function intersect(pointA, pointB, pointC, pointD) {
    var z1 = (pointA.x - pointB.x);
    var z2 = (pointC.x - pointD.x);
    var z3 = (pointA.y - pointB.y);
    var z4 = (pointC.y - pointD.y);
    var dist = z1 * z4 - z3 * z2;
    if (dist == 0) {
      return null;
    }
    var tempA = (pointA.x * pointB.y - pointA.y * pointB.x);
    var tempB = (pointC.x * pointD.y - pointC.y * pointD.x);
    var xCoor = (tempA * z2 - z1 * tempB) / dist;
    var yCoor = (tempA * z4 - z3 * tempB) / dist;
  
    if (xCoor < Math.min(pointA.x, pointB.x) || xCoor > Math.max(pointA.x, pointB.x) ||
      xCoor < Math.min(pointC.x, pointD.x) || xCoor > Math.max(pointC.x, pointD.x)) {
      return null;
    }
    if (yCoor < Math.min(pointA.y, pointB.y) || yCoor > Math.max(pointA.y, pointB.y) ||
      yCoor < Math.min(pointC.y, pointD.y) || yCoor > Math.max(pointC.y, pointD.y)) {
      return null;
    }
  
    return new Point(xCoor, yCoor);
  }

function euclideanDist(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
