$(document).ready(function () {
    var currentPlayer = "x";
    var count = 0;
    var o_win = 0;
    var x_win = 0;

    $('#game li').click(function () {
        if ($(this).hasClass('disable')) {
            alert('Already selected');
            return;
        }

        count++;
        currentPlayer = (count % 2 === 0) ? 'o' : 'x';
        var btnClass = (currentPlayer === 'o') ? 'btn-primary' : 'btn-info';

        $(this).text(currentPlayer);
        $(this).addClass('disable ' + currentPlayer + ' ' + btnClass);

        if (checkWinner(currentPlayer)) {
            alert(currentPlayer.toUpperCase() + ' wins');
            updateScore(currentPlayer);
            resetGame();
        } else if (count === 9) {
            alert('It\'s a tie. It will restart.');
            resetGame();
        }
    });

    $("#reset").click(function () {
        resetGame();
    });

    function checkWinner(player) {
        var winningCombos = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 5, 9], [3, 5, 7]
        ];

        return winningCombos.some(function (combo) {
            return combo.every(function (index) {
                return $("#game li[data-index='" + index + "']").hasClass(player);
            });
        });
    }

    function updateScore(player) {
        (player === 'o') ? o_win++ : x_win++;
        $('#' + player + '_win').text((player === 'o') ? o_win : x_win);
    }

    function resetGame() {
        $("#game li").text("+");
        $("#game li").removeClass('disable o x btn-primary btn-info');
        count = 0;
        currentPlayer = "x";
    }
});
