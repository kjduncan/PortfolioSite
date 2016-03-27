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

var awspublish = require('gulp-awspublish');

gulp.task('publish', function() {

  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create({
    region: 'us-west-2',
    params: {
      Bucket: 'katelynduncan.com'
    }
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  };

  return gulp.src(['*', '*/**', '!**/*.ejs', '!*.ejs', '!**/.DS_Store', '!**/.git', '!**/.sass-cache', '!./assets/**', '!**/gulpfile.js', '!**/node_modules/**', '!**/package.json'])
     // gzip, Set Content-Encoding headers and add .gz extension
    // .pipe(awspublish.gzip({ ext: '.gz' }))

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    .pipe(publisher.sync())

     // print upload updates to console
    .pipe(awspublish.reporter());
});



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
