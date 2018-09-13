var gulp = require("gulp");
gulp.task("autoprefixer", function() {
  var postcss = require("gulp-postcss");
  var sourcemaps = require("gulp-sourcemaps");
  var autoprefixer = require("autoprefixer");

  return gulp
    .src("../src/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("../src/css/"));
});
gulp.task("autoprefixer:watch", function() {
  gulp.watch("../src/css/*.css", ["autoprefixer"]);
});

gulp.task("default", ["autoprefixer", "autoprefixer:watch"]);
