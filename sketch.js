let qTree;

function setup() {
    createCanvas(400, 400)
    
    let boundary = new Rectangle(200, 200, 200, 200);
    qTree = new QuadTree(boundary, 4);


};

function draw() {
    if(mouseIsPressed) {
        for (let i = 0; i< 2; i++){
        let m = new Point(mouseX + random(-10,10), mouseY + random(-10,10));
        qTree.insert(m);
    }
    }
    background(0);
    qTree.show();
}