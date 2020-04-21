var gulp = require('gulp')
var gts = require('gulp-typescript')
var buffer = require('vinyl-buffer')
var sourcemaps = require('gulp-sourcemaps')
var terser = require('gulp-terser')
var eslint = require('gulp-eslint')

var ts = gts.createProject('tsconfig.json')
var { series } = gulp

var tEslint = () => {
    return ts.src()
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

var tClearDist = () => {
    return require('del')('dist')
}

var build = () => {
    return ts.src()
        .pipe(ts())
        .js
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
}

// var terser = () => {
//     return gulp.src('./dist/index.js')
//         .pipe(terser())
//         .pipe(gulp.dest('dist'))
// }

exports.default = series(tEslint, tClearDist, build)