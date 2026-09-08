/* =========================================================
   1. DỮ LIỆU NAVMENU DẠNG BẢNG CHỮ TỐI GIẢN
   ========================================================= */
const navMenuData = {
  "KHÓA HỌC": {
    linksMain: [
      { name: "HSK SƠ CẤP (HSK 1 - 2)", url: "#" },
      { name: "HSK TRUNG CẤP (HSK 3 - 4)", url: "#" },
      { name: "HSK CAO CẤP (HSK 5 - 6)", url: "#" },
      { name: "GIAO TIẾP SIÊU TỐC", url: "#" }
    ],
    linksSub: [
      { name: "LỘ TRÌNH HỌC TỐI ƯU 2026", url: "#" }
    ]
  },
  "THƯ VIỆN": {
    linksMain: [
      { name: "ĐỀ THI HSK TẢI VỀ", url: "#" },
      { name: "TỪ VỰNG THEO CHỦ ĐỀ", url: "#" },
      { name: "MẸO LÀM BÀI THI", url: "#" }
    ],
    linksSub: []
  },
  "玲玲HSK": {
    linksMain: [
      { name: "VỀ LINGLING HSK", url: "#" },
      { name: "ĐỘI NGŨ GIẢNG VIÊN", url: "#" },
      { name: "vừa học vừa chơi!!!", url: "game1.html" }
    ],
    linksSub: []
  }
};

/* =========================================================
   2. HÀM THÔNG BÁO GIỮA MÀN HÌNH (PREMIUM CENTER TOAST)
   ========================================================= */
