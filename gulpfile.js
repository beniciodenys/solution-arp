let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function(){
    del.sync('dist')
});

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')   
    .pipe(sass({outputStyle: 'compressed'}))   // к файлам применятются задачи указанные в данном плагине << gulp-sas
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))             // получим style.min.css << gulp-rename
    .pipe(gulp.dest('app/css'))                // нужно указать, чтобы полученные файлы переходили в папку css
    .pipe(browserSync.reload({stream: true}))  // live reload   << browser-sync
});

gulp.task('css', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css'
        // 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&display=swap'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true})) 
});

gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true})) 
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true})) 
});

gulp.task('script', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true})) 
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('export', function(){
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'))

        let buildCss = gulp.src('app/**/*.css')
        .pipe(gulp.dest('dist/css'))

        let buildJs = gulp.src('app/**/*.js')
        .pipe(gulp.dest('dist/js'))

        let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))

        let buildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'))