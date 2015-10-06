import fs from "fs";
import gulp from "gulp";
import gutil from "gulp-util";
import jade from "gulp-jade";
import zip from "gulp-zip";
import rename from "gulp-rename";
import eslint from "gulp-eslint";

import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import devConfig from "./webpack/dev.config";
import prodConfig from "./webpack/prod.config";

import {settings} from "./chrome/app/settings"

const PORT = 3000;
const DEV_FOLDER = "./dev";
const PROD_FOLDER = "./build";
const RELEASE_FOLDER = "./dist"

gulp.task("replace-webpack-code", () => {
  const replaceTasks = [ {
    from: "./webpack/replace/JsonpMainTemplate.runtime.js",
    to: "./node_modules/webpack/lib/JsonpMainTemplate.runtime.js"
  }, {
    from: "./webpack/replace/log-apply-result.js",
    to: "./node_modules/webpack/hot/log-apply-result.js"
  } ];
  replaceTasks.forEach(task => fs.writeFileSync(task.to, fs.readFileSync(task.from)));
});

gulp.task("webpack-dev-server", () => {
  let myConfig = Object.create(devConfig);
  new WebpackDevServer(webpack(myConfig), {
    contentBase: `https://localhost:${PORT}`,
    publicPath: myConfig.output.publicPath,
    stats: {colors: true},
    hot: true,
    historyApiFallback: true,
    https: true
  })
  .listen(PORT, "localhost", (err) => {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    } else {
      gutil.log("[webpack-dev-server]", `listening at port ${PORT}`);
    }
  });
});

gulp.task("views:dev", () => {
  gulp.src("./chrome/views/*.jade")
  .pipe(jade({
    locals: { env: "dev" , settings: settings }
  }))
  .pipe(gulp.dest(DEV_FOLDER));
});

gulp.task("copy:dev", () => {
  gulp.src("./chrome/manifest.dev.json")
  .pipe(rename("manifest.json"))
  .pipe(gulp.dest(DEV_FOLDER));

  gulp.src("./chrome/assets/**/*")
  .pipe(gulp.dest(DEV_FOLDER));
});

gulp.task("webpack:build", (callback) => {
  let myConfig = Object.create(prodConfig);
  webpack(myConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({ colors: true }));
    callback();
  });

});

gulp.task("views:prod", () => {
  gulp.src("./chrome/views/*.jade")
  .pipe(jade({
    locals: { env: "prod", settings: settings.prod }
  }))
  .pipe(gulp.dest(PROD_FOLDER));
});

gulp.task("copy:prod", () => {
  gulp.src("./chrome/manifest.prod.json")
  .pipe(rename("manifest.json"))
  .pipe(gulp.dest(PROD_FOLDER));

  gulp.src("./chrome/assets/**/*")
  .pipe(gulp.dest(PROD_FOLDER));
});

gulp.task("zip:compress", () => {
  let manifest = require(`${PROD_FOLDER}/manifest.json`);
  gulp.src(`${PROD_FOLDER}/**/*`)
  .pipe(zip(`${RELEASE_FOLDER}/battle-extension-${manifest.version}.zip`))
  .pipe(gulp.dest("."));
});

gulp.task("eslint", () => {
  return gulp.src(["**/*.js", "!node_modules/**/*", "!backend/**/*"])
  .pipe(eslint({useEslintrc: true}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});


gulp.task("default", ["replace-webpack-code", "webpack-dev-server", "views:dev", "copy:dev"]);
gulp.task("build", ["replace-webpack-code", "webpack:build", "views:prod", "copy:prod"]);
gulp.task("compress", ["zip:compress"]);
