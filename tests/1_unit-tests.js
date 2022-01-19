const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let cH = new ConvertHandler();

suite('Unit Tests', function () {
	test('get Number', function () {
		assert.equal(cH.getNum("2L"), 2, 'Number');
		assert.equal(cH.getNum("3.5L"), 3.5, 'Float');
		assert.equal(cH.getNum("9/2L"), 4.5, 'Fraction');
		assert.equal(cH.getNum("8.6/2L"), 4.3, 'Fraction with decimal');
		assert.equal(cH.getNum("L"), 1, 'Read empty as 1');
		assert.equal(cH.getNum("8.3/2/3L"), 'invalid number', 'Invalid Number');
	});
	test('get Unit', function () {
		assert.equal(cH.getUnit("2L"), "L", 'liters');
		assert.equal(cH.getUnit("2gal"), "gal", 'gallons');
		assert.equal(cH.getUnit("2km"), "km", 'kilometers');
		assert.equal(cH.getUnit("2mi"), "mi", 'miles');
		assert.equal(cH.getUnit("2kg"), "kg", 'kilograms');
		assert.equal(cH.getUnit("2lbs"), "lbs", 'pounds');
		assert.equal(cH.getUnit("2ls"), 'invalid unit', 'Invalid Unit');
	});
	test('get Return Unit', function () {
		assert.equal(cH.getReturnUnit("L"), "gal", 'liters');
		assert.equal(cH.getReturnUnit("gal"), "L", 'gallons');
		assert.equal(cH.getReturnUnit("km"), "mi", 'kilometers');
		assert.equal(cH.getReturnUnit("mi"), "km", 'miles');
		assert.equal(cH.getReturnUnit("kg"), "lbs", 'kilograms');
		assert.equal(cH.getReturnUnit("lbs"), "kg", 'pounds');
		// assert.throws(cH.getUnit.bind(null, "2ls"), "Invalid Unit");
	});
	test('spellout Unit', function () {
		assert.equal(cH.spellOutUnit("gal"), "gallons", "gallons");
		assert.equal(cH.spellOutUnit("L"), "liters", "liters");
		assert.equal(cH.spellOutUnit("mi"), "miles", "miles");
		assert.equal(cH.spellOutUnit("km"), "kilometers", "kilometers");
		assert.equal(cH.spellOutUnit("lbs"), "pounds", "pounds");
		assert.equal(cH.spellOutUnit("kg"), "kilograms", "kilograms");
		// assert.throws(cH.getUnit.bind(null, "2ls"), "Invalid Unit");
	});
	test('convert', function () {
		assert.approximately(cH.convert(2, "gal"), 7.57082, 0.000001, 'gallons');
		assert.approximately(cH.convert(7.57082, "L"), 2, 0.000001, 'liters');
		assert.approximately(cH.convert(3, "mi"), 4.82802, 0.000001, 'miles');
		assert.approximately(cH.convert(4.82802, "km"), 3, 0.000001, 'kilometers');
		assert.approximately(cH.convert(3, "lbs"), 1.36078, 0.0001, 'pounds');
		assert.approximately(cH.convert(1.36078, "kg"), 3, 0.0001, 'kilograms');
	});
	test("get string", function () {
		let initNum = 2, initUnit = "gal", returnNum = 7.57082, returnUnit = 'L'
		let string = `${initNum} gallons converts to ${returnNum} liters`;
		let obj = { initNum, initUnit, returnNum, returnUnit, string };
		const res = cH.getString(initNum, initUnit, returnNum, returnUnit);
		assert.deepEqual(res, obj, "Get String")
	})
});