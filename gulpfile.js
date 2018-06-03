"use strict";

const gulp = require('gulp');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserify = require('browserify');
const renderify = require('electron-renderify');
const vueify = require('vueify');
const sass = require('gulp-sass');

gulp.task("build", ["browserify", "styles"]);

let renderifyOpts = {
    windowRequire: ["electron-store", "yerbamate"] // Required while electron store & yerbamate are used in the rederer process
};

gulp.task("browserify", () => {
    return browserify(["app.js", "fontawesome-all-5.0.13.min.js"], {
        detectGlobals: false
    })
        .transform(vueify)
        .transform(renderify, renderifyOpts)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(gulp.dest("resources/bundle"));
});

gulp.task("styles", () => {
    return gulp.src("app/styles/styles.scss")
        .pipe(sass({
            includePaths: ['node_modules'],
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest("resources/bundle"));
});
