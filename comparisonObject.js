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

function totalAreaCTable(shapes) {
    let accum = 0.0;
    shapes.forEach((shape) => {
        accum += shape.getArea();
    });

    return accum;
}

function totalAreaCTable4(shapes) {
    let accum0 = 0.0;
    let accum1 = 0.0;
    let accum2 = 0.0;
    let accum3 = 0.0;

    const shapeCount = shapes.length / 4;

    for (let i = 0; i < shapeCount; ++i) {
        accum0 += shapes[i].getArea();
        accum1 += shapes[i + 1].getArea();
        accum2 += shapes[i + 2].getArea();
        accum3 += shapes[i + 3].getArea();
    }

    return accum0 + accum1 + accum2 + accum3;
}

function runPerformanceTest() {
    const square = new Shape('Square', 4);
    const rectangle = new Shape('Rectangle', 4, 5);
    const triangle = new Shape('Triangle', 3, 6);
    const circle = new Shape('Circle', 2);

    const shapes = [square, rectangle, triangle, circle];
    console.log('Response TotalAreaCTable', totalAreaCTable(shapes));
    console.log('Response TotalAreaCTable4', totalAreaCTable4(shapes));
    const array = 1000;

    suite
        .add('Total Area CTable simple', function() {
            totalAreaCTable(shapes);
        })
        .add('Total Area CTable4 simple', function() {
            totalAreaCTable4(shapes);
        })
        .add('Total Area CTable 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaCTable(shapes);
            }
        })
        .add('Total Area CTable4 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaCTable4(shapes);
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
