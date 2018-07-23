const gulp = require('gulp');
const WebServer = require('gulp-webserver');
const TS = require("gulp-typescript");
const FS = require("fs");
const Del = require("del");
const Path = require("path");
const runSequence = require('run-sequence');

const tsProjCache = {
    script: {
        release: { path: "./src/tsconfig-dist.json" },
        test: { path: "./src/tsconfig.json" }
    },
    util: {
        release: { path: "./util-src/tsconfig-release.json" },
        test: { path: "./util-src/tsconfig.json" },
        cleanFilter: '*/**'
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

gulp.task('build-script-release', function(done) {
    var tsproj = getTSProject("script", "release");
    if (typeof(tsproj) != "undefined") 
        return tsproj.src().pipe(tsproj()).pipe(gulp.dest(tsproj.options.outDir));
    else
        done();
});

gulp.task('build-script-test', function(done) {
    var tsproj = getTSProject("script", "test");
    if (typeof(tsproj) != "undefined") 
        return tsproj.src().pipe(tsproj()).pipe(gulp.dest(tsproj.options.outDir));
    else
        done();
});

gulp.task('build-util-release', function(done) {
    var tsproj = getTSProject("util", "release");
    if (typeof(tsproj) != "undefined") 
        return tsproj.src().pipe(tsproj()).pipe(gulp.dest(tsproj.options.outDir));
    else
        done();
});

gulp.task('build-util-test', function(done) {
    var tsproj = getTSProject("util", "test");
    if (typeof(tsproj) != "undefined") 
        return tsproj.src().pipe(tsproj()).pipe(gulp.dest(tsproj.options.outDir));
    else
        done();
});

gulp.task("clean-script", function(done) {
    var tsproj = getTSProject("script", "test");
    if (typeof(tsproj) != "undefined")
        Del(['dist/script/**', '!dist/script']).then(function(paths) {
            done();
            console.log("Deleted %s", JSON.stringify(paths));
        }, function(reason) {
            done();
            if (typeof(reason) != "undefined" && reason !== null)
                console.error("clean-dist-script failed: %s", JSON.stringify(reason));
            else
                console.error("clean-dist-script failed");
        });
    else
        done();
});

gulp.task("clean-util", function(done) {
    var tsproj = getTSProject("util", "test");
    if (typeof(tsproj) != "undefined")
        Del(['util/**', '!util', '!util/**/*.ps1', '!util/**/*.xml']).then(function(paths) {
            done();
            console.log("Deleted %s", JSON.stringify(paths));
        }, function(reason) {
            done();
            if (typeof(reason) != "undefined" && reason !== null)
                console.error("clean-dist-script failed: %s", JSON.stringify(reason));
            else
                console.error("clean-dist-script failed");
        });
    else
        done();
});

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