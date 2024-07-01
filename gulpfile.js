// Основной модуль
import gulp from "gulp";

// Импорт модулей
import { path } from "./gulp/config/path.js";

// Импорт Плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
	path: path,
	gulp: gulp,
	plugins: plugins
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { sass } from "./gulp/tasks/sass.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { ttfToWoff, otfToTtf } from "./gulp/tasks/fonts.js";

// Наблюдатель за изменениями
function watcher() {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.sass, sass)
	gulp.watch(path.watch.js, js)
	gulp.watch(path.watch.images, images)
}


const fonts = gulp.series(otfToTtf, ttfToWoff);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, sass, js, images));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// Выполнение сценария по умолчанию
gulp.task('default', dev);