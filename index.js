var through = require("through2"),
	gutil = require("gulp-util"),
	Path = require("path"),
	changeCase = require("change-case"),
	colors = require("colors");

module.exports = function (options) {
	"use strict";
	var out = [];
	// if necessary check for required options(s), e.g. options hash, etc.
	if (!options || !changeCase[options.caseName]) {
		throw new gutil.PluginError("gulp-check-file-naming-convention", "No options supplied");
	}

	// parse src path
	function parsePath(path) {
		var extname = Path.extname(path);
		return {
			dirname: Path.dirname(path),
			basename: Path.basename(path, extname),
			extname: extname
		};
	}

	// see "Writing a plugin"
	// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
	function checkFileNamingConvention(file, enc, callback) {
		/*jshint validthis:true*/
		if (file.isStream()) {

			// http://nodejs.org/api/stream.html
			// http://nodejs.org/api/child_process.html
			// https://github.com/dominictarr/event-stream

			// accepting streams is optional
			this.emit("error",
				new gutil.PluginError("gulp-check-file-naming-convention", "Stream content is not supported"));
			return callback();
		}

		try {
			var parsedPath = parsePath(file.path);
			var expect = changeCase[options.caseName](parsedPath.basename);
			if(parsedPath.basename !== expect) {
				out.push('Invalid file name at ' + colors.red(file.path) + ' :\n > ' + colors.green(expect + parsedPath.extname) + ' is valid.');
			}
		} catch(err) {
			out.push(err.message.replace('null:', file.relative + ':'));
		}

		return callback();
	}

	return through.obj(checkFileNamingConvention, function(callback) {
		if(out.length > 0) {
			this.emit('error', new gutil.PluginError('gulp-check-file-naming-convention', out.join('\n\n'), {
				showStack: false
			}));
		}
		callback();
	});
};
