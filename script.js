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
   2. HÀM THÔNG BÁO GIỮA MÀN HÌNH (PREMIUM CENTER TOAST) & STYLE
   ========================================================= */
(function injectToastStyles() {
  if (document.getElementById('custom-toast-style')) return;
  const style = document.createElement('style');
  style.id = 'custom-toast-style';
  style.innerHTML = `
    .custom-toast-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                  visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .custom-toast-overlay.show {
      opacity: 1;
      visibility: visible;
    }
    
    .custom-toast-box {
      background: rgba(255, 255, 255, 0.95);
      padding: 28px 40px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2),
                  0 0 0 1px rgba(243, 143, 29, 0.15);
      text-align: center;
      min-width: 280px;
      max-width: 90%;
      transform: scale(0.8) translateY(10px);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .custom-toast-overlay.show .custom-toast-box {
      transform: scale(1) translateY(0);
    }
    
    .custom-toast-icon-wrapper {
      width: 56px;
      height: 56px;
      margin: 0 auto 12px auto;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(243, 143, 29, 0.12), rgba(243, 143, 29, 0.05));
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .custom-toast-icon {
      font-size: 28px;
      line-height: 1;
    }
    
    .custom-toast-message {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.2px;
      line-height: 1.5;
    }
  `;
  document.head.appendChild(style);
})();

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
   3. CÁC HÀM BỔ TRỢ (HELPER FUNCTIONS)
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
   4. KHỞI TẠO LOGIC KHI DOM READY
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

  /* -------------------------------------------------------
     A. MOBILE MENU NAVIGATION
     ------------------------------------------------------- */
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

  /* -------------------------------------------------------
     B. POPUP TOGGLE (SEARCH ICON)
     ------------------------------------------------------- */
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

  /* -------------------------------------------------------
     C. LIVE SEARCH & DATA CÀO THẬT TỪ PAGE
     ------------------------------------------------------- */
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


// ==========================================
// GLOBALS & STATE MANAGEMENT
// ==========================================
let masterList = [];       
let remainingPool = [];    
let activeBoardBatch = []; // Tối đa 30 từ đang hiển thị
let currentTarget = null;
let timerInterval = null;
let timeLeft = 8;
let isPaused = false;

const MAX_BOARD_WORDS = 50;
const tbody = document.getElementById('table-body');

