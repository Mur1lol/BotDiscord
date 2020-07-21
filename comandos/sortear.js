const Discord = require('discord.js');
const sorteio = require('../funcoes/funSorteio.js');

module.exports = {
    name: 'sortear',
    description: 'Sorteia os jogadores dentro do canal de voz',
    execute(msg, qtde, bot) {
        var idvoice = msg.member.voice.channelID; // Identifica o canal de voz em que o usuario esta
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice');
        var participantes = [];

        for (const [id, voiceChannel] of voiceChannels) {
            voiceChannel.members.forEach(member => participantes.push(member.displayName));
        }

        if (participantes.length > numero_times(qtde) && numero_times(qtde) > 1) {
            let equipe = sorteio.equipe(participantes, numero_times(qtde));
            embed = new Discord.MessageEmbed()
                .setColor(2943861)
                .setAuthor(bot.user.username)
                .setTitle('=== Equipes Formadas ===')
                .addFields(equipe);
        }
        else {
            embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setAuthor(bot.user.username)
                .addFields(
                    { name: 'Erro', value: 'O numero de jogadores não é suficiente. (Número de Jogadores atuais: ' + participantes.length + ')' }
                );
        }

        msg.channel.send(embed);
    }
};

function numero_times(qtde) {
    if (qtde.length > 0) {
        return qtde[0];
    } else {
        return 2;
    }
}