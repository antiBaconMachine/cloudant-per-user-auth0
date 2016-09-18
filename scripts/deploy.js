require('shelljs/global');
var path = require('path');

const isWin = process.platform === 'win32';
const cmd = (isWin ? 'start ' : '') + path.join('scripts', isWin ? 'deploy.bat' : 'deploy.sh');

exec(cmd, function(code, stdout, stderr) {
  if (code) { console.log('Exit code: ', code); }

  if (stdout) { console.log('Output: ', stdout); }

  if (stderr) { console.log('Error: ', stderr); }
});
