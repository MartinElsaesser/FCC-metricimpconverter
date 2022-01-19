const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let cH = new ConvertHandler();



suite('Unit Tests', function () {
	test('whole Number', function () {
		assert.equal(cH.getNum("2L"), 2, 'Number');
	});
	test('decimal Number', function () {
		assert.equal(cH.getNum("3.5L"), 3.5, 'Float');
	});
	test('Fraction', function () {
		assert.equal(cH.getNum("9/2L"), 4.5, 'Fraction');
	});
	test('Fraction with decimal', function () {
		assert.equal(cH.getNum("8.6/2L"), 4.3, 'Fraction with decimal');
	});
	test('Error on double fraction', function () {
		assert.equal(cH.getNum("8.3/2/3L"), 'invalid number', 'Invalid Number');
	});
	test('Default to 1', function () {
		assert.equal(cH.getNum("L"), 1, 'Read empty as 1');
	});
	test('read valid input units', function () {
		assert.equal(cH.getUnit("2L"), "L", 'liters');
		assert.equal(cH.getUnit("2gal"), "gal", 'gallons');
		assert.equal(cH.getUnit("2km"), "km", 'kilometers');
		assert.equal(cH.getUnit("2mi"), "mi", 'miles');
		assert.equal(cH.getUnit("2kg"), "kg", 'kilograms');
		assert.equal(cH.getUnit("2lbs"), "lbs", 'pounds');
	});
	test('error for invalid input unit', function () {
		assert.equal(cH.getUnit("2ls"), 'invalid unit', 'Invalid Unit');
	});
	test('correct return unit', function () {
		assert.equal(cH.getReturnUnit("L"), "gal", 'liters');
		assert.equal(cH.getReturnUnit("gal"), "L", 'gallons');
		assert.equal(cH.getReturnUnit("km"), "mi", 'kilometers');
		assert.equal(cH.getReturnUnit("mi"), "km", 'miles');
		assert.equal(cH.getReturnUnit("kg"), "lbs", 'kilograms');
		assert.equal(cH.getReturnUnit("lbs"), "kg", 'pounds');
	});
	test('correct spelled out Unit', function () {
		assert.equal(cH.spellOutUnit("gal"), "gallons", "gallons");
		assert.equal(cH.spellOutUnit("L"), "liters", "liters");
		assert.equal(cH.spellOutUnit("mi"), "miles", "miles");
		assert.equal(cH.spellOutUnit("km"), "kilometers", "kilometers");
		assert.equal(cH.spellOutUnit("lbs"), "pounds", "pounds");
		assert.equal(cH.spellOutUnit("kg"), "kilograms", "kilograms");
		// assert.throws(cH.getUnit.bind(null, "2ls"), "Invalid Unit");
	});
	test('convert gal to L', function () {
		assert.approximately(cH.convert(2, "gal"), 7.57082, 0.000001, 'gallons');
	});
	test('convert L to gal', function () {
		assert.approximately(cH.convert(7.57082, "L"), 2, 0.000001, 'liters');
	});
	test('convert mi to km', function () {
		assert.approximately(cH.convert(3, "mi"), 4.82802, 0.000001, 'miles');
	});
	test('convert km to mi', function () {
		assert.approximately(cH.convert(4.82802, "km"), 3, 0.000001, 'kilometers');
	});
	test('convert lbs to kg', function () {
		assert.approximately(cH.convert(3, "lbs"), 1.36078, 0.0001, 'pounds');
	});
	test('convert kg to lbs', function () {
		assert.approximately(cH.convert(1.36078, "kg"), 3, 0.0001, 'kilograms');
	});
});