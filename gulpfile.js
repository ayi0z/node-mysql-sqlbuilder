var gulp = require('gulp')
var gts = require('gulp-typescript')
var terser = require('gulp-terser')
var eslint = require('gulp-eslint')
var clean = require('gulp-clean')

var ts = gts.createProject('tsconfig.json')
var { series } = gulp

var lint = () => {
    return ts.src()
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

var cleandist = () => {
    return gulp
        .src('dist', { read: false, allowEmpty: true })
        .pipe(clean('dist'))
}

// var build = () => {
//     return ts.src()
//         .pipe(ts())
//         .js
//         .pipe(terser())
//         .pipe(gulp.dest('dist'))
// }

exports.default = series(lint, cleandist)