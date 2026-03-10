const characters = [
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

const columns = [
  {
    id: "col01_hot_issue",
    section: "핫이슈",
    sub: "삼천리그룹 70년의 기록, 우리의 미래를 비추다",
    link: "http://sabo.samchully.co.kr/202603/special06.php"
  },
  {
    id: "col02_focus_ev",
    section: "포커스",
    sub: "삼천리EV가 제안하는 실속형 전기차 등장",
    link: "http://sabo.samchully.co.kr/202603/special03.php"
  },
  {
    id: "col03_focus_reporters",
    section: "포커스",
    sub: "사내기자단이 펼쳐갈 소통의 장",
    link: "http://sabo.samchully.co.kr/202603/special02.php"
  },
  {
    id: "col04_safety_story",
    section: "생활안전 이야기",
    sub: "봄 맞이 미세먼지 정복 가이드",
    link: "http://sabo.samchully.co.kr/202603/special01.php"
  },
  {
    id: "col05_dream_team",
    section: "우리는 드림팀!",
    sub: "We Higher! 2026 더 큰 도약을 위하여!",
    link: "http://sabo.samchully.co.kr/202603/people01.php"
  },
  {
    id: "col06_inside",
    section: "삼천리人side",
    sub: "Recap 2016… 그땐 그랬지!",
    link: "http://sabo.samchully.co.kr/202603/people04.php"
  },
  {
    id: "col07_happy_together",
    section: "해피 투게더",
    sub: "BEYOND AI 시대 아름다운 리더를 꿈꾸다",
    link: "http://sabo.samchully.co.kr/202603/people03.php"
  },
  {
    id: "col08_family_power",
    section: "가족은 나의 힘",
    sub: "슬기로운 취미생활",
    link: "http://sabo.samchully.co.kr/202603/people09.php"
  },
  {
    id: "col09_trip",
    section: "삼천리 방방곡곡",
    sub: "속도와 고요함이라는 상반된 세계의 완벽한 균형",
    link: "http://sabo.samchully.co.kr/202603/life01.php"
  },
  {
    id: "col10_group_news",
    section: "삼천리그룹 소식",
    sub: "70주년 사사 발간 등 그룹 주요 소식",
    link: "http://sabo.samchully.co.kr/202603/life05.php"
  }
];

const icons = ["🔥", "🚗", "📰", "🌿", "🏆", "📚", "🎓", "🏠", "🌍", "📢"];

const characterRow = document.getElementById("characterRow");
const cardRow = document.getElementById("cardRow");
const ladderSvg = document.getElementById("ladderSvg");
const runner = document.getElementById("runner");

let cards = [];
let characterEls = [];
let ladderState = null;
let isPlaying = false;

function createSVG(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}

function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function createCharacters() {
  characterRow.innerHTML = "";
  characterEls = [];

  characters.forEach((src, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "character";
    btn.innerHTML = `<img src="${src}" alt="캐릭터 ${index + 1}" />`;

    btn.addEventListener("click", () => {
      if (isPlaying) return;
      startGame(index);
    });

    characterRow.appendChild(btn);
    characterEls.push(btn);
  });
}

function createCards() {
  cardRow.innerHTML = "";
  cards = [];

  columns.forEach((column, index) => {
    const card = document.createElement("div");
    card.className = `card card-${index + 1}`;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <div class="card-icon">${icons[index]}</div>
          <div class="card-no">${index + 1}</div>
        </div>
        <div class="card-back">
          <div class="card-back-inner">
            <p class="card-section">${column.section}</p>
            <p class="card-sub">${column.sub}</p>
            <a class="card-link" href="${column.link}?from=ladder&column=${column.id}" target="_blank" rel="noopener noreferrer">
              칼럼 보러 가기
            </a>
          </div>
        </div>
      </div>
    `;

    cardRow.appendChild(card);
    cards.push(card);
  });
}

function buildLadder() {
  ladderSvg.innerHTML = "";

  const width = 1000;
  const height = 320;
  const cols = 10;
  const topY = 16;
  const bottomY = 300;
  const colStep = width / cols;
  const xPositions = Array.from({ length: cols }, (_, i) => colStep * i + colStep / 2);

  // 세로줄
  xPositions.forEach((x) => {
    const line = createSVG("line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", topY);
    line.setAttribute("x2", x);
    line.setAttribute("y2", bottomY);
    line.setAttribute("stroke", "#bfd0ea");
    line.setAttribute("stroke-width", "3");
    line.setAttribute("stroke-linecap", "round");
    ladderSvg.appendChild(line);
  });

  // 가로줄 랜덤 생성
  const rungYs = [46, 76, 106, 136, 166, 196, 226, 256, 286];
  const rungs = [];

  rungYs.forEach((y) => {
    const rowUsed = new Set();
    const candidates = shuffle([...Array(cols - 1).keys()]);

    candidates.forEach((leftCol) => {
      if (rowUsed.has(leftCol) || rowUsed.has(leftCol - 1) || rowUsed.has(leftCol + 1)) return;

      if (Math.random() < 0.55) {
        rowUsed.add(leftCol);

        const rung = {
          left: leftCol,
          right: leftCol + 1,
          y
        };
        rungs.push(rung);

        const line = createSVG("line");
        line.setAttribute("x1", xPositions[rung.left]);
        line.setAttribute("y1", y);
        line.setAttribute("x2", xPositions[rung.right]);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#9fb9e5");
        line.setAttribute("stroke-width", "4");
        line.setAttribute("stroke-linecap", "round");
        ladderSvg.appendChild(line);
      }
    });

    // 각 줄에 최소 1개는 보장
    if (!rungs.some((r) => r.y === y)) {
      const forced = Math.floor(Math.random() * (cols - 1));
      const rung = {
        left: forced,
        right: forced + 1,
        y
      };
      rungs.push(rung);

      const line = createSVG("line");
      line.setAttribute("x1", xPositions[rung.left]);
      line.setAttribute("y1", y);
      line.setAttribute("x2", xPositions[rung.right]);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "#9fb9e5");
      line.setAttribute("stroke-width", "4");
      line.setAttribute("stroke-linecap", "round");
      ladderSvg.appendChild(line);
    }
  });

  return {
    width,
    height,
    cols,
    topY,
    bottomY,
    xPositions,
    rungs: rungs.sort((a, b) => a.y - b.y)
  };
}

function computePath(startCol) {
  const { xPositions, topY, bottomY, rungs } = ladderState;

  let currentCol = startCol;
  let currentX = xPositions[currentCol];
  let currentY = topY;

  const points = [{ x: currentX, y: currentY }];
  const segments = [];

  rungs.forEach((rung) => {
    if (rung.left !== currentCol && rung.right !== currentCol) return;

    if (currentY !== rung.y) {
      segments.push({
        x1: currentX,
        y1: currentY,
        x2: currentX,
        y2: rung.y
      });
      points.push({ x: currentX, y: rung.y });
    }

    const nextCol = rung.left === currentCol ? rung.right : rung.left;
    const nextX = xPositions[nextCol];

    segments.push({
      x1: currentX,
      y1: rung.y,
      x2: nextX,
      y2: rung.y
    });
    points.push({ x: nextX, y: rung.y });

    currentCol = nextCol;
    currentX = nextX;
    currentY = rung.y;
  });

  if (currentY !== bottomY) {
    segments.push({
      x1: currentX,
      y1: currentY,
      x2: currentX,
      y2: bottomY
    });
    points.push({ x: currentX, y: bottomY });
  }

  return {
    endCol: currentCol,
    points,
    segments
  };
}

function drawHighlightedPath(segments) {
  segments.forEach((seg, index) => {
    const line = createSVG("line");
    line.setAttribute("x1", seg.x1);
    line.setAttribute("y1", seg.y1);
    line.setAttribute("x2", seg.x1);
    line.setAttribute("y2", seg.y1);
    line.setAttribute("stroke", "#2563eb");
    line.setAttribute("stroke-width", "6");
    line.setAttribute("stroke-linecap", "round");
    line.style.transition = "all 0.18s linear";
    ladderSvg.appendChild(line);

    setTimeout(() => {
      line.setAttribute("x2", seg.x2);
      line.setAttribute("y2", seg.y2);
    }, index * 180);
  });
}

function animateRunner(src, points) {
  runner.src = src;
  runner.classList.remove("hidden");

  const scaleX = ladderSvg.clientWidth / ladderState.width;
  const scaleY = ladderSvg.clientHeight / ladderState.height;

  const mappedPoints = points.map((p) => ({
    x: p.x * scaleX,
    y: p.y * scaleY
  }));

  if (!mappedPoints.length) return 0;

  runner.style.left = `${mappedPoints[0].x}px`;
  runner.style.top = `${mappedPoints[0].y}px`;

  mappedPoints.forEach((point, index) => {
    setTimeout(() => {
      runner.style.left = `${point.x}px`;
      runner.style.top = `${point.y}px`;
    }, index * 180);
  });

  return (mappedPoints.length - 1) * 180 + 220;
}

function resetBoard() {
  cards.forEach((card) => card.classList.remove("flip"));
  characterEls.forEach((el) => {
    el.classList.remove("is-active", "is-disabled");
  });
  runner.classList.add("hidden");
  ladderState = buildLadder();
}

function startGame(charIndex) {
  isPlaying = true;

  cards.forEach((card) => card.classList.remove("flip"));
  characterEls.forEach((el, idx) => {
    el.classList.toggle("is-active", idx === charIndex);
    el.classList.add("is-disabled");
  });

  const path = computePath(charIndex);
  drawHighlightedPath(path.segments);
  const totalDuration = animateRunner(characters[charIndex], path.points);

  setTimeout(() => {
    cards[path.endCol].classList.add("flip");
    cards[path.endCol].scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    characterEls.forEach((el) => el.classList.remove("is-disabled"));
    isPlaying = false;
  }, totalDuration);
}

function init() {
  createCharacters();
  createCards();
  resetBoard();

  window.addEventListener("resize", () => {
    if (isPlaying) return;
    resetBoard();
  });
}

init();
