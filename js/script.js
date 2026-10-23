window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) { splash.style.opacity = '0'; setTimeout(() => splash.style.display = 'none', 1000); }
    }, 2000); 
});

// ========================================================
// TÜRKİYE 81 İL VE İLÇE MOTORU
// ========================================================
const turkiyeData = {
    "Adana": ["Aladağ","Ceyhan","Çukurova","Kozan","Sarıçam","Seyhan","Yüreğir","Diğer"],
    "Ankara": ["Altındağ","Çankaya","Etimesgut","Gölbaşı","Keçiören","Mamak","Sincan","Yenimahalle","Diğer"],
    "Antalya": ["Alanya","Demre","Kaş","Kemer","Kepez","Konyaaltı","Manavgat","Muratpaşa","Diğer"],
    "Bursa": ["Gemlik","İnegöl","Mudanya","Nilüfer","Osmangazi","Yıldırım","Diğer"],
    "Hatay": ["Antakya","Arsuz","Belen","Defne","Dörtyol","İskenderun","Kırıkhan","Reyhanlı","Samandağ","Diğer"],
    "İstanbul": ["Ataşehir","Avcılar","Bakırköy","Beşiktaş","Beylikdüzü","Beyoğlu","Esenyurt","Kadıköy","Kartal","Küçükçekmece","Maltepe","Pendik","Sarıyer","Şişli","Ümraniye","Üsküdar","Diğer"],
    "İzmir": ["Balçova","Bayraklı","Bornova","Buca","Çeşme","Çiğli","Gaziemir","Karabağlar","Karşıyaka","Konak","Urla","Diğer"],
    "Kocaeli": ["Başiskele","Çayırova","Darıca","Derince","Gebze","Gölcük","İzmit","Kartepe","Körfez","Diğer"],
    "Muğla": ["Bodrum","Dalaman","Datça","Fethiye","Marmaris","Menteşe","Milas","Ortaca","Diğer"]
};

const tumIller = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];

tumIller.forEach(il => { if(!turkiyeData[il]) turkiyeData[il] = ["Merkez", "Diğer İlçeler"]; });

const filterCity = document.getElementById('filterCity');
const filterDistrict = document.getElementById('filterDistrict');

if(filterCity) {
    tumIller.sort().forEach(il => {
        const opt = document.createElement('option');
        opt.value = il; opt.textContent = il;
        filterCity.appendChild(opt);
    });

    filterCity.addEventListener('change', function() {
        filterDistrict.innerHTML = '<option value="Hepsi">İlçe Seçin</option>';
        const secilenIl = this.value;
        if(secilenIl !== "Hepsi" && turkiyeData[secilenIl]) {
            turkiyeData[secilenIl].forEach(ilce => {
                const opt = document.createElement('option');
                opt.value = ilce; opt.textContent = ilce;
                filterDistrict.appendChild(opt);
            });
        }
    });
}

// --- KURUMSAL AUTH (YETKİLENDİRME) SİSTEMİ ---
let currentUser = JSON.parse(localStorage.getItem('emlak360_user')) || null;

window.addEventListener('load', () => {
    // Sayfa yüklenince kayıtlı oturum varsa arayüzü güncelle
    if (currentUser) {
        applyUserSessionUI(currentUser);
    }
});

function applyUserSessionUI(user) {
    const loginNavBtn = document.getElementById('loginNavBtn');
    if(loginNavBtn) {
        // İsmi ilk kelimeden bölüp kısaltarak ve unvanı kısaltarak ekliyoruz
        const shortName = user.name.split(' ')[0]; 
        const badgeTitle = user.role === 'kurumsal' ? 'Pro' : 'Üye';
        
        loginNavBtn.innerText = `👤 ${shortName} (${badgeTitle})`;
        loginNavBtn.style.color = "#4cd137";
        loginNavBtn.style.fontWeight = "bold";
        loginNavBtn.style.background = "rgba(76, 209, 55, 0.1)"; // Hafif yeşil profesyonel arkaplan
        loginNavBtn.style.border = "1px solid #4cd137";
    }
}
// Modalı Açan Fonksiyon
function openAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'flex';
    }
}

// Modal Kapatma Düğmesi Bağlantısı
document.addEventListener('DOMContentLoaded', () => {
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    if (closeAuthBtn) {
        closeAuthBtn.addEventListener('click', () => {
            const authModal = document.getElementById('authModal');
            if (authModal) authModal.style.display = 'none';
        });
    }
});

// Modaldaki Giriş Yap / Kayıt Ol Sekmeleri Arası Geçiş
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabBtns = document.querySelectorAll('.auth-tab-btn');

    if (tabName === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabBtns[0].classList.add('active');
        tabBtns[1].classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabBtns[0].classList.remove('active');
        tabBtns[1].classList.add('active');
    }
}

function executeLogin() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if(!email || !pass) { alert("Lütfen E-posta ve Şifrenizi eksiksiz girin."); return; }
    
    const baseName = email.split('@')[0];
    const formattedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    
    currentUser = {
        name: formattedName,
        email: email,
        role: "kurumsal" 
    };
    
    localStorage.setItem('emlak360_user', JSON.stringify(currentUser));
    document.getElementById('authModal').style.display = 'none';
    applyUserSessionUI(currentUser);
    alert(`Hoş geldin ${currentUser.name}! Oturumunuz açıldı.`);
}

