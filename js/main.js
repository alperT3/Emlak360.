// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    
    // --- ÖZEL SAĞ TIK MENÜSÜ (Custom Context Menu) ---
    const contextMenu = document.getElementById("customContextMenu");
    const closeMenuBtn = document.querySelector(".close-menu");

    // Tüm sayfada sağ tıklamayı dinle
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Tarayıcının varsayılan menüsünü iptal et
        
        // Farenin konumunu al
        let x = e.offsetX;
        let y = e.offsetY;
        
        // Menünün ekranın dışına taşmasını engelle
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        let cmWidth = contextMenu.offsetWidth;
        let cmHeight = contextMenu.offsetHeight;

        x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
        y = y > winHeight - cmHeight ? winHeight - cmHeight : y;

        // Menüyü konumlandır ve göster
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.style.display = "block";
    });

    // Menü dışında bir yere veya kapat butonuna tıklanınca menüyü gizle
    document.addEventListener("click", () => contextMenu.style.display = "none");
    if(closeMenuBtn) {
        closeMenuBtn.addEventListener("click", () => contextMenu.style.display = "none");
    }
});


// --- İLAN DETAY MODALI VE 360° / PANORAMİK SEKMELERİ ---
const detailModal = document.getElementById('detailModal');

function openDetailModal(id) {
    // realEstateDB kontrolü (Eğer ana veritabanı başka bir dosyadaysa veya buradaysa güvenle çalışır)
    const listing = typeof realEstateDB !== 'undefined' ? realEstateDB.find(item => item.id === id) : null;
    
    if(listing) {
        const images = (listing.images && listing.images.length > 0) ? listing.images : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"];
        const panoramicImg = listing.panoramicImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";
        const tour360Img = listing.tour360Image || "https://pannellum.org/images/alma.jpg";

        const detailImageEl = document.getElementById('detailImage');
        if(detailImageEl) detailImageEl.src = images[0];
        
        const thumbContainer = document.getElementById('detailThumbnails');
        if(thumbContainer) {
            thumbContainer.innerHTML = '';
            thumbContainer.style.display = "flex";
            thumbContainer.style.gap = "8px";
            thumbContainer.style.flexWrap = "wrap";
            thumbContainer.style.alignItems = "center";

            // 1. Standart Fotoğraflar Küçük Resimleri
            images.forEach((imgUrl, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgUrl;
                thumb.style.width = "70px"; 
                thumb.style.height = "50px"; 
                thumb.style.objectFit = "cover";
                thumb.style.borderRadius = "6px"; 
                thumb.style.cursor = "pointer"; 
                thumb.style.border = index === 0 ? "2px solid #ff4757" : "2px solid transparent";
                
                thumb.onclick = () => {
                    detailImageEl.src = imgUrl;
                    Array.from(thumbContainer.children).forEach(t => {
                        if(t.tagName === 'IMG') t.style.border = "2px solid transparent";
                    });
                    thumb.style.border = "2px solid #ff4757";
                };
                thumbContainer.appendChild(thumb);
            });

            // 2. Panoramik Görsel Sekme Butonu
            const panoBtn = document.createElement('button');
            panoBtn.innerText = "🌄 Panoramik Görsel";
            panoBtn.style.cssText = "background: #ffa502; color: #fff; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;";
            panoBtn.onclick = () => { 
                detailImageEl.src = panoramicImg; 
            };
            thumbContainer.appendChild(panoBtn);

            // 3. 360° Sanal Tur Sekme Butonu
            const tourBtn = document.createElement('button');
            tourBtn.innerText = "🔄 360° Sanal Tur";
            tourBtn.style.cssText = "background: #ff4757; color: #fff; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;";
            tourBtn.onclick = () => {
                alert("360° Sanal Tur Modu Aktif! (Test Görseli Görüntüleniyor)");
                detailImageEl.src = tour360Img; 
            };
            thumbContainer.appendChild(tourBtn);
        }

        const titleEl = document.getElementById('detailTitle');
        if(titleEl) titleEl.innerText = listing.title;

        const locEl = document.getElementById('detailLocation');
        if(locEl) locEl.innerText = `📍 ${listing.city} / ${listing.district}`;

        const priceEl = document.getElementById('detailPrice');
        if(priceEl) priceEl.innerText = (typeof listing.price === 'number' ? listing.price.toLocaleString('tr-TR') : listing.price) + " TL";

        const descEl = document.getElementById('detailDesc');
        if(descEl) descEl.innerText = listing.desc || "Açıklama girilmemiştir.";
        
        const specsContainer = document.getElementById('dynamicSpecsContainer');
        if(specsContainer) {
            specsContainer.innerHTML = `
                <div class="spec-row"><span>İlan No:</span> <strong>${listing.id}</strong></div>
                <div class="spec-row"><span>Kategori:</span> <strong>${listing.type}</strong></div>
                <div class="spec-row"><span>Kimden:</span> <strong style="color: #0984e3;">${listing.seller || "Emlak360 Üyesi"}</strong></div>
                <div class="spec-row"><span>Oda / m²:</span> <strong>${listing.rooms} / ${listing.m2Brut || listing.m2 || '-'} m²</strong></div>
            `;
        }
        
        if(detailModal) detailModal.style.display = 'flex';
    }
}

function closeDetailModal() { 
    if(detailModal) detailModal.style.display = 'none'; 
}
