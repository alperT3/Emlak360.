// ========================================================
// EMLAK360 - PROFESYONEL ADMİN PANELİ ALGORİTMASI 
// ========================================================

let pendingListings = JSON.parse(localStorage.getItem('adminPendingListings')) || [];
let currentReviewId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderAdminTable();
});

// Tabloyu ve Bildirim Sayısını Dinamik Olarak Doldurur
function renderAdminTable() {
    const tableBody = document.getElementById('adminTableBody');
    const badge = document.getElementById('pendingCount');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    badge.innerText = pendingListings.length; 

    // Eğer bekleyen ilan yoksa boş durumu göster
    if (pendingListings.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: #7f8fa6; font-size: 16px;">Mükemmel! Onay bekleyen yeni ilan bulunmamaktadır.</td></tr>`;
        return;
    }

    // Bekleyen ilanları tabloya satır satır bas
    pendingListings.forEach(ilan => {
        const tr = document.createElement('tr');
        const formattedPrice = typeof ilan.price === 'number' ? ilan.price.toLocaleString('tr-TR') : ilan.price;

        tr.innerHTML = `
            <td style="color: #b2bec3;">#${ilan.id}</td>
            <td><strong>${ilan.title}</strong><br><small style="color:#7f8fa6;">${ilan.city} / ${ilan.district}</small></td>
            <td>${ilan.seller}</td>
            <td style="color: #4cd137; font-weight: bold;">${formattedPrice} TL</td>
            <td>${ilan.date}</td>
            <td><span style="background: #f1c40f; color: #333; padding: 5px 10px; border-radius: 5px; font-size: 12px; font-weight: bold;">Bekliyor</span></td>
            <td>
                <button onclick="openPreview('${ilan.id}')" style="background: #0984e3; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">İncele</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// İlanı İnceleme Modalını Açar
function openPreview(id) {
    // ESKİ KODUNUZDAKİ GÜVENLİK KONTROLÜ EKLENDİ (String eşleştirmesi)
    const ilan = pendingListings.find(item => String(item.id) === String(id));
    
    if (ilan) {
        currentReviewId = ilan.id;
        document.getElementById('previewTitle').innerText = ilan.title;
        
        // Yeni DTO formatına tam uyumlu (seller ve desc)
        document.getElementById('previewSeller').innerText = ilan.seller;
        
        const formattedPrice = typeof ilan.price === 'number' ? ilan.price.toLocaleString('tr-TR') : ilan.price;
        document.getElementById('previewPrice').innerText = formattedPrice + " TL";
        
        document.getElementById('previewDesc').innerText = ilan.desc || "Kurumsal satıcı tarafından açıklama belirtilmemiş.";
        
        document.getElementById('previewModal').style.display = 'flex';
    }
}

// Modalı Kapatır
function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
    currentReviewId = null;
}

// ========================================================
// ONAY / RED MEKANİZMASI (DTO AKTARIMI)
// ========================================================

// İlanı Onayla ve Ana Sayfaya Aktar
function approveListing() {
    if (!currentReviewId) return;

    const ilan = pendingListings.find(item => item.id === currentReviewId);
    if (!ilan) return;

    // Bekleyenlerden çıkar
    pendingListings = pendingListings.filter(item => item.id !== currentReviewId);
    localStorage.setItem('adminPendingListings', JSON.stringify(pendingListings));

    // Onaylı vitrine ekle
    let approvedListings = JSON.parse(localStorage.getItem('approvedListings')) || [];
    ilan.status = "Onaylandı";
    approvedListings.push(ilan);
    localStorage.setItem('approvedListings', JSON.stringify(approvedListings));

    alert("✅ İlan başarıyla onaylandı ve Emlak360 vitrinine aktarıldı!");
    closePreview();
    renderAdminTable();
}

// İlanı Reddet (Sistemden Sil)
function rejectListing() {
    if (!currentReviewId) return;

    if(confirm("Bu ilanı tamamen reddetmek ve sistemden silmek istediğinize emin misiniz?")) {
        pendingListings = pendingListings.filter(item => item.id !== currentReviewId);
        localStorage.setItem('adminPendingListings', JSON.stringify(pendingListings));

        alert("❌ İlan reddedildi ve sistemden kalıcı olarak silindi.");
        closePreview();
        renderAdminTable();
    }
}