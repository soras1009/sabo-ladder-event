const characters = [
  { id: "char01", image: "assets/char01.png" },
  { id: "char02", image: "assets/char02.png" },
  { id: "char03", image: "assets/char03.png" },
  { id: "char04", image: "assets/char04.png" },
  { id: "char05", image: "assets/char05.png" },
  { id: "char06", image: "assets/char06.png" },
  { id: "char07", image: "assets/char07.png" },
  { id: "char08", image: "assets/char08.png" },
  { id: "char09", image: "assets/char09.png" },
  { id: "char10", image: "assets/char10.png" }
];

const columns = [
  {
    id: "col01_hot_issue",
    section: "핫이슈",
    subtext: "삼천리그룹 70년의 기록, 우리의 미래를 비추다｜《삼천리그룹 70년사》 발간",
    link: "http://sabo.samchully.co.kr/202603/special06.php"
  },
  {
    id: "col02_focus_ev",
    section: "포커스",
    subtext: "삼천리EV가 제안하는 실속형 전기차 등장｜‘BYD DOLPHIN(돌핀)’의 야심찬 돌풍",
    link: "http://sabo.samchully.co.kr/202603/special03.php"
  },
  {
    id: "col03_focus_reporters",
    section: "포커스",
    subtext: "그룹 메신저, 사내기자단이 펼쳐갈 소통의 장｜2026 삼천리그룹 사내기자단 정기모임",
    link: "http://sabo.samchully.co.kr/202603/special02.php"
  },
  {
    id: "col04_safety_story",
    section: "생활안전 이야기",
    subtext: "봄 맞이 미세먼지 정복 가이드",
    link: "http://sabo.samchully.co.kr/202603/special01.php"
  },
  {
    id: "col05_dream_team",
    section: "우리는 드림팀!",
    subtext: "We Higher! 2026 더 큰 도약을 위하여!｜삼천리 모터스 천안전시장",
    link: "http://sabo.samchully.co.kr/202603/people01.php"
  },
  {
    id: "col06_inside",
    section: "삼천리人side",
    subtext: "Recap 2016… 그땐 그랬지!",
    link: "http://sabo.samchully.co.kr/202603/people04.php"
  },
  {
    id: "col07_happy_together",
    section: "해피 투게더",
    subtext: "BEYOND AI 시대 아름다운 리더를 꿈꾸다｜2026 제40기 천만문화재단 장학증서 수여식",
    link: "http://sabo.samchully.co.kr/202603/people03.php"
  },
  {
    id: "col08_family_power",
    section: "가족은 나의 힘",
    subtext: "슬기로운 취미생활｜삼천리그룹 가족들의 취미박스 챌린지",
    link: "http://sabo.samchully.co.kr/202603/people09.php"
  },
  {
    id: "col09_trip",
    section: "삼천리 방방곡곡",
    subtext: "속도와 고요함이라는 상반된 세계의 완벽한 균형｜M235 그란 쿠페와 시흥 물왕호수 여행",
    link: "http://sabo.samchully.co.kr/202603/life01.php"
  },
  {
    id: "col10_group_news",
    section: "삼천리그룹 소식",
    subtext: "70주년 사사 발간 등 그룹 주요 소식",
    link: "http://sabo.samchully.co.kr/202603/life05.php"
  }
];

const characterGrid = document.getElementById("characterGrid");
const resultCard = document.getElementById("resultCard");
const resultSection = document.getElementById("resultSection");
const resultSubtext = document.getElementById("resultSubtext");
const resultLink = document.getElementById("resultLink");
const retryBtn = document.getElementById("retryBtn");

let mappedColumns = [];
let activeButton = null;

function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function initGame() {
  mappedColumns = shuffle(columns);
  renderCharacters();
  resetResult();
}

function renderCharacters() {
  characterGrid.innerHTML = "";

  characters.forEach((character, index) => {
    const button = document.createElement("button");
    button.className = "character-btn";
    button.type = "button";
    button.innerHTML = `<img src="${character.image}" alt="캐릭터 ${index + 1}" />`;

    button.addEventListener("click", () => {
      document.querySelectorAll(".character-btn").forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      activeButton = button;
      const result = mappedColumns[index];
      showResult(result);
      resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    characterGrid.appendChild(button);
  });
}

function showResult(result) {
  resultSection.textContent = result.section;
  resultSubtext.textContent = result.subtext;
  resultLink.href = result.link;
  resultCard.classList.remove("hidden");
}

function resetResult() {
  resultCard.classList.add("hidden");
  resultSection.textContent = "";
  resultSubtext.textContent = "";
  resultLink.href = "#";
  document.querySelectorAll(".character-btn").forEach((btn) => btn.classList.remove("is-active"));
  activeButton = null;
}

retryBtn.addEventListener("click", initGame);
initGame();
