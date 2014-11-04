/*global describe, it*/
"use strict";

var fs = require("fs"),
	es = require("event-stream"),
	should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
	checkFileNamingConvention = require("../");

describe("gulp-check-file-naming-convention", function () {
	it("should pass valid camelCase name files", function (done) {
		var stream = checkFileNamingConvention({
			caseName: 'camelCase'
		});

		stream.on('data', function () {});
		stream.on("end", done);

		stream.write(new gutil.File({
			path: "test/fixtures/camelCase/testSample.js",
			cwd: "test/",
			base: "test/fixtures",
		}));
		stream.write(new gutil.File({
			path: "test/fixtures/camelCase/test.js",
			cwd: "test/",
			base: "test/fixtures",
		}));
		stream.end();
	});

	it("should pass valid paramCase name files", function (done) {
		var stream = checkFileNamingConvention({
			caseName: 'paramCase'
		});

		stream.on('data', function () {});
		stream.on("end", done);

		stream.write(new gutil.File({
			path: "test/fixtures/paramCase/test-sample.js",
			cwd: "test/",
			base: "test/fixtures",
		}));
		stream.end();
	});
	it("should error invalid paramCase name files", function (done) {
		var stream = checkFileNamingConvention({
			caseName: 'paramCase'
		});

		stream.on('data', function () {});
		stream.on('error', function(err){
			should.exist(err);
			done();
		});

		stream.write(new gutil.File({
			path: "test/fixtures/paramCase/testSample.js",
			cwd: "test/",
			base: "test/fixtures",
		}));
		stream.end();
	});
	it("should error on stream", function (done) {
		var srcFile = new gutil.File({
			path: "test/fixtures/hello.txt",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.createReadStream("test/fixtures/hello.txt")
		});

		var stream = checkFileNamingConvention({
			caseName: 'paramCase'
		});

		stream.on("error", function(err) {
			should.exist(err);
			done();
		});

		stream.on("data", function (newFile) {
			newFile.contents.pipe(es.wait(function(err, data) {
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
});
