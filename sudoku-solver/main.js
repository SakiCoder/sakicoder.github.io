render = () => {
    let html = "";
    for (let i = 0; i < 9; i++) {
        html += "<tr>";
        for (let j = 0; j < 9; j++) {
            html += `<td><input id="cell-${i*9+j}" class="cell" type="number" min="1" max="9"></td>`;
        }
        html += "</tr>";
    }
    document.getElementById('grid').innerHTML = html;
    document.getElementById('buttons').classList.remove('hidden');
    document.getElementById('grid').classList.remove('hidden');
}; render();
isValid = (board, row, col, k) => {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}
solve = (data) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] == "") {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(data, i, j, k)) {
                        data[i][j] = `${k}`;
                        if (solve(data)) {
                            return true;
                        } else {
                            data[i][j] = "";
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
document.getElementById('solve').addEventListener('click', () => {
    const loader = document.getElementById("loading");
    loader.classList.remove("hidden");
    myNodelist = document.getElementsByClassName('cell');
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(document.getElementById(`cell-${i*9+j}`).value);
        }
        board.push(row);
    }
    solve(board);
    setTimeout(() => {
        loader.classList.add("hidden");
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                index = i*9+j;
                if (document.getElementById(`cell-${index}`).value == board[i][j]) {
                    document.getElementById(`cell-${index}`).classList.add('grey');
                } else {
                    document.getElementById(`cell-${index}`).value = board[i][j];
                    document.getElementById(`cell-${index}`).classList.remove('grey');
                }
            }
        }
    }, 500);
})
document.getElementById('reset').addEventListener('click', () => {
    for (let index = 0; index < 81; index++) {
        document.getElementById(`cell-${index}`).value = "";
        document.getElementById(`cell-${index}`).classList.remove('grey');
    }
})
$(document).ready(() => {
    $("input[type=number]").on("focus", function() {
        $(this).on("keydown", function(e) {
            let current = this.id.split('-');
            if (e.keyCode === 37) { // left arrow key
                current[1] = parseInt(current[1]) - 1;
                $(`#${current[0]}-${current[1]}`).focus();
            }
            if (e.keyCode === 38) { // up arrow key
                e.preventDefault();
                current[1] = parseInt(current[1]) - 9;
                $(`#${current[0]}-${current[1]}`).focus();
            }
            if (e.keyCode === 39) { // right arrow key
                current[1] = parseInt(current[1]) + 1;
                $(`#${current[0]}-${current[1]}`).focus();
            }
            if (e.keyCode === 40) { // down arrow key
                e.preventDefault();
                current[1] = parseInt(current[1]) + 9;
                $(`#${current[0]}-${current[1]}`).focus();
            }
        });
    });
});