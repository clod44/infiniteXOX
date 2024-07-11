import { useState, useEffect } from "react";

function InfiniteXOX() {
  const [winner, setWinner] = useState(null);
  const [step, setStep] = useState(0);
  const [player, setPlayer] = useState("X");
  const [table, setTable] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    setPlayer(step % 2 === 0 ? "X" : "O");

    // Update the table to reset cells older than 4 steps
    const newTable = table.map((row) =>
      row.map((cell) => (cell && cell.step + 5 >= step ? cell : null))
    );
    setTable(newTable);
    checkWinner();
  }, [step]);

  useEffect(() => {
    if (winner) {
      document.getElementById("modal_winner").showModal();
    }
  }, [winner]);

  function resetGame() {
    setWinner(null);
    setStep(0);
    setTable([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  }
  function checkWinner() {
    const lines = [
      // horizontal
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // verticla
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // diagonal
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        table[a[0]][a[1]] &&
        table[b[0]][b[1]] &&
        table[c[0]][c[1]] &&
        table[a[0]][a[1]].symbol === table[b[0]][b[1]].symbol &&
        table[a[0]][a[1]].symbol === table[c[0]][c[1]].symbol
      ) {
        setWinner(table[a[0]][a[1]]);
        return;
      }
    }
  }

  function handleButtonClick(i, j) {
    if (table[i][j]) {
      return;
    }
    const newTable = [...table];
    const data = {
      symbol: player,
      step: step,
    };
    newTable[i][j] = data;
    setTable(newTable);
    setStep(step + 1);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="modal_winner" className="modal">
          <div className="modal-box border border-primary">
            <h3 className="font-bold text-lg">Winner is {winner?.symbol}</h3>
            <p className="py-4">Took {step} steps to win.</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div className="py-2 flex justify-between items-center">
          <p className="font-mono">
            Player: {player} - Step: {step}
          </p>
          <div className="join">
            <button
              onClick={resetGame}
              className="btn btn-xs btn-primary join-item"
            >
              Reset
            </button>
            <a
              href="https://github.com/clod44/infiniteXOX"
              target="_blank"
              className="btn btn-primary btn-outline btn-xs join-item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.78 4.97a.75.75 0 0 1 0 1.06L2.81 8l1.97 1.97a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 0ZM11.22 4.97a.75.75 0 0 0 0 1.06L13.19 8l-1.97 1.97a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 0ZM8.856 2.008a.75.75 0 0 1 .636.848l-1.5 10.5a.75.75 0 0 1-1.484-.212l1.5-10.5a.75.75 0 0 1 .848-.636Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid grid-rows-3 grid-cols-3 gap-1">
          {table.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleButtonClick(i, j)}
                className={
                  `btn w-full h-full flex items-center justify-center aspect-square text-5xl ` +
                  (!cell
                    ? "btn-outline btn-primary"
                    : cell.symbol === "X"
                    ? "btn-error"
                    : "btn-info ")
                }
                style={{
                  opacity: cell ? 1.0 - (step - 1 - cell.step) / 5.0 : 1,
                }}
                disabled={winner}
              >
                {cell?.symbol || ""}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default InfiniteXOX;
