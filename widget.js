// Crisp Suite Central Text-Based Widget Script (No Video Required)
(function() {
    console.log("Crisp Suite Text Widget initialized successfully.");
    
    // Listahan ng mga promo messages o break reminders na i-i-rotate
    const promoMessages = [
        "☕ Break Time: Water, CR & Stretch muna!",
        "🚀 Check out the new Crisp Suite Live Web Apps & Bundles!",
        "💎 Grab your digital assets & stream alerts on Gumroad!",
        "✨ Stay hydrated, take a deep breath, and rest your eyes."
    ];

    let currentIndex = parseInt(localStorage.getItem('cs_msg_index') || '0', 10);
    if (currentIndex >= promoMessages.length) currentIndex = 0;

    const currentMsg = promoMessages[currentIndex];

    // Likhain ang widget HTML (gumagamit ng flashing/scrolling text o sleek text banner)
    const widgetHTML = `
        <div id="csPromoBar" hidden style="position:fixed; bottom:16px; right:16px; z-index:9999; width:280px; background:#0f172a; border:1px solid #2dd4bf; border-radius:14px; padding:12px; box-shadow:0 10px 30px rgba(0,0,0,0.6); font-family:system-ui,sans-serif;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-size:11px; color:#93a3c0;">
                <span style="font-weight:700; color:#2dd4bf;">🔔 Crisp Suite Alert</span>
                <span id="csSecLeft" style="background:#134e4a; color:#2dd4bf; padding:1px 6px; border-radius:6px; font-weight:600;">5s</span>
            </div>
            <a href="https://vaultkeeper117.gumroad.com" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none; background:#1e293b; padding:10px; border-radius:8px; border:1px solid #334155;">
                <div style="font-size:12px; color:#fff; text-align:center; font-weight:600; line-height:1.4;">
                    ${currentMsg}
                </div>
                <div style="margin-top:6px; font-size:10px; color:#2dd4bf; text-align:center; font-weight:500;">
                    Click to visit store &rarr;
                </div>
            </a>
            <button id="csCloseBtn" style="position:absolute; top:-8px; right:-8px; background:#1e293b; color:#cbd5e1; border:1px solid #334155; width:24px; height:24px; border-radius:50%; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.3);">×</button>
        </div>
    `;

    document.addEventListener("DOMContentLoaded", function() {
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        const closeBtn = document.getElementById('csCloseBtn');
        const barEl = document.getElementById('csPromoBar');
        
        if (closeBtn && barEl) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                barEl.hidden = true;
            });
        }
    });

    localStorage.setItem('cs_msg_index', (currentIndex + 1) % promoMessages.length);

    // Oras ng pagitan (Halimbawa: bawat 4.5 hours o baguhin habang nagte-test)
    const BREAK_INTERVAL_MS = 4.5 * 60 * 60 * 1000; 

    function triggerFiveSecPromo() {
        const barEl = document.getElementById('csPromoBar');
        const secEl = document.getElementById('csSecLeft');

        if (!barEl) return;
        barEl.hidden = false;

        let s = 5;
        if (secEl) secEl.textContent = s + 's';

        const countdown = setInterval(() => {
            s--;
            if (secEl && s > 0) secEl.textContent = s + 's';
            if (s <= 0) {
                clearInterval(countdown);
                barEl.hidden = true;
            }
        }, 1000);
    }

    setInterval(triggerFiveSecPromo, BREAK_INTERVAL_MS);

    // Tip para sa test: I-uncomment sa baba kung gusto mong lumitaw agad pagka-load
    // setTimeout(triggerFiveSecPromo, 2000);
})();
