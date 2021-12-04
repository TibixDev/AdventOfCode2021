const fs = require('fs');

console.time('Bingo!');
let input = fs.readFileSync('input.txt', 'utf8').split('\n')
const winningNums = input[0].split(',').map(Number);

// 1. Slice so the winning nums disappear
// 2. Remove empty lines 
// 3. Remove the first character if whitespace
// 4. Split at any spaces
input = input.slice(2)
    .filter(line => line != "")
    .map(line => line.replace(/^\s/, ""))
    .map(line => line.split(/\s+/).map(Number));

function MkTables(data) {
    let tables = [];
    for (let i = 0; i < data.length; i+=5) {
        tables.push([data[i], data[i+1], data[i+2], data[i+3], data[i+4]]);
    }
    return tables;
}

function UnmarkedSum(table, nums) {
    let sum = 0;
    for (let i = 0; i < table.length; i++) {
        let row = table[i];
        for (let j = 0; j < row.length; j++) {
            if (!nums.includes(row[j])) {
                sum += row[j];
            }
        }
    }
    return sum;
}

function CheckWinners(tables, nums) {
    let winners = []

    // Check horizontal
    for (let i = 0; i < tables.length; i++) {
        for (let j = 0; j < tables[i].length; j++) {
            let row = tables[i][j];
            if (row.filter(num => nums.includes(num)).length === 5) {
                console.log(`Winner: Table #${i} with row #${j} [${row}]`);
                winners.push(i);
            }
        }
    }
    // Check vertical
    for (let i = 0; i < tables.length; i++) {
        for (let j = 0; j < tables[i].length; j++) {
            let col = tables[i].map(row => row[j]);
            if (col.filter(num => nums.includes(num)).length === 5) {
                console.log(`Winner: Table #${i} with col #${j} [${col}]`);
                winners.push(i);
            }
        }
    }
    return winners;
}

function ProcessGame() {
    let currentNums = [];
    let winners = [];

    for (let num = 0; num < winningNums.length; num++) {
        currentNums.push(winningNums[num]);
        let roundWinners = CheckWinners(input, currentNums);
        if (roundWinners !== []) {
            for (let i = 0; i < roundWinners.length; i++) {
                winners.push({table: input[roundWinners[i]], currentNums: [...currentNums], latestNum: winningNums[num]});
                input[roundWinners[i]] = [];
            }
        }
    }
    winners = winners.map(winner => UnmarkedSum(winner.table, winner.currentNums) * winner.latestNum)
    return winners;
}

input = MkTables(input);
const winners = ProcessGame();
console.log(`First Winner: ${winners[0]}\nLast Winner: ${winners[winners.length - 1]}`);
console.timeEnd('Bingo!');