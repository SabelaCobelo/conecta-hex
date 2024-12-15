const size = 11; // Tamaño del tablero, 11x11 celdas hexagonales
let board = [];
let turn = 'player1'; // Control de turnos

const tablero = document.getElementById('tablero');
const reiniciarBtn = document.getElementById('reiniciar');

// Función para generar el tablero de hexágonos
function generarTablero() {
    board = [];
    tablero.innerHTML = ''; // Limpiar el tablero

    for (let y = 0; y < size; y++) {
        const row = [];
        for (let x = 0; x < size; x++) {
            const hex = document.createElement('div');
            hex.classList.add('hex');
            hex.dataset.x = x;
            hex.dataset.y = y;
            hex.addEventListener('click', () => colocarFicha(x, y));
            tablero.appendChild(hex);
            row.push(hex);
        }
        board.push(row);
    }
}

// Función para colocar fichas de los jugadores
function colocarFicha(x, y) {
    if (!board[y][x].classList.contains('purple') && !board[y][x].classList.contains('green')) {
        board[y][x].classList.add(turn === 'player1' ? 'purple' : 'green');
        if (comprobarConexiones()) {
            alert(turn === 'player1' ? 'Jugador 1 gana!' : 'Jugador 2 gana!');
        }
        turn = turn === 'player1' ? 'player2' : 'player1';
    }
}

// Función para verificar si hay una conexión entre los lados opuestos
function comprobarConexiones() {
    const start = turn === 'player1' ? 'purple' : 'green';
    const visited = Array.from({ length: size }, () => Array(size).fill(false));

    // DFS para comprobar conexiones
    function dfs(x, y) {
        if (x < 0 || x >= size || y < 0 || y >= size || visited[y][x] || !board[y][x].classList.contains(start)) {
            return false;
        }
        visited[y][x] = true;

        // Si alcanza el otro lado, hemos encontrado un camino
        if ((start === 'purple' && y === size - 1) || (start === 'green' && x === size - 1)) {
            return true;
        }

        // Direcciones posibles de conexión (arriba, abajo, izquierda, derecha, diagonales)
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1]
        ];

        for (let [dx, dy] of directions) {
            if (dfs(x + dx, y + dy)) {
                return true;
            }
        }
        return false;
    }

    for (let x = 0; x < size; x++) {
        if (dfs(x, 0) && start === 'purple') {
            return true;
        }
        if (dfs(0, x) && start === 'green') {
            return true;
        }
    }
    return false;
}

// Reiniciar el juego
reiniciarBtn.addEventListener('click', () => {
    generarTablero();
    turn = 'player1';
});

// Inicializar el juego
generarTablero();
