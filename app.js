const {App} = require ('@slack/bolt');
var moment = require ('moment');
moment().format();

//initializes your app with your bot token and signing secret
const app = new App ({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var cTime = new moment();
var dTime = new moment.hour(16).minute(30).second(0).millisecond(0);
var testTime = new moment.utc();
var early = dTime.diff(cTime, 'minutes');
var late = cTime.diff(dTime, 'minutes');

//beer bot with momentJS
//listen to incoming messages
app.message(':beer:', ({message, say}) => {
  if (cTime >= dTime) {
    say (`What are you waiting for <@${message.user}>? You could've been drinking for ${late} minutes already!`);
  } else {
    say (`Pump the breaks there <@${message.user}>... drink o'clock is ${early} minutes away`);
  }
});

(async () => {
  //start your APP
  await app.start(process.env.PORT || 5000);
  console.log('⚡️ Bolt app is running!;');
  console.log(cTime);
  console.log(testTime);
  console.log(dTime);
})();
