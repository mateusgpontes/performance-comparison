const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

class ShapeBase {
    constructor() {}

    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Square extends ShapeBase {
    constructor(side) {
        super();
        this.side = side;
    }

    area() {
        return this.side * this.side;
    }
}

class Rectangle extends ShapeBase {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Triangle extends ShapeBase {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }

    area() {
        return 0.5 * this.base * this.height;
    }
}

class Circle extends ShapeBase {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        const Pi = Math.PI;
        return Pi * this.radius * this.radius;
    }
}

function totalArea(shapeArray) {
    let accum = 0.0;
    for (let i = 0; i < shapeArray.length; i++) {
        accum += shapeArray[i].area();
    }

    return accum;
}

function totalArea4(shapes) {
    let accum0 = 0.0;
    let accum1 = 0.0;
    let accum2 = 0.0;
    let accum3 = 0.0;

    let count = shapes.length / 4;
    while (count--) {
        accum0 += shapes[0].area();
        accum1 += shapes[1].area();
        accum2 += shapes[2].area();
        accum3 += shapes[3].area();

        shapes = shapes.slice(4);
    }

    return accum0 + accum1 + accum2 + accum3;
}

module.exports = function runPerformanceTest() {
    console.log('Benchmark clean iniciado.');

    const square = new Square(4);
    const rectangle = new Rectangle(4, 5);
    const triangle = new Triangle(3, 6);
    const circle = new Circle(2);

    const shapes = [square, rectangle, triangle, circle];
    const array = 1000;

    suite
        .add('Total Area simple', function() {
            totalArea(shapes);
        })
        .add('Total Area4 simple', function() {
            totalArea4(shapes);
        })
        .add('Total Area 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalArea(shapes);
            }
        })
        .add('Total Area4 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalArea4(shapes);
            }
        })
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Benchmark completo.');
        })
        .run({ 'async': false });
}

