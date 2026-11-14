// HandleVault Central Widget Script
(function() {
    console.log("HandleVault Widget initialized successfully.");
    
    // Listahan ng iyong mga promo videos (pwede kang magdagdag pa rito)
    const promoVideos = [
        "videos/promo-ads-1.mp4",
        "videos/promo-ads-2.mp4",
        "videos/promo-ads-3.mp4"
    ];

    // Kunin ang kasalukuyang index mula sa localStorage para mag-rotate sila sunud-sunod
    let currentIndex = parseInt(localStorage.getItem('hv_ad_index') || '0', 10);
    if (currentIndex >= promoVideos.length) currentIndex = 0;

    const currentVideoSrc = promoVideos[currentIndex];

    // Likhain ang widget HTML gamit ang tamang Gumroad URL at video path
    const widgetHTML = `
        <div id="hvPromoBar" hidden style="position:fixed; bottom:16px; right:16px; z-index:9999; width:280px; background:#0f172a; border:1px solid #2dd4bf; border-radius:14px; padding:12px; box-shadow:0 10px 30px rgba(0,0,0,0.6); font-family:system-ui,sans-serif;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:11px; color:#93a3c0;">
                <span style="font-weight:700; color:#2dd4bf; display:flex; align-items:center; gap:4px;">🎬 HandleVault Studio</span>
                <span id="hvSecLeft" style="background:#134e4a; color:#2dd4bf; padding:1px 6px; border-radius:6px; font-weight:600;">5s</span>
            </div>
            <a href="https://vaultkeeper117.gumroad.com/l/ztzxpg" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                <video id="hvPromoVid" src="${currentVideoSrc}" muted playsinline style="width:100%; height:150px; object-fit:cover; border-radius:8px; display:block; background:#000;"></video>
                <div style="margin-top:8px; font-size:11px; color:#fff; text-align:center; font-weight:600;">
                    Break Time: Water, CR, Stretch &rarr;
                </div>
            </a>
            <button id="hvCloseBtn" style="position:absolute; top:-8px; right:-8px; background:#1e293b; color:#cbd5e1; border:1px solid #334155; width:24px; height:24px; border-radius:50%; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.3);">×</button>
        </div>
    `;

    // I-insert sa dulo ng body pagka-load ng pahina
    document.addEventListener("DOMContentLoaded", function() {
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        // Close button functionality para mapatay agad kung sakaling makaistorbo
        const closeBtn = document.getElementById('hvCloseBtn');
        const barEl = document.getElementById('hvPromoBar');
        const vidEl = document.getElementById('hvPromoVid');
        
        if (closeBtn && barEl) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                barEl.hidden = true;
                if (vidEl) vidEl.pause();
            });
        }
    });

    // I-save ang susunod na index para sa susunod na break time
    localStorage.setItem('hv_ad_index', (currentIndex + 1) % promoVideos.length);

    // ⏱️ Oras ng pagitan (Pwedeng baguhin: halimbawa 30 mins muna habang nagte-test, o ibalik sa 4.5 hours)
    const BREAK_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes (O gawing 4.5 * 60 * 60 * 1000 kung para sa live actual use)

    function triggerFiveSecPromo() {
        const barEl = document.getElementById('hvPromoBar');
        const vidEl = document.getElementById('hvPromoVid');
        const secEl = document.getElementById('hvSecLeft');

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

    // Trigger bawat takdang oras
    setInterval(triggerFiveSecPromo, BREAK_INTERVAL_MS);

    // 💡 Tip para sa pag-test: Kung gusto mong lumitaw agad ang widget pagka-load para makita mo ang itsura, 
    // i-uncomment (tanggalin ang dalawang slash) ang linya sa ibaba:
    // setTimeout(triggerFiveSecPromo, 2000); 

})();
