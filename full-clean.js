(() => {
  let savedBottomHeight = 68;

  const rememberHeight = () => {
    const box = document.querySelector('.sc-dFJsne.bWgdkM');
    if (box && box.offsetHeight > 20) savedBottomHeight = box.offsetHeight;
  };

  const shiftPanel = () => {
    const bottomBox = document.querySelector('.sc-dFJsne.bWgdkM');
    const topPanel  = document.querySelector('div.sc-gsxpvV.gylaBf');
    if (!topPanel) return;

    if (bottomBox) {
      rememberHeight();
      topPanel.style.marginTop = '';
      bottomBox.remove();
    } else {
      const shift = Math.round(savedBottomHeight / 2);
      topPanel.style.marginTop = shift + 'px';
      topPanel.style.transition = 'margin-top 0.25s ease';
    }
  };

  new MutationObserver(shiftPanel).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('resize', rememberHeight);
  setInterval(shiftPanel, 150);
  requestAnimationFrame(shiftPanel);
  setTimeout(shiftPanel, 500);
})();

// 1. Чистый кэшаут — только цифра
setInterval(() => {
  document.querySelectorAll('*').forEach(el => {
    if (el.childNodes[0]?.nodeType === 3) {
      let t = el.childNodes[0].textContent;
      t = t.replace(/\s*Cash\s*[-]?out\s*/gi, '').replace(/\s*USD\s*/gi, '').trim();
      if (t !== el.childNodes[0].textContent.trim()) el.childNodes[0].textContent = t;
    }
  });
}, 16);

// 2. Лого → ROAD55.XYZ
setInterval(() => {
  const logo = document.querySelector('.sc-fbkieD.idkygu');
  if (logo && !logo.dataset.done) {
    logo.innerHTML = 'ROAD55.XYZ';
    logo.style.cssText = 'font-size:26px!important;font-weight:900!important;color:#FFD700!important;letter-spacing:4px!important;text-align:center!important;line-height:1.2!important;';
    logo.dataset.done = 'true';
  }
}, 50);

// 3. How to play? → Jak grać?
setInterval(() => {
  const el = document.querySelector('span.how-to-play-text');
  if (el && el.textContent.trim() === 'How to play?') {
    el.textContent = 'Jak grać?';
    el.style.fontWeight = '900';
  }
}, 50);

// 4. Удаляем баланс наверху навсегда
new MutationObserver(() => {
  document.querySelectorAll('[data-testid="menu-balance"], .sc-jONmMj.cLoUsn').forEach(e => e.remove());
}).observe(document.body, { childList: true, subtree: true });

setInterval(() => {
  document.querySelector('.sc-cbDGtE.dA-dBIN')?.remove();
  document.querySelector('.sc-gyUexO.fmBHxu')?.remove();
}, 100);


(() => {
  document.getElementById('kurczak-overlay')?.remove();

  if (!document.querySelector('link[href*="Archivo+Black"]')) {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  const overlay = document.createElement('div');
  overlay.id = 'kurczak-overlay';
  overlay.textContent = 'ROAD55.XYZ';

  overlay.style.cssText = `
    position: fixed !important;
    top: 15% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    font-size: 90px !important;
    font-weight: 900 !important;
    color: #FFFFFF !important;
    letter-spacing: 16px !important;
    font-family: 'Archivo Black', sans-serif !important;
    text-shadow: 
      0 0 8px rgba(0,0,0,0.9),
      0 0 16px rgba(0,0,0,0.8),
      0 0 24px rgba(0,0,0,0.6) !important;
    pointer-events: none !important;
    z-index: 99999 !important;
    user-select: none !important;
    white-space: nowrap !important;
  `;

  document.body.appendChild(overlay);
})();

(() => {
  const gameField = document.querySelector('.sc-dacFVT.bwQBTP.game');
  if (!gameField) return;

  gameField.style.position = 'relative';

  const createLine = (id, startPos = 30) => {
    if (document.getElementById(id)) return;

    const line = document.createElement('div');
    line.id = id;
    line.style.cssText = `
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      height: 5px !important;
      background: #716c69 !important;
      cursor: ns-resize !important;
      z-index: 99999 !important;
      top: ${startPos}% !important;
      pointer-events: auto !important;
      user-select: none !important;
      box-shadow: 0 0 8px rgba(0,0,0,0.6) !important;
    `;

    gameField.appendChild(line);

    let dragging = false;

    const start = (e) => { dragging = true; e.preventDefault(); };
    const move  = (e) => {
      if (!dragging) return;
      const rect = gameField.getBoundingClientRect();
      const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
      const percent = Math.max(0, Math.min(100, (y / rect.height) * 100));
      line.style.top = percent + '%';
    };
    const stop  = () => dragging = false;

    line.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);

    line.addEventListener('touchstart', start, { passive: false });
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', stop);
  };

  createLine('drag-line-1', 25);
  createLine('drag-line-2', 75);
})();

setInterval(() => document.querySelector('.sc-ikPBrU.kVgHLR')?.remove(), 16);