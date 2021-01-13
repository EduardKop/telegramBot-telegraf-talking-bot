<img src="img\Telegram_Messenger.png" width="70px" />

# Telegram Bot TelegrafJS

a bot for communication, copies sms of channel users, sends text, video, photos, links and more by triggers, updates will be

## Introduction

the earliest stage of the bot, beta version, there will be updates

## Usage

we return randomly SMS users<br>_in the future there will be an update with smart sampling_

```javascript
//тригеры на которые переверяем
let triggerHello = ["hi", "hello", "wats up"];
let triggerSwear = ["fuck", "cunt", "bitch"];
//тригеры которые возвращаем
let returnTrigerHello = ["yep", "hi", "hi bro"];
let returnTriggerSwear = ["no", "shut up", "pls,no"];

bot.use(async (ctx, next) => {
  await next();
  if (ctx.message.text !== undefined) {
    returnArray.push(ctx.message.text);
    returnArray.forEach((e) => {
      triggerHello.forEach((i) => {
        if (e == i) {
          ctx.reply(randomGreetings(returnTrigerHello));
          returnArray.length = 0;
        }
      });
      triggerSwear.forEach((y) => {
        if (e == y) {
          ctx.reply(randomGreetings(returnTriggerSwear));
          returnArray.length = 0;
        }
      });
    });
    if (returnArray.length % activityNumber == 0) {
      ctx.reply(randomGreetings(returnArray));
    } else if (returnArray.length >= 5000) {
      returnArray.length = 0;
    }
  }
});
```

we control the activity so that the bot writes often or rarely

```javascript
let activityNumber = 5,
  activityNumberPercent = 100;
bot.hears("увеличь активность", (ctx) => {
  activityNumber = activityNumber - 1;
  activityNumberPercent = activityNumberPercent + 20;
  ctx.reply(`я буду писать больше, спасибо ${activityNumberPercent} %`);
});
bot.hears("уменьши активность", (ctx) => {
  activityNumber = activityNumber + 3;
  activityNumberPercent = activityNumberPercent - 20;
  ctx.reply(`я буду меньше писать, спасибо ${activityNumberPercent} %`);
});
bot.hears("какая активность?", (ctx) => {
  ctx.reply(`моя активность ${activityNumberPercent}`);
});
```

## Contact me

You can contact me [Telegram](https://telegram.me/Eduard_Kop)
