require('dotenv').config();
const {
    Telegraf
} = require('telegraf')
const {
    Extra,
    Router,
    Markup
} = Telegraf;

const axios = require('axios');
const bot = new Telegraf(process.env.BOT_TOKEN)

// let searchedTeam = '';

//aa

bot.start((ctx) => ctx.reply('Выберите команду'))

bot.hears(/^[a-zA-Z ]*$/i, async (ctx) => {

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
        return time;
    }

    // console.log(ctx.message.text)
    try {
        let searchedTeam = ctx.message.text;

        let options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
            params: {
                search: searchedTeam
            },
            headers: {
                'x-rapidapi-key': 'eca1b3c5c3msh10fc18c2dd35a03p19ffd0jsnce3397521988',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        };
        let request = await axios.request(options)
        //get Team ID
        let arrReq = request.data.response;
        let teamId = arrReq[0].team.id;
        let teamName = arrReq[0].team.name;
        console.log(arrReq)

        arrReq.forEach(element => {
            ctx.reply(element.team.name)
        });

        console.log(teamName, teamId)

        //get Fixture ID
        options.url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';
        options.params = {
            team: teamId,
            next: '3'
        };
        fixtureRequest = await axios.request(options);
        console.log(fixtureRequest.data.response)
        let fixture1 = fixtureRequest.data.response[0].fixture.id;
        let fixture1Timestamp = fixtureRequest.data.response[0].fixture.timestamp;
        let fixture2 = fixtureRequest.data.response[1].fixture.id;
        let fixture2Timestamp = fixtureRequest.data.response[1].fixture.timestamp;
        let fixture3 = fixtureRequest.data.response[2].fixture.id;
        let fixture3Timestamp = fixtureRequest.data.response[2].fixture.timestamp;


        let h2h = `1. ${fixtureRequest.data.response[0].teams.home.name} - ${fixtureRequest.data.response[0].teams.away.name}
        data: ${timeConverter(fixture1Timestamp)}
        2. ${fixtureRequest.data.response[1].teams.home.name} - ${fixtureRequest.data.response[1].teams.away.name}
        data: ${timeConverter(fixture2Timestamp)}
        3. ${fixtureRequest.data.response[2].teams.home.name} - ${fixtureRequest.data.response[2].teams.away.name}
        data: ${timeConverter(fixture3Timestamp)}`;
        ctx.reply(h2h);

        //get Predicitons

        options.url = 'https://api-football-v1.p.rapidapi.com/v3/predictions';
        options.params = {
            fixture: fixture1
        };
        predicitonsRequest = await axios.request(options);
        console.log(predicitonsRequest.data.response[0].predictions);
        console.log(predicitonsRequest.data.response[0].teams);
        let predictionData = predicitonsRequest.data.response[0].predictions.advice;
        ctx.reply(predictionData);

        // ctx.reply(arrReq[0])
        // console.log(arrReq)
        // const regExp = /\su\d+/i;
        // let teamsName = []
        // arrReq.forEach(el => {
        //     teamsName.push(el.team.name);
        // });
        // let filteredArr = teamsName.filter(el => {
        //     if (el.match(regExp)) {
        //         return false;
        //     } else {
        //         return el;
        //     }
        // })
        // console.log(teamsName);
        // console.log(filteredArr);
        // keyboard
        // ctx.telegram.sendMessage(ctx.chat.id, 'Team Name', {
        //     reply_markup: {
        //         inline_keyboard:
        //             // тут возможно "[]"
        //             [
        //                 filteredArr.map((el, i) => {
        //                     [{
        //                         text: el,
        //                         callback_data: String(i)
        //                     }]
        //                 })
        //             ]

        //         // [
        //         //     [{
        //         //         text: filteredArr[0],
        //         //         callback_data: String(filteredArr[0])
        //         //     }],
        //         //     [{
        //         //         text: filteredArr[1],
        //         //         callback_data: String(filteredArr[1])
        //         //     }]
        //         //     // а тут ] закрыть
        //         // ]

        //     }
        // })
    } catch (err) {
        return ctx.reply(err);
    }
});


bot.command('but', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'buttons', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'button 112312312312 asdpk asjdlaskdj',
                    callback_data: 'but1'
                }],
                [{
                    text: 'button 2',
                    callback_data: 'but2'
                }]
            ]
        }
    })
})

bot.on('sticker', (ctx) => ctx.reply('👍'));

// const createBut = () => {
//     let keyboardArr = Markup.inlineKeyboard([]);
//     for (let i = 0; i < 4; i++) {
//         Markup.inlineKeyboard([
//             Markup.callbackButton(`knopa ${i+1}`, `${i}`),
//         ]).extra();
//     }
//     keyboardArr()
//     return keyboardArr.extra();
// }

// const chooseLigue = createBut();

