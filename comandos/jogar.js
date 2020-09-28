const Discord = require('discord.js');
const func_sorteio = require('../funcoes/funSorteio.js');
const func_regra = require('../funcoes/funRegra.js');

module.exports = {
    name: 'jogar',
    description: 'Sorteia os jogadores pela posição dentro do canal de voz',
    execute(msg, extra, bot) {
        var idvoice = msg.member.voice.channelID;
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice');
        
        var participantes = new Array();
        var jogadores = [], resultado = [];

        for (const [id, voiceChannel] of voiceChannels) {
            voiceChannel.members.forEach(member => jogadores.push(member.displayName));
        }

        if (lista(extra)) {
            resultado = lista(extra);
            for (let i = 0; i < resultado.length; i++) {
                posicao = parseInt(resultado[i]) - 1;

                if (posicao >= 0 && posicao < jogadores.length) {
                    participantes[i] = jogadores[posicao];
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

            var verificador = func_regra.regra(extra, participantes.length);
            if (verificador.status) {
                let equipe = func_sorteio.equipe(participantes, verificador.qtde);
                embed = new Discord.MessageEmbed()
                    .setColor(2943861)
                    .setAuthor(bot.user.username)
                    .setTitle(verificador.msg)
                    .addFields(equipe);
            }
            else {
                embed = new Discord.MessageEmbed()
                    .setColor(15158332)
                    .setAuthor(bot.user.username)
                    .addFields(
                        { name: 'Erro', value: verificador.msg }
                    );
            }

            msg.channel.send(embed);
        }
        else {
            embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setAuthor(bot.user.username)
                .addFields(
                    { name: 'Erro', value: 'Digite a posição em que os jogadores estão. Exemplo: !jogar 1, 2, 4' }
                );
            msg.channel.send(embed);
        }
    }
};

function lista(extra) {
    if (extra[0] != "tam" && extra.length > 0) {
        return extra.slice(0).join('').split(",").filter(empty);
    }
    else if (extra[0] == "tam") {
        return extra.slice(2).join('').split(",").filter(empty);
    }
}

function empty(value) {
    return value != "";
}


