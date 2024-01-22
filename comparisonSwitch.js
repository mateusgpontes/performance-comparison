const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const Pi = Math.PI;

// create a shape enum object using symbols
const shapeEnum = {
    Square: Symbol('Square'),
    Rectangle: Symbol('Rectangle'),
    Triangle: Symbol('Triangle'),
    Circle: Symbol('Circle')
}

function getAreaSwitch (shape) {
    switch (shape.type) {
        case shapeEnum.Square:
            return shape.width * shape.width;
        case shapeEnum.Rectangle:
            return shape.width * shape.height;
        case shapeEnum.Triangle:
            return 0.5 * shape.width * shape.height;
        case shapeEnum.Circle:
            return Pi * shape.width * shape.width;
        default:
            return 0.0;
    }
}

function totalAreaSwitch(shapes) {
    let accum = 0.0;
    for (let i = 0; i < shapes.length; i++) {
        accum += getAreaSwitch(shapes[i]);
    }

    return accum;
}

function totalAreaSwitch4(shapes) {
    let accum0 = 0.0;
    let accum1 = 0.0;
    let accum2 = 0.0;
    let accum3 = 0.0;

    let count = shapes.length / 4;
    while (count--) {
        accum0 += getAreaSwitch(shapes[0]);
        accum1 += getAreaSwitch(shapes[1]);
        accum2 += getAreaSwitch(shapes[2]);
        accum3 += getAreaSwitch(shapes[3]);

        shapes = shapes.slice(4);
    }

    return accum0 + accum1 + accum2 + accum3;
}

module.exports = function runPerformanceTest() {
    console.log('Benchmark switch iniciado.');
    const square = { type: shapeEnum.Square, width: 4 };
    const rectangle = { type: shapeEnum.Rectangle, width: 4, height: 5 };
    const triangle = { type: shapeEnum.Triangle, width: 3, height: 6 };
    const circle = { type: shapeEnum.Circle, width: 2 };

    const shapes = [square, rectangle, triangle, circle];
    const array = 1000;

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

