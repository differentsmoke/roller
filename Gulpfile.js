const childProcess = require("child_process");
const nodemon = require("gulp-nodemon");
const { watch, series, parallel } = require("gulp");

function build(done) {
    childProcess.exec("npx rollup -c", function (error) {
        if (!error) {
            console.log("UI built");
            done();
        }
    });
}

function start(done) {
    nodemon({ script: "main.js", ignore: ["svelte-app/*", "public/*"] });
    done();
}

exports.default = series(build, start, (done) => {
    watch("svelte-app/**/*", build);
    done();
});
