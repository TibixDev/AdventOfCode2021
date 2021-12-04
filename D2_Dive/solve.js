const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

console.time('P1');
function P1_ProcessMovement(data) {
    let horizontal = 0;
    let depth = 0;

    data = data.map(function (str) {
        return { direction: str.split(" ")[0], distance: parseInt(str.split(" ")[1]) } 
    })

    for (const instruction of data) {
        const { direction, distance } = instruction;
        switch(direction) {
            case 'forward':
                horizontal += distance;
                break;
            case 'up':
                depth -= distance;
                break;
            case 'down':
                depth += distance;
                break;
        }
    }
    return horizontal * depth;
}

function P2_ProcessMovement(data) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    data = data.map(function (str) {
        return { direction: str.split(" ")[0], distance: parseInt(str.split(" ")[1]) } 
    })

    for (const instruction of data) {
        const { direction, distance } = instruction;
        switch(direction) {
            case 'forward':
                horizontal += distance;
                depth += aim * distance;
                break;
            case 'up':
                aim -= distance;
                break;
            case 'down':
                aim += distance;
                break;
        }
    }
    return horizontal * depth;
}

console.log("Part One: " + P1_ProcessMovement(input));
console.log("Part Two: " + P2_ProcessMovement(input));
console.timeEnd('P1');