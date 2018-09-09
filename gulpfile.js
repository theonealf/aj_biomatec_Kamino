/*
install 
1. skapa mappar 
2. kÃ¶r bower init. fyll i allt optional
3. installera foundation: bower install foundation --save -dev
4. npm init
5. npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-rename gulp-clean-css gulp-sourcemaps webpack-stream gulp-uglify gulp-concat
6. skapa gulpfile.js nedan med länkar till bower foundation
7  npm install --save-dev gulp-babel babel-preset-env gulp-babel-minify
*/

var gulpDocumentation = require('gulp-documentation');
var gulp = require('gulp'),
    sass = require('gulp-sass'),	
    autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
    minifycss = require('gulp-clean-css'),			
    webpack = require('webpack-stream'),	
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    minify = require("gulp-babel-minify"),  
	path = require('path');

	/*
	sÃ¤tter sÃ¶kvÃ¤gar till mapptrÃ¤det
	*/
	var srcPath={		
		'bower' : './bower_components',
		'scss': './_dev/devsass',	
		'publik': './public',
        'devjs':'./_dev/devjs',
        'jsbundle': './_dev/jsbundle',
        'docsrc': './_dev/devjs/jsbundle',
        'docoutput': './documentation'
	};
	
	
gulp.task('SassToCssSrc', function() {
    gulp.src(srcPath.scss +'/**/*.scss')  
        .pipe(sass({
            style: 'expanded',
            sourceComments: 'normal'			
		}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // pass the file through autoprefixer 
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(srcPath.publik +'/css/'));
		
});

gulp.task('foundationJS', function () {		
	return gulp.src([
		srcPath.bower + '/modernizr/modernizr.js'
		]
	)
	.pipe(concat('modernizr.js'))
	.pipe(gulp.dest(srcPath.publik +'/js/'));		
		
});

gulp.task('webpackjs', function () {
    return gulp.src(srcPath.devjs + '/app.js')
    .pipe(webpack(require('./config/webpack.config.js')))
    .pipe(gulp.dest(srcPath.jsbundle + '/'));
});

gulp.task('jsconcatfiles', ['webpackjs'], function () {
    return gulp.src(
            [
                
                srcPath.jsbundle + '/handelbars/handlebars.js',				
                //srcPath.jsbundle + '/autocomplete/jquery.easy-autocomplete.js',
                //srcPath.jsbundle + '/localstorage/localstorage.js',
                srcPath.jsbundle + '/jsskinbootstrap/core/popper.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/core/bootstrap-material-design.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/moment.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/bootstrap-datetimepicker.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/nouislider.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/jquery.sharrre.js',
                srcPath.jsbundle + '/jsskinbootstrap/material-kit.js',
                srcPath.jsbundle +'/kk_aj_js/kk_aj_BiomatecWebpack.1.0.js',
            ]
        )
       .pipe(sourcemaps.init())
       .pipe(concat('kk_aj_publicbundle.2.0.0.js'))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest(srcPath.publik + '/js/'));
});

gulp.task('pub_jsconcatfiles', ['webpackjs'], function () {
    return gulp.src(
            [
                
               srcPath.jsbundle + '/handelbars/handlebars.js',
                //srcPath.jsbundle + '/autocomplete/jquery.easy-autocomplete.js',
                //srcPath.jsbundle + '/localstorage/localstorage.js',
                srcPath.jsbundle + '/jsskinbootstrap/core/popper.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/core/bootstrap-material-design.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/moment.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/bootstrap-datetimepicker.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/nouislider.min.js',
                srcPath.jsbundle + '/jsskinbootstrap/plugins/jquery.sharrre.js',
                srcPath.jsbundle + '/jsskinbootstrap/material-kit.js',
                srcPath.jsbundle + '/kk_aj_js/kk_aj_BiomatecWebpack.1.0.babel.js',
            ]
        )
       //.pipe(sourcemaps.init())
       .pipe(concat('kk_aj_publicbundle.1.0.0.js'))
       //.pipe(sourcemaps.write())
       .pipe(gulp.dest(srcPath.publik + '/js/'));
});

gulp.task('jsbabel', function () {
    return gulp.src(
             srcPath.jsbundle + '/kk_aj_js/kk_aj_BiomatecWebpack.1.0.js'
        )
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rename('kk_aj_BiomatecWebpack.1.0.babel.js'))
       .pipe(gulp.dest(srcPath.jsbundle + '/kk_aj_js/'));
});

gulp.task('default',function() {
    gulp.watch('_dev/devsass/**/*.scss', ['SassToCssSrc']); 
	gulp.watch('_dev/devjs/**/*.js', ['jsconcatfiles']);       
   
});

gulp.task('jspublicera',['jsbabel','pub_jsconcatfiles'], function () {
    return gulp.src(
            srcPath.publik + '/js/kk_aj_publicbundle.js'
        )      
        .pipe(minify({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(rename('kk_aj_publicbundle.1.0.0.min.js'))
       .pipe(gulp.dest(srcPath.publik + '/js/'));
});

gulp.task('dochtml', function () {
    return gulp.src('./_dev/devjs/jsmoduler/*.js')
      .pipe(gulpDocumentation('html'))
      .pipe(gulp.dest(srcPath.docoutput));
});