function showCenterToast(message, icon = "✅", duration = 1600) {
  const oldToast = document.getElementById('customToast');
  if (oldToast) oldToast.remove();

  const toastHTML = `
    <div class="custom-toast-overlay" id="customToast">
      <div class="custom-toast-box">
        <div class="custom-toast-icon-wrapper">
          <span class="custom-toast-icon">${icon}</span>
        </div>
        <div class="custom-toast-message">${message}</div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', toastHTML);
  const toast = document.getElementById('customToast');

  setTimeout(() => toast.classList.add('show'), 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
        resolve();
      }, 300);
    }, duration);
  });
}

/* =========================================================
   3. CÁC HÀM BỔ TRỢ NAVMENU & SEARCH
   ========================================================= */
function initDropdownMenu() {
  const navItems = document.querySelectorAll('.nav-links > li.has-dropdown');

  navItems.forEach(li => {
    const linkTag = li.querySelector('a');
    if (!linkTag) return;

    const title = linkTag.innerText.trim().toUpperCase();
    const data = navMenuData[title];

    if (data) {
      const mainLinksHTML = data.linksMain
        .map(item => `<li><a href="${item.url}">${item.name}</a></li>`)
        .join('');

      const subLinksHTML = data.linksSub && data.linksSub.length > 0
        ? `<ul class="dropdown-links-sub">
            ${data.linksSub.map(item => `<li><a href="${item.url}">${item.name}</a></li>`).join('')}
           </ul>`
        : '';

      const dropdownHTML = `
        <div class="dropdown-menu">
          <ul class="dropdown-links-main">${mainLinksHTML}</ul>
          ${subLinksHTML}
        </div>
      `;

      li.insertAdjacentHTML('beforeend', dropdownHTML);
    }
  });
}

/* =========================================================
   4. KHỞI TẠO LOGIC KHI DOM READY (NAV & SEARCH)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initDropdownMenu();

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeBtn = document.getElementById('closeBtn');
  const navMenuWrapper = document.getElementById('navMenuWrapper');
  const menuOverlay = document.getElementById('menuOverlay');

  const searchBtn = document.getElementById('searchBtn');
  const searchBox = document.getElementById('searchBox');
  const searchInput = document.getElementById('searchInput');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');
  const dropdownResults = document.getElementById('searchResultsDropdown');

  function openMobileMenu() {
    if (navMenuWrapper) navMenuWrapper.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMobileMenu() {
    if (navMenuWrapper) navMenuWrapper.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

  const hasDropdownItems = document.querySelectorAll('.nav-links > li.has-dropdown');
  hasDropdownItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchBox.classList.toggle('active');
      if (searchBox.classList.contains('active') && searchInput) {
        searchInput.focus();
      }
    });
    searchBox.addEventListener('click', (e) => e.stopPropagation());
  }

  document.addEventListener('click', () => {
    if (searchBox) searchBox.classList.remove('active');
  });

  function getRealPageData() {
    const realData = [];
    const addedTitles = new Set();

    if (typeof navMenuData !== 'undefined') {
      Object.keys(navMenuData).forEach(catKey => {
        const cat = navMenuData[catKey];
        if (cat.linksMain) {
          cat.linksMain.forEach(item => {
            if (!addedTitles.has(item.name)) {
              addedTitles.add(item.name);
              realData.push({ title: item.name, url: item.url, category: catKey });
            }
          });
        }
        if (cat.linksSub) {
          cat.linksSub.forEach(item => {
            if (!addedTitles.has(item.name)) {
              addedTitles.add(item.name);
              realData.push({ title: item.name, url: item.url, category: catKey });
            }
          });
        }
      });
    }

    const elements = document.querySelectorAll('h1, h2, h3, h4, .nav-links a, .dropdown-menu a, article a, .course-card');
    elements.forEach(el => {
      const text = el.innerText ? el.innerText.trim() : '';
      const url = el.getAttribute('href') || el.querySelector('a')?.getAttribute('href') || '#';

      if (text.length > 2 && !addedTitles.has(text) && !text.includes('\n')) {
        addedTitles.add(text);
        let category = 'NỘI DUNG';
        if (el.closest('.nav-bar')) category = 'MENU';
        else if (el.tagName.startsWith('H')) category = 'TIÊU ĐỀ';

        realData.push({ title: text, url: url, category: category });
      }
    });

    return realData;
  }

  function goToSearchResultsPage() {
    const query = searchInput ? searchInput.value.trim() : '';
    if (query !== '') {
      window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
  }

  if (searchInput && dropdownResults) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.trim().toLowerCase();

      if (keyword === '') {
        dropdownResults.classList.remove('has-results');
        dropdownResults.innerHTML = '';
        return;
      }

      const siteDatabase = getRealPageData();
      const matches = siteDatabase.filter(item =>
        item.title.toLowerCase().includes(keyword)
      );

      if (matches.length > 0) {
        dropdownResults.innerHTML = matches.map(item => `
          <a href="${item.url}" class="search-item">
            <span class="search-item-title">${item.title}</span>
            <span class="search-item-badge">${item.category}</span>
          </a>
        `).join('');
      } else {
        dropdownResults.innerHTML = `
          <div class="search-no-result">Không tìm thấy nội dung phù hợp trên trang</div>
        `;
      }

      dropdownResults.classList.add('has-results');
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        goToSearchResultsPage();
      }
    });
  }

  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', goToSearchResultsPage);
  }
});


/* =========================================================
   5. GLOBALS & STATE MANAGEMENT (GAME SCHULTE)
   ========================================================= */
let masterList = [];       
let remainingPool = [];    
let activeBoardBatch = []; 
let currentTarget = null;
let timerInterval = null;
let timeLeft = 8;
let isPaused = false;

// Hàm tự động xác định số lượng từ theo thiết bị
function getMaxWordsByScreen() {
  const width = window.innerWidth;
  if (width <= 600) return 25;       // Mobile: 25 từ
  if (width <= 1024) return 40;      // iPad/Tablet: 40 từ
  return 50;                          // Laptop/PC: 50 từ
}

let MAX_BOARD_WORDS = getMaxWordsByScreen();

window.addEventListener('resize', () => {
  MAX_BOARD_WORDS = getMaxWordsByScreen();
});

const tbody = document.getElementById('table-body');

/* =========================================================
   6. NHẬP VỰNG & PASTE EXCEL
   ========================================================= */
function createNewRow() {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="input-hanzi"></td>
    <td><input type="text" class="input-pinyin"></td>
    <td><input type="text" class="input-meaning"></td>
  `;
  if (tbody) tbody.appendChild(tr);
  return tr;
}

if (tbody) {
  tbody.addEventListener('input', () => {
    const rows = tbody.querySelectorAll('tr');
    const lastRow = rows[rows.length - 1];
    const inputs = lastRow.querySelectorAll('input');
    if (Array.from(inputs).some(input => input.value.trim() !== '')) {
      createNewRow();
    }
  });

  tbody.addEventListener('paste', (e) => {
    e.preventDefault();
    const clipboardData = (e.clipboardData || window.clipboardData).getData('text');
    if (!clipboardData) return;

    const rowsData = clipboardData.trim().split(/\r\n|\n|\r/);
    const activeInput = document.activeElement;
    if (!activeInput || activeInput.tagName !== 'INPUT') return;

    const activeTd = activeInput.closest('td');
    const activeTr = activeTd.closest('tr');
    const startColIndex = Array.from(activeTr.children).indexOf(activeTd);
    
    let currentTr = activeTr;

    rowsData.forEach(rowText => {
      if (!currentTr) currentTr = createNewRow();
      const colsData = rowText.split('\t');
      const inputs = currentTr.querySelectorAll('input');

      colsData.forEach((cellText, i) => {
        const targetColIndex = startColIndex + i;
        if (targetColIndex < inputs.length) {
          inputs[targetColIndex].value = cellText.trim();
        }
      });
      currentTr = currentTr.nextElementSibling;
    });

    const allRows = tbody.querySelectorAll('tr');
    const lastInputs = allRows[allRows.length - 1].querySelectorAll('input');
    if (Array.from(lastInputs).some(inp => inp.value.trim() !== '')) {
      createNewRow();
    }
  });
}

