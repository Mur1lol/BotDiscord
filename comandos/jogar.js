const Discord = require('discord.js');
const sorteio = require('../funcoes/funSorteio.js');

module.exports = {
    name: 'jogar',
    description: 'Sorteia os jogadores pela posição dentro do canal de voz',
    example: '!jogar tam <numero de equipes> <posição dos jogadores>',
    execute(msg, extra, bot) {
        var idvoice = msg.member.voice.channelID;
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice');
        
        var jogadores = new Array();
        var participantes = [], resultado = [];

        for (const [id, voiceChannel] of voiceChannels) {
            voiceChannel.members.forEach(member => participantes.push(member.displayName));
        }

        if (lista(extra)) {
            resultado = lista(extra);
            for (let i = 0; i < resultado.length; i++) {
                posicao = parseInt(resultado[i]) - 1;

                if (posicao >= 0 && posicao < participantes.length) {
                    jogadores[i] = participantes[posicao];
                }
                else {
                    embed = new Discord.MessageEmbed()
                        .setColor(15158332)
                        .setAuthor(bot.user.username)
                        .addFields(
                            { name: 'Erro', value: 'Posição inválida' }
                        );
                    msg.channel.send(embed);
                    return;
                }
            }

            if (jogadores.length >= numero_times(extra) && numero_times(extra) > 0) {
                let equipe = sorteio.equipe(jogadores, numero_times(extra));
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
                        { name: 'Erro', value: 'O número de jogadores não é suficiente para essa quantidade de equipes.' }
                    );
            }

            msg.channel.send(embed);
        }
        else {
            embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setAuthor(bot.user.username)
                .addFields(
                    { name: 'Erro', value: 'Digite a posição em que os jogadores estão. Exemplo: !jogar 1,2,4' }
                );
            msg.channel.send(embed);
        }
    }
};

function numero_times(extra) {
    if (extra[0] == "tam") {
        return extra[1];
    } else {
        return 2;
    }
}

function lista(extra) {
    if (extra[0] != "tam") {
        return extra.slice(0).join('').split(",").filter(empty);
    }
    else if (extra[0] == "tam") {
        return extra.slice(2).join('').split(",").filter(empty);
    }
}

function empty(value) {
    return value != "";
}