'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const AppError = require("../AppError");

module.exports = function (app) {

	let cH = new ConvertHandler();
	app.get("/api/convert", (req, res) => {
		const input = req.query.input;
		const inputNum = cH.getNum(input);
		const inputUnit = cH.getUnit(input);
		console.log({ inputNum, inputUnit });
		if (inputNum === "invalid number" && inputUnit === "invalid unit") {
			throw new AppError("invalid number and unit", 200);
		}
		else if (inputNum === "invalid number") {
			throw new AppError("invalid number", 200);
		}
		else if (inputUnit === "invalid unit") {
			throw new AppError("invalid unit", 200);
		}
		const returnNumber = cH.convert(inputNum, inputUnit);
		const returnUnit = cH.getReturnUnit(inputUnit);
		res.json(cH.getString(inputNum, inputUnit, returnNumber, returnUnit))
	})
};
