const { Telegraf} = require('telegraf');
const config = require('./config');
const randomPhoto = 'https://picsum.photos/200/300/?random';
const returnArray = [];


const bot = new Telegraf(config.telegraf_token, {
  username: '@vaduha_bot'
});

bot.catch((err, ctx) => {
  console.log(`Ooops, error for ${ctx.updateType}`, err);
});
bot.start((ctx) => {
  throw new Error('Example error');
});

function randomGreetings(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}


//bot responses
const greetingsBot = ["Привет", "Как дела ?", "how are you", 'hi', 'hello', 'Доброго дня'],
      botVadimSaysBot = ["я не бот )", "кто тут бот?", "почему меня называют ботом", "мне обидно"],
      stickerUserRefEx = ["класный стикер", "ахахаха", "круто", "давай еще)"],
      nameBotVadimAnswer = ["да,єто я Вадим)", "меня так зовут, что хотел?)", "да, слушаю, как дела ?)"];

//triggers for bot

const greetingsUserRefEx = /(?:привет|(?:здравствуй(?:те)?)|(?:Здаров(?:а)?)|(?:привіт?)|(?:как дела?)|(?:як дела?)|(?:доброго дня)|(?:йо(?:у)?)|(?:hi)|(?:приветули)|(?:хай))/i,
      nameBotVadim = /(?:Вадим|(?:Вадюха?)|(?:Вадик?)|(?:Водим?)|(?:@vaduha_bot?)|(?:Вадик)|(?:Вадім))/i,
      botVadim = /(?:бот|(?:боти?)|(?:ботів?)|(?:ботами?)|(?:людина?)|(?:человек?))/i,
      greetingsUser = ["Привет", "Здаров", "как дела?", "пріветулі", "привіт", "здарова", "хай"],
      randomStringPhoto = /(?:фото|(?:ого?)|(?:картина?)|(?:картинка?)|(?:красота?))/i;
//random photo
bot.hears(randomStringPhoto, ({ 
  replyWithPhoto
}) => replyWithPhoto({
  url: randomPhoto
}));
bot.hears('+', ({
  replyWithPhoto
}) => replyWithPhoto({
  url: randomPhoto
}));

//addressing a bot by nickname 
greetingsUser.forEach((e) => { 
  let botNameGreetings = "@vaduha_bot " + e || "@vaduha_bot";
  bot.hears(botNameGreetings, async ctx => {
    await ctx.reply(randomGreetings(greetingsBot));
  });
});

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



bot.start((ctx) => ctx.reply('Привет, меня зовут Вадим'));
bot.help((ctx) => ctx.reply('я могу общаться, просто пиши мне побольше)'));
bot.on('sticker', (ctx) => ctx.reply(randomGreetings(stickerUserRefEx)));
bot.hears(nameBotVadim, (ctx) => ctx.reply(randomGreetings(nameBotVadimAnswer)));
bot.hears(botVadim, async ctx => {
  await
  ctx.reply(randomGreetings(botVadimSaysBot));
});
bot.hears(greetingsUserRefEx, async ctx => {
  await
  ctx.reply(randomGreetings(greetingsBot));
});
bot.hears(greetingsUserRefEx + nameBotVadim, async ctx => {
  await
  ctx.reply(randomGreetings(greetingsBot));
});


// bot.hears('гиф', reply('https://www.youtube.com/watch?v=iZpjhdt66vs'))

bot.startPolling();