/* =========================================================
   7. KHỞI TẠO GAME
   ========================================================= */
const btnStart = document.getElementById('btn-start');
if (btnStart) {
  btnStart.addEventListener('click', () => {
    masterList = [];
    
    if (tbody) {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(row => {
        const hanziInput = row.querySelector('.input-hanzi');
        const pinyinInput = row.querySelector('.input-pinyin');
        const meaningInput = row.querySelector('.input-meaning');

        const hanzi = hanziInput ? hanziInput.value.trim() : '';
        let pinyin = pinyinInput ? pinyinInput.value.trim() : '';
        const meaning = meaningInput ? meaningInput.value.trim() : '';

        if (hanzi) {
          if (!pinyin && window.pinyinPro) {
            pinyin = pinyinPro.pinyin(hanzi, { toneType: 'symbol' });
          }
          masterList.push({ id: Math.random().toString(36).substr(2, 9), hanzi, pinyin, meaning });
        }
      });
    }

    const quickInput = document.getElementById('quick-input');
    const rawText = quickInput ? quickInput.value.trim() : '';
    if (rawText) {
      const words = rawText.split(/[\s,\n]+/).filter(w => w.trim() !== '');
      words.forEach(hanzi => {
        let pinyin = window.pinyinPro ? pinyinPro.pinyin(hanzi, { toneType: 'symbol' }) : '';
        masterList.push({ id: Math.random().toString(36).substr(2, 9), hanzi, pinyin, meaning: '' });
      });
    }

    if (masterList.length === 0) {
      alert("Vui lòng nhập hoặc dán ít nhất 1 từ vựng!");
      return;
    }

    let shuffled = [...masterList].sort(() => Math.random() - 0.5);
    activeBoardBatch = shuffled.slice(0, MAX_BOARD_WORDS);
    remainingPool = shuffled.slice(MAX_BOARD_WORDS);

    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    isPaused = false;
    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) pauseModal.style.display = 'none';
    
    renderFullBoard();
    nextTurn();
  });
}

/* =========================================================
   8. THUẬT TOÁN GRID-BASED LƯỚI BẢO ĐẢM KHÔNG ĐÈ CHỮ
   ========================================================= */
function renderFullBoard() {
  const board = document.getElementById('game-board');
  if (!board) return;

  const pauseModal = document.getElementById('pause-modal');
  board.innerHTML = '';
  if (pauseModal) board.appendChild(pauseModal);

  const boardWidth = board.clientWidth || window.innerWidth;
  const boardHeight = board.clientHeight || (window.innerHeight - 60);

  // Tính số hàng và cột cho lưới
  const totalCells = activeBoardBatch.length;
  const cols = Math.ceil(Math.sqrt(totalCells * (boardWidth / boardHeight)));
  const rows = Math.ceil(totalCells / cols);

  const cellWidth = boardWidth / cols;
  const cellHeight = boardHeight / rows;

  // Tạo ô lưới
  let gridSlots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      gridSlots.push({
        x: c * cellWidth,
        y: r * cellHeight,
        w: cellWidth,
        h: cellHeight
      });
    }
  }

  // Xáo trộn vị trí các ô lưới
  gridSlots.sort(() => Math.random() - 0.5);

  activeBoardBatch.forEach((item, index) => {
    const slot = gridSlots[index];
    createAndPlaceCard(item, board, slot);
  });
}

