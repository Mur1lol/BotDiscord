const Discord = require('discord.js');
const func_sorteio = require('../funcoes/funSorteio.js'); 
const func_regra = require('../funcoes/funRegra.js');

module.exports = {
    name: 'nomes',
    description: 'Adiciona uma lista de jogadores e sorteia os times',
    execute(msg, extra, bot) {
        var participantes = [];
        let x = 0;

        if (lista(extra)) {
            resultado = lista(extra);
            for (let j = 0; j < resultado.length; j++) {
                participantes[x] = resultado[j].trim(); //Colocando os nomes dentro do Array e removendo os espaços
                x++;
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
                    { name: 'Erro', value: 'Digite o nome dos jogadores. Exemplo: !nomes Teste1, Teste2, ...' }
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