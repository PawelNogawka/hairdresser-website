const { src, dest, series, parallel, watch } = require("gulp");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const sass = require("gulp-sass")(require("sass"));

function sassCompiler(done) {
  src("./src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(dest("./dist/css"));
  done();
}
function javaScript(done) {
  src("./src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist/js"));
  done();
}

function convertImages(done) {
  src("src/img/*").pipe(imagemin()).pipe(dest("dist/images"));
  done();
}
function startBrowserSync(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  done();
}

function watchFoChanges(done) {
  watch("./*.html").on("change", reload);
  watch(
    ["./src/sass/**/*.scss", "./src/js/**/*.js"],
    parallel(sassCompiler, javaScript)
  ).on("change", reload);
  watch("src/img/*", convertImages).on("change", reload);
  done();
}

const mainFuctions = parallel(sassCompiler, javaScript, convertImages);

exports.default = series(mainFuctions, startBrowserSync, watchFoChanges);
