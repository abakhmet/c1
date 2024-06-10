// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function f() {

    //    
    //         <div>
    //             <canvas id="can1" style="display: none; width: 700px; height: 700px; background-color: saddlebrown;"></canvas>
    //         </div>

    const canvas = document.getElementById("can1");
    const ctx = canvas.getContext("2d");


    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(160, 100, 50, 0, 0.5);
    ctx.fillStyle = "#00FF0";
    ctx.fill();
    ctx.closePath();
}

function level2() {
    const mode = ~~(Math.random() * 3);
    if (mode === 0) { // Addition
        const a = ~~(Math.random() * 51);
        const b = ~~(Math.random() * 51);
        const question = a + " + " + b;
        const answer = a + b;
        return [question, answer];
    } else if (mode === 1) { // Multiplication 
        const a = ~~(Math.random() * 11);
        const b = ~~(Math.random() * 11);
        const question = a + " x " + b;
        const answer = a * b;
        return [question, answer];
    }
    // Subtraction
    const a = ~~(Math.random() * 51);
    const b = ~~(Math.random() * a);
    const question = a + " - " + b;
    const answer = a - b;
    return [question, answer];
}

function main1() {
    for (let i = 0; i < 100; i++) {
        const [a, b] = level2();
        console.debug(a, b);
    }
}

function main2() {
    const A = [...Array(101).keys()];
    const B = [...Array(101).keys()];

    const r = A.flatMap(x => B.map(y => `${x}|${y}`));

    for (let i = 0; i < r.length; i++) {
        const a = r[i];
        console.debug(a);
    }
}


class GameState {

    constructor() {

        this.problemTimeLimit = 7 * 1000;
        this.gameTimeLimit = 60 * 1000;
        this.totalProblems = 40;

        this.question = '';
        this.answer = '';
        this.counter = 0;
        this.solved = 0;
        this.failed = 0;

        this.gameStart = 0;
        this.problemStart = 0;
    }

    reset() {
        [this.question, this.answer] = level2();

        this.counter = this.totalProblems;
        this.solved = 0;
        this.failed = 0;

        this.sgameStart = Date.now();
        this.problemStart = this.gameStart;
    }
    
    applyAnswer(answer){
        const now = Date.now();
        const problemTime = now - this.problemStart;

        const progressCell = progressElt.rows[0].cells[totalProblems - counter];

        const actualResult = resultElt.value.trim();
        if (actualResult === ('' + answer)) {
            counter -= 1;
            solved += 1;
            progressCell.className = 'success';
        } else {
            counter -= 1;
            failed += 1;
            progressCell.className = 'failed';
        }

        [question, answer] = level2();
    }
}

class GamePresenter {
    constructor() {
        this.resultElt = document.getElementById('result');
        this.problemElt = document.getElementById('problem');
        this.progressElt = document.getElementById('progress');
        this.timeElt = document.getElementById('time');
        this.avgTimeElt = document.getElementById('avgTime');
        this.totalElt = document.getElementById('total');
        this.solvedElt = document.getElementById('solved');
        this.failedElt = document.getElementById('failed');
    }

    initialize(state) {
        $("#progress tr").remove();
        const prr = this.progressElt.insertRow();
        for (let i = 0; i < state.totalProblems; i++) {
            const c = prr.insertCell();
            c.innerHTML = "&nbsp;"
        }
    }
}

function main() {

    const state = new GameState();
    state.reset();

    const presenter = new GamePresenter();
    presenter.initialize(state);


    window.addEventListener('blur', _ => {
        console.debug('window blur');
    });
    window.addEventListener('focus', _ => {
        console.debug('window focus');
    });
    presenter.resultElt.addEventListener('blur', (ev) => {
        presenter.resultElt.focus();
    });
    presenter.resultElt.addEventListener('keydown', (ev) => {
        console.debug('result keydown: ', presenter.resultElt.value, ev);
        if (isAllowed(ev.key))
            return true;

        ev.preventDefault();
        return false;
    });
    presenter.resultElt.addEventListener('keyup', (ev) => {
        console.debug('result keyup: ', presenter.resultElt.value, ev);
        if (!isAllowed(ev.key)) {
            ev.preventDefault();
            return false;
        }

        if (ev.key === 'Enter') {
            
            
            state.applyAnswer(presenter.resultElt.value);
            
            presenter.update(state);
            
            

            problemElt.innerText = question;
            resultElt.value = '';
            problemStart = now;

            totalElt.innerText = counter;
            solvedElt.innerText = solved;
            failedElt.innerText = failed;

            progressElt.rows[0].cells[totalProblems - counter].className = 'current';

        }

        return true;
    });

    function isAllowed(s) {
        if (s === 'Enter') return true;
        if (s === 'Backspace') return true;
        return /^[0-9]|\-$/.test(s);

    }


    problemElt.innerText = question;

    totalElt.innerText = `${totalProblems}`;


    resultElt.focus();


    const updaterInterval = setInterval(
        () => {
            const now = Date.now();
            const gameTime = now - gameStart;
            const problemTime = now - problemStart;

            timeElt.innerText = `${millisecondsToSeconds(gameTimeLimit - gameTime)}s`;

            if (!resultElt.focused) resultElt.focus();

            if (problemTime > problemTimeLimit) {
                [question, answer] = level2();

                problemElt.innerText = question;
                resultElt.value = '';
                problemStart = now;
            }

            if (gameTime > gameTimeLimit) {
                clearInterval(updaterInterval);
            }
        },
        50
    );

    function millisecondsToSeconds(ms) {
        if (ms < 0) ms = 0;
        return (ms / 1000).toFixed(0);
    }

    function millisecondsToSecondsWithFraction2(ms) {
        if (ms < 0) ms = 0;
        return (ms / 1000).toFixed(2);
    }
}
    