const Discord = require('discord.js');
const sorteio = require('../funcoes/funSorteio.js');

module.exports = {
    name: 'jogar',
    description: 'Sorteia os jogadores pela posição dentro do canal de voz',
    execute(msg, qtde, bot) {
        var idvoice = msg.member.voice.channelID;
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice');

        var jogadores = new Array();
        var participantes = [];

        mensagem_aguardo = new Discord.MessageEmbed()
            .setDescription('Digite a posição em que os jogadores estão dentro do canal, os separando em virgulas (\',\').')
            .setColor(1752220)
            .setAuthor(bot.user.username);

        msg.channel.send(mensagem_aguardo).then(() => {
            const filter = m => msg.author.id === m.author.id;

            msg.channel.awaitMessages(filter, { time: 150000, max: 1, errors: ['time'] })
                .then(messages => {
                    resultado = messages.first().content.split(","); //Pegar o nome dos jogadores

                    for (const [id, voiceChannel] of voiceChannels) {
                        voiceChannel.members.forEach(member => participantes.push(member.displayName));
                    }

                    for (let i = 0; i < resultado.length; i++) {
                        posicao = parseInt(resultado[i]) - 1;
                        if (resultado.length <= participantes.length) {
                            if (posicao >= 0 && posicao < participantes.length) {
                                jogadores[i] = participantes[posicao];
                            }
                            else {
                                embed = new Discord.MessageEmbed()
                                    .setColor(15158332)
                                    .setAuthor(bot)
                                    .addFields(
                                        { name: 'Erro', value: 'Posição inválida' }
                                    );

                                msg.channel.send(embed);
                                return;
                            }
                        }
                        else {
                            embed = new Discord.MessageEmbed()
                                .setColor(15158332)
                                .setAuthor(bot)
                                .addFields(
                                    { name: 'Erro', value: 'Acho que tem gente demais pra esse sorteio :thinking:' }
                                );

                            msg.channel.send(embed);
                            return;
                        }
                    }

                    if (jogadores.length > numero_times(qtde)) {
                        let equipe = sorteio.equipe(jogadores, numero_times(qtde));
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
                                { name: 'Erro', value: 'O numero de jogadores não é suficiente. (Número de Jogadores atuais: ' + jogadores.length + ')' }
                            );
                    }

                    msg.channel.send(embed);
                })
                .catch((error) => {
                    console.log(error)
                    embed = new Discord.MessageEmbed()
                        .setDescription('Ninguem vai jogar? :thinking:')
                        .setColor(15158332)
                        .setAuthor(bot);

                    msg.channel.send(embed);
                });
        });
    }
};

function numero_times(qtde) {
    if (qtde.length > 0) {
        return qtde[0];
    } else {
        return 2;
    }
}