const Discord = require('discord.js');
const sorteio = require('../funcoes/funTeste.js');
const config = require("../config.json");

module.exports = {
    name: 'teste',
    description: 'Sorteia os jogadores dentro do canal de voz',
    execute(msg, qtde, bot) {
        if (msg.author.id == config.mur1lol) {
            var idvoice = msg.member.voice.channelID; // Identifica o canal de voz em que o usuario esta
            const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice');
            var participantes = [], nome = "";

            // for (const [id, voiceChannel] of voiceChannels) {
            //     voiceChannel.members.forEach(member => participantes.push(member.displayName));
            // }

            // APENAS PARA TESTES
            for (const [id, voiceChannel] of voiceChannels) {
                voiceChannel.members.forEach(member => nome += (member.displayName) + "#");
            }
            participantes = nome.split("#").filter(empty);

            if (participantes.length > numero_times(qtde)) {
                let equipe = sorteio.equipe(participantes, numero_times(qtde));
                embed = new Discord.MessageEmbed()
                    .setColor(2943861)
                    .setAuthor(bot)
                    .setTitle('=== Equipes Formadas ===')
                    .addFields(equipe);
            }
            else {
                embed = new Discord.MessageEmbed()
                    .setColor(15158332)
                    .setAuthor(bot)
                    .addFields(
                        { name: 'Erro', value: 'O numero de jogadores não é suficiente. (Número de Jogadores atuais: ' + participantes.length + ')' }
                    );
            }

            msg.channel.send(embed);
        }
    }
};

function empty(value) {
    return value != "";
}

function numero_times(qtde) {
    if (qtde.length > 0) {
        return qtde[0];
    } else {
        return 2;
    }
}