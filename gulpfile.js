const gulp = require('gulp')
const gts = require('gulp-typescript')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint')

const ts = gts.createProject('tsconfig.js')
const { series } = gulp

const tEslint = () => {
    return ts.src()
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

const tClearDist = () => {
    return require('del')('dist')
}

const build = () => {
    return ts.src()
        .pipe(ts())
        .js
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
}

exports.default = series(tEslint, tClearDist, build)