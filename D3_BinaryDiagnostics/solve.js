const fs = require("fs")
const input = fs.readFileSync("input.txt", "utf8").split("\n")

function GetBytesPopularity(data) {
	let bitShare = Array(data[0].length).fill(0);
	for (let i = 0; i < data.length; i++) {
		const bits = data[i].split("").map(Number)
		for (let j = 0; j < bits.length; j++) {
			bitShare[j] += bits[j]
		}
	}

	let commonBits = Array(data[0].length).fill(0);
	for (let i = 0; i < bitShare.length; i++) {
		commonBits[i] = bitShare[i] >= data.length / 2 ? 1 : 0
	}
	let rareBits = commonBits.map(bit => bit == 1 ? 0 : 1)
	return {
		commonBits: commonBits,
		rareBits: rareBits
	}
}

function GetPowerConsumption(data) {
	const { commonBits, rareBits } = GetBytesPopularity(data);
	return parseInt(commonBits.join(""), 2) * parseInt(rareBits.join(""), 2)
}
console.log("Part 1: " + GetPowerConsumption(input))

function GetLifeSupportRating(data) {
	let { commonBits, rareBits } = GetBytesPopularity(data);
	console.log(commonBits, rareBits)
	let dataOxy = data;
	let dataCO2 = data;

	for (let i = 0; i < commonBits.length; i++) {
		dataOxy = dataOxy.filter(row => row.split("").map(Number)[i] === commonBits[i]);
		commonBits = GetBytesPopularity(dataOxy).commonBits;
		if (dataOxy.length == 1) {
			dataOxy = parseInt(dataOxy[0], 2);
			break;
		}
	}

	for (let i = 0; i < rareBits.length; i++) {
		dataCO2 = dataCO2.filter(row => row.split("").map(Number)[i] === rareBits[i]);
		rareBits = GetBytesPopularity(dataCO2).rareBits;
		if (dataCO2.length == 1) {
			dataCO2 = parseInt(dataCO2[0], 2);
			break;
		}
	}

	console.log(`Oxy: ${dataOxy}\nCO2: ${dataCO2}`);
	return dataOxy * dataCO2;
}
console.log("Part 2: " + GetLifeSupportRating(input))


