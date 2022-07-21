// Object to capture process exits and call app specific cleanup function

exports.Cleanup = function Cleanup(client) {
  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    client.end();
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    client.end();
    process.exit(99);
  });
};