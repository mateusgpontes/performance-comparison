const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const Pi = Math.PI;
class Shape {
    constructor(type, width, height = 1.0) {
        this.type = type;
        this.width = width;
        this.height = height;
    }

    getArea() {
        const cValue = getCValue(this.type);
        const multiplicationWidth = cValue * this.width * this.width;
        const multiplicationWidthHeight = cValue * this.width * this.height;

        const area = {
            'Square': multiplicationWidth,
            'Rectangle': multiplicationWidthHeight,
            'Triangle': multiplicationWidthHeight,
            'Circle': multiplicationWidth,
        };

        return area[this.type];
    }
}

function getCValue(type) {
    const CTable = { 
        "Square" : 1.0,
        "Rectangle": 1.0,
        "Triangle": 0.5,
        "Circle": Pi
    };
    return CTable[type];
}

function totalAreaObject(shapes) {
    let accum = 0.0;
    shapes.forEach((shape) => {
        accum += shape.getArea();
    });

    return accum;
}

function totalAreaObject4(shapes) {
    let accum0 = 0.0;
    let accum1 = 0.0;
    let accum2 = 0.0;
    let accum3 = 0.0;

    let count = shapes.length / 4;
    while (count--) {
        accum0 += shapes[0].getArea();
        accum1 += shapes[1].getArea();
        accum2 += shapes[2].getArea();
        accum3 += shapes[3].getArea();

        shapes = shapes.slice(4);
    }

    return accum0 + accum1 + accum2 + accum3;
}

function runPerformanceTest() {
    const square = new Shape('Square', 4);
    const rectangle = new Shape('Rectangle', 4, 5);
    const triangle = new Shape('Triangle', 3, 6);
    const circle = new Shape('Circle', 2);

    const shapes = [square, rectangle, triangle, circle];
    console.log('Response Total Area Object', totalAreaObject(shapes));
    console.log('Response Total Area Object4', totalAreaObject4(shapes));
    const array = 1000;

    suite
        .add('Total Area Object simple', function() {
            totalAreaObject(shapes);
        })
        .add('Total Area Object4 simple', function() {
            totalAreaObject4(shapes);
        })
        .add('Total Area Object 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaObject(shapes);
            }
        })
        .add('Total Area Object4 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaObject4(shapes);
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
