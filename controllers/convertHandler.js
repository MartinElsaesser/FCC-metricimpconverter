function ConvertHandler() {
	this.getNum = function (input) {
		// if empty return 1
		let emptyAsOne = /^(gal|L|mi|km|lbs|kg)$/i;
		if (input.match(emptyAsOne) && input.match(emptyAsOne)[1]) return 1;

		let notStartingWithNumber = /^([\d\/.]*)/;
		let numsOfFraction = input.split("/").map(n => parseFloat(n));
		let result = numsOfFraction[0];
		if (numsOfFraction.length === 2 && input.match(notStartingWithNumber)[0]) {
			// check for fraction
			result /= numsOfFraction[1];
		} else if (numsOfFraction.length > 2 || !input.match(notStartingWithNumber)[0]) {
			// check for double fraction, or invalid number
			return "invalid number";
		}
		return result;
	};

	this.getUnit = function (input) {
		let regex = /.*?(gal|L|mi|km|lbs|kg)$/i;
		let result = input.match(regex);
		if (!result) {
			return "invalid unit"
		}
		result = result[1].toLowerCase();
		if (result === "l") {
			result = result.toUpperCase();
		}
		return result;
	};

	this.getReturnUnit = function (initUnit) {
		let units = {
			gal: "L",
			L: "gal",
			mi: "km",
			km: "mi",
			lbs: "kg",
			kg: "lbs",
		}

		return units[initUnit];
	};

	this.spellOutUnit = function (unit) {
		let units = {
			gal: "gallons",
			L: "liters",
			mi: "miles",
			km: "kilometers",
			lbs: "pounds",
			kg: "kilograms",
		}
		return units[unit];
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		let result;
		if (initUnit === "gal") {
			result = initNum * galToL;
		}
		else if (initUnit === "L") {
			result = initNum / galToL;
		}
		else if (initUnit === "mi") {
			result = initNum * miToKm;
		}
		else if (initUnit === "km") {
			result = initNum / miToKm;
		}
		else if (initUnit === "lbs") {
			result = initNum * lbsToKg;
		}
		else if (initUnit === "kg") {
			result = initNum / lbsToKg;
		}
		return Math.round(result * 100000) / 100000;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		let string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
		return { initNum, initUnit, returnNum, returnUnit, string };
	};

}

module.exports = ConvertHandler;

