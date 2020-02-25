let runningTotal = 0;
let buffer = "0";
let preveriousOperator;


const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(value)){
        //not num
        handleSymble(value);
    }else{
        //num
        handleNumber(value);
    }
    screen.innerText = buffer;

}

function handleSymble(symble){
    if (symble === 'C'){
        buffer = '0';
        runningTotal = 0;
    }

    switch (symble){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (preveriousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            preveriousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;

            break;
        case  '←':
            if (buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substr(0,buffer.length-1);
            }
            break;

        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symble);
            break;

    }
}

function handleMath(symble){
    if (buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal ===0 ){
        runningTotal+=intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    preveriousOperator = symble;

    buffer = '0';

}

function flushOperation(intBuffer){
    if (preveriousOperator==='+'){
        runningTotal += intBuffer;
    }else if (preveriousOperator==='-'){
        runningTotal -= intBuffer;
    }else if (preveriousOperator==='×'){
        runningTotal *= intBuffer;
    }else{
        runningTotal /= intBuffer;
    }
}


function handleNumber(numString){
    if (buffer==="0"){
        buffer = numString;
    }else{
        buffer += numString;
    }
}

function init(){
    document.querySelector('.calc-buttons')
        .addEventListener('click',function(event){
            buttonClick(event.target.innerText);
        })

}

init()