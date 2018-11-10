var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

/**
 * 1
 */
// gulp.task('main', function() {
//   var jsFilter = filter('**/*.js', {restore: true});
//   var cssFilter = filter('**/*.css', {restore: true});
//   var htmlFilter = filter(['**/*', '!**/index.html'], {restore: true});

//   return gulp.src('src/index.html')
//         .pipe(useref())
//         .pipe(jsFilter)
//         .pipe(uglify())
//         .pipe(jsFilter.restore)
//         .pipe(cssFilter)
//         .pipe(csso())
//         .pipe(cssFilter.restore)
//         .pipe(htmlFilter)
//         .pipe(rev())
//         .pipe(htmlFilter.restore)
//         .pipe(revReplace())
//         .pipe(gulp.dest('dist'));
// })
// gulp.task('image', function() {
//   return gulp.src('src/img/*.{png,jpg,gif}')
//         .pipe(gulp.dest('dist/img'))
// })
// gulp.task('default', ['main', 'image'])

/**
 * 2
 */
gulp.task('css', function() {
  return gulp.src('src/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('html', function() {
  return gulp.src(['src/**/*', '!src/*.html'])
        .pipe(rev())
        .pipe(revReplace())
        .pipe(gulp.dest('dist'))
});
gulp.task('image', function() {
  return gulp.src('src/img/*.{png,jpg,gif}')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('default', ['html', 'css', 'js']);

/**
 * 参考
 * 1.https://www.gulpjs.com.cn/docs/api/
 * 2.https://github.com/xianyulaodi/gulpUsage/blob/master/gulpfile.js
 * 3.https://www.w3ctrain.com/2015/12/22/gulp-for-beginners/
 */