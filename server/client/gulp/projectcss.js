var gulp = require("gulp");
var concat = require("gulp-concat");
var minifyCSS = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var base64 = require("gulp-base64");
var sass = require("gulp-sass");
var watch = require("gulp-watch");

var name = "./scss/index.scss";
var outputfile = "../src/components/";

gulp.task("sass", function() {
  return gulp
    .src(name)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(outputfile));
});

gulp.task("sass:watch", function() {
  gulp.watch(name, ["sass"]);
});

gulp.task("default", ["sass", "sass:watch"]);
