// kompilerar javascript och css filer innan programmet startas
// körs med 'gulp' kommandot i kommandotolken

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel");

// sass task
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass({
      indentedSyntax: false
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// babel task
gulp.task("babel", function () {
  return gulp.src("jsx/**/*.{js,jsx}")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['react'],
    }))
    .pipe(sourcemaps.write(".", { includeContent: true, debug: true }))
    .pipe(gulp.dest("./js"));
});

// Default task
gulp.task('default', ['sass', 'babel']);
