const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const shapeEnum = {
    Square: Symbol('Square'),
    Rectangle: Symbol('Rectangle'),
    Triangle: Symbol('Triangle'),
    Circle: Symbol('Circle')
}

function getAreaUnion(shape) {
    const result = shape.calcValue*shape.width * shape.width;
    return result;
}

function totalAreaUnion(shapes) {
    let accum = 0.0;
    for (let i = 0; i < shapes.length; i++) {
        accum += getAreaUnion(shapes[i]);
    }

    return accum;
}

function totalAreaUnion4(shapes) {
    let accum0 = 0.0;
    let accum1 = 0.0;
    let accum2 = 0.0;
    let accum3 = 0.0;

    let count = shapes.length / 4;
    while (count--) {
        accum0 += getAreaUnion(shapes[0]);
        accum1 += getAreaUnion(shapes[1]);
        accum2 += getAreaUnion(shapes[2]);
        accum3 += getAreaUnion(shapes[3]);

        shapes = shapes.slice(4);
    }

    return accum0 + accum1 + accum2 + accum3;
}

module.exports = function runPerformanceTest() {
    console.log('Benchmark object iniciado.');
    const square = { type: shapeEnum.Square, width: 4, calcValue: 1.0 };
    const rectangle = { type: shapeEnum.Rectangle, width: 4, height: 5, calcValue: 1.0};
    const triangle = { type: shapeEnum.Triangle, width: 3, height: 6, calcValue: 0.5};
    const circle = { type: shapeEnum.Circle, width: 2, calcValue: Math.PI};

    const shapes = [square, rectangle, triangle, circle];
    const array = 1000;
    
    suite
        .add('Total Area Object simple', function() {
            totalAreaUnion(shapes);
        })
        .add('Total Area Object4 simple', function() {
            totalAreaUnion4(shapes);
        })
        .add('Total Area Object 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaUnion(shapes);
            }
        })
        .add('Total Area Object4 1000 interations', function() {
            for(let i = 0; i < array; i++) {
                totalAreaUnion4(shapes);
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