const pizda = () => {
    let huyec = Markup.inlineKeyboard([
        [
            Markup.callbackButton(`knopa huy`, `nax`),
            Markup.callbackButton(`knopa pox`, `nadddx`),
        ],
        [
            Markup.callbackButton(`knopa axaxaxaxax`, `sss`)
        ]
    ]);
    // console.log(huyec)
    console.log(Markup.inlineKeyboard)
    return huyec.extra();
}

// const buttons = ['low', 'middle', 'high'];

// const inlineKeyboard = Markup
//     .inlineKeyboard(
//         buttons.map((button) => {
//             Markup.callbackButton(button, button);
//         })
//     )
//     .resize()
//     .extra();
// return inlineKeyboard;

bot.command('pizda', (ctx) => ctx.reply(
    'Like?',
    pizda()));

bot.launch();




// bot.action('like', (ctx) => ctx.reply('🎉 Awesome! 🎉'));
// bot.action('dislike', (ctx) => ctx.reply('okey'));

// bot.hears('ding', (ctx) => {
//     return ctx.reply('dong');
// });

// bot.hears('all', async (ctx) => {
//     clientAll = ctx.message.text;
//     try {
//         let currentObj = await axios.get('https://api.kuna.io/v3/currencies')
//         const coin = currentObj.data.forEach(data => {
//             console.log(data.code);
//             return ctx.reply(data.code);
//         });
//         // if (!foundCur) {
//         //     return ctx.reply('ta huy tam');
//         // }

//     } catch (err) {
//         return ctx.reply(err);
//     }
//     // return ctx.reply()
// })

// bot.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log('Response time: %sms', ms)
// })

// bot.on('text', async (ctx) => {
//     try {
//         const formatData = `Kuku FormData`;
//         ctx.reply(formatData);
//     } catch {
//         ctx.reply('Ошибка, такой страны не существует, посмотрите /help.');
//     }
// });

// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.command('custom', ({
//     reply
// }) => {
//     return reply('Custom buttons keyboard', Markup
//         .keyboard([
//             ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
//             ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
//             ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
//         ])
//         .oneTime()
//         .resize()
//         .extra()
//     )
// })



// buttons 

// const Telegraf = require('telegraf')
// const Extra = require('telegraf/extra')
// const Markup = require('telegraf/markup')

// const bot = new Telegraf(process.env.BOT_TOKEN)

// bot.use(Telegraf.log())

// bot.command('onetime', ({
//         reply
//     }) =>
//     reply('One time keyboard', Markup
//         .keyboard(['/simple', '/inline', '/pyramid'])
//         .oneTime()
//         .resize()
//         .extra()
//     )
// )



// bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
// bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))

// bot.command('special', (ctx) => {
//     return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
//         return markup.resize()
//             .keyboard([
//                 markup.contactRequestButton('Send contact'),
//                 markup.locationRequestButton('Send location')
//             ])
//     }))
// })

// bot.command('pyramid', (ctx) => {
//     return ctx.reply('Keyboard wrap', Extra.markup(
//         Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//             wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//         })
//     ))
// })

// bot.command('simple', (ctx) => {
//     return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
//         Markup.keyboard(['Coke', 'Pepsi'])
//     ))
// })

// bot.command('inline', (ctx) => {
//     return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//         m.inlineKeyboard([
//             m.callbackButton('Coke', 'Coke'),
//             m.callbackButton('Pepsi', 'Pepsi')
//         ])))
// })

// bot.command('random', (ctx) => {
//     return ctx.reply('random example',
//         Markup.inlineKeyboard([
//             Markup.callbackButton('Coke', 'Coke'),
//             Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//             Markup.callbackButton('Pepsi', 'Pepsi')
//         ]).extra()
//     )
// })

// bot.command('caption', (ctx) => {
//     return ctx.replyWithPhoto({
//             url: 'https://picsum.photos/200/300/?random'
//         },
//         Extra.load({
//             caption: 'Caption'
//         })
//         .markdown()
//         .markup((m) =>
//             m.inlineKeyboard([
//                 m.callbackButton('Plain', 'plain'),
//                 m.callbackButton('Italic', 'italic')
//             ])
//         )
//     )
// })

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//     return ctx.reply('Keyboard wrap', Extra.markup(
//         Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//             columns: parseInt(ctx.match[1])
//         })
//     ))
// })

// bot.action('Pepsi', (ctx, next) => {
//     return ctx.reply('pise4ka👍👍👍').then(() => next())
// })

// bot.action('Dr Pepper', (ctx, next) => {
//     return ctx.reply('👍').then(() => next())
// })

// bot.action('plain', async (ctx) => {
//     await ctx.answerCbQuery()
//     await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//         Markup.callbackButton('Plain', 'plain'),
//         Markup.callbackButton('Italic', 'italic')
//     ]))
// })

// bot.action('italic', async (ctx) => {
//     await ctx.answerCbQuery()
//     await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
//         Markup.callbackButton('Plain', 'plain'),
//         Markup.callbackButton('* Italic *', 'italic')
//     ])))
// })

// bot.action(/.+/, (ctx) => {
//     return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
// })

// bot.launch()