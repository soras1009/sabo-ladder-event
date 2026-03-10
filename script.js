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
    const item = document.createElement("button");
    item.type = "button";
    item.className = "character";

    item.innerHTML = `<img src="${src}" alt="캐릭터 ${index + 1}" />`;

    item.addEventListener("click", () => {
      if (isPlaying) return;
      startGame(index);
    });

    characterRow.appendChild(item);
    characterEls.push(item);
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
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (!card.classList.contains("flip")) return;
      const url = `${column.link}?from=ladder&column=${column.id}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });

    cardRow.appendChild(card);
    cards.push(card);
  });
}

function drawLine(x1, y1, x2, y2, stroke, width, className = "") {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", stroke);
  line.setAttribute("stroke-width", width);
  line.setAttribute("stroke-linecap", "round");
  if (className) line.setAttribute("class", className);
  ladderSvg.appendChild(line);
  return line;
}

function buildLadder() {
  ladderSvg.innerHTML = "";

  const width = 1000;
  const height = 320;
  const cols = 10;
  const topY = 10;
  const bottomY = 310;
  const colStep = width / cols;
  const xPositions = Array.from({ length: cols }, (_, i) => colStep * i + colStep / 2);

  const rungYs = [48, 82, 116, 150, 184, 218, 252, 286];
  const rungs = [];

  xPositions.forEach((x) => {
    drawLine(x, topY, x, bottomY, "#bfd0ea", 3);
  });

  rungYs.forEach((y, rowIndex) => {
    const possible = shuffle([...Array(cols - 1).keys()]);
    const used = new Set();
    const rowRungs = [];

    possible.forEach((col) => {
      if (used.has(col) || used.has(col - 1) || used.has(col + 1)) return;
      if (Math.random() < 0.58) {
        const x1 = xPositions[col];
        const x2 = xPositions[col + 1];
        const line = drawLine(x1, y, x2, y, "#9fb9e5", 4);
        rowRungs.push({ left: col, right: col + 1, y, line });
        used.add(col);
      }
    });

    // 너무 빈약하면 최소 1개는 보장
    if (rowRungs.length === 0) {
      const forced = Math.floor(Math.random() * (cols - 1));
      const x1 = xPositions[forced];
      const x2 = xPositions[forced + 1];
      const line = drawLine(x1, y, x2, y, "#9fb9e5", 4);
      rowRungs.push({ left: forced, right: forced + 1, y, line });
    }

    rungs.push(...rowRungs);
  });

  return {
    width,
    height,
    cols,
    xPositions,
    topY,
    bottomY,
    rungs
  };
}

function computePath(startCol) {
  const state = ladderState;
  const sortedRungs = [...state.rungs].sort((a, b) => a.y - b.y);

  const points = [];
  const highlightSegments = [];

  let currentCol = startCol;
  let currentX = state.xPositions[currentCol];
  let currentY = state.topY;

  points.push({ x: currentX, y: currentY });

  for (const rung of sortedRungs) {
    const touches =
      (rung.left === currentCol || rung.right === currentCol);

    if (!touches) continue;

    // 세로로 내려오는 구간
    if (currentY !== rung.y) {
      points.push({ x: currentX, y: rung.y });
      highlightSegments.push({
        type: "vertical",
        x1: currentX,
        y1: currentY,
        x2: currentX,
        y2: rung.y
      });
    }

    // 가로 이동 구간
    const nextCol = rung.left === currentCol ? rung.right : rung.left;
    const nextX = state.xPositions[nextCol];

    points.push({ x: nextX, y: rung.y });
    highlightSegments.push({
      type: "horizontal",
      x1: currentX,
      y1: rung.y,
      x2: nextX,
      y2: rung.y
    });

    currentCol = nextCol;
    currentX = nextX;
    currentY = rung.y;
  }

  if (currentY !== state.bottomY) {
    points.push({ x: currentX, y: state.bottomY });
    highlightSegments.push({
      type: "vertical",
      x1: currentX,
      y1: currentY,
      x2: currentX,
      y2: state.bottomY
    });
  }

  return {
    endCol: currentCol,
    points,
    highlightSegments
  };
}

function drawHighlightedPath(segments) {
  const lines = [];
  segments.forEach((seg, index) => {
    const line = drawLine(seg.x1, seg.y1, seg.x1, seg.y1, "#1d4ed8", 6, "path-highlight");
    lines.push({ line, seg, delay: index * 180 });
  });

  lines.forEach(({ line, seg, delay }) => {
    setTimeout(() => {
      line.setAttribute("x2", seg.x2);
      line.setAttribute("y2", seg.y2);
      line.style.transition = "all 0.16s linear";
    }, delay);
  });

  return lines;
}

function animateRunner(imgSrc, points) {
  runner.src = imgSrc;
  runner.classList.remove("hidden");

  const scaleX = ladderSvg.clientWidth / ladderState.width;
  const scaleY = ladderSvg.clientHeight / ladderState.height;

  const mapped = points.map((p) => ({
    x: p.x * scaleX,
    y: p.y * scaleY
  }));

  if (mapped.length === 0) return 0;

  runner.style.left = `${mapped[0].x}px`;
  runner.style.top = `${mapped[0].y}px`;

  mapped.forEach((point, index) => {
    setTimeout(() => {
      runner.style.left = `${point.x}px`;
      runner.style.top = `${point.y}px`;
    }, index * 180);
  });

  return (mapped.length - 1) * 180 + 220;
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

  const pathResult = computePath(charIndex);
  drawHighlightedPath(pathResult.highlightSegments);
  const duration = animateRunner(characters[charIndex], pathResult.points);

  setTimeout(() => {
    const targetCard = cards[pathResult.endCol];
    targetCard.classList.add("flip");
    targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

    characterEls.forEach((el) => el.classList.remove("is-disabled"));
    isPlaying = false;
  }, duration);
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
