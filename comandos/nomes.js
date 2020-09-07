const Discord = require('discord.js');
const sorteio = require('../funcoes/funSorteio.js');

module.exports = {
    name: 'nomes',
    description: 'Adiciona uma lista de jogadores e sorteia os times',
    example: '!nomes tam <numero de equipes> <lista de nomes>',
    execute(msg, extra, bot) {
        var participantes = new Array();
        var participantes = [];
        let x = 0;

        if (lista(extra)) {
            resultado = lista(extra);
            for (let j = 0; j < resultado.length; j++) {
                participantes[x] = resultado[j].trim(); //Colocando os nomes dentro do Array e removendo os espaços
                x++;
            }

            if (participantes.length >= numero_times(extra) && numero_times(extra) > 0) {
                let equipe = sorteio.equipe(participantes, numero_times(extra));
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
                    { name: 'Erro', value: 'Digite o nome dos jogadores. Exemplo: !nomes Teste1,Teste2,...' }
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
    var nomes = [];
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