function executeRegister() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;
    const role = document.getElementById('regRole').value;

    if(!name || !email || !pass) { alert("Lütfen tüm kayıt alanlarını doldurun."); return; }

    currentUser = {
        name: name,
        email: email,
        role: role
    };

    localStorage.setItem('emlak360_user', JSON.stringify(currentUser));
    document.getElementById('authModal').style.display = 'none';
    applyUserSessionUI(currentUser);
    alert(`Tebrikler ${name}! Hesabınız başarıyla oluşturuldu (${role === 'kurumsal' ? 'Kurumsal Emlak Ofisi' : 'Bireysel Müşteri'}).`);
}

function checkAuthForSeller() {
    if(currentUser) {
        if(currentUser.role === 'kurumsal') {
            window.location.href = "pages/seller-panel.html";
        } else {
            if(confirm("Bireysel hesaplar ile ilan verme paneli sınırlıdır. Kurumsal moda geçmek ister misiniz? İptal derseniz yine de panele yönlendirileceksiniz.")) {
                currentUser.role = 'kurumsal';
                localStorage.setItem('emlak360_user', JSON.stringify(currentUser));
                applyUserSessionUI(currentUser);
            }
            window.location.href = "pages/seller-panel.html";
        }
    } else {
        alert("İlan yönetimi ve kurumsal panel için lütfen önce giriş yapın veya kayıt olun.");
        openAuthModal();
    }
}



// ========================================================
// SAYFA YÖNLENDİRME (SPA - History API)
// ========================================================
const mainCategories = document.getElementById('main-categories');
const listingsLayout = document.getElementById('listings-layout');
const selectedMainTitle = document.getElementById('selectedMainTitle');
let currentMainType = ''; 

document.querySelectorAll('.main-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMainType = btn.getAttribute('data-main'); 
        navigateTo('listings', currentMainType);
    });
});

document.getElementById('backToMainBtn')?.addEventListener('click', () => navigateTo('home'));

function navigateTo(view, type = '') {
    if(view === 'listings') {
        mainCategories.style.display = 'none';
        listingsLayout.style.display = 'flex';
        selectedMainTitle.innerText = `${type.toUpperCase()} İLANLAR`;
        document.getElementById('listingsContainer').innerHTML = '<h3 style="color:white; margin:auto; padding: 50px;">Lütfen soldan bir alt kategori seçin.</h3>';
        history.pushState({view: 'listings', type: type}, '', `?kategori=${type}`);
    } else {
        listingsLayout.style.display = 'none';
        mainCategories.style.display = 'flex';
        currentMainType = '';
        history.pushState({view: 'home'}, '', window.location.pathname);
    }
}

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view === 'listings') {
        currentMainType = e.state.type;
        mainCategories.style.display = 'none';
        listingsLayout.style.display = 'flex';
        selectedMainTitle.innerText = `${currentMainType.toUpperCase()} İLANLAR`;
    } else {
        listingsLayout.style.display = 'none';
        mainCategories.style.display = 'flex';
    }
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        content.style.display = content.style.display === "flex" ? "none" : "flex";
    });
});

document.querySelectorAll('.sub-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const subType = link.getAttribute('data-type');
        loadListings(`${currentMainType}-${subType}`);
    });
});

