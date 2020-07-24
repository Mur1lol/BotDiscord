const Discord = require('discord.js');
const sorteio = require('../funcoes/funSorteio.js');

module.exports = {
    name: 'sortear',
    description: 'Sorteia os jogadores dentro do canal de voz',
    example: '!sortear tam <numero de equipes> remover <@TeamMaker @Bot ...>',
    execute(msg, extra, bot) {
        var idvoice = msg.member.voice.channelID; // Identifica o canal de voz em que o usuario esta
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice');
        var participantes = [], removidos = [];

        if (remover(extra)) {
            remover(extra).forEach(nome => {
                nomes = nome.replace("<@!", "").replace(">", "").replace(",", "");
                removidos.push(nomes)
            })
        }
        removidos = removidos.filter(empty)

        for (const [id, voiceChannel] of voiceChannels) {
            voiceChannel.members.forEach(member => {
                verificador = true;
                for (let i = 0; i < removidos.length; i++) {
                    if (removidos[i] == member.user.id) {
                        verificador = false;
                    }
                }

                if (verificador) {
                    participantes.push(member.displayName)
                }
            })
        }

        if (participantes.length >= numero_times(extra) && numero_times(extra) > 0) {
            let equipe = sorteio.equipe(participantes, numero_times(extra));
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

function empty(value) {
    return value != "";
}

function numero_times(extra) {
    if (extra[0] == "tam") {
        return extra[1];
    } else {
        return 2;
    }
}

function remover(extra) {
    tamanho = extra.length;
    if (extra[0] == "remover") {
        return extra.slice(1, tamanho);
    }
    else if (extra[2] == "remover") {
        return extra.slice(3, tamanho);
    }
}