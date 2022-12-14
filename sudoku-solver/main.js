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
boardValid = (bo) => {
    // check row
    for (let i = 0; i < bo.length; i++) {
        numbers = [];
        for (let j = 0; j < bo[i].length; j++) {
            const number = bo[i][j];
            if (numbers.includes(number) && number != "") {
                return false;
            }
            numbers.push(number)
        }
    }
    // check column
    for (let i = 0; i < bo.length; i++) {
        numbers = [];
        for (let j = 0; j < bo[i].length; j++) {
            const number = bo[j][i];
            if (numbers.includes(number) && number != "") {
                return false;
            }
            numbers.push(number)
        }
    }
    // check square
    for (let boxX = 0; boxX < 3; boxX++) {
        for (let boxY = 0; boxY < 3; boxY++) {
            numbers = [];
            for (let i = boxX * 3; i < boxX * 3 + 3; i++) {
                for (let j = boxY * 3; j < boxY * 3 + 3; j++) {
                    const number = bo[i][j];
                    if (numbers.includes(number) && number != "") {
                        return false;
                    }
                    numbers.push(number)
                }
            }
        }
    }
    return true;
}
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
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(document.getElementById(`cell-${i*9+j}`).value);
        }
        board.push(row);
    }
    if (boardValid(board)) {
        solve(board);
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
    }
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