window.addEventListener('DOMContentLoaded', () => {
    const tile = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const resetGame = document.querySelector('#game-reset')
    const playerXWin = document.querySelector('#playerX')
    const player0Win = document.querySelector('#player0')
    const playersWon = document.querySelector('#won')

    let count1 = 1, count2 = 1, countWon = 1;

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;
    
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYER0_WON = 'PLAYER0_WON';
    const TIE = 'TIE';

    // Indexes within the board
    // [0] [1] [2]
    // [3] [4] [5]
    // [6] [7] [8]

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for(let i = 0; i <= 7; i++) {
            const winConditions = winningConditions[i];
            const a = board[winConditions[0]]
            const b = board[winConditions[1]]
            const c = board[winConditions[2]]
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                roundWon = true;
                break;
            }
        }

        if(roundWon){
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYER0_WON);
            isGameActive = false;
            return;
        }

        if(!board.includes('')){
            announce(TIE);
        }   
    }

    const announce = (type) => {
        switch(type){
            case PLAYER0_WON:
                announcer.innerHTML = 'Player <span class="player0">0</span> Won';
                player0Win.innerText = `Jogador 0: ${count2}`;
                count2++;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                playerXWin.innerText = `Jogador X: ${count1}`;
                count1++;
                break;
            case TIE:
                announcer.innerText = 'Tie';
                playersWon.innerHTML = `<span>Empates: ${countWon}</span>`
                countWon++
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === '0'){
            return false
        }

        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? '0' : 'X';
        playerDisplay.innerHTML = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
        
        if(currentPlayer === '0'){
            changePlayer();
        }

        tile.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('player0');
        });
    }
    const resetEveryTable = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
        
        if(currentPlayer === '0'){
            changePlayer();
        }

        tile.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('player0');
        });

        player0Win.innerText = ''
        playerXWin.innerText = ''
        playersWon.innerText = ''
    }

    tile.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
    resetButton.addEventListener('click', resetBoard);
    resetGame.addEventListener('click', resetEveryTable)
});