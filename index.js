const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

const config = require("./config.json");
const fs = require('fs');

const Discord = require('discord.js');
const bot = new Discord.Client();
bot.comandos = new Discord.Collection();

const comandosArq = fs.readdirSync('./comandos').filter(arq => arq.endsWith('.js'));

for (const arq of comandosArq) {
    const comando = require(`./comandos/${arq}`);
    bot.comandos.set(comando.name, comando);
}

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('!help', { type: 'LISTENING' });
});

bot.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const extra = msg.content.toLowerCase().slice(config.prefix.length).split(/ +/);
    const nome_comando = extra.shift();

    if (!bot.comandos.has(nome_comando)) return;

    const comando = bot.comandos.get(nome_comando);

    try {
        comando.execute(msg, extra, bot);
    } catch (error) {
        console.error(error);
        msg.reply('Ops, estou em manutenção. Em alguns minutos já estarei pronto para uso :grin:');
    }
});

bot.login(config.token);