const Discord = require('discord.js');
const func_sorteio = require('../funcoes/funSorteio.js');
const func_regra = require('../funcoes/funRegra.js');

module.exports = {
    name: 'sortear',
    description: 'Sorteia os jogadores dentro do canal de voz',
    execute(msg, extra, bot) {
        var idvoice = msg.member.voice.channelID; // Identifica o canal de voz em que o usuario esta
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice');
        var participantes = [], removidos = [];

        if (remover(extra)) {
            remover(extra).forEach(nome => {
                nomes = nome.replace("<@!", "").replace(">", "").replace(",", "");
                removidos.push(nomes)
            });
        }
        removidos = removidos.filter(empty);

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
            });
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
};

function remover(extra) {
    tamanho = extra.length;
    for (let i =0; i<tamanho; i++) {
        if (extra[i] == "remover") {
            return extra.slice(i+1, tamanho)
        }
    }
}

function empty(value) {
    return value != "";
}