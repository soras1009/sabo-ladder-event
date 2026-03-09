const characters=[
"assets/char01.png",
"assets/char02.png",
"assets/char03.png",
"assets/char04.png",
"assets/char05.png",
"assets/char06.png",
"assets/char07.png",
"assets/char08.png",
"assets/char09.png",
"assets/char10.png"
];

const columns=[
{section:"핫이슈",sub:"삼천리그룹 70년의 기록",link:"http://sabo.samchully.co.kr/202603/special06.php"},
{section:"포커스",sub:"BYD 돌핀 전기차",link:"http://sabo.samchully.co.kr/202603/special03.php"},
{section:"포커스",sub:"사내기자단 정기모임",link:"http://sabo.samchully.co.kr/202603/special02.php"},
{section:"생활안전",sub:"미세먼지 가이드",link:"http://sabo.samchully.co.kr/202603/special01.php"},
{section:"드림팀",sub:"천안전시장",link:"http://sabo.samchully.co.kr/202603/people01.php"},
{section:"삼천리人side",sub:"2016 추억",link:"http://sabo.samchully.co.kr/202603/people04.php"},
{section:"해피투게더",sub:"장학증서",link:"http://sabo.samchully.co.kr/202603/people03.php"},
{section:"가족은 나의 힘",sub:"취미 챌린지",link:"http://sabo.samchully.co.kr/202603/people09.php"},
{section:"삼천리 방방곡곡",sub:"물왕호수 여행",link:"http://sabo.samchully.co.kr/202603/life01.php"},
{section:"삼천리 뉴스",sub:"그룹 소식",link:"http://sabo.samchully.co.kr/202603/life05.php"}
];

const charRow=document.getElementById("characterRow");
const cardRow=document.getElementById("cardRow");
const svg=document.getElementById("ladderSvg");
const runner=document.getElementById("runner");
const sound=document.getElementById("flipSound");

const cards=[];

/* 캐릭터 생성 */

characters.forEach((src,i)=>{

const div=document.createElement("div");
div.className="character";
div.innerHTML=`<img src="${src}">`;

div.onclick=()=>startGame(i);

charRow.appendChild(div);

});

/* 카드 생성 */

columns.forEach((c,i)=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<div class="card-inner">
<div class="card-front">${i+1}</div>
<div class="card-back">
<strong>${c.section}</strong><br>${c.sub}
</div>
</div>
`;

card.onclick=()=>{
window.open(c.link+"?from=ladder&column="+i,"_blank");
};

cardRow.appendChild(card);
cards.push(card);

});

/* 사다리 라인 */

function drawRails(){

const width=svg.clientWidth;
const step=width/10;

for(let i=0;i<10;i++){

const x=step/2+i*step;

const line=document.createElementNS("http://www.w3.org/2000/svg","line");

line.setAttribute("x1",x);
line.setAttribute("x2",x);
line.setAttribute("y1",0);
line.setAttribute("y2",160);
line.setAttribute("stroke","#ccd8ea");
line.setAttribute("stroke-width","2");

svg.appendChild(line);

}

}

window.addEventListener("load",drawRails);

/* 게임 */

function startGame(charIndex){

const width=svg.clientWidth;
const step=width/10;

const result=Math.floor(Math.random()*10);

const startX=step/2+charIndex*step;
const endX=step/2+result*step;

runner.src=characters[charIndex];

runner.style.left=startX+"px";
runner.style.top="0px";

setTimeout(()=>{

runner.style.left=endX+"px";
runner.style.top="150px";

},100);

setTimeout(()=>{

cards[result].classList.add("flip");

if(sound){
sound.currentTime=0;
sound.play();
}

cards[result].scrollIntoView({
behavior:"smooth",
block:"center"
});

},900);

}
