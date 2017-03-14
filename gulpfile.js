////////// required ////////////
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var svgSprite = require('gulp-svg-sprite');


//////////// sass Tasks //////////////
gulp.task('style', function(){
  gulp.src('sass/style.scss')
      .pipe(sass())
      .pipe(autoprefixer(
        {
      browsers: ['last 2 versions'],
      cascade: false
    }))

      .pipe(gulp.dest('css/'))
      .pipe(reload({stream: true}));
});


////////// SVG Tasks /////////////
gulp.task('svg', function(){
  return gulp.src('./src/svg-boite/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: './',
          sprite: 'sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('./images/charte/'));
})


//////////// BROWSERSYNC Tasks //////////////
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: "./"
    }
  });
});

//////////// HTML Tasks //////////////
gulp.task('html', function(){
  gulp.src('**/*.html')
  .pipe(reload({stream:true}));
});

//////////// watch Tasks //////////////
gulp.task('watch', function(){

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('**/*.html', ['html']);
});

//////////// default Tasks //////////////
gulp.task('default', ['style', 'html', 'browser-sync', 'svg', 'watch']);
