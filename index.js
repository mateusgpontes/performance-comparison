const clean = require('./comparisonClean');
const object = require('./comparisonObject');
const switchCase = require('./comparisonSwitch');

clean();
console.log('---------------------------');
switchCase();
console.log('---------------------------');
object();