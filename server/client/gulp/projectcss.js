const gulp = require("gulp");
const concat = require("gulp-concat");
const minifyCSS = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const base64 = require("gulp-base64");
const sass = require("gulp-sass");
const watch = require("gulp-watch");

// const name = "./scss/index.scss";
const name = "./scss/*.scss";
const outputfile = "../src/style";

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
