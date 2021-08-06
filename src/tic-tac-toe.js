const FIELD_SIZE = 3;
const DEFAULT_VALUE = null;

class TicTacToe {
    constructor() {
        this.currentSymbol = 'x';
        this.field = [];
        for (let i = 0; i < FIELD_SIZE; i++) {
            this.field.push(Array(FIELD_SIZE).fill(DEFAULT_VALUE))
        }
    }

    getCurrentPlayerSymbol() {
        return this.currentSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.field[rowIndex][columnIndex] !== DEFAULT_VALUE) {
            return false;
        }

        const symbol = this.getCurrentPlayerSymbol();
        this.currentSymbol = symbol === 'x' ? 'o' : 'x' ;
        this.field[rowIndex][columnIndex] = symbol;
    }

    isFinished() {
        return this.getWinner() !== null || this.isDraw();
    }

    getUniqueCount(arr) {
        return arr.filter(el => el !== DEFAULT_VALUE).filter(el => el === arr[0]).length;
    }

    getWinner() {
        for (let i = 0; i < FIELD_SIZE; i++) {
            if (this.getUniqueCount(this.field[i]) === 3) {
                return this.field[i][0];
            }
        }

        for (let i = 0; i < FIELD_SIZE; i++) {
            const row = this.field.reduce((acc, row) => [...acc, row[i]], []);
            if (this.getUniqueCount(row) === 3) {
                return row[0];
            }
        }

        const ltToRb = [];
        const lbToRt = [];
        for (let i = 0; i < FIELD_SIZE; i++) {
            ltToRb.push(this.field[i][i]);
            lbToRt.push(this.field[FIELD_SIZE - 1 - i][i]);
        }

        if (this.getUniqueCount(ltToRb) === 3) {
            return ltToRb[0];
        }

        if (this.getUniqueCount(lbToRt) === 3) {
            return lbToRt[0];
        }

        return null;
    }

    noMoreTurns() {
        return this.field.flat().filter(val => val === DEFAULT_VALUE).length === 0;
    }

    isDraw() {
        return this.noMoreTurns() && this.getWinner() === null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
