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
            "\n\n Para começar, basta utilizar os comandos `!sortear` para sortear todos os jogadores dentro do canal de voz ou `!jogar` e escrever os nomes dos jogadores que irão participar :grin:\n",
            "color": 2943861,
            "author": {
                "name": bot.user.username,
                "icon_url": "https://cdn.discordapp.com/attachments/718710623344787528/719315215321137152/pizza.png"
            },
            "fields": [
                {
                    "name": "Comandos",
                    "value": "\n!jogar\n!sortear"
                }
            ]
        };
        msg.channel.send({ embed });
    }

    //DECLARAR OS JOGADORES
    else if (mensagem === '!jogar') {
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

                    sorteio(participantes)
                    if (sorteio(participantes)) {     
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
    else if(mensagem === '!sortear') { 
        var idvoice = msg.member.voice.channelID; // Identifica o canal de voz em que o usuario esta
        const voiceChannels = msg.guild.channels.cache.filter(c => c.id === idvoice && c.type === 'voice'); 
        var nome = "";
        var nomes, jogadores;
        
        for (const [id, voiceChannel] of voiceChannels) { 
            voiceChannel.members.forEach(member => nome += (member.user.username)+"#");
        }
        nomes = nome.split("#");
        jogadores = nomes.filter(empty);

        sorteio(jogadores)
        if (sorteio(jogadores)) {
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

function sorteio(jogador) {
    time1 = [...jogador]; // Copia os dados do Array [jogador] e coloca nesse outro Array [time1]
    time2 = new Array();

    if (jogador.length >= 4 && jogador.length % 2 == 0) {
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

bot.login(token);