// ==========================================
// 1. NHẬP VỰNG & PASTE EXCEL
// ==========================================
function createNewRow() {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="input-hanzi"></td>
    <td><input type="text" class="input-pinyin"></td>
    <td><input type="text" class="input-meaning"></td>
  `;
  tbody.appendChild(tr);
  return tr;
}

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

// ==========================================
// 2. KHỞI TẠO GAME
// ==========================================
document.getElementById('btn-start').addEventListener('click', () => {
  masterList = [];
  
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const hanzi = row.querySelector('.input-hanzi').value.trim();
    let pinyin = row.querySelector('.input-pinyin').value.trim();
    const meaning = row.querySelector('.input-meaning').value.trim();

    if (hanzi) {
      if (!pinyin && window.pinyinPro) {
        pinyin = pinyinPro.pinyin(hanzi, { toneType: 'symbol' });
      }
      masterList.push({ id: Math.random().toString(36).substr(2, 9), hanzi, pinyin, meaning });
    }
  });

  const rawText = document.getElementById('quick-input').value.trim();
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
  document.getElementById('pause-modal').style.display = 'none';
  
  renderFullBoard();
  nextTurn();
});

// ==========================================
// 3. THUẬT TOÁN SCHULTE & THAY TỪ TẠI CHỖ
// ==========================================
function renderFullBoard() {
  const board = document.getElementById('game-board');
  
  // Giữ lại overlay pause nếu có
  const pauseModal = document.getElementById('pause-modal');
  board.innerHTML = '';
  board.appendChild(pauseModal);
  
  const placedRects = [];
  const padding = 18;

  activeBoardBatch.forEach((item) => {
    createAndPlaceCard(item, board, placedRects, padding);
  });
}

// Tạo và đặt vị trí thẻ chữ
function createAndPlaceCard(item, board, placedRects, padding, targetPos = null) {
  const card = document.createElement('div');
  card.className = 'word-card';
  card.setAttribute('data-id', item.id);
  
  const fontSize = Math.floor(Math.random() * 6) + 20;
  card.style.fontSize = `${fontSize}px`;

  card.innerHTML = `
    <span>${item.hanzi}</span>
    <span class="pinyin-tag">${item.pinyin}</span>
  `;

  if (targetPos) {
    // Nếu có vị trí cũ -> Đặt ngay vào vị trí cũ (Thay từ tại chỗ)
    card.style.left = targetPos.left;
    card.style.top = targetPos.top;
    board.appendChild(card);
  } else {
    // Rải ngẫu nhiên ban đầu không trùng vị trí
    card.style.visibility = 'hidden';
    board.appendChild(card);
    
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;

    let posX = 0, posY = 0, overlaps = true, maxAttempts = 250;

    while (overlaps && maxAttempts > 0) {
      maxAttempts--;
      posX = Math.floor(Math.random() * (boardWidth - cardWidth - padding * 2)) + padding;
      posY = Math.floor(Math.random() * (boardHeight - cardHeight - padding * 2)) + padding;

      overlaps = placedRects.some(rect => !(
        posX + cardWidth + padding < rect.x ||
        posX > rect.x + rect.w + padding ||
        posY + cardHeight + padding < rect.y ||
        posY > rect.y + rect.h + padding
      ));
    }

    placedRects.push({ x: posX, y: posY, w: cardWidth, h: cardHeight });
    card.style.left = `${posX}px`;
    card.style.top = `${posY}px`;
    card.style.visibility = 'visible';
  }

  card.addEventListener('click', () => handleCardClick(item, card));
}

// ==========================================
// 4. VOICE CHUẨN ĐỢT ĐẦU & GAMEPLAY
// ==========================================
function playVoice(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Dừng phát âm cũ
    if (isPaused) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;  // Tốc độ chuẩn rõ tiếng
    utterance.pitch = 1.0;

    // Ưu tiên chọn voice gốc tự nhiên của hệ thống
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('CN'));
    if (zhVoice) utterance.voice = zhVoice;

    window.speechSynthesis.speak(utterance);
  }
}

// Load giọng chuẩn khi vừa vào trang
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

  const learnedCount = masterList.length - (activeBoardBatch.length + remainingPool.length);
  document.getElementById('score-text').innerText = `${learnedCount}/${masterList.length}`;

  const randomIndex = Math.floor(Math.random() * activeBoardBatch.length);
  currentTarget = activeBoardBatch[randomIndex];

  playVoice(currentTarget.hanzi);
  startTimer();
}

document.getElementById('btn-replay').addEventListener('click', () => {
  if (currentTarget && !isPaused) playVoice(currentTarget.hanzi);
});

// Timer 7s
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

// CHỌN ĐÚNG: Thay từ mới vào CHÍNH TỌA ĐỘ thẻ vừa biến mất
function handleCardClick(item, cardElement) {
  if (isPaused || !currentTarget) return;

  if (item.id === currentTarget.id) {
    clearInterval(timerInterval);
    cardElement.classList.add('correct');

    // Lưu lại vị trí chính xác của thẻ vừa đoán đúng
    const oldPos = {
      left: cardElement.style.left,
      top: cardElement.style.top
    };

    setTimeout(() => {
      // 1. Loại bỏ từ khỏi mảng đang chơi
      activeBoardBatch = activeBoardBatch.filter(i => i.id !== item.id);
      cardElement.remove();

      // 2. Nếu còn từ trong kho dự trữ -> Thay thế ngay vào vị trí cũ
      if (remainingPool.length > 0) {
        const newWord = remainingPool.shift();
        activeBoardBatch.push(newWord);
        createAndPlaceCard(newWord, document.getElementById('game-board'), [], 0, oldPos);
      }

      nextTurn();
    }, 600);

  } else {
    // CHỌN SAI
    cardElement.classList.add('wrong');
    setTimeout(() => {
      cardElement.classList.remove('wrong');
    }, 900);
  }
}

// ==========================================
// 5. TẠM DỪNG VÀ ĐIỀU HƯỚNG
// ==========================================
// Bấm Dừng học -> Đóng băng tại màn hình học
document.getElementById('btn-stop').addEventListener('click', () => {
  isPaused = true;
  clearInterval(timerInterval);
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  
  document.getElementById('pause-modal').style.display = 'flex';
});

// Bấm Tiếp tục học
document.getElementById('btn-resume').addEventListener('click', () => {
  isPaused = false;
  document.getElementById('pause-modal').style.display = 'none';
  if (currentTarget) playVoice(currentTarget.hanzi);
  startTimer();
});

// Bấm Thoát về trang từ vựng (Giữ nguyên toàn bộ dữ liệu nhập)
document.getElementById('btn-exit').addEventListener('click', () => {
  returnToSetup();
});

function returnToSetup() {
  isPaused = true;
  clearInterval(timerInterval);
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();

  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('setup-screen').classList.add('active');
}