// ========================================================
// VERİTABANI VE İLAN YÖNETİMİ
// ========================================================
// ========================================================
const realEstateDB = [
    // ==========================================
    // 1. KONUT KATEGORİSİ
    // ==========================================
    
    // --- Satılık Daire (2 Adet) ---
    { 
        id: 101, type: "satilik-daire", title: "Kadıköy Merkezde Deniz Manzaralı 3+1", price: 7500000, city: "İstanbul", district: "Kadıköy", rooms: "3+1", m2Brut: 135, m2Net: 120, age: "3", floor: "5", heating: "Doğalgaz", baths: "2", facade: "Güney", furnished: "Hayır", seller: "Emlak360 Kurumsal", date: "10.10.2026", desc: "Sahile yürüme mesafesinde lüks daire.", premium: true, 
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 102, type: "satilik-daire", title: "İskenderun Sahil Bandında Sıfır 2+1 Daire", price: 3450000, city: "Hatay", district: "İskenderun", rooms: "2+1", m2Brut: 110, m2Net: 95, age: "1", floor: "3", heating: "Doğalgaz", baths: "1", facade: "Kuzey", furnished: "Evet", seller: "Kılınç Emlak", date: "11.10.2026", desc: "Atatürk Bulvarı üzerinde asansörlü daire.", premium: false, 
        images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Daire (2 Adet) ---
    { 
        id: 201, type: "kiralik-daire", title: "Beşiktaş Çarşıda Eşyalı Kiralık 1+1", price: 28000, city: "İstanbul", district: "Beşiktaş", rooms: "1+1", m2Brut: 65, m2Net: 55, age: "8", floor: "2", heating: "Kombi", baths: "1", facade: "Doğu", furnished: "Evet", seller: "Beşiktaş Emlak", date: "12.10.2026", desc: "Üniversitelere yakın temiz daire.", premium: true, 
        images: ["https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 202, type: "kiralik-daire", title: "Ankara Tunalı Hilmi'de Kiralık 2+1", price: 22500, city: "Ankara", district: "Çankaya", rooms: "2+1", m2Brut: 100, m2Net: 88, age: "12", floor: "3", heating: "Merkezi", baths: "1", facade: "Güney", furnished: "Kısmen", seller: "Tunalı Emlak", date: "09.10.2026", desc: "Merkezi konumda prestijli daire.", premium: false, 
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Satılık Rezidans (2 Adet) ---
    { 
        id: 103, type: "satilik-rezidans", title: "Şişli Bomonti'de Panoramik Manzaralı Rezidans", price: 18500000, city: "İstanbul", district: "Şişli", rooms: "2+1", m2Brut: 125, m2Net: 105, age: "4", floor: "35", heating: "Merkezi", baths: "2", facade: "Güney", furnished: "Evet", seller: "Global Gayrimenkul", date: "12.10.2026", desc: "Vale ve havuz ayrıcalıklı rezidans.", premium: true, 
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 104, type: "satilik-rezidans", title: "İzmir Bayraklı Tower Rezidans", price: 14200000, city: "İzmir", district: "Bayraklı", rooms: "3+1", m2Brut: 160, m2Net: 140, age: "3", floor: "22", heating: "VRV", baths: "2", facade: "Batı", furnished: "Hayır", seller: "İzmir A.Ş.", date: "09.10.2026", desc: "Kesintisiz körfez manzaralı rezidans.", premium: false, 
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Rezidans (2 Adet) ---
    { 
        id: 203, type: "kiralik-rezidans", title: "Ankara Çankaya Paragon Kiralık Rezidans", price: 45000, city: "Ankara", district: "Çankaya", rooms: "2+1", m2Brut: 110, m2Net: 95, age: "2", floor: "15", heating: "Merkezi", baths: "2", facade: "Güney", furnished: "Evet", seller: "VIP Emlak", date: "11.10.2026", desc: "7/24 resepsiyonlu lüks rezidans.", premium: true, 
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 204, type: "kiralik-rezidans", title: "Maslak 1453 Ful Eşyalı Kiralık Residence", price: 38000, city: "İstanbul", district: "Sarıyer", rooms: "1+1", m2Brut: 80, m2Net: 70, age: "4", floor: "11", heating: "Merkezi", baths: "1", facade: "Doğu", furnished: "Evet", seller: "Maslak Emlak", date: "10.10.2026", desc: "Cadde mağazalarına yakın rezidans.", premium: false, 
        images: ["https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Satılık Müstakil Ev (2 Adet) ---
    { 
        id: 105, type: "satilik-mustakil", title: "Hatay Arsuz'da Bahçeli Müstakil Ev", price: 4800000, city: "Hatay", district: "Arsuz", rooms: "3+1", m2Brut: 180, m2Net: 150, age: "5", floor: "2", heating: "Klima", baths: "2", facade: "Dört Cephe", furnished: "Kısmen", seller: "Arsuz Emlak", date: "10.10.2026", desc: "Meyve ağaçlı geniş bahçeli ev.", premium: false, 
        images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 106, type: "satilik-mustakil", title: "Datça'da Tarihi Taş Müstakil Ev", price: 13500000, city: "Muğla", district: "Datça", rooms: "2+1", m2Brut: 120, m2Net: 100, age: "30", floor: "2", heating: "Şömine", baths: "2", facade: "Güney", furnished: "Evet", seller: "Datça Evleri", date: "08.10.2026", desc: "Restore edilmiş avlulu taş ev.", premium: true, 
        images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Müstakil Ev (2 Adet) ---
    { 
        id: 205, type: "kiralik-mustakil", title: "Fethiye'de Doğa İçi Kiralık Müstakil Ev", price: 25000, city: "Muğla", district: "Fethiye", rooms: "2+1", m2Brut: 110, m2Net: 95, age: "4", floor: "1", heating: "Klima", baths: "1", facade: "Güney", furnished: "Evet", seller: "Fethiye Emlak", date: "10.10.2026", desc: "Orman içinde huzurlu müstakil ev.", premium: true, 
        images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 206, type: "kiralik-mustakil", title: "Sapanca'da Havuzlu Kiralık Müstakil Ev", price: 30000, city: "Sakarya", district: "Merkez", rooms: "4+1", m2Brut: 180, m2Net: 155, age: "3", floor: "2", heating: "Yerden Isıtma", baths: "2", facade: "Güney", furnished: "Evet", seller: "Sapanca Tatil", date: "05.10.2026", desc: "Isıtmalı özel havuzlu ev.", premium: false, 
        images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Satılık Villa (2 Adet) ---
    { 
        id: 107, type: "satilik-villa", title: "Bodrum Yalıkavak Lüks Villa", price: 32000000, city: "Muğla", district: "Bodrum", rooms: "5+2", m2Brut: 420, m2Net: 360, age: "2", floor: "3", heating: "Yerden Isıtma", baths: "5", facade: "Dört Cephe", furnished: "Evet", seller: "Yalıkavak Emlak", date: "12.10.2026", desc: "Özel sonsuzluk havuzlu lüks villa.", premium: true, 
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 108, type: "satilik-villa", title: "Antalya Kaş Kalkan Deniz Manzaralı Villa", price: 24500000, city: "Antalya", district: "Kaş", rooms: "4+1", m2Brut: 280, m2Net: 240, age: "1", floor: "2", heating: "Klima", baths: "4", facade: "Güney", furnished: "Evet", seller: "Kalkan Homes", date: "10.10.2026", desc: "Jakuzili ve havuzlu villa.", premium: false, 
        images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Villa (2 Adet) ---
    { 
        id: 207, type: "kiralik-villa", title: "Bodrum Yalıkavak Kiralık Lüks Villa", price: 65000, city: "Muğla", district: "Bodrum", rooms: "4+1", m2Brut: 280, m2Net: 240, age: "2", floor: "2", heating: "VRF", baths: "4", facade: "Güney", furnished: "Evet", seller: "Bodrum Rentals", date: "12.10.2026", desc: "Deniz manzaralı kiralık villa.", premium: true, 
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 208, type: "kiralik-villa", title: "İstanbul Beykoz Acarkent Kiralık Villa", price: 120000, city: "İstanbul", district: "Beykoz", rooms: "6+2", m2Brut: 550, m2Net: 480, age: "8", floor: "3", heating: "Doğalgaz", baths: "5", facade: "Dört Cephe", furnished: "Kısmen", seller: "Acarkent Emlak", date: "11.10.2026", desc: "Devasa bahçeli prestijli villa.", premium: false, 
        images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // ==========================================
    // 2. İŞ YERİ KATEGORİSİ
    // ==========================================

    // --- Satılık Ofis & Büro (2 Adet) ---
    { 
        id: 109, type: "satilik-ofis", title: "İstanbul Levent Plaza Katı Ofis", price: 35000000, city: "İstanbul", district: "Beşiktaş", rooms: "Açık Ofis", m2Brut: 250, m2Net: 220, age: "5", floor: "14", heating: "VRF", baths: "2", facade: "Kuzey", furnished: "Evet", seller: "Corporate Emlak", date: "11.10.2026", desc: "A Sınıfı Plaza katı, hazır sekreterya.", premium: true, 
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 110, type: "satilik-ofis", title: "Ankara Söğütözü İş Merkezi Ofis", price: 14500000, city: "Ankara", district: "Çankaya", rooms: "3 Bölme", m2Brut: 140, m2Net: 125, age: "4", floor: "8", heating: "Merkezi", baths: "1", facade: "Güney", furnished: "Hayır", seller: "Ankara Emlak", date: "10.10.2026", desc: "Metroya sıfır konumda ofis.", premium: false, 
        images: ["https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Ofis & Büro (2 Adet) ---
    { 
        id: 209, type: "kiralik-ofis", title: "Maslak Ayazağa Kiralık Plaza Katı", price: 60000, city: "İstanbul", district: "Sarıyer", rooms: "Açık Ofis", m2Brut: 180, m2Net: 155, age: "3", floor: "10", heating: "VRF", baths: "2", facade: "Güney", furnished: "Evet", seller: "Maslak Kiralama", date: "12.10.2026", desc: "Hazır dekorasyonlu plaza ofisi.", premium: true, 
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 210, type: "kiralik-ofis", title: "Adana Adliye Karşısı Avukatlık Bürosu", price: 21000, city: "Adana", district: "Seyhan", rooms: "3+1", m2Brut: 110, m2Net: 95, age: "6", floor: "4", heating: "Kombi", baths: "1", facade: "Güney", furnished: "Evet", seller: "Adana Hukuk", date: "05.10.2026", desc: "Adliyeye yürüyüş mesafesinde büro.", premium: false, 
        images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Satılık Dükkan & Mağaza (2 Adet) ---
    { 
        id: 111, type: "satilik-dukkan", title: "İskenderun Pac Meydanı Yakını Dükkan", price: 12500000, city: "Hatay", district: "İskenderun", rooms: "Tek Alan", m2Brut: 220, m2Net: 200, age: "5", floor: "Zemin", heating: "Klima", baths: "1", facade: "Güney", furnished: "Hayır", seller: "Hatay Ticari", date: "12.10.2026", desc: "Kurumsal kiracılı yatırımcıya uygun dükkan.", premium: true, 
        images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 112, type: "satilik-dukkan", title: "Kadıköy Moda Caddesi Mağaza", price: 28000000, city: "İstanbul", district: "Kadıköy", rooms: "2 Bölüm", m2Brut: 110, m2Net: 95, age: "20", floor: "Zemin", heating: "Klima", baths: "1", facade: "Doğu", furnished: "Hayır", seller: "Moda Emlak", date: "09.10.2026", desc: "İnsan trafiğinin yoğun olduğu cadde mağazası.", premium: false, 
        images: ["https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Dükkan & Mağaza (2 Adet) ---
    { 
        id: 211, type: "kiralik-dukkan", title: "İskenderun Pac Meydanı Kiralık Dükkan", price: 65000, city: "Hatay", district: "İskenderun", rooms: "Dükkan", m2Brut: 130, m2Net: 115, age: "4", floor: "Zemin", heating: "Klima", baths: "1", facade: "Güney", furnished: "Hayır", seller: "Mülk Sahibi", date: "12.10.2026", desc: "Baca altyapılı işlek dükkan.", premium: true, 
        images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 212, type: "kiralik-dukkan", title: "Şişli Halaskargazi Kiralık Mağaza", price: 95000, city: "İstanbul", district: "Şişli", rooms: "2 Katlı", m2Brut: 180, m2Net: 150, age: "25", floor: "Zemin", heating: "Klima", baths: "1", facade: "Batı", furnished: "Hayır", seller: "Şişli Emlak", date: "11.10.2026", desc: "Tekstil merkezinde dev vitrinli mağaza.", premium: false, 
        images: ["https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Satılık Depo & Antrepo (Bu kategori genellikle kiralıktır ancak örnek olması açısından eklenmiştir) ---
    // (İş yeri grubu içindeki depo için alternatif satılık/kiralık akışı)
    { 
        id: 113, type: "satilik-depo", title: "Gebze Sanayi Bölgesi Satılık Depo", price: 18000000, city: "Kocaeli", district: "Gebze", rooms: "Depo", m2Brut: 1200, m2Net: 1100, age: "4", floor: "Zemin", heating: "Yok", baths: "2", facade: "Dört Cephe", furnished: "Hayır", seller: "Sanayi Emlak", date: "11.10.2026", desc: "Tır yanaşır yüksek tavanlı depo.", premium: false,
        images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 114, type: "satilik-depo", title: "İzmir Torbalı İmalathane ve Depo", price: 12000000, city: "İzmir", district: "Torbalı", rooms: "Depo", m2Brut: 900, m2Net: 820, age: "6", floor: "Zemin", heating: "Yok", baths: "2", facade: "Güney", furnished: "Hayır", seller: "Ege Depo", date: "09.10.2026", desc: "Trafo altyapılı endüstriyel depo.", premium: false,
        images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Depo & Antrepo (2 Adet) ---
    { 
        id: 213, type: "kiralik-depo", title: "Gebze OSB Kiralık Tır Yanaşır Depo", price: 160000, city: "Kocaeli", district: "Gebze", rooms: "Depo", m2Brut: 1500, m2Net: 1400, age: "5", floor: "Zemin", heating: "Sanayi", baths: "2", facade: "Dört Cephe", furnished: "Hayır", seller: "Lojistik Emlak", date: "12.10.2026", desc: "9 metre tavan yüksekliğinde rampa.", premium: true, 
        images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 214, type: "kiralik-depo", title: "Hadımköy Lojistik Antrepo", price: 280000, city: "İstanbul", district: "Esenyurt", rooms: "Antrepo", m2Brut: 3000, m2Net: 2800, age: "3", floor: "Zemin", heating: "Yok", baths: "4", facade: "Dört Cephe", furnished: "Hayır", seller: "İstanbul Lojistik", date: "10.10.2026", desc: "Gümrüklü depolamaya uygun alan.", premium: false, 
        images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // ==========================================
    // 3. ARSA KATEGORİSİ
    // ==========================================

    // --- Satılık İmarlı Arsa (2 Adet) ---
    { 
        id: 115, type: "satilik-imarli", title: "İzmir Urla Kalabak Konut İmarlı Arsa", price: 8900000, city: "İzmir", district: "Urla", rooms: "Arsa", m2: 1200, zoning: "Konut", ada: "412", parsel: "18", deedStatus: "Müstakil", seller: "Urla Arsa", date: "12.10.2026", desc: "Deniz manzaralı villa imarlı arsa.", premium: true, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 116, type: "satilik-imarli", title: "İstanbul Çatalca Villalık İmarlı Arsa", price: 6500000, city: "İstanbul", district: "Çatalca", rooms: "Arsa", m2: 650, zoning: "Konut", ada: "105", parsel: "4", deedStatus: "Müstakil", seller: "Çatalca Merkez", date: "11.10.2026", desc: "Otoyola yakın inşaata hazır imarlı arsa.", premium: false, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık İmarlı Arsa (2 Adet) ---
    { 
        id: 215, type: "kiralik-imarli", title: "Ankara İncek Ticari İmarlı Kiralık Arsa", price: 50000, city: "Ankara", district: "Gölbaşı", rooms: "Arsa", m2: 2000, zoning: "Ticari", ada: "501", parsel: "2", deedStatus: "Hisseli", seller: "Başkent Arsa", date: "10.10.2026", desc: "Depo veya otopark için kiralık arsa.", premium: true, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 216, type: "kiralik-imarli", title: "İzmir Bornova Depolama İmarlı Arsa", price: 70000, city: "İzmir", district: "Bornova", rooms: "Arsa", m2: 3500, zoning: "Ticari", ada: "120", parsel: "9", deedStatus: "Müstakil", seller: "Ege Arsa", date: "08.10.2026", desc: "Tır parkı veya şantiye alanına uygun arsa.", premium: false, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Satılık Tarla (2 Adet) ---
    { 
        id: 117, type: "satilik-tarla", title: "Hatay Antakya Yolu Üzeri Yatırımlık Tarla", price: 3800000, city: "Hatay", district: "Antakya", rooms: "Tarla", m2: 12000, zoning: "Tarım", ada: "112", parsel: "45", deedStatus: "Müstakil", seller: "Çiftçi Emlak", date: "11.10.2026", desc: "Kadastro yoluna cepheli verimli tarla.", premium: true, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 118, type: "satilik-tarla", title: "Tekirdağ Süleymanpaşa Otobana Cephe Tarla", price: 4200000, city: "Tekirdağ", district: "Süleymanpaşa", rooms: "Tarla", m2: 8000, zoning: "Tarım", ada: "204", parsel: "11", deedStatus: "Müstakil", seller: "Trakya Emlak", date: "09.10.2026", desc: "Geleceğe dönük prim garantili tarla.", premium: false, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Tarla (2 Adet) ---
    { 
        id: 217, type: "kiralik-tarla", title: "Konya Karatay'da Sezonluk Kiralık Tarla", price: 150000, city: "Konya", district: "Karatay", rooms: "Tarla", m2: 40000, zoning: "Tarım", ada: "310", parsel: "12", deedStatus: "Müstakil", seller: "Anadolu Tarım", date: "10.10.2026", desc: "Buğday ekimine uygun sulu tarla.", premium: true, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 218, type: "kiralik-tarla", title: "Adana Seyhan Ovada Kiralık Tarım Arazisi", price: 120000, city: "Adana", district: "Seyhan", rooms: "Tarla", m2: 25000, zoning: "Tarım", ada: "415", parsel: "5", deedStatus: "Müstakil", seller: "Çukurova Tarım", date: "07.10.2026", desc: "Damlama sulama tesisatlı kiralık tarla.", premium: false, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Satılık Zeytinlik (2 Adet) ---
    { 
        id: 119, type: "satilik-zeytinlik", title: "Hatay Belen'de 250 Ağaçlı Zeytinlik", price: 2800000, city: "Hatay", district: "Belen", rooms: "Zeytinlik", m2: 7500, zoning: "Zeytinlik", ada: "103", parsel: "19", deedStatus: "Müstakil", seller: "Belen Emlak", date: "12.10.2026", desc: "Yüksek zeytinyağı rekolteli zeytinlik.", premium: true, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 120, type: "satilik-zeytinlik", title: "Balıkesir Ayvalık Cunda Yakını Zeytinlik", price: 8200000, city: "Balıkesir", district: "Ayvalık", rooms: "Zeytinlik", m2: 5200, zoning: "Zeytinlik", ada: "215", parsel: "3", deedStatus: "Müstakil", seller: "Ayvalık Emlak", date: "08.10.2026", desc: "Cunda adası manzaralı asırlık zeytinlik.", premium: false, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },

    // --- Kiralık Zeytinlik (2 Adet) ---
    { 
        id: 219, type: "kiralik-zeytinlik", title: "Muğla Milas Sezonluk Kiralık Zeytinlik", price: 40000, city: "Muğla", district: "Milas", rooms: "Zeytinlik", m2: 8000, zoning: "Zeytinlik", ada: "302", parsel: "7", deedStatus: "Müstakil", seller: "Milas Emlak", date: "11.10.2026", desc: "Hasat dönemi kullanım hakkı kiralık zeytinlik.", premium: true, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    },
    { 
        id: 220, type: "kiralik-zeytinlik", title: "Bursa Gemlik Kiralık Verimli Zeytinlik", price: 35000, city: "Bursa", district: "Gemlik", rooms: "Zeytinlik", m2: 5000, zoning: "Zeytinlik", ada: "114", parsel: "2", deedStatus: "Müstakil", seller: "Gemlik Emlak", date: "06.10.2026", desc: "Trilye zeytin ağaçlı yıllık kiralık arazi.", premium: false, 
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://pannellum.org/images/alma.jpg"],
        panoramicImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tour360Image: "https://pannellum.org/images/alma.jpg"
    }
];

const approvedFromAdmin = JSON.parse(localStorage.getItem('approvedListings'));
if (approvedFromAdmin && approvedFromAdmin.length > 0) {
    approvedFromAdmin.forEach(ilan => { if (!realEstateDB.find(item => item.id === ilan.id)) realEstateDB.push(ilan); });
}

function renderListings(dataArray) {
    if(!listingsContainer) return;
    listingsContainer.innerHTML = ''; 
    
    let exactMatches = dataArray.filter(item => item.type.startsWith(currentMainType));

    if(exactMatches.length === 0) {
        listingsContainer.innerHTML = `<h3 style="color:white; margin:auto; padding:50px;">Aradığınız kriterlere uygun ${currentMainType} ilan bulunamadı.</h3>`;
        return;
    }

    const sortedArray = exactMatches.sort((a, b) => (b.premium === true) - (a.premium === true));

    sortedArray.forEach(item => {
        const card = document.createElement('div');
        card.className = item.premium ? 'listing-card premium-card' : 'listing-card';
        const formattedPrice = typeof item.price === 'number' ? item.price.toLocaleString('tr-TR') : item.price;

        card.innerHTML = `
            ${item.premium ? '<div class="premium-badge">⭐ Öne Çıkan</div>' : ''}
            <img src="${item.images[0]}" alt="Mülk" loading="lazy">
            <h3>${item.title}</h3>
            <p>📍 ${item.city} / ${item.district} | 🛏️ ${item.rooms}</p>
            <p>${formattedPrice} TL</p>
            <button class="virtual-tour-btn" style="background:#0984e3; border-color:#0984e3;" onclick="openDetailModal(${item.id})">🔍 İlanı İncele</button>
        `;
        listingsContainer.appendChild(card);
    });
}

function loadListings(type) {
    const filteredByCategory = realEstateDB.filter(item => item.type === type);
    renderListings(filteredByCategory);
}

document.getElementById('executeSearchBtn')?.addEventListener('click', () => {
    const city = document.getElementById('filterCity').value;
    const district = document.getElementById('filterDistrict').value;
    const room = document.getElementById('filterRoom').value;
    const minP = parseFloat(document.getElementById('filterMin').value) || 0;
    const maxP = parseFloat(document.getElementById('filterMax').value) || Infinity;

    const results = realEstateDB.filter(item => {
        if(city !== "Hepsi" && item.city !== city) return false;
        if(district !== "Hepsi" && item.district !== district) return false;
        if(room !== "Hepsi" && item.rooms !== room) return false;
        let numPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/\D/g,'')) : item.price;
        if(numPrice < minP || numPrice > maxP) return false;
        return true; 
    });
    renderListings(results);
});

// ========================================================
// İLAN DETAY MODALI
// ========================================================
const detailModal = document.getElementById('detailModal');

function openDetailModal(id) {
    const listing = realEstateDB.find(item => item.id === id);
    if(listing) {
        // Eğer ilanın birden fazla fotoğrafı varsa ilkini ana resim yap
        const images = (listing.images && listing.images.length > 0) ? listing.images : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"];
        
        document.getElementById('detailImage').src = images[0];
        
        // Küçük Resimleri (Thumbnails) Oluştur
        const thumbContainer = document.getElementById('detailThumbnails');
        if(thumbContainer) {
            thumbContainer.innerHTML = '';
            images.forEach((imgUrl, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgUrl;
                thumb.style.width = "70px";
                thumb.style.height = "50px";
                thumb.style.objectFit = "cover";
                thumb.style.borderRadius = "6px";
                thumb.style.cursor = "pointer";
                thumb.style.border = index === 0 ? "2px solid var(--primary-color)" : "2px solid transparent";
                
                // Küçük resme tıklandığında ana resmi değiştir
                thumb.onclick = () => {
                    document.getElementById('detailImage').src = imgUrl;
                    Array.from(thumbContainer.children).forEach(t => t.style.border = "2px solid transparent");
                    thumb.style.border = "2px solid var(--primary-color)";
                };
                
                thumbContainer.appendChild(thumb);
            });
        }

        document.getElementById('detailTitle').innerText = listing.title;
        document.getElementById('detailLocation').innerText = `📍 ${listing.city} / ${listing.district} ${listing.neighborhood ? '/ ' + listing.neighborhood : ''}`;
        document.getElementById('detailPrice').innerText = (typeof listing.price === 'number' ? listing.price.toLocaleString('tr-TR') : listing.price) + " TL";
        document.getElementById('detailDesc').innerText = listing.desc || "Satıcı açıklama girmemiştir.";
        
        const formatType = listing.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const specsContainer = document.getElementById('dynamicSpecsContainer');
        
        let specsHTML = `
            <div class="spec-row"><span>İlan No:</span> <strong>${listing.id}</strong></div>
            <div class="spec-row"><span>İlan Tarihi:</span> <strong>${listing.date || new Date().toLocaleDateString('tr-TR')}</strong></div>
            <div class="spec-row"><span>Kategori:</span> <strong>${formatType}</strong></div>
            <div class="spec-row"><span>Kimden:</span> <strong style="color: #0984e3;">${listing.seller || "Emlak360 Üyesi"}</strong></div>
        `;

        if (listing.type.includes('imarli') || listing.type.includes('tarla') || listing.type.includes('zeytinlik')) {
            specsHTML += `
                <div class="spec-row"><span>m²:</span> <strong>${listing.m2 || 'Belirtilmemiş'}</strong></div>
                <div class="spec-row"><span>İmar Durumu:</span> <strong>${listing.zoning || 'Belirtilmemiş'}</strong></div>
                <div class="spec-row"><span>Ada / Parsel:</span> <strong>${listing.ada || '-'} / ${listing.parsel || '-'}</strong></div>
                <div class="spec-row"><span>Tapu Durumu:</span> <strong>${listing.deedStatus || 'Belirtilmemiş'}</strong></div>
            `;
        } else {
            specsHTML += `
                <div class="spec-row"><span>Brüt / Net m²:</span> <strong>${listing.m2Brut || listing.m2 || '-'} / ${listing.m2Net || '-'}</strong></div>
                <div class="spec-row"><span>Oda Sayısı:</span> <strong>${listing.rooms || '-'}</strong></div>
                <div class="spec-row"><span>Bina Yaşı:</span> <strong>${listing.age || '-'}</strong></div>
                <div class="spec-row"><span>Bulunduğu Kat:</span> <strong>${listing.floor || '-'}</strong></div>
                <div class="spec-row"><span>Isıtma:</span> <strong>${listing.heating || '-'}</strong></div>
                <div class="spec-row"><span>Banyo Sayısı:</span> <strong>${listing.baths || '-'}</strong></div>
                <div class="spec-row"><span>Cephe:</span> <strong>${listing.facade || '-'}</strong></div>
                <div class="spec-row"><span>Eşyalı:</span> <strong>${listing.furnished || 'Hayır'}</strong></div>
            `;
        }
        
        specsContainer.innerHTML = specsHTML;
        detailModal.style.display = 'flex';
    }
}
function closeDetailModal() { detailModal.style.display = 'none'; }

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const contextMenu = document.getElementById("customContextMenu");
    if(!contextMenu) return;
    let x = e.offsetX, y = e.offsetY;
    let winW = window.innerWidth, winH = window.innerHeight;
    let cmW = contextMenu.offsetWidth, cmH = contextMenu.offsetHeight;
    contextMenu.style.left = `${x > winW - cmW ? winW - cmW : x}px`;
    contextMenu.style.top = `${y > winH - cmH ? winH - cmH : y}px`;
    contextMenu.style.display = "block";
});
document.addEventListener("click", () => {
    const cm = document.getElementById("customContextMenu");
    if(cm) cm.style.display = "none";
});

// ========================================================
// 4. ADIM: DİNAMİK ISI HARİTASI (İLAN VERİLERİNE GÖRE OTOMATİK HOTSPOTS)
// ========================================================
let heatMapInstance = null;

// Türkiye'deki temel şehirlerin koordinat sözlüğü (Merkez Enlem/Boylam)
const cityCoordinates = {
    "İstanbul": { lat: 41.0082, lng: 28.9784 },
    "Ankara": { lat: 39.9334, lng: 32.8597 },
    "İzmir": { lat: 38.4192, lng: 27.1287 },
    "Hatay": { lat: 36.4018, lng: 36.1594 },
    "Antalya": { lat: 36.8969, lng: 30.7133 },
    "Bursa": { lat: 40.1828, lng: 29.0665 },
    "Kocaeli": { lat: 40.7654, lng: 29.9408 },
    "Muğla": { lat: 37.2153, lng: 28.3636 },
    "Konya": { lat: 37.8667, lng: 32.4833 },
    "Tekirdağ": { lat: 40.9833, lng: 27.5167 },
    "Balıkesir": { lat: 39.6484, lng: 27.8826 },
    "Aydın": { lat: 37.8444, lng: 27.8458 },
    "Sakarya": { lat: 40.7569, lng: 30.3783 },
    "Gaziantep": { lat: 37.0662, lng: 37.3833 },
    "Adana": { lat: 37.0000, lng: 35.3213 },
    "Samsun": { lat: 41.2867, lng: 36.33, },
    "Mersin": { lat: 36.8000, lng: 34.6333 },
    "Nevşehir": { lat: 38.6244, lng: 34.7233 },
    "Trabzon": { lat: 41.0015, lng: 39.7178 },
    "Çanakkale": { lat: 40.1553, lng: 26.4142 }
};

function openHeatmap() {
    const modal = document.getElementById('heatmapModal');
    if(modal) modal.style.display = 'flex';

    if (!heatMapInstance) {
        heatMapInstance = L.map('turkeyMap').setView([39.0, 35.0], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(heatMapInstance);
    } else {
        // Harita zaten açıksa katmanları temizleyip güncel verilerle yeniden çizelim
        heatMapInstance.eachLayer((layer) => {
            if (layer instanceof L.Circle) {
                heatMapInstance.removeLayer(layer);
            }
        });
    }

    // --- YAPAY ZEKA / VERİ ANALİTİĞİ ALGORİTMASI ---
    // Veritabanındaki (realEstateDB + Admin onaylılar) SADECE Arsa, Tarla ve Zeytinlik ilanlarını filtrele
    const arsaTarlaListings = realEstateDB.filter(item => 
        item.type.includes('imarli') || item.type.includes('tarla') || item.type.includes('zeytinlik')
    );

    // Şehirlere göre ilan yoğunluğunu (frekansını) hesapla
    const cityDensityMap = {};
    arsaTarlaListings.forEach(item => {
        const sehir = item.city;
        if (!cityDensityMap[sehir]) {
            cityDensityMap[sehir] = 0;
        }
        cityDensityMap[sehir] += 1; // Her ilan yoğunluğu 1 artırır
    });

    // Hesaplanan yoğunluklara göre dinamik ısı çemberlerini (Hotspots) haritaya işle
    Object.keys(cityDensityMap).forEach(sehir => {
        const count = cityDensityMap[sehir];
        const coords = cityCoordinates[sehir];

        if (coords) {
            // İlan sayısına göre dinamik renk ve büyüklük (Yoğunluk algoritmik olarak artar)
            let radiusSize = 15000 + (count * 5000); // İlan sayısı arttıkça alan genişler
            let heatColor = '#eccc68'; // Sarı (Orta Yoğunluk)
            let opacityVal = 0.5;

            if (count >= 3) {
                heatColor = '#ffa502'; // Turuncu (Yüksek Yoğunluk)
                opacityVal = 0.6;
            }
            if (count >= 5) {
                heatColor = '#ff4757'; // Kırmızı (Kritik / En Çok İşlem Gören Sıcak Bölge)
                opacityVal = 0.75;
            }

            // Dış Buhar Katmanı
            L.circle([coords.lat, coords.lng], {
                radius: radiusSize * 1.4,
                color: 'transparent',
                fillColor: heatColor,
                fillOpacity: opacityVal * 0.4,
                className: 'heat-blur'
            }).addTo(heatMapInstance);

            // İç Yoğun Çekirdek Katmanı (Üzerine tıklanınca bilgi balonu çıkar)
            const coreCircle = L.circle([coords.lat, coords.lng], {
                radius: radiusSize * 0.7,
                color: heatColor,
                weight: 2,
                fillColor: heatColor,
                fillOpacity: opacityVal,
                className: 'heat-blur-intense'
            }).addTo(heatMapInstance);

            coreCircle.bindPopup(`
                <div style="color: #1e272e; font-family: 'Poppins', sans-serif; text-align: center;">
                    <h3 style="margin: 0 0 5px 0; color: #ff4757;">📍 ${sehir} Yatırım Noktası</h3>
                    <p style="margin: 0; font-size: 13px;"><b>Aktif Arsa/Tarla İlanı:</b> ${count} Adet</p>
                    <p style="margin: 5px 0 0 0; font-size: 11px; color: #2ed573;"><b>Durum:</b> Yüksek Değer Artış Trendi 🚀</p>
                </div>
            `);
        }
    });

    setTimeout(() => { 
        heatMapInstance.invalidateSize(); 
    }, 300);
}

function closeHeatmap() {
    const modal = document.getElementById('heatmapModal');
    if(modal) modal.style.display = 'none';
}

// Modal Kapatma Düğmesi Bağlantısı (Kapatma Çarpısı için)
document.addEventListener('DOMContentLoaded', () => {
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    if (closeAuthBtn) {
        closeAuthBtn.addEventListener('click', () => {
            const authModal = document.getElementById('authModal');
            if (authModal) authModal.style.display = 'none';
        });
    }
});


// Modal Kapatma Düğmesi Bağlantısı (Kapatma Çarpısı için)
document.addEventListener('DOMContentLoaded', () => {
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    if (closeAuthBtn) {
        closeAuthBtn.addEventListener('click', () => {
            const authModal = document.getElementById('authModal');
            if (authModal) authModal.style.display = 'none';
        });
    }
});
