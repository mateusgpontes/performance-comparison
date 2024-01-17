const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

class ShapeBase {
    constructor() {}

    area() {
        throw new Error("Method 'area' must be implemented");
    }

    cornerCount() {
        throw new Error("Method 'cornerCount' must be implemented");
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

    cornerCount() {
        return 4;
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

    cornerCount() {
        return 4;
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

    cornerCount() {
        return 3;
    }
}

class Circle extends ShapeBase {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        const pi = Math.PI;
        return pi * this.radius * this.radius;
    }

    cornerCount() {
        return 0;
    }
}

function cornerArea(shapes) {
    let accum = 0.0;
    shapes.forEach((shape) => {
        accum += ((1.0 / (1.0 + shape.cornerCount())) * shape.area());
    });

    return accum;
}

function cornerArea4(shapes) {
    let accum0 = 0.0;
    let accum1 = 0.0;
    let accum2 = 0.0;
    let accum3 = 0.0;

    let count = shapes.length / 4;
    while (count--) {
        accum0 += (1.0 / (1.0 + shapes[0].cornerCount())) * shapes[0].area();
        accum1 += (1.0 / (1.0 + shapes[1].cornerCount())) * shapes[1].area();
        accum2 += (1.0 / (1.0 + shapes[2].cornerCount())) * shapes[2].area();
        accum3 += (1.0 / (1.0 + shapes[3].cornerCount())) * shapes[3].area();

        shapes = shapes.slice(4);
    }

    const result = accum0 + accum1 + accum2 + accum3;
    return result;
}

function runPerformanceTest() {
    const square = new Square(4);
    const rectangle = new Rectangle(4, 5);
    const triangle = new Triangle(3, 6);
    const circle = new Circle(2);

    const shapes = [square, rectangle, triangle, circle];
    const array = 1000;

    console.log('Response Corner Area', cornerArea(shapes));
    console.log('Response Corner Area4', cornerArea4(shapes));

    suite
        .add('Corner Area simple', function() {
            cornerArea(shapes);
        })
        .add('Corner Area4 simple', function() {
            cornerArea4(shapes);
        })
        .add('Corner Area 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                cornerArea(shapes);
            }
        })
        .add('Corner Area4 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                cornerArea4(shapes);
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

runPerformanceTest();
