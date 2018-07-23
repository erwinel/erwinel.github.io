var killRe = /^[^#?\/]*((?=\/+[^#?\/]+\/+[^#?\/])\/+[^#?\/]+)*\/+__KILL__\/*([?#]|$)/;
var testData = [
    'http://mysite/__KILL__/test',
    'http://mysite/__KILL__'
];
testData = testData.concat(testData.map(function(s) { return s + "/"; }));
testData = testData.concat(testData.map(function(s) { return s + "?myquery=__KILL__"; }));
testData = testData.concat(testData.map(function(s) { return s + "#__KILL__"; }));
testData.forEach(function(s) {
    if (killRe.test(s)) {
        console.info("yes: " + s + " (" + s.match(killRe)[0] + ")");
    }
    else
        console.info(" no: " + s);
});