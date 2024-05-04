// lets go

let startPage = document.querySelector(".start"),
  startBtn = document.querySelector(".start .submit"),
  radio = document.querySelectorAll(".radio input"),
  input = document.querySelector(".start input"),
  waitPage = document.querySelector(".wait"),
  messegeError = document.querySelector(".error");

let secWait = document.querySelector(".wait p"),
  lvlName = document.querySelector(".lvlInfo .lvlName"),
  lvlSecond = document.querySelector(".lvlInfo .lvlSecond"),
  theWord = document.querySelector(".theWord p"),
  divWords = document.querySelector(".words"),
  wordInput = document.querySelector(".gameContent input"),
  leftSec = document.querySelector(".leftTime span"),
  wrongTry = document.querySelector(".wrongTry span"),
  score = document.querySelector(".score span"),
  scoreTotal = document.querySelector(".score .total");

let duration = "3";
secWait.innerHTML = duration;
let playersDiv = document.querySelector(".gamePlayers");
let gameOver = document.querySelector(".gameover");

let play_again = document.querySelector(".playagain p");
let showResult = document.querySelector(".start .showresult");

let usersArr = [];
if (window.localStorage.getItem("user")) {
  usersArr = JSON.parse(window.localStorage.getItem("user"));
}

getItemFromLocalStorage();

const words = [
  "win",
  "Hello",
  "hack",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "fish",
  "rabet",
  "superMan",
  "Home",
  "length",
  "princess",
  "king",
  "jackhammer",
];

let EasyWords = [],
  NormalWords = [],
  HardWords = [];

// console.log(EasyWords);
// console.log(NormalWords);
// console.log(HardWords);

// This Function Will Filter The Main Arr
function filterWOrds() {
  words.filter((word) => {
    word.length <= 4
      ? EasyWords.push(word)
      : word.length <= 6
      ? NormalWords.push(word)
      : HardWords.push(word);
  });
}

// ...................
window.onload = function () {
  startPage.classList.add("show");
  input.focus();
};

startBtn.onclick = function () {
  // filterWOrds();
  input.focus();
  getInfo();
  if (getInfo()) {
    beforeGameStart();
    filterWOrds();
    score.innerHTML = 0;
    setTimeout(() => {
      wordInput.focus();
      divWords.style.display = "flex";
      setGameInfo(getInfo());
    }, 3000);
  }
};

// To Get Information From The Start Page
function getInfo() {
  if (input.value == "") {
    window.userName = userName = input.value;
    messegeError.style.display = "block";
  } else {
    messegeError.style.display = "none";
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        window.level_name = level_name = radio[i].value;

        startPage.classList.remove("show");

        return level_name;
      }
    }
  }
}

// Before the game starts there will be a countdown
function beforeGameStart() {
  waitPage.style.display = "flex";
  let time = setInterval(() => {
    secWait.innerHTML--;
    if (secWait.innerHTML === "0") {
      waitPage.style.display = "none";
      secWait.innerHTML = duration;
      clearInterval(time);
    }
  }, 1000);
}

// To Set The Level Name And Set Time And Score
function setGameInfo(level) {
  let levels = {
    Easy: 3,
    Normal: 4,
    Hard: 5,
  };
  lvlName.innerHTML = level;

  window.defaultLvlName = detaultLvlName = levels[level];
  leftSec.innerHTML = detaultLvlName;
  lvlSecond.innerHTML = detaultLvlName;

  if (level === "Easy") {
    scoreTotal.innerHTML = EasyWords.length;
    generateWords(EasyWords);
  } else if (level === "Normal") {
    scoreTotal.innerHTML = NormalWords.length;
    generateWords(NormalWords);
  } else if (level === "Hard") {
    scoreTotal.innerHTML = HardWords.length;
    generateWords(HardWords);
  }
}

// To Generate Arr Words
function generateWords(arr) {
  let random = arr[Math.floor(Math.random() * arr.length)];

  window.word_index = word_index = arr.indexOf(random);

  theWord.innerHTML = random;

  divWords.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(arr[i]));
    divWords.appendChild(p);
  }
  startGame(arr);
}

// The Function That Will Take Action When Game Start
function startGame(arr) {
  leftSec.innerHTML = detaultLvlName;

  let time = setInterval(() => {
    leftSec.innerHTML--;
    if (leftSec.innerHTML === "0") {
      clearInterval(time);
      if (theWord.innerHTML.toLowerCase() === wordInput.value.toLowerCase()) {
        wordInput.value = "";
        score.innerHTML++;
        document.querySelector(".success").play();
        arr.splice(word_index, 1);
        if (arr.length > 0) {
          generateWords(arr);
        }
      } else {
        wrongTry.innerHTML++;
        document.querySelector(".wrong").play();
        wordInput.value = "";
        arr.splice(word_index, 1);
        if (arr.length > 0) {
          generateWords(arr);
        }
      }
      if (arr.length <= 0) {
        gameOver.classList.add("visible");

        divWords.style.display = "none";

        theWord.innerHTML = "";

        wordInput.value = "";

        document.querySelector(".gameover p").style.display = "block";

        setUserInfo(
          input.value,
          level_name,
          score.innerHTML,
          scoreTotal.innerHTML
        );
      }
    }
  }, 1000);
}

// The Function That Will Set User Information
function setUserInfo(name, lvl, score, total) {
  const user = {
    id: Date.now(),
    userName: name,
    levelName: lvl,
    gools: score,
    lvlScore: total,
  };
  usersArr.push(user);

  addUsersToPage(usersArr);
  addUsersToLocalStorage(usersArr);
}

// Function To Add User To Page
function addUsersToPage(arr) {
  playersDiv.innerHTML = "";
  arr.forEach((user) => {
    let div = document.createElement("div");
    div.classList.add("player");
    div.setAttribute("data-id", user.id);

    let name = document.createElement("p");
    name.className = "name";
    name.appendChild(document.createTextNode(`Name : ${user.userName}`));

    let level = document.createElement("p");
    level.className = "level";
    level.appendChild(document.createTextNode(`Level : ${user.levelName}`));

    let gools = document.createElement("p");
    gools.className = "usergools";
    gools.appendChild(document.createTextNode(`Score : ${user.gools}`));

    let totalScore = document.createElement("p");
    totalScore.className = "lvlScore";
    let span1 = document.createElement("span");
    span1.appendChild(document.createTextNode(`Score : ${user.gools} / `));
    let span2 = document.createElement("span");
    span2.appendChild(document.createTextNode(`${user.lvlScore}`));

    let delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.appendChild(document.createTextNode("Delete"));

    playersDiv.appendChild(div);
    div.appendChild(name);
    div.appendChild(level);
    div.appendChild(totalScore);
    totalScore.appendChild(span1);
    totalScore.appendChild(span2);
    div.appendChild(delBtn);
  });
}

// Function To Add User To The Local Storage
function addUsersToLocalStorage(arr) {
  window.localStorage.setItem("user", JSON.stringify(arr));
}

// Function Get User Information From Local Storage
function getItemFromLocalStorage() {
  let data = window.localStorage.getItem("user");
  if (data) {
    let user = JSON.parse(data);
    addUsersToPage(user);
  }
}

// This Event To Create Delete Btn
playersDiv.addEventListener("click", function (eve) {
  if (eve.target.classList.contains("delete")) {
    eve.target.parentElement.remove();
    dleFromStorage(eve.target.parentElement.getAttribute("data-id"));
  }
});

// This Function To Delete User From Local Storage
function dleFromStorage(userYouWont) {
  usersArr = usersArr.filter((user) => user.id != userYouWont);
  addUsersToLocalStorage(usersArr);
}

showResult.onclick = function () {
  gameOver.classList.add("visible");
  startPage.classList.remove("show");
  document.querySelector(".gameover p").style.display = "none";
};

play_again.onclick = function () {
  gameOver.classList.remove("visible");
  startPage.classList.add("show");
  // location.reload();
  input.value = "";
  input.focus();
};

// window.localStorage.removeItem("user");
