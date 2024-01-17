const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const Pi = Math.PI;

class Shape {
    constructor(type, width, height) {
        this.type = type;
        this.width = width;
        this.height = height;
    }

    getArea() {
        switch (this.type) {
            case 'Square':
                return this.width * this.width;
            case 'Rectangle':
                return this.width * this.height;
            case 'Triangle':
                return 0.5 * this.width * this.height;
            case 'Circle':
                return Pi * this.width * this.width;
            default:
                return 0.0;
        }
    }
}

function totalAreaSwitch(shapes) {
    let accum = 0.0;
    shapes.forEach((shape) => {
        accum += shape.getArea();
    });

    return accum;
}

function totalAreaSwitch4(shapes) {
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
    const array = 1000;

    console.log('Response Total Area Switch', totalAreaSwitch(shapes));
    console.log('Response Total Area Switch4', totalAreaSwitch4(shapes));

    suite
        .add('Total Area Switch simple', function() {
            totalAreaSwitch(shapes);
        })
        .add('Total Area Switch4 simple', function() {
            totalAreaSwitch4(shapes);
        })
        .add('Total Area Switch 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaSwitch(shapes);
            }
        })
        .add('Total Area Switch4 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaSwitch4(shapes);
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
