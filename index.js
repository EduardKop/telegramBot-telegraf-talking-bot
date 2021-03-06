const {
  Telegraf
} = require('telegraf');
const config = require('./config');
const randomPhoto = 'https://picsum.photos/200/300/?random';
const returnArray = [];
const replies = require('./replies');

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
  nameBotVadimAnswer = ["да,єто я Вадим)", "меня так зовут, что хотел?)", "да, слушаю, как дела ?)"],
  questionUserRefEx = ["хороший вопрос", "что за вопросы?", "кажеться у меня есть ответ", "раньше я знал ответ", "задай мне позже этот вопрос"],
  greetingsUser = ["Привет", "Здаров", "как дела?", "пріветулі", "привіт", "здарова", "хай"],
  hystoryStart = ["вот история", "слушайте историю", "начнем с ..", "ладно, розкажу) "];
//triggers for bot

const greetingsUserRefEx = /(?:привет|(?:здравствуй(?:те)?)|(?:Здаров(?:а)?)|(?:привіт?)|(?:как дела?)|(?:як дела?)|(?:доброго дня)|(?:йо(?:у)?)|(?:hi)|(?:приветули)|(?:хай))/i,
  nameBotVadim = /(?:Вадим|(?:Вадюха?)|(?:Вадик?)|(?:Водим?)|(?:@vaduha_bot?)|(?:Вадик)|(?:Вадім))/i,
  botVadim = /(?:бот|(?:боти?)|(?:ботів?)|(?:ботами?)|(?:людина?)|(?:человек?))/i,
  randomStringPhoto = /(?:фото|(?:ого?)|(?:картина?)|(?:картинка?)|(?:красота?))/i,
  laughUser = /(?:аха|(?:ахах?)|(?:ахаха?)|(?:ахахаха?)|(?:ахахахаха?)|(?:ахахахахахаха?))/i;

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


//тригеры на которые переверяем
let triggerHello = ["hi", "hello", "wats up"];
let triggerSwear = ["fuck", "cunt", "bitch"];
//тригеры которые возвращаем
let returnTrigerHello = ["yep", "hi", "hi bro"];
let returnTriggerSwear = ["no", "shut up", "pls,no"];


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
    returnArray.forEach((e) => {
      triggerHello.forEach((i) => {
        if (e == i) {
          ctx.reply(randomGreetings(returnTrigerHello));
          returnArray.length = 0;
        }
      })
      triggerSwear.forEach((y) => {
        if (e == y) {
          ctx.reply(randomGreetings(returnTriggerSwear));
          returnArray.length = 0;
        }
      })
    })
    if (returnArray.length % activityNumber == 0) {
      ctx.reply(randomGreetings(returnArray))
    } else if (returnArray.length >= 10000) {
      returnArray.length = 0;
    }
  }
});

const getReplyToMessageId = ctx => (
  ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null
)
const sendReply = (ctx, reply) => {
  let replyMethod = {
    sticker: ctx.replyWithSticker,
    text: ctx.reply,
    gif: ctx.replyWithDocument
  } [reply.type];
  replyMethod(reply.id, {
    reply_to_message_id: getReplyToMessageId(ctx)
  })
};
bot.command('list', ctx => {
  ctx.reply(
    'Available triggers:\n\n' +
    Object.keys(replies).join('\n')
  )
});
bot.on('text', ctx => {
  let cmd = ctx.message.text.toLowerCase();
  if (cmd in replies)
    sendReply(ctx, replies[cmd]);
});
bot.hears(/поверни (.+)/, ({
  match,
  reply
}) => reply(match[1].split('').reverse().join('')));

bot.hears("?", async ctx => {
  await
  ctx.reply(randomGreetings(questionUserRefEx));
});

bot.hears(laughUser, async ctx => {
  await
  ctx.reply("ахахах,смешно");
});



//storytelling
let hystoryString = '';

function hystory(arr) {
  arr.sort(() => Math.random() - 0.5);
  arr.forEach((e) => {
    hystoryString = `${hystoryString} ${e}`;
    return hystoryString
  });
  if (hystoryString) {
    let sliced = hystoryString.slice(0, 700);
    if (sliced.length < hystoryString.length) {
      return (sliced += '...');
    } else {
      return (`${randomGreetings(hystoryStart)} ${sliced}`)
    }
  }
}
bot.hears("история", async ctx => {
  await
  ctx.reply(hystory(returnArray));
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