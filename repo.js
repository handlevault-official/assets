// repo.js - Anti-Copy & Payment Reminder Protection
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mag-aabang kapag may nag-try mag-copy (Ctrl+C o right-click copy)
    document.addEventListener('copy', (e) => {
        // Pigilan ang pag-copy kung gusto mo talagang i-lock (optional)
        // e.preventDefault(); 

        // Magpakita ng alert/flash warning
        showCopyWarning();
    });

    // Function para sa visual flash warning sa screen
    function showCopyWarning() {
        // Gumawa ng temporary flash banner kung wala pa
        let existingBanner = document.getElementById('copy-warning-banner');
        if (existingBanner) existingBanner.remove();

        const banner = document.createElement('div');
        banner.id = 'copy-warning-banner';
        banner.innerHTML = "🔒 <strong>Locked Content:</strong> You can't copy this code or asset if you don't pay first! Get the pass on Gumroad.";
        
        // CSS styling para lumitaw sa ibabaw ng screen nang naka-flash
        banner.style.position = 'fixed';
        banner.style.bottom = '20px';
        banner.style.left = '50%';
        banner.style.transform = 'translateX(-50%)';
        banner.style.backgroundColor = '#ef4444'; // Red alert color
        banner.style.color = '#ffffff';
        banner.style.padding = '10px 20px';
        banner.style.borderRadius = '8px';
        banner.style.fontSize = '0.85rem';
        banner.style.fontWeight = 'bold';
        banner.style.zIndex = '9999';
        banner.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        banner.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(banner);

        // Kusang mawawala pagkatapos ng 4 segundo
        setTimeout(() => {
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 300);
        }, 4000);
    }
});
