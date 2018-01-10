const args = ["app"]
const opts = { stdio: 'inherit', cwd: 'server', shell: true }
require('child_process').spawn('node', args, opts)