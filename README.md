<img src="img\Telegram_Messenger.png" width="70px" />
# Telegram Bot TelegrafJS 
a bot for communication, copies sms of channel users, sends text, video, photos, links and more by triggers, updates will be

## Introduction  
the earliest stage of the bot, beta version, there will be updates 


##Usage
we return randomly SMS users<br>*in the future there will be an update with smart sampling*
```javascript
const returnArray = [];

bot.use(async (ctx, next) => { 
  await next();
  if (ctx.message.text !== undefined) {
    returnArray.push(ctx.message.text)
  if (returnArray.length % activityNumber == 0) {
      ctx.reply(randomGreetings(returnArray))
    }
  else if (returnArray.length >= 10000) {
      returnArray.length = 0;
    }
  }
});
```


we control the activity so that the bot writes often or rarely
```javascript
let activityNumber = 5,
    activityNumberPercent = 100;
    bot.hears("увеличь активность", ctx => {
      activityNumber = activityNumber - 1;
      activityNumberPercent = activityNumberPercent + 20
      ctx.reply(`я буду писать больше, спасибо ${activityNumberPercent} %`);
    });
    bot.hears("уменьши активность", ctx => {
      activityNumber = activityNumber + 3;
      activityNumberPercent = activityNumberPercent - 20;
      ctx.reply(`я буду меньше писать, спасибо ${activityNumberPercent} %`);
    
    });
    bot.hears("какая активность?", ctx => {
      ctx.reply(`моя активность ${activityNumberPercent}`);
    });

```

##Contact me

You can contact me [Telegram](https://telegram.me/Eduard_Kop)