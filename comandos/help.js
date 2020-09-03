const Discord = require('discord.js');
const config = require("../config.json");
const fs = require('fs');

try {
    const comandosArq = fs.readdirSync('./comandos').filter(arq => arq.endsWith('.js'));

    var lista_comandos = [];

    var lista_comandos_adicionais = [
        '`tam` : Define a quantidade de equipes formadas',
        '`remover` : Remove os jogadores da lista'
    ];

    var lista_exemplo = [
        '!sortear tam 3',
        '!sortear remover @TeamMaker',
        '!sortear tam 3 remover @TeamMaker'
    ];

    for (const arq of comandosArq) {
        if (arq != "help.js" && arq != "teste.js") {
            const comando = require(`./${arq}`);
            lista_comandos.push("`" + config.prefix + comando.name + "` : " + comando.description);
        }
    }
}
catch (error) {
    console.log(error)
}

module.exports = {
    name: 'help',
    description: 'Exibe uma mensagem para ajudar o usuario a usar o Bot',
    execute(msg, qtde, bot) {
        const embed = new Discord.MessageEmbed()
            .setDescription(bot.user.username + " é um bot criado para facilitar a divisão de grupos para a realização de partidas personalizadas.")
            .setColor(2943861)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .addFields(
                { name: 'Lista de Comandos', value: lista_comandos },
                { name: 'Comandos Adicionais', value: lista_comandos_adicionais },
                { name: 'Exemplos', value: lista_exemplo}
            );

        msg.channel.send(embed);
    }
};