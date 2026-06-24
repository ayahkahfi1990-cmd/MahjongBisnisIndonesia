const board = document.getElementById("gameBoard");

const coinText = document.getElementById("coin");
const levelText = document.getElementById("level");
const usahaText = document.getElementById("usaha");
const incomeText = document.getElementById("income");

const xpText = document.getElementById("xp");
const xpMaxText = document.getElementById("xpMax");
const xpBar = document.getElementById("xpBar");

const businessName =
document.getElementById("businessName");

const businessLevel =
document.getElementById("businessLevel");

const businessIncome =
document.getElementById("businessIncome");

const businessImage =
document.getElementById("businessImage");

const cityName =
document.getElementById("cityName");

const bestCoinText =
document.getElementById("bestCoin");

const bestLevelText =
document.getElementById("bestLevel");

const bestIncomeText =
document.getElementById("bestIncome");

const matchSound =
document.getElementById("matchSound");

const coinSound =
document.getElementById("coinSound");

const spinSound =
document.getElementById("spinSound");

const upgradeSound =
document.getElementById("upgradeSound");

const winSound =
document.getElementById("winSound");

let coin =
Number(localStorage.getItem("coin")) || 0;

let level =
Number(localStorage.getItem("level")) || 1;

let xp =
Number(localStorage.getItem("xp")) || 0;

let xpMax =
Number(localStorage.getItem("xpMax")) || 100;

let usahaIndex =
Number(localStorage.getItem("usahaIndex")) || 0;

let bestCoin =
Number(localStorage.getItem("bestCoin")) || 0;

let bestLevel =
Number(localStorage.getItem("bestLevel")) || 1;

let bestIncome =
Number(localStorage.getItem("bestIncome")) || 1;

let matchCount =
Number(localStorage.getItem("matchCount")) || 0;

let upgradeCount =
Number(localStorage.getItem("upgradeCount")) || 0;

const usahaList = [

{
nama:"Gerobak Bakso",
image:"assets/images/bakso.png",
income:1
},

{
nama:"Warung Makan",
image:"assets/images/warung.png",
income:3
},

{
nama:"Minimarket",
image:"assets/images/minimarket.png",
income:6
},

{
nama:"Supermarket",
image:"assets/images/supermarket.png",
income:10
},

{
nama:"Restoran",
image:"assets/images/restoran.png",
income:20
},

{
nama:"Mall",
image:"assets/images/mall.png",
income:35
},

{
nama:"Pabrik",
image:"assets/images/pabrik.png",
income:60
},

{
nama:"Konglomerat",
image:"assets/images/konglomerat.png",
income:100
}

];

const kotaList = [

"Jakarta",
"Bandung",
"Surabaya",
"Medan",
"Makassar"

];

const icons = [
"🍜","🏪","🏭","🚚",
"🍔","🏬","🚗","💰"
];

let cards = [
...icons,
...icons
];

cards.sort(
()=>Math.random()-0.5
);

let first = null;
let second = null;

createBoard();
updateUI();
checkAchievements();
checkMission();

setInterval(()=>{

coin +=
usahaList[usahaIndex].income;

updateUI();

saveGame();

},1000);

function createBoard(){

board.innerHTML="";

cards.forEach(icon=>{

const tile =
document.createElement("div");

tile.className="tile";

tile.textContent=icon;

tile.addEventListener(
"click",
()=>selectTile(tile)
);

board.appendChild(tile);

});

}

function selectTile(tile){

if(
tile.classList.contains("hidden")
)return;

if(tile===first)return;

if(first===null){

first=tile;

tile.classList.add("selected");

return;

}

if(second===null){

second=tile;

tile.classList.add("selected");

checkMatch();

}

}

function checkMatch(){

if(
first.textContent===
second.textContent
){



setTimeout(()=>{

first.classList.add("hidden");
second.classList.add("hidden");

coin += 100;
xp += 25;
matchCount++;

flyCoin();

if(xp>=xpMax){

xp -= xpMax;
level++;
xpMax += 50;

}

updateUI();
saveGame();

checkMission();
checkAchievements();
checkWin();

resetSelection();

},300);

}else{

setTimeout(()=>{

first.classList.remove("selected");
second.classList.remove("selected");

resetSelection();

},500);

}

}

function resetSelection(){

first=null;
second=null;

}

function updateUI(){

coinText.textContent=coin;
levelText.textContent=level;

usahaText.textContent=
usahaList[usahaIndex].nama;

incomeText.textContent=
usahaList[usahaIndex].income;

businessName.textContent=
usahaList[usahaIndex].nama;

businessLevel.textContent=
usahaIndex+1;

businessIncome.textContent=
usahaList[usahaIndex].income;

businessImage.src=
usahaList[usahaIndex].image;

xpText.textContent=xp;
xpMaxText.textContent=xpMax;

xpBar.style.width=
(xp/xpMax*100)+"%";

let cityIndex=0;

if(level>=5) cityIndex=1;
if(level>=10) cityIndex=2;
if(level>=15) cityIndex=3;
if(level>=20) cityIndex=4;

cityName.textContent=
kotaList[cityIndex];

if(coin>bestCoin)
bestCoin=coin;

if(level>bestLevel)
bestLevel=level;

if(
usahaList[usahaIndex].income
>
bestIncome
){

bestIncome=
usahaList[usahaIndex].income;

}

bestCoinText.textContent=
bestCoin;

bestLevelText.textContent=
bestLevel;

bestIncomeText.textContent=
bestIncome;

}

function saveGame(){

localStorage.setItem(
"coin",coin);

localStorage.setItem(
"level",level);

localStorage.setItem(
"xp",xp);

localStorage.setItem(
"xpMax",xpMax);

localStorage.setItem(
"usahaIndex",
usahaIndex);

localStorage.setItem(
"bestCoin",
bestCoin);

localStorage.setItem(
"bestLevel",
bestLevel);

localStorage.setItem(
"bestIncome",
bestIncome);

localStorage.setItem(
"matchCount",
matchCount);

localStorage.setItem(
"upgradeCount",
upgradeCount);

}

function claimReward(){

const today =
new Date().toDateString();

const lastClaim =
localStorage.getItem(
"lastClaim"
);

if(today===lastClaim){

alert(
"Hadiah hari ini sudah diambil!"
);

return;

}

coin += 500;



localStorage.setItem(
"lastClaim",
today
);

updateUI();
saveGame();

alert(
"🎁 +500 Koin"
);

}

function spinLucky(){



const hadiah=[
100,
250,
500,
1000,
2000
];

const hasil=

hadiah[
Math.floor(
Math.random()*
hadiah.length
)
];

coin += hasil;

updateUI();
saveGame();

alert(
"🎡 Lucky Spin\n\n+"+
hasil+
" Koin"
);

}

function upgradeUsaha(){

const biaya=
(usahaIndex+1)*1000;

if(
usahaIndex>=
usahaList.length-1
){

alert(
"Usaha sudah maksimal!"
);

return;

}

if(coin<biaya){

alert(
"Koin tidak cukup!"
);

return;

}

coin-=biaya;

usahaIndex++;

upgradeCount++;



updateUI();
saveGame();

alert(
"🎉 Upgrade Berhasil!"
);

}

function flyCoin(){

const fx=
document.createElement("div");

fx.className=
"coin-fly";

fx.innerHTML="💰";

fx.style.left=
Math.random()*80+"%";

fx.style.top="60%";

document.body.appendChild(fx);

setTimeout(()=>{

fx.remove();

},1000);

}

function checkMission(){

const list=
document.querySelectorAll(
"#missionList li"
);

if(coin>=1000){

list[0].innerHTML=
"✅ Kumpulkan 1000 Koin";

}

if(matchCount>=10){

list[1].innerHTML=
"✅ Match 10 Pasangan";

}

if(upgradeCount>=1){

list[2].innerHTML=
"✅ Upgrade Usaha 1x";

}

}

function checkAchievements(){

const list=
document.querySelectorAll(
"#achievementList li"
);

if(coin>=5000){

list[0].innerHTML=
"✅ Kumpulkan 5000 Koin";

}

if(level>=5){

list[1].innerHTML=
"✅ Level 5";

}

if(
usahaIndex>=7
){

list[2].innerHTML=
"✅ Menjadi Konglomerat";

}

}

function checkWin(){

const hidden=
document.querySelectorAll(
".hidden"
);

if(
hidden.length===
cards.length
){



showWinPopup();

setTimeout(()=>{

restartBoard();

},2000);

}

}

function showWinPopup(){

const popup=
document.createElement("div");

popup.className=
"win-popup";

popup.innerHTML=
"🎊 LEVEL SELESAI 🎊";

document.body.appendChild(
popup
);

setTimeout(()=>{

popup.remove();

},1800);

}

function restartBoard(){

cards.sort(
()=>Math.random()-0.5
);

createBoard();

}

function resetGame(){

if(
confirm(
"Hapus semua data?"
)
){

localStorage.clear();

location.reload();

}

}
