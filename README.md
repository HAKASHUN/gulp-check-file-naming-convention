(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-check-file-naming-convention
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> check-file-naming-convention plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-check-file-naming-convention` as a development dependency:

```shell
npm install --save-dev gulp-check-file-naming-convention
```

Then, add it to your `gulpfile.js`:

```javascript
var check-file-naming-convention = require("gulp-check-file-naming-convention");

gulp.src("./src/*.ext")
	.pipe(check-file-naming-convention({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### check-file-naming-convention(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-check-file-naming-convention
[npm-image]: https://badge.fury.io/js/gulp-check-file-naming-convention.png

[travis-url]: http://travis-ci.org/HAKASHUN/gulp-check-file-naming-convention
[travis-image]: https://secure.travis-ci.org/HAKASHUN/gulp-check-file-naming-convention.png?branch=master

[coveralls-url]: https://coveralls.io/r/HAKASHUN/gulp-check-file-naming-convention
[coveralls-image]: https://coveralls.io/repos/HAKASHUN/gulp-check-file-naming-convention/badge.png

[depstat-url]: https://david-dm.org/HAKASHUN/gulp-check-file-naming-convention
[depstat-image]: https://david-dm.org/HAKASHUN/gulp-check-file-naming-convention.png