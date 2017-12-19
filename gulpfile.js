"use strict";

const gulp = require('gulp');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserify = require('browserify');
const renderify = require('electron-renderify');
const vueify = require('vueify');

gulp.task("build", ["browserify"]);

let renderifyOpts = {
    windowRequire: ["electron-store", "yerbamate"] // Required while electron store & yerbamate are used in the rederer process
};

gulp.task("browserify", () => {

    return browserify("app.js", {
        detectGlobals: false
    })
        .transform(vueify)
        .transform(renderify, renderifyOpts)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(gulp.dest("resources/bundle"));
});
