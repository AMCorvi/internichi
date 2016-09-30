//
// ─── DEPENDENCIES ───────────────────────────────────────────────────────────────
//

    
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

// Declare and set variable to take it easy on the typing. 
        // This comment not withstanding

var env,
    outputDir,
    jsSources,
    htmlSources,
    imageDest,
    imageSources,
    sassSources, 
    sassStyles,
    cssDest;


env = process.env.NODE_ENV || 'development'

if (env == 'development' ) {
    outputDir = 'build/dev/';
    sassStyles = 'expanded';
    cssDest = outputDir + '/css';
    imageDest = outputDir + 'images';
} else {
    outputDir = 'build/prod/';
    sassStyles = 'compressed';
    cssDest = outputDir + '/css';
    imageDest = outputDir + 'images';
};

jsSources = ['./src/scripts/*js'];
htmlSources = ['./src/component/views/*.html'];
sassSources = ['./src/sass/*.scss'];
imageSources = './src/images/*';




//
// ─── CONFIGURATION ──────────────────────────────────────────────────────────────
//


gulp.task('pic-min', () =>
    gulp.src(imageSources)
        .pipe(imagemin())
        .pipe(gulp.dest(imageDest))
);
 
gulp.task('sass', function () {
  return gulp.src(sassSources)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest))
    .pipe(connect.reload());

});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
  
});

gulp.task('reload', function(){
   gulp.src(outputDir + 'index.html')
   .pipe(connect.reload())
});


 
gulp.task('watch', function() {
 
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('./build/*/*.html', ['reload']);
  gulp.watch(sassSources, ['sass']);
});

gulp.task('default', ['connect', 'pic-min', 'sass','watch'])