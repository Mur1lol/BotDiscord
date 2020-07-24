const Discord = require('discord.js');
const config = require("../config.json");
const fs = require('fs');

try {
    const comandosArq = fs.readdirSync('./comandos').filter(arq => arq.endsWith('.js'));

    var lista_comandos = [], lista_exemplo = [];

    for (const arq of comandosArq) {
        if (arq != "help.js" && arq != "teste.js") {
            const comando = require(`./${arq}`);
            lista_comandos.push("`" + config.prefix + comando.name + "` : " + comando.description)
            lista_exemplo.push(comando.example)
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
                { name: 'Exemplos', value: lista_exemplo},
                { name: 'Observação', value: 'Por padrão o numero de equipes é 2. Portanto não é necessario utilizar o comando `tam`, a menos que queira formar mais de 2 equipes.\nExemplo: !sortear remover @TeamMaker' }
            );

        msg.channel.send(embed);
    }
};