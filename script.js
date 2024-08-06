let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;
let moves = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
// 
const resetGame = () => {
    turn0 = true;
    moves = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Only proceed if the box is not already filled
            if (turn0) {
                box.innerText = "0";
                box.classList.add("green-text");
                turn0 = false;
            } else {
                box.innerText = "X"
                turn0 = true;
            }
            moves++;
            box.disabled = true;
            checkWinner();
            checkTie();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("green-text");
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showTie = () => {
    msg.innerText = "Match tied. Play again!";
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
}

const checkTie = () => {
    if (moves === 9) {
        showTie();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
