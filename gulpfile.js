const gulp = require('gulp');
const WebServer = require('gulp-webserver');
const TS = require("gulp-typescript");
const FS = require("fs");
const Del = require("del");
const Path = require("path");
const runSequence = require('run-sequence');

const tsProjCache = {
    dist: {
        release: { path: "./src/tsconfig-dist.json" },
        test: { path: "./src/tsconfig.json" }
    },
    util: {
        release: { path: "./util-src/tsconfig-release.json" },
        test: { path: "./util-src/tsconfig.json" },
        cleanFilter: '*/**/*'
    }
};

function getTSProject(name, stage) {
    var group = tsProjCache[name]; 
    if (typeof(group) == "undefined")
        console.error("Property tsProj.%s not found.", name);
    else {
        var settings = group[stage];
        if (typeof(settings) == "undefined")
            console.error("Property tsProj.%s.%s not found.", name, stage);
        else {
            var tsProj = settings.tsproj;
            if (typeof(tsProj) == "undefined") {
                var path = Path.normalize(settings.path);
                try {
                    tsProj = TS.createProject(path);
                    if (typeof(tsProj) == "undefined" || tsProj === null)
                        throw new Error("TS.createProject did not return an object.");
                } catch (err) {
                    console.error("Failed to load TS project from %s: %s", JSON.stringify(path), err);
                    return;
                }
                settings.tsproj = tsProj;
            }
            return tsProj;
        }
    }
}

function cleanOutDir(name, done) {
    var tsproj = getTSProject(name, "test");
    if (typeof(tsproj) != "undefined")
        Del(Path.normalize(Path.join(tsproj.options.outDir, (typeof(tsProjCache[name].cleanFilter) == "string") ? tsProjCache[name].cleanFilter : "**/*"))).then(function(paths) {
            done();
            console.log("Deleted %s", JSON.stringify(paths));
        }, function(reason) {
            done();
            if (typeof(reason) != "undefined" && reason !== null)
                console.error("cleanOutDir(%s) failed: %s", name, JSON.stringify(reason));
            else
                console.error("cleanOutDir(%s) failed", name);
        });
    else
        done();
}

gulp.task("clean-dist-script", function(done) { cleanOutDir("dist", done); });

gulp.task("clean-util", function(done) { cleanOutDir("util", done); });

gulp.task('start-webserver', function() {
    gulp.src('dist')
        .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: true,
        port: 8085
    }));
});

gulp.task('stop-webserver', function() {
    var stream = gulp.src('dist').pipe(webserver());
    stream.emit('kill');
});