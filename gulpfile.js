var gulp = require('gulp'); // import the gulp module itself
var useref = require('gulp-useref');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var dist = {             
             path:'dist/',
             assets:'assets/',
             fonts:'fonts/',
             css: 'styles/',
             js: 'js/'
           };

gulp.task('copy-html-files', function () {
    var stream =  gulp.src(['./views/**/*.html','./views/**/*.jpg']) // stream source
        .pipe(gulp.dest('./dist/views/')); // copy to dist/views
    return stream;
});

gulp.task('css-files', function () {
    var stream = gulp.src('./index.html')
        .pipe(useref()) //take a streem from index.html comment
        .pipe(gulpif('*.css', minifyCss())) // if .css file, minify
        .pipe(gulpif('*.css', gulp.dest('./dist'))); // copy to dist
    return stream;
});

gulp.task('copy-fonts', ['clean-fonts'], function(){
    return gulp.src(['./fonts/**/*'])
    .pipe(gulp.dest(dist.path + dist.fonts));
});

gulp.task('copy-assets', ['clean-assets'], function(){
    return gulp.src(['./assets/*'])
    .pipe(gulp.dest(dist.path + dist.assets));
});

gulp.task('js-files', function () {
    var stream = gulp.src('./index.html')    
    .pipe(useref())
    .pipe(gulpif('*.js', ngAnnotate())) // ng-annotate if .js
    .pipe(gulpif('*.js', uglify())) // uglify if .js
    .pipe(gulpif('*.js', gulp.dest(dist.path))); // paste to dist
    return stream;
});

gulp.task('clean-assets', function(){
    del(dist.path + dist.assets);
});
gulp.task('clean-fonts', function(){
    del(dist.path + dist.fonts)
});
gulp.task('clean-js', function(){
    del(dist.path + dist.js)
});
gulp.task('clean-styles', function(){
    del(dist.path + dist.css)
});

gulp.task('clean', ['clean-assets','clean-fonts','clean-js','clean-styles'], () => {});
    
gulp.task('default', [], (callback) => {    
    runSequence(
        'clean', 'copy-html-files','css-files', 'copy-fonts', 'js-files', 'copy-assets'
    );
    return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});