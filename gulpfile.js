const gulp = require('gulp');
const WebServer = require('gulp-webserver');
const TS = require("gulp-typescript");
const FS = require("fs");
const Del = require("del");
const Path = require("path");
const runSequence = require('run-sequence');
const http = require('http');

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

gulp.task('update-lib', ['update-dist-popper', 'update-dist-jquery', 'update-dist-bootstrap', 'update-dist-bootstrap-table', 'update-dist-angular']);

gulp.task('update-dist-angular', function(done) {
    return gulp.src([
        'node_modules/angular/**/*', '!node_modules/angular/**/*.gzip', '!node_modules/angular/**/*.json', '!node_modules/angular/**/*.md', '!node_modules/angular/**/index.js'
    ]).pipe(gulp.dest('dist/lib/angular'));
});

gulp.task('update-dist-popper', function(done) {
    return gulp.src('node_modules/popper.js/dist/**/*').pipe(gulp.dest('dist/lib/popper.js'));
});

gulp.task('update-dist-jquery', function(done) {
    return gulp.src('node_modules/jquery/dist/**/*').pipe(gulp.dest('dist/lib/jquery'));
});

gulp.task('update-dist-bootstrap', function(done) {
    return gulp.src('node_modules/bootstrap/dist/**/*').pipe(gulp.dest('dist/lib/bootstrap'));
});

gulp.task('update-dist-bootstrap-table', function(done) {
    return gulp.src('node_modules/bootstrap-table/dist/**/*').pipe(gulp.dest('dist/lib/bootstrap-table'));
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

gulp.task("clean-lib", function(done) {
    Del(['dist/lib/**', '!dist/lib']).then(function(paths) {
        done();
        console.log("Deleted %s", JSON.stringify(paths));
    }, function(reason) {
        done();
        if (typeof(reason) != "undefined" && reason !== null)
            console.error("clean-dist-script failed: %s", JSON.stringify(reason));
        else
            console.error("clean-dist-script failed");
    });
});

gulp.task("clean-script", function(done) {
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

gulp.task('start-webserver', function(done) {
    var mapFileRe = /\.map$/i;
    var killRe = /^[^#?\/]*((?=\/+[^#?\/]+\/+[^#?\/])\/+[^#?\/]+)*\/+__KILL__\/*([?#]|$)/;
    var stream = gulp.src('dist');
    stream.pipe(WebServer({
        livereload: true,
        directoryListing: true,
        open: false,
        port: 8085,
        middleware: function(req, res, next) {
            console.log(req.url);
            if (killRe.test(req.url)) {
                done();
                res.end();
                stream.emit('kill');
            }
            next();
        }
    }));
});

gulp.task('stop-webserver', function(done) {
    return http.request('http://localhost:8085/__KILL__').end(done);
});