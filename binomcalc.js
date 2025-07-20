class Term{
    constructor(coeff,letter,power){
        this.coeff = Number(coeff);
        this.hasLetter = letter != undefined;
        this.letter = letter;
        this.hasPower = power != undefined;
        this.power = Number(power);
    }

    print(){
        console.log(`Coeff: ${this.coeff}, Letter: ${this.letter}, Power: ${this.power}`);
    }
}

const aObj = document.querySelector("#a");
const symbol = document.querySelector("#symbol");
const bObj = document.querySelector("#b");
const nObj = document.querySelector("#n");
const submit = document.querySelector("#submitButton");
const resultPrompt = document.querySelector("#resultPrompt");
const result = document.querySelector("#result");

let a;
let b;
let n;
let newTerms;

submit.addEventListener("click",checkForValidity);


function checkForValidity(){
    let valid = true;
    /* if(symbol.value != "+" || symbol.value != "-"){
        valid = false;
    } */
    valid = (symbol.value == "+" || symbol.value == "-") && /^[1-9]{1}\d*$/.test(nObj.value);

    if(valid){
        const temp = [aObj,bObj];
        const regex = /^(?!$)(-?\d*)(?:([a-z])(?:\^(\d+))?)?$/;
        for(let i = 0; i < 2; i++)
        {
            if(!regex.test(temp[i].value)){
                valid = false;
                break;
            }
        }
    }
    if(valid){
        seperateTerms();
    }else{
        resultPrompt.innerHTML = "Incorrect Format. Please Try Again.";
    }
}
function seperateTerms(){
    let coeff;
    let letter;
    let power;
    function createValues(term){
        const match = term.value.match(/^(?!$)(-?\d*)(?:([a-z])(?:\^(\d+))?)?$/);
        coeff = match[1] == "" ? 1: match[1] == "-" ? -1: match[1];
        letter = match[2];
        power = match[3] == undefined ? 1: match[3];
        // console.log(`${term}, ${coeff}, ${letter}, ${power}`);
    }

    createValues(aObj);
    a = new Term(Number(coeff), letter, power);

    createValues(bObj);
    b = new Term(symbol.value == "-" ? Number("-" + coeff): Number(coeff), letter, power);

    n = Number(nObj.value);
    
    /* a.print();
    b.print(); */

    makeNewTerms();
}
function makeNewTerms(){
    function factorial(num){
        if (num == 0) return 1;
        let product = 1;
        for(let i = 1; i <= num; i++){
            product *= i;
        }
        return product;
    }
    function c(n,k){
        return factorial(n) / (factorial(k) * factorial (n-k));
    }

    terms = new Array(n+1);

    for(let i = 0; i <= n;i++){
        let newCoeff = String(c(n,i) * Math.pow(a.coeff,n-i) * Math.pow(b.coeff, i));
        let letter = "";
        let aPower = (n-i) * a.power;
        let bPower = i * b.power;
        letter += a.letter == undefined || n-i == 0? "": `${a.letter}`;
        letter += aPower == 1 || a.letter == undefined || n-i == 0? "":`^${aPower}`;
        letter += b.letter == undefined || i == 0 ? "": `${b.letter}`;
        letter += bPower == 1 || b.letter == undefined || i == 0 ? "":`^${bPower}`
        terms[i] = newCoeff == 1 && letter != ""? letter: newCoeff + letter;
    }
    // console.log(terms);

    printAnswer();
}
function printAnswer(){
    resultPrompt.innerHTML = "Result:";
    result.innerHTML = "";
    result.innerHTML += terms[0].replace(/\^(\d+)/g, '<sup>$1</sup>');
    for(let i = 1; i <= n; i++){
        if(terms[i][0] == "-"){
            result.innerHTML += " - ";
            terms[i] = terms[i].slice(1);
        }else{
            result.innerHTML += " + ";
        }
        
        console.log(terms[i].replace(/\^(\d+)/g, '<sup>$1</sup>'));
        result.innerHTML += terms[i].replace(/\^(\d+)/g, '<sup>$1</sup>');
    }
    // console.log(result.innerHTML);
    
    // console.log(terms);
}