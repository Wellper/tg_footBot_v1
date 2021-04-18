const {
    Telegraf
} = require('telegraf')
const {
    MenuTemplate,
    MenuMiddleware
} = require('telegraf-inline-menu')
require('dotenv').config();

const menuTemplate = new MenuTemplate(ctx => `Hey ${ctx.from.first_name}!`)

menuTemplate.interact('I am excited!', 'a', {
    do: async ctx => ctx.reply('As am I!')
})


const bot = new Telegraf(process.env.BOT_TOKEN)

const menuMiddleware = new MenuMiddleware('/', menuTemplate)
bot.command('start', ctx => menuMiddleware.replyToContext(ctx))

bot.use(menuMiddleware)

bot.launch()