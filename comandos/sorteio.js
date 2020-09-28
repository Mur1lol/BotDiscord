const Discord = require('discord.js');
const func_sorteio = require('../funcoes/funSorteio.js');

module.exports = {
    name: 'sorteio',
    description: 'Cria um mini-sorteio. Para participar basta reajir a mensagem',
    execute(msg, extra, bot) {
        var participantes = [];
        var maximo = maxJogadores(extra);
        var tempo = maxTempo(extra);

        if (maximo <= 0 || tempo <= 0) {
            embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setAuthor(bot.user.username)
                .addFields(
                    { name: 'Erro', value: 'Os valores precisam ser maiores que 0 (zero)' }
                );

            msg.channel.send(embed);
            return;
        }

        msg.react('👍');
        const filter = reaction => {
            return reaction.emoji.name === '👍';
        };

        const collector = msg.createReactionCollector(filter, { time: tempo });

        collector.on('collect', (reaction, user) => {
            // && user.id != msg.author.id
            if (participantes.indexOf(user.username) === -1 && user.id != bot.user.id) {
                participantes.push(user.username);
            }
        });

        collector.on('end', c => {
            let equipe = func_sorteio.sorteio(participantes, maximo, msg);
            embed = new Discord.MessageEmbed()
                .setColor(15844367)
                .setTitle(':trophy:  Jogadores Sorteados  :trophy:')
                .addFields(equipe);

            msg.channel.send(embed);
        });

    }
};

function maxTempo(extra) {
    tamanho = extra.length;
    var tempo = 1;

    for (let i = 0; i < tamanho; i++) {
        if (extra[i] == "tempo") {
            tempo = extra[i + 1];
        }
    }

    return tempo * 60 * 1000;
}

function maxJogadores(extra) {
    tamanho = extra.length;
    var maximo = 5;

    for (let i = 0; i < tamanho; i++) {
        if (extra[i] == "max") {
            maximo = extra[i + 1];
        }
    }

    return maximo;
}