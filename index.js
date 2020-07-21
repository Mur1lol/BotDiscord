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
    console.log('Estou online :D');
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('!help', {type: 'LISTENING' });
});

bot.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const numero_times = msg.content.slice(config.prefix.length).split(/ +/);
    const nome_comando = numero_times.shift().toLowerCase();

    if (!bot.comandos.has(nome_comando)) return;

    const comando = bot.comandos.get(nome_comando);
    
    try {
        comando.execute(msg, numero_times, bot);
    } catch (error) {
        console.error(error);
        msg.reply('Erro: '+error);
    }
});

bot.login(config.token);