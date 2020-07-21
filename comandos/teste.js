const sorteio = require('../funcoes/funTeste.js');
const Discord = require('discord.js');
const config = require("../config.json");
const fs = require('fs');

try {
    const comandosArq = fs.readdirSync('./comandos').filter(arq => arq.endsWith('.js'));

    var lista_comandos = [];

    for (const arq of comandosArq) {
        if (arq != "help.js" && arq != "teste.js") {
            const comando = require(`./${arq}`);
            lista_comandos.push("`"+config.prefix+comando.name+ "` : " +comando.description)
        }
    }
}
catch(error) {
    console.log(error)
}

module.exports = {
    name: 'teste',
    description: 'Exibe uma mensagem para ajudar o usuario a usar o Bot',
    execute(msg, qtde, bot) {
        const embed = new Discord.MessageEmbed()
            .setDescription(bot.user.username + " é um bot criado para facilitar a divisão de grupos para a realização de partidas personalizadas.")
            .setColor(2943861)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .addFields(
                { name: 'Lista de Comandos', value: lista_comandos},
                { name: 'Observação', value: 'Por padrão o numero de equipes é 2. Mas se quiser, você pode sortear mais de 2 equipes, basta digitar a quantidade de equipes após utilizar o comando.\nExemplo: `!sortear 3`'}
            );

        msg.channel.send(embed);
    }
};

function empty(value) {
    return value != "";
}

function numero_times(qtde) {
    if (qtde.length > 0) {
        return qtde[0];
    } else {
        return 2;
    }
}