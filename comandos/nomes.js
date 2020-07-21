const Discord = require('discord.js');
const sorteio = require('../funcoes/funSorteio.js');

module.exports = {
    name: 'nomes',
    description: 'Adiciona uma lista de jogadores e sorteia os times',
    execute(msg, qtde, bot) {
        var participantes = new Array();
        let x = 0;

        mensagem_aguardo = new Discord.MessageEmbed()
            .setDescription('Digite os jogadores dos jogadores, os separando em virgulas (\',\').')
            .setColor(1752220)
            .setAuthor(bot.user.username);

        msg.channel.send(mensagem_aguardo).then(() => {
            const filter = m => msg.author.id === m.author.id;

            msg.channel.awaitMessages(filter, { time: 150000, max: 1, errors: ['time'] })
                .then(messages => {
                    resultado = messages.first().content.split(","); //Pegar o nome dos jogadores

                    for (let j = 0; j < resultado.length; j++) {
                        participantes[x] = resultado[j].trim(); //Colocando os nomes dentro do Array e removendo os espaços
                        x++;
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
                })
                .catch((error) => {
                    console.log(error)
                    embed = new Discord.MessageEmbed()
                        .setDescription('Ninguem vai jogar? :thinking:')
                        .setColor(15158332)
                        .setAuthor(bot.user.username);

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