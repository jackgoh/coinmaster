const CoinMaster = require("./coinmaster");
const portfinder = require('portfinder');

const fs = require("fs");
const csv = require("csv-parser");
const accountFile = ".account.csv";
var myArgs = process.argv.slice(2);
let accounts = [];

const server = require('http').createServer();
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}
portfinder.getPortPromise({
  port: 3001,
  stopPort: 3099
}).then(port => {

  console.log("start socket server at port ", port)
  server.listen(port);
}).catch(err => {
  console.log("No port available for start up socker server".red);
  console.log(err)
})

if (fs.existsSync(accountFile) && myArgs.length > 0) {
  accounts = []

  fs.createReadStream(accountFile)
    .pipe(csv())
    .on('data', (data) => accounts.push(data))
    .on('end', async () => {
      console.log(accounts);
      var index = myArgs[0] || "-1";
      for (const account of accounts.filter(x => x.ID === index || index == "all")) {
        try {
          if (account.EMAIL[0] === "#" && isNaN(index)) continue;
          console.log("PLAY AS: ", account)
          var cm = new CoinMaster({
            // sycnTarget: account.SYNC_TARGET,
            userId: account.USER_ID,
            fbToken: account.FB_TOKEN,
            deviceId: account.DEVICE_ID,
            onData: (d) => {
            }
          });

          const balance = cm.play()
        } catch (err) {
          console.error(err)
        }
      }
      process.exit(0);
    });

  console.log("Multiple play use account file");
} else {
  var cm = new CoinMaster({
    onData: (d) => {
    }
  });

  const balance = cm.play();
}
