var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
})
gulp.task('watch', gulp.series('sass'))
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 5050,
            open: true,
            livereload: true,
            proxies: [{
                source: '/api/add',
                target: "http://localhost:3000/api/add"
            }, {
                source: '/api/findd',
                target: "http://localhost:3000/api/find"
            }, {
                source: '/api/find',
                target: "http://localhost:3000/api/find"
            }, ]

        }))
})
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'))