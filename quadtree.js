/* Quad point tree :
    Go trhough particles of data whitin a section -- Dividing each section in for 
    other spaces, wich keeps reference to the later rectangles. (recursivly)
    - The big O notation goes from n² to n *LOGn
     
    the capacity: when to divide ? 
        for this program we use 4
*/

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h);
    }
};

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = 4;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nW = new Rectangle(x + w / 2, y - h/2, w/2, h/2);
        this.northWest = new QuadTree(nW, this.capacity);
        let nE = new Rectangle(x - w / 2, y - h/2, w/2, h/2);
        this.northEast = new QuadTree(nE, this.capacity);
        let sW = new Rectangle(x + w / 2, y + h/2, w/2, h/2);
        this.southWest = new QuadTree(sW, this.capacity);
        let sE = new Rectangle(x - w / 2, y + h/2, w/2, h/2);
        this.southEast = new QuadTree(sE, this.capacity);

        this.divided = true;
    }

    insert(point) {

        if(!this.boundary.contains(point)) return false;


        if(this.points.length < this.capacity) {
            this.points.push(point);
            return true
        } else {
            if (!this.divided){
                this.subdivide();
            }

            if (this.northEast.insert(point)) true;
            if (this.northWest.insert(point)) true;
            if (this.southEast.insert(point)) true;
            if (this.southWest.insert(point)) true; 
            
        }
    }

    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);

        if(this.divided) {
            this.northEast.show();
            this.northWest.show();
            this.southEast.show();
            this.southWest.show();
        }

        for(let p of this.points) {
            point(p.x, p.y)
            strokeWeight(4)
        }
    }
}

