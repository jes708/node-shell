var commands = require('./commands')
// Output a prompt
// Output a prompt
process.stdout.write('prompt > ');
//
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g)
  //
  var firstCmd = cmdList[0].split(" ");
  // process.stdout.write(firstCmd.join("--"))
  var userCmd = firstCmd[0];
  var arg = firstCmd.slice(1).join(" ");
  commands[userCmd](cmdList, arg, done);
  // process.stdout.write('\nYou typed: ' + cmd);
  // process.stdout.write('\nprompt > ');

});

function done(cmdList, output) {
  if (!cmdList[1]) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  } else {
    cmdList.splice(0,1);

  var firstCmd = cmdList[0].split(" ");
  // process.stdout.write(firstCmd.join("--"))
  var userCmd = firstCmd[0];
  var arg = firstCmd.slice(1).join(" ");

    commands[userCmd](cmdList, arg, done);
  }
}