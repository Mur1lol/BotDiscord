module.exports = {
    equipe: function (jogadores, qtde) {
        var equipes = [];
        var time = sorteio(jogadores, qtde)

        for (let i = 0; i < qtde; i++) {
            equipes.push({ "name": 'Time ' + (i + 1), "value": time[i], "inline": true });
        }

        return equipes;
    }
}

function sorteio(jogadores, qtde) {
    var time_padrao = [], time_sorteado = [];
    var num_jogadores = jogadores.length;
    var divisao = Math.floor(jogadores.length / qtde)
    var resto = jogadores.length % qtde;

    for (let i = 0; i < num_jogadores; i++) {
        let posicao = Math.floor(Math.random() * jogadores.length);
        time_padrao[i] = jogadores[posicao];
        jogadores.splice(posicao, 1);
    }

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