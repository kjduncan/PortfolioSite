var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    ejs = require('gulp-ejs'),
    gutil = require('gulp-util'),
    express = require('express'),
    app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
 res.render('index',{user: "Great User",title:"homepage"});
 });

gulp.task('watch', function() {

  browserSync.init({
       server: ""
   });

  gulp.watch("./*.html").on('change', browserSync.reload);
   // Watch .scss files
  gulp.watch('./assets/sass/**/*.scss', ['styles']);

  // Watch image files
  gulp.watch('./assets/images/**/*', ['images']);

  // Watch ejs files
  gulp.watch('./templates/**/*.ejs', ['ejs']);
});


gulp.task('styles', function() {
  return sass('./assets/sass/styles.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});


gulp.task('images', function() {
  return gulp.src('./assets/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('img/'));
});

gulp.task('ejs',function(){
    return gulp.src('./templates/*.ejs')
        .pipe(ejs({}, { ext: '.html'}))
        .on('error', gutil.log)
        .pipe(gulp.dest(''));
});

gulp.task('default', ['watch', 'images', 'ejs']);
