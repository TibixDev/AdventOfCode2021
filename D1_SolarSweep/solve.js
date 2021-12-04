const fs = require('fs');

// Part 1
const input = fs.readFileSync('input_g.txt', 'utf8').split('\n').map(e => parseInt(e));
function CalculateIncreasements(data) {
    let increasements = 0;
    for (let i = 1; i < data.length; i++) {
        if (data[i] > data[i - 1]) {
            increasements++;
        }
    }
    return increasements;
}
console.log(`Increasement for input: ${CalculateIncreasements(input)}`);

// Part 2
let input_normalized = [];
for (let i = 0; i < input.length - 2; i++) {
    input_normalized.push(input[i] + input[i + 1] + input[i + 2]);
}
console.log(`Increasement for normalized input: ${CalculateIncreasements(input_normalized)}`);