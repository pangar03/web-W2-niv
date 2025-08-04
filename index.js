// Globals

const words = ["Manzana", "Caracol", "Lentes", "Cuchara", "Pepino", "Pizarra"];

const result = document.getElementById("result");

let preview = document.getElementById("word");
const form = document.getElementById("word-input");

const mistakeList = document.getElementById("mistakes");


let tries = 0;
// Functionality

const selectWord = () => {
    return words[Math.floor(Math.random() * words.length)]
}

const startGame = () => {
    tries = 0;
    preview.innerHTML = "";
    result.innerHTML = "";
    mistakeList.innerHTML = "";
    const word = selectWord();
    const wordArr = word.split("");
    let buildWord = [];

    wordArr.forEach(() => {
        buildWord.push(null);
    })

    for(let i = 0; i < wordArr.length; i++){
        preview.innerHTML += "_";
        preview.innerHTML += " ";
    }

    console.log(wordArr)
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if(tries < 6){
            const inputWord = document.getElementById("input").value;
            const inputArr = inputWord.split("");

            check(wordArr, inputArr, buildWord);
            console.log(wordArr, inputArr, buildWord);
            showProgress(buildWord);
        }
    });
}

const randButton = document.getElementById("random").addEventListener("click", startGame);

const check = (word, input, build) => {
    for(let i = 0; i < input.length; i++){
        let found = false;
        for(let j = 0; j < word.length; j++){
            if(input[i].toLowerCase() === word[j].toLowerCase()){
                build[j] = input[i].toUpperCase();
                found = true;
                if(build.join("").toLowerCase() === word.join("").toLowerCase()){
                    result.textContent = "Felicitaciones, Has ganado 🎉";
                }
            }
            
        }

        if(!found){
            console.log(tries);
            tries++;
            const mistake = document.createElement("li");
            mistake.textContent = input[i].toUpperCase();
            mistakeList.appendChild(mistake);
        }
        
        if(tries >= 6){
            if(tries >= 6){
                result.textContent = "Game Over 💀"
                return;
            };
        }
    }
}

const showProgress = (build) => {
    preview.innerHTML = "";
    build.forEach(char => {
        if(char === null){
            preview.innerHTML += "_ ";
        } else {
            preview.innerHTML += `${char} `;""
        }
    })
}
    
startGame()