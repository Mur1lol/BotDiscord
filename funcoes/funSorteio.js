module.exports = {
    equipe: function (jogadores, qtde) {
        var equipes = [];
        var time_embaralhado = embaralhar(jogadores);
        var time_oficial = separarTimes(time_embaralhado, qtde);

        for (let i = 0; i < qtde; i++) {
            equipes.push({ "name": 'Time ' + (i + 1), "value": time_oficial[i], "inline": true });
        }

        return equipes;
    },
    sorteio: function (jogadores, maxJogadores, msg) {
        var vencedores = [];
        var jogador_embaralhado = embaralhar(jogadores);
        var jogador_escolhido = escolherVencedores(jogador_embaralhado, maxJogadores);

        vencedores.push({ "name": 'Vencedores', "value": jogador_escolhido[0], "inline": true });

        return vencedores;
    }
}

function embaralhar(jogadores) {
    var time_padrao = [];
    var num_jogadores = jogadores.length;

    for (let i = 0; i < num_jogadores; i++) {
        let posicao = Math.floor(Math.random() * jogadores.length);
        time_padrao[i] = jogadores[posicao];
        jogadores.splice(posicao, 1);
    }

    return time_padrao;
}

function escolherVencedores(time_padrao, maxJogadores) {
    var jogadoresSorteados = [];

    jogadoresSorteados.push(time_padrao.slice(0, maxJogadores));

    return jogadoresSorteados;
}

function separarTimes(time_padrao, qtde) {
    var time_sorteado = [];
    var divisao = Math.floor(time_padrao.length / qtde)
    var resto = time_padrao.length % qtde;

    for (let i = 0; i < time_padrao.length; i += divisao) {
        var inicio = i;
        var fim = divisao + inicio;

        if (resto != 0) {
            i++;
            fim++;
            resto--;
        }

        time_sorteado.push(time_padrao.slice(inicio, fim));
    }

    return time_sorteado;
}