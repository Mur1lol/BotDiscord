const Discord = require('discord.js');
const bot = new Discord.Client();
const token = '';

bot.on('ready', () => {
    console.log('Estou online :D');
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('!help', {type: 'LISTENING' });
});

bot.on('message', msg => {
    const mensagem = msg.content.toLowerCase();

    //MENSAGEM PARA FACILITAR O USO DO BOT
    if (mensagem === '!help') {
        const embed = {
            "description": bot.user.username + " é um bot criado para facilitar a divisão de grupos para a realização de partidas personalizadas."+
            "\n\n Para começar, basta utilizar os comandos `!sortear` junto com a quantidade de equipes que você quer criar, e eu vou sortear todos os jogadores dentro do canal de voz em que  você está ou `!jogar` e depois escrever os nomes dos jogadores que irão participar :grin:\n",
            "color": 2943861,
            "author": {
                "name": bot.user.username,
                "icon_url": "https://cdn.discordapp.com/attachments/718710623344787528/719315215321137152/pizza.png"
            },
            "fields": [
                {"name": "Exemplos", "value": "\n!jogar 2\n!sortear 3"},
                { "name": "Observações", "value": "Por padrão o numero de times é 2, então se você usar apenas `!sortear` também vai funcionar.\nO número maximo de equipes é 4."}
            ]
        };
        msg.channel.send({ embed });
    }

    //DECLARAR OS JOGADORES
    else if (mensagem === '!jogar') {
        var numero_times = msg.content.replace("!jogar", ""); // Remove o "!jogar" e deixa apenas o numero de times
        var participantes = new Array();
        let x = 0;

        msg.channel.send('Digite os nomes dos jogadores, os separando em virgulas (",").').then(() => {
            const filter = m => msg.author.id === m.author.id;

            msg.channel.awaitMessages(filter, { time: 150000, max: 1, errors: ['time'] })
                .then(messages => {                    
                    resultado = messages.first().content.split(","); //Pegar o nome dos jogadores
        
                    for (let j = 0; j < resultado.length; j++) {
                        participantes[x] = resultado[j].replace(" ", ""); //Colocando os nomes dentro do Array e removendo os espaços
                        x++;                
                    }

                    if (sorteio(participantes, numero_times)) {     
                        msg.channel.send({ embed });
                    }
                    else {
                        msg.channel.send(':x: O numero de jogadores não é sificiente. (Número de Jogadores atuais: ' + participantes.length + ') :x:');
                    }
                    
                })
                .catch(() => {
                    msg.channel.send('Ninguem vai jogar? :thinking:');
                });
        });
    }

    //SORTEAR JOGADORES DENTRO DO CANAL DE VOZ
    else if (mensagem.startsWith("!sortear")) { 
        var numero_times = msg.content.replace("!sortear", ""); // Remove o "!sortear" e deixa apenas o numero de times
        var idvoice = msg.member.voice.channelID; // Identifica o canal de voz em que o usuario esta
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice'); 
        var nome = "";
        var nomes, jogadores;
        
        for (const [id, voiceChannel] of voiceChannels) { 
            voiceChannel.members.forEach(member => nome += (member.displayName)+"#");
        }
        nomes = nome.split("#");
        jogadores = nomes.filter(empty);

        if (sorteio(jogadores, numero_times)) {
            msg.channel.send({ embed });
        }
        else {
            msg.channel.send(':x: O numero de jogadores não é sificiente. (Número de Jogadores atuais: ' + jogadores.length + ') :x:');
        }
    }
});

function empty(value) {
    return value != "";
}

function sorteio(jogador, qtde) {
    time1 = [...jogador]; // Copia os dados do Array [jogador] e coloca nesse outro Array [time1]
    time2 = new Array();
    time3 = new Array();
    time4 = new Array();

    let j = 0
    let k = 0;

    if (qtde == "" || qtde == 2) {
        if (jogador.length >= 3) {
            for (let i = 0; i < jogador.length / 2; i++) {
                let posicao = Math.floor(Math.random() * time1.length);
                time2[i] = time1[posicao]; //Passa alguns dados do Array [time1] para o [time2]
                time1.splice(posicao, 1); // E os dados que foram copiados do [time1] são deletados
            }

            embed = {
                "color": 2943861,
                "fields": [
                    { "name": "Time 1", "value": time1 },
                    { "name": "Time 2", "value": time2 }
                ]
            };

            return true;
        }
    }
    else if (qtde == 3) {
        if (jogador.length >= 4) {
            for (let i = 0; i < jogador.length / 3 * 2; i++) {
                
                let posicao = Math.floor(Math.random() * time1.length);
                if (time3.length >= (jogador.length/3)) {
                    time2[j] = time1[posicao]; //Passa alguns dados do Array [time1] para o [time2]
                    j++;
                }
                else {
                    time3[i] = time1[posicao]; //Passa alguns dados do Array [time1] para o [time3]               
                }
                time1.splice(posicao, 1); // E os dados que foram copiados do [time1] são deletados
            }

            embed = {
                "color": 2943861,
                "fields": [
                    { "name": "Time 1", "value": time1 },
                    { "name": "Time 2", "value": time2 },
                    { "name": "Time 3", "value": time3}
                ]
            };

            return true;
        }
    }
    else if (qtde == 4) {
        if (jogador.length >= 5) {
            for (let i = 0; i < jogador.length / 4 * 3; i++) {
                let posicao = Math.floor(Math.random() * time1.length);
                if (time3.length >0 && time3.length > time2.length) {
                    time2[k] = time1[posicao]; //Passa alguns dados do Array [time1] para o [time2]
                    k++;
                }
                else if (time4.length >= (jogador.length / 4) && time3.length == time2.length) {
                    time3[j] = time1[posicao]; //Passa alguns dados do Array [time1] para o [time3]
                    j++;
                }
                else {
                    time4[i] = time1[posicao]; //Passa alguns dados do Array [time1] para o [time4]               
                }
                time1.splice(posicao, 1); // E os dados que foram copiados do [time1] são deletados
            }

            embed = {
                "color": 2943861,
                "fields": [
                    { "name": "Time 1", "value": time1 },
                    { "name": "Time 2", "value": time2 },
                    { "name": "Time 3", "value": time3 },
                    { "name": "Time 4", "value": time4 }
                ]
            };

            return true;
        }
    }
    else if (qtde < 2 || qtde > 4) {
        embed = {
            "color": 15158332,
            "fields": [
                { "name": "Foi mal", "value": "Não vai dar" }
            ]
        };

        return true;
    }
}

bot.login(token);