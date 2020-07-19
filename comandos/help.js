const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Exibe uma mensagem para ajudar o usuario a usar o Bot',
    execute(msg, qtde, bot) {

        const embed = new Discord.MessageEmbed()
            .setDescription(bot + " é um bot criado para facilitar a divisão de grupos para a realização de partidas personalizadas." +
                "\n\nPara começar, basta utilizar os comandos `!sortear` junto com a quantidade de equipes que você quer criar, e eu vou sortear todos os jogadores dentro do canal de voz em que você está ou " +
                "`!jogar` e digitar as posições em que os jogadores estão dentro do canal, ou também `!nomes` e depois escrever os nomes dos jogadores que irão participar :grin:\n")
            .setColor(2943861)
            .setAuthor(bot, "https://cdn.discordapp.com/attachments/718710623344787528/719315215321137152/pizza.png")
            .addFields(
                { name: 'Exemplos', value: '!sortear 2\n!jogar 3\n!nomes 4' },
                { name: 'Observação', value: 'Por padrão o numero de equipes é 2, então se você usar apenas `!sortear` também vai funcionar.'}
            );

        msg.channel.send(embed);
    }
};