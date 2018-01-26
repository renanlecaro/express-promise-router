var ts = require('typescript');
var fs = require('fs');
var spawn = require('child_process').spawn
var dirname = require('path').dirname

function spawnString(source, dir) {
    return spawn('node', ['-e', source], {
        cwd: dir,
    });
}

// path has to be fully qualified
exports.spawnTranspiledModule = function spawnTranspiledModule(path) {
    var content = fs.readFileSync(path, 'utf-8');

    var compilerOptions = {
        module: ts.ModuleKind.CommonJS
    };

    var transpiled = ts.transpile(content, compilerOptions);

    return spawnString(transpiled, dirname(path));
}
