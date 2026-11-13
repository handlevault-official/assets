(function() {
  // Listahan ng iyong 6 na promo videos
  const promoVideos = [
    "./GitVoice Neon Healthcare Animation.gif.mp4",
    "./promo-ads-2.mp4",
    "./promo-ads-3.mp4",
    "./promo-ads-4.mp4",
    "./promo-ads-5.mp4",
    "./promo-ads-6.mp4"
  ];

  // Kunin ang kasalukuyang index mula sa localStorage para mag-rotate sila sunud-sunod
  let currentIndex = parseInt(localStorage.getItem('hv_ad_index') || '0', 10);
  if (currentIndex >= promoVideos.length) currentIndex = 0;

  const currentVideoSrc = promoVideos[currentIndex];

  // Likhain ang widget HTML gamit ang napiling video
  const widgetHTML = `
    <div id="hvPromoBar" hidden style="position:fixed; bottom:14px; right:14px; z-index:99; width:260px; background:var(--card, #121b2e); border:1px solid var(--accent, #2dd4bf); border-radius:12px; padding:10px; box-shadow:0 8px 24px rgba(0,0,0,0.45); font-family:system-ui,sans-serif;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-size:11px; color:var(--mute, #93a3c0);">
        <span style="font-weight:700; color:var(--accent, #2dd4bf);">HandleVault Suite</span>
        <span id="hvSecLeft">5s</span>
      </div>
      <a href="https://handlevault.gumroad.com" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
        <video id="hvPromoVid" src="https://YOUR_GITHUB_USERNAME.github.io/handle-vault-assets/${currentVideoSrc}" muted playsinline style="width:100%; border-radius:8px; display:block;"></video>
        <div style="font-size:11px; color:var(--ink, #e8eefc); margin-top:6px; text-align:center;">
          Break Time: Water, CR, Stretch &rarr;
        </div>
      </a>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', widgetHTML);

  // I-save ang susunod na index para sa susunod na break time
  localStorage.setItem('hv_ad_index', (currentIndex + 1) % promoVideos.length);

  const BREAK_INTERVAL_MS = 4.5 * 60 * 60 * 1000; // 4.5 hours interval
  const barEl = document.getElementById('hvPromoBar');
  const vidEl = document.getElementById('hvPromoVid');
  const secEl = document.getElementById('hvSecLeft');

  function triggerFiveSecPromo() {
    if (!barEl || !vidEl) return;
    barEl.hidden = false;
    vidEl.currentTime = 0;
    vidEl.play().catch(() => {});

    let s = 5;
    if (secEl) secEl.textContent = s + 's';

    const countdown = setInterval(() => {
      s--;
      if (secEl && s > 0) secEl.textContent = s + 's';
      if (s <= 0) {
        clearInterval(countdown);
        vidEl.pause();
        barEl.hidden = true;
      }
    }, 1000);
  }

  // Trigger bawat 4.5 hours
  setInterval(triggerFiveSecPromo, BREAK_INTERVAL_MS);
})();
