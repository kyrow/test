import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const scss = gulpSass(dartSass);

export const sass = () => {
	return app.gulp.src(app.path.src.sass, { soursemaps: true })

		.pipe(app.plugins.replace(/@img\//g, '../img/photo/'))
		.pipe(app.plugins.replace(/@i\//g, '../img/icons/'))
		.pipe(app.plugins.replace(/@bg\//g, '../img/bg/'))

		.pipe(scss({
			outputStyle: 'expanded'
		}))
		.pipe(groupCssMediaQueries())
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ["last 3 versions"],
			cascade: true
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(cleanCss())
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}