const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
	test('GET /api/convert 10L', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=10L')
			.end(function (err, res) {
				const obj = {
					"initNum": 10, "initUnit": "L", "returnNum": 2.64172, "returnUnit": "gal", "string": "10 liters converts to 2.64172 gallons"
				};
				assert.equal(res.status, 200);
				assert.deepEqual(JSON.parse(res.text), obj);
				done();
			});
	});
	test('GET /api/convert 32g', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=32g')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.text, "invalid unit");
				done();
			});
	});
	test('GET /api/convert 3/7.2/4kg', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=3/7.2/4kg')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.text, "invalid number");
				done();
			});
	});
	test('GET /api/convert 3/7.2/4kilomegagram', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=3/7.2/4kilomegagram')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.text, "invalid number and unit");
				done();
			});
	});
	test('GET /api/convert kg', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=kg')
			.end(function (err, res) {
				const obj = { "initNum": 1, "initUnit": "kg", "returnNum": 2.20462, "returnUnit": "lbs", "string": "1 kilograms converts to 2.20462 pounds" };
				assert.equal(res.status, 200);
				assert.deepEqual(JSON.parse(res.text), obj);
				done();
			});
	});
});
