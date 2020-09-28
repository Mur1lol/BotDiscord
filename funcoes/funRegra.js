module.exports = {
    regra: function (extra, jogadores) {
        if (jogadores < numero_times(extra) || numero_times(extra) <= 0) {
            return { 'status': false, 'msg': 'O número de jogadores não é suficiente para essa quantidade de equipes.' };
        } else {
            return { 'status': true, 'msg': ':beginner:  Equipes Formadas  :beginner:', 'qtde': numero_times(extra)};
        }
    }
}

function numero_times(extra) {
    if (extra[0] == "tam") {
        return extra[1];
    } else {
        return 2;
    }
}