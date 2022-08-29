const field = document.getElementById("field");

const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const cardsType = {
    "full": ["Spade", "Clover", "Heart", "Diamond"],
    "half": ["Spade", "Clover"]
};
let cardList = [];

let openCount = 0;
let selectedElement = [];
let isWaiting = false;
let playerLength = 0;
let playerData = [];
let nowPlayer = 1;
let remaining = 0;

//shuffle array
const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}


//sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


//click event
const openCard = async (e) => {
    const targetElement = e.currentTarget;
    if (isWaiting || targetElement.classList.contains("open") || targetElement.classList.contains("correct")) return;
    
    openCount++;

    const index = Number(targetElement.id);
    selectedElement.push(cardList[index]);
    targetElement.classList.add("open");
    

    if (openCount >= 2) {
        if (selectedElement[0][0] === selectedElement[1][0]) {
            selectedElement = [];
            remaining -= 2;
            openCount = 0;

            addClassByClassName("open", "correct");
            removeClass("open");
            addCard();
            
            if(remaining === 0) {
                finish();
            }
            
            return;
        }

        isWaiting = true;
        await sleep(1000);

        openCount = 0;
        selectedElement = [];
        removeClass("open");
        switchPlayer();

        isWaiting = false;
    }
}


//add have the card count of player
const addCard = () => {
    playerData[nowPlayer - 1][1] += 2;
    const player = document.getElementById("playerData").childNodes[nowPlayer - 1];
    player.querySelector("span").textContent = playerData[nowPlayer - 1][1];
}


//switch user
const switchPlayer = () => {
    const element = document.getElementById("nowPlayerName");
    nowPlayer++;

    if(playerLength < nowPlayer) {
        nowPlayer = 1;
    }
    
    element.textContent = "ユーザー" + nowPlayer + "の番"
}


//remove class
const removeClass = (className) => {
    const elements = document.getElementsByClassName(className);

    Array.from(elements).forEach(e => e.classList.remove(className));
}


//add class by class name
const addClassByClassName = (targetClass, addClass) => {
    const elements = document.getElementsByClassName(targetClass);

    Array.from(elements).forEach((e) => {
        e.classList.add(addClass);
    })
}

const finish = () => {
    //winner: [playerId, score]
    let winner = [0, 0];
    for (let player of playerData) {
        if (winner[1] < player[1]) {
            winner = [player[0], player[0]];
        }
        if (winner[1] === player[1]) {
            winner[0].push(player[0]);
        }
    }
    document.getElementById("nowPlayerName").textContent = "プレイヤー" + winner[0] + "の勝利！！";
    const resetElement = document.createElement("a");
    resetElement.href = "";
    resetElement.textContent = "初期化";

    document.getElementById("field").appendChild(resetElement);
}


const setupField = () => {
    const difficult = document.getElementById("difficult").value;
    playerLength = Number(document.getElementById("numberOfPlayer").value);
    document.getElementById("nowPlayerName").textContent = "ユーザー1の番"

    remaining = difficult === "half" ? 24: 48;
    
    for(let i = 1; i < (playerLength+1); i++) {
        playerData.push([i, 0]);
        const playerElement = document.createElement("p");
        playerElement.innerHTML = "ユーザー" + i + ": <span>0</span>";

        document.getElementById("playerData").appendChild(playerElement);
    }

    //create card list
    for(let number of cards) {
        for(let type of cardsType[difficult]) {
            cardList.push([number, type]);
        }
    }

    //shuffle card list
    shuffle(cardList);
    
    //remove setting display
    document.getElementById("setting").remove();

    for(let card of cardList) {
        const element = document.createElement("div");
        element.addEventListener("click", (e) => openCard(e), false);

        const numberElement = document.createElement("p");
        const typeElement = document.createElement("p");

        element.id = cardList.indexOf(card);
        element.classList.add("card");
        numberElement.textContent = card[0];
        typeElement.textContent = card[1];

        field.appendChild(element);
        element.appendChild(numberElement);
        element.appendChild(typeElement);
    }

    console.log("created field");
}