function createAndPlaceCard(item, board, slot = null, targetPos = null) {
  const card = document.createElement('div');
  card.className = 'word-card';
  card.setAttribute('data-id', item.id);
  
  // Tùy chỉnh phông chữ theo độ rộng thiết bị
  const width = window.innerWidth;
  let baseSize = 18;
  if (width <= 600) baseSize = 13;
  else if (width <= 1024) baseSize = 15;

  const fontSize = Math.floor(Math.random() * 3) + baseSize;
  card.style.fontSize = `${fontSize}px`;

  card.innerHTML = `
    <span>${item.hanzi}</span>
    ${item.pinyin ? `<span class="pinyin-tag">${item.pinyin}</span>` : ''}
  `;

  board.appendChild(card);

  if (targetPos) {
    // Trường hợp thay từ mới vào vị trí cũ
    card.style.left = targetPos.left;
    card.style.top = targetPos.top;
    card.setAttribute('data-slot', JSON.stringify(targetPos.slot || {}));
  } else if (slot) {
    // Đặt vào ô lưới ngẫu nhiên
    const cardW = card.offsetWidth;
    const cardH = card.offsetHeight;

    const maxOffsetX = Math.max(0, slot.w - cardW - 8);
    const maxOffsetY = Math.max(0, slot.h - cardH - 8);

    const offsetX = Math.floor(Math.random() * maxOffsetX) + 4;
    const offsetY = Math.floor(Math.random() * maxOffsetY) + 4;

    const finalLeft = slot.x + offsetX;
    const finalTop = slot.y + offsetY;

    card.style.left = `${finalLeft}px`;
    card.style.top = `${finalTop}px`;
    card.setAttribute('data-slot', JSON.stringify(slot));
  }

  card.addEventListener('click', () => handleCardClick(item, card));
}

/* =========================================================
   9. PHÁT ÂM & GAMEPLAY
   ========================================================= */
function playVoice(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    if (isPaused) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('CN'));
    if (zhVoice) utterance.voice = zhVoice;

    window.speechSynthesis.speak(utterance);
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

function nextTurn() {
  if (isPaused) return;

  if (activeBoardBatch.length === 0) {
    alert("Chúc mừng! Bạn đã hoàn thành toàn bộ danh sách từ vựng!");
    returnToSetup();
    return;
  }

  const scoreText = document.getElementById('score-text');
  const learnedCount = masterList.length - (activeBoardBatch.length + remainingPool.length);
  if (scoreText) scoreText.innerText = `${learnedCount}/${masterList.length}`;

  const randomIndex = Math.floor(Math.random() * activeBoardBatch.length);
  currentTarget = activeBoardBatch[randomIndex];

  playVoice(currentTarget.hanzi);
  startTimer();
}

const btnReplay = document.getElementById('btn-replay');
if (btnReplay) {
  btnReplay.addEventListener('click', () => {
    if (currentTarget && !isPaused) playVoice(currentTarget.hanzi);
  });
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 8;
  updateTimerUI();

  timerInterval = setInterval(() => {
    if (isPaused) return;

    timeLeft -= 0.1;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextTurn();
    }
  }, 100);
}

function updateTimerUI() {
  const timerBar = document.getElementById('timer-bar');
  const timerText = document.getElementById('timer-text');
  const percentage = (timeLeft / 8) * 100;

  if (timerBar) timerBar.style.width = `${Math.max(0, percentage)}%`;
  if (timerText) timerText.innerText = `${Math.ceil(Math.max(0, timeLeft))}s`;
}

function handleCardClick(item, cardElement) {
  if (isPaused || !currentTarget) return;

  if (item.id === currentTarget.id) {
    clearInterval(timerInterval);
    cardElement.classList.add('correct');

    const oldPos = {
      left: cardElement.style.left,
      top: cardElement.style.top,
      slot: JSON.parse(cardElement.getAttribute('data-slot') || '{}')
    };

    setTimeout(() => {
      activeBoardBatch = activeBoardBatch.filter(i => i.id !== item.id);
      cardElement.remove();

      if (remainingPool.length > 0) {
        const newWord = remainingPool.shift();
        activeBoardBatch.push(newWord);
        createAndPlaceCard(newWord, document.getElementById('game-board'), null, oldPos);
      }

      nextTurn();
    }, 600);

  } else {
    cardElement.classList.add('wrong');
    setTimeout(() => cardElement.classList.remove('wrong'), 900);
  }
}

/* =========================================================
   10. TẠM DỪNG VÀ ĐIỀU HƯỚNG
   ========================================================= */
const btnStop = document.getElementById('btn-stop');
if (btnStop) {
  btnStop.addEventListener('click', () => {
    isPaused = true;
    clearInterval(timerInterval);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    
    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) pauseModal.style.display = 'flex';
  });
}

const btnResume = document.getElementById('btn-resume');
if (btnResume) {
  btnResume.addEventListener('click', () => {
    isPaused = false;
    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) pauseModal.style.display = 'none';
    if (currentTarget) playVoice(currentTarget.hanzi);
    startTimer();
  });
}

const btnExit = document.getElementById('btn-exit');
if (btnExit) {
  btnExit.addEventListener('click', () => {
    returnToSetup();
  });
}

function returnToSetup() {
  isPaused = true;
  clearInterval(timerInterval);
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();

  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('setup-screen').classList.add('active');
}
