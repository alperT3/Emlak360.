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
// ZENGİNLEŞTİRİLMİŞ GERÇEKÇİ VERİTABANI (Her Kategoriye 5 İlan)
// ========================================================
const realEstateDB = [
    // ---------------- SATILIK KONUT ----------------
    // Satılık Daire (5 Adet)
    { id: 101, type: "satilik-daire", title: "Kadıköy Merkezde Deniz Manzaralı 3+1", price: 7500000, city: "İstanbul", district: "Kadıköy", rooms: "3+1", m2Brut: 135, m2Net: 120, age: "3", floor: "5", heating: "Doğalgaz (Kombi)", baths: "2", facade: "Güney-Doğu", furnished: "Hayır", seller: "Emlak360 Kurumsal", date: "10.10.2026", desc: "Kadıköy sahile yürüme mesafesinde, geniş balkonlu ve deniz manzaralı ultra lüks daire.", premium: true, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"] },
    { id: 102, type: "satilik-daire", title: "İskenderun Sahil Bandında Satılık Fırsat 2+1", price: 3450000, city: "Hatay", district: "İskenderun", rooms: "2+1", m2Brut: 110, m2Net: 95, age: "1", floor: "3", heating: "Doğalgaz (Kombi)", baths: "1", facade: "Kuzey-Batı", furnished: "Evet", seller: "Kılınç Gayrimenkul", date: "11.10.2026", desc: "Atatürk Bulvarı üzeri, asansörlü, kapalı otoparklı sıfır daire.", premium: true, images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"] },
    { id: 103, type: "satilik-daire", title: "Ankara Çankaya Gaziosmanpaşa'da 4+1 Lüks Daire", price: 9200000, city: "Ankara", district: "Çankaya", rooms: "4+1", m2Brut: 180, m2Net: 160, age: "7", floor: "2", heating: "Merkezi (Pay Ölçer)", baths: "2", facade: "Güney", furnished: "Hayır", seller: "Başkent VIP Emlak", date: "09.10.2026", desc: "Elçilikler bölgesinde, güvenlikli site içerisinde bakımlı konut.", premium: false, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"] },
    { id: 104, type: "satilik-daire", title: "İzmir Karşıyaka Bostanlı'da Tramvaya Yakın 3+1", price: 6800000, city: "İzmir", district: "Karşıyaka", rooms: "3+1", m2Brut: 130, m2Net: 115, age: "10", floor: "4", heating: "Doğalgaz (Kombi)", baths: "2", facade: "Batı", furnished: "Hayır", seller: "Ege Emlak Dünyası", date: "12.10.2026", desc: "Bostanlı iskelesine ve çarşıya 3 dakika yürüme mesafesinde kentsel dönüşüm fırsatlı.", premium: false, images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"] },
    { id: 105, type: "satilik-daire", title: "Bursa Nilüfer Özlüce'de Site İçi 2+1 Akıllı Daire", price: 4100000, city: "Bursa", district: "Nilüfer", rooms: "2+1", m2Brut: 105, m2Net: 90, age: "2", floor: "6", heating: "Yerden Isıtma", baths: "1", facade: "Güney-Batı", furnished: "Hayır", seller: "Bursa Park Gayrimenkul", date: "08.10.2026", desc: "Yüzme havuzlu, spor salonlu, akıllı ev otomasyon sistemli konut.", premium: false, images: ["https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800"] },

    // Satılık Rezidans (5 Adet)
    { id: 106, type: "satilik-rezidans", title: "Şişli Bomonti'de 35. Kat Panoramik Manzaralı Rezidans", price: 18500000, city: "İstanbul", district: "Şişli", rooms: "2+1", m2Brut: 125, m2Net: 105, age: "4", floor: "35", heating: "Merkezi (Pay Ölçer)", baths: "2", facade: "Güney-Doğu", furnished: "Evet", seller: "Global Luxury Real Estate", date: "12.10.2026", desc: "Heliped, concierge, vale hizmeti ve açık/kapalı havuz ayrıcalığı ile.", premium: true, images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"] },
    { id: 107, type: "satilik-rezidans", title: "Ankara Yüksek İhtisas Yakını Çankaya Tower Rezidans", price: 12000000, city: "Ankara", district: "Çankaya", rooms: "1+1", m2Brut: 75, m2Net: 65, age: "1", floor: "18", heating: "Yerden Isıtma", baths: "1", facade: "Kuzey-Doğu", furnished: "Evet", seller: "Vip Yapı Emlak", date: "07.10.2026", desc: "Yüksek kira getirili, eşyalı, yatırıma uygun residence daire.", premium: false, images: ["https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800"] },
    { id: 108, type: "satilik-rezidans", title: "İzmir Bayraklı Tower'da Körfez Manzaralı Rezidans", price: 14200000, city: "İzmir", district: "Bayraklı", rooms: "3+1", m2Brut: 160, m2Net: 140, age: "3", floor: "22", heating: "VRV Sistemi", baths: "2", facade: "Batı", furnished: "Hayır", seller: "İzmir Gayrimenkul A.Ş.", date: "09.10.2026", desc: "Manhattan mimarisi, kesintisiz körfez manzarası ve özel fitness alanı.", premium: false, images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"] },
    { id: 109, type: "satilik-rezidans", title: "Antalya Konyaaltı Sahilinde Residence Katı", price: 16000000, city: "Antalya", district: "Konyaaltı", rooms: "2+1", m2Brut: 115, m2Net: 100, age: "2", floor: "8", heating: "Klima", baths: "2", facade: "Güney", furnished: "Evet", seller: "Akdeniz Premium Homes", date: "11.10.2026", desc: "Denize sıfır konumda, özel plaj erişimli ultra lüks rezidans.", premium: true, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"] },
    { id: 110, type: "satilik-rezidans", title: "Gaziantep Şehitkamil'de Seyrantepe Rezidans", price: 8900000, city: "Gaziantep", district: "Şehitkamil", rooms: "4+1", m2Brut: 210, m2Net: 185, age: "1", floor: "12", heating: "Yerden Isıtma", baths: "3", facade: "Güney-Batı", furnished: "Hayır", seller: "Şahinbey Emlak", date: "06.10.2026", desc: "Ebeveyn banyolu, giyinme odalı, akıllı bina altyapısı.", premium: false, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"] },

    // Satılık Müstakil Ev (5 Adet)
    { id: 111, type: "satilik-mustakil", title: "Hatay Arsuz Gökmeydan'da Bahçeli Müstakil Ev", price: 4800000, city: "Hatay", district: "Arsuz", rooms: "3+1", m2Brut: 180, m2Net: 150, age: "5", floor: "2", heating: "Klima", baths: "2", facade: "Dört Cephe", furnished: "Kısmen", seller: "Arsuz Emlak Ofisi", date: "10.10.2026", desc: "Meyve ağaçları dolu 400 m² arsa içinde, denize 300m mesafede müstakil yaşam.", premium: false, images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"] },
    { id: 112, type: "satilik-mustakil", title: "Muğla Datça Eski Datça'da Tarihi Taş Müstakil Ev", price: 13500000, city: "Muğla", district: "Datça", rooms: "2+1", m2Brut: 120, m2Net: 100, age: "30", floor: "2", heating: "Şömine & Klima", baths: "2", facade: "Güney", furnished: "Evet", seller: "Datça Taş Evler", date: "08.10.2026", desc: "Orijinal dokusu korunarak restore edilmiş, begonvillerle süslü avlulu ev.", premium: true, images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"] },
    { id: 113, type: "satilik-mustakil", title: "Trabzon Ortahisar'da Doğa Manzaralı Müstakil Ev", price: 5200000, city: "Trabzon", district: "Ortahisar", rooms: "4+1", m2Brut: 220, m2Net: 190, age: "8", floor: "2", heating: "Kombi (Doğalgaz)", baths: "2", facade: "Dört Cephe", furnished: "Hayır", seller: "Karadeniz Gayrimenkul", date: "05.10.2026", desc: "Yeşillikler içinde, geniş verandalı, hobi bahçeli müstakil konut.", premium: false, images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"] },
    { id: 114, type: "satilik-mustakil", title: "Çanakkale Biga'da Bahçeli Ve Otoparklı Müstakil Ev", price: 3900000, city: "Çanakkale", district: "Biga", rooms: "3+1", m2Brut: 150, m2Net: 130, age: "4", floor: "2", heating: "Soba & Pelet", baths: "1", facade: "Doğu-Güney", furnished: "Hayır", seller: "Boğaz Emlak", date: "09.10.2026", desc: "Sakin mahallede, geniş garajlı ve kümes/depo alanlı müstakil ev.", premium: false, images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"] },
    { id: 115, type: "satilik-mustakil", title: "Nevşehir Ürgüp'te Otantik Kapadokya Müstakil Evi", price: 11000000, city: "Nevşehir", district: "Ürgüp", rooms: "3+1", m2Brut: 170, m2Net: 145, age: "25", floor: "2", heating: "Yerden Isıtma", baths: "2", facade: "Güney", furnished: "Evet", seller: "Kapadokya Cave Homes", date: "11.10.2026", desc: "Kaya oyma oda detaylı, terasından balon manzaralı özel müstakil mülk.", premium: true, images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800"] },

    // Satılık Villa (5 Adet)
    { id: 116, type: "satilik-villa", title: "Bodrum Yalıkavak Marinaya Komşu Lüks Villa", price: 32000000, city: "Muğla", district: "Bodrum", rooms: "5+2", m2Brut: 420, m2Net: 360, age: "2", floor: "3", heating: "Yerden Isıtma & VRF", baths: "5", facade: "Dört Cephe", furnished: "Evet", seller: "Yalıkavak Real Estate", date: "12.10.2026", desc: "Özel sonsuzluk havuzlu, akıllı bina, müstakil bahçe ve heliped olanağı.", premium: true, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"] },
    { id: 117, type: "satilik-villa", title: "Antalya Kaş Kalkan'da Kesintisiz Deniz Manzaralı Villa", price: 24500000, city: "Antalya", district: "Kaş", rooms: "4+1", m2Brut: 280, m2Net: 240, age: "1", floor: "2", heating: "Klima & Şömine", baths: "4", facade: "Güney-Batı", furnished: "Evet", seller: "Kalkan Riviera Homes", date: "10.10.2026", desc: "Yüksek günlük kiralama getirili, Jakuzili, ısıtmalı havuzlu lüks villa.", premium: true, images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"] },
    { id: 118, type: "satilik-villa", title: "İstanbul Zekeriyaköy'de Doğa İçinde 6+2 Tripleks Villa", price: 29000000, city: "İstanbul", district: "Sarıyer", rooms: "5+2", m2Brut: 480, m2Net: 410, age: "6", floor: "3", heating: "Doğalgaz (Kombi)", baths: "4", facade: "Dört Cephe", furnished: "Hayır", seller: "Sarıyer Prestij Gayrimenkul", date: "09.10.2026", desc: "2 dönüm müstakil arsa içinde, sauna, müştemilat ve müştemilat binası olan özel villa.", premium: false, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"] },
    { id: 119, type: "satilik-villa", title: "İzmir Çeşme Alaçatı'da Taş Mimari Özel Villa", price: 21000000, city: "İzmir", district: "Çeşme", rooms: "4+1", m2Brut: 230, m2Net: 195, age: "3", floor: "2", heating: "Isı Pompası", baths: "3", facade: "Güney", furnished: "Evet", seller: "Alaçatı Emlak Ofisi", date: "07.10.2026", desc: "Çeşme taşından yapılmış, avlulu, müstakil havuzlu otantik mimari.", premium: false, images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"] },
    { id: 120, type: "satilik-villa", title: "Sapanca Gölü Manzaralı Orman İçi Lüks Villa", price: 17500000, city: "Sakarya", district: "Merkez", rooms: "4+1", m2Brut: 310, m2Net: 270, age: "2", floor: "2", heating: "Yerden Isıtma", baths: "3", facade: "Güney-Doğu", furnished: "Evet", seller: "Sapanca Lake Villas", date: "05.10.2026", desc: "Kış bahçeli, özel ateş çukurlu, göl manzaralı huzurlu yaşam.", premium: false, images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"] },

    // ---------------- SATILIK İŞ YERİ ----------------
    // Satılık Ofis & Büro (5 Adet)
    { id: 121, type: "satilik-ofis", title: "İstanbul Levent Plaza Katı Devren Satılık Ofis", price: 35000000, city: "İstanbul", district: "Beşiktaş", rooms: "Açık Ofis", m2Brut: 250, m2Net: 220, age: "5", floor: "14", heating: "VRV Klima", baths: "2", facade: "Kuzey-Batu", furnished: "Evet", seller: "Corporate Real Estate", date: "11.10.2026", desc: "A Sınıfı Plaza katı, hazır sekreterya, toplantı odası ve otopark hakları.", premium: true, images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"] },
    { id: 122, type: "satilik-ofis", title: "Ankara Söğütözü Plazalar Bölgesinde Satılık Ofis", price: 14500000, city: "Ankara", district: "Çankaya", rooms: "3 Bölme", m2Brut: 140, m2Net: 125, age: "4", floor: "8", heating: "Merkezi", baths: "1", facade: "Güney", furnished: "Hayır", seller: "Ankara Plaza Danışmanlık", date: "10.10.2026", desc: "Metro durağına sıfır, prestijli iş merkezinde yatırımlık büro.", premium: false, images: ["https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"] },
    { id: 123, type: "satilik-ofis", title: "İzmir Folkart Towers'da Yüksek Katlı Lüks Büro", price: 19000000, city: "İzmir", district: "Bayraklı", rooms: "Açık Ofis", m2Brut: 165, m2Net: 145, age: "6", floor: "20", heating: "VRF", baths: "1", facade: "Batı", furnished: "Evet", seller: "Ege Plaza Emlak", date: "08.10.2026", desc: "Körfez manzaralı, kartlı geçiş sistemli, 7/24 resepsiyonlu iş yeri.", premium: true, images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"] },
    { id: 124, type: "satilik-ofis", title: "Gaziantep Ticaret Odası Yakını Modern Büro", price: 6200000, city: "Gaziantep", district: "Şehitkamil", rooms: "2+1", m2Brut: 95, m2Net: 80, age: "3", floor: "4", heating: "Kombi", baths: "1", facade: "Doğu", furnished: "Hayır", seller: "Gaziantep İş Emlak", date: "06.10.2026", desc: "Avukat, mali müşavir veya muayenehane kullanımına son derece uygun.", premium: false, images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"] },
    { id: 125, type: "satilik-ofis", title: "Kocaeli İzmit Merkezde Bulvar Üzeri Satılık Ofis", price: 4800000, city: "Kocaeli", district: "İzmit", rooms: "2+1", m2Brut: 85, m2Net: 75, age: "8", floor: "2", heating: "Kombi", baths: "1", facade: "Güney", furnished: "Hayır", seller: "Kocaeli Emlak Merkezi", date: "05.10.2026", desc: "Tabela değeri yüksek ana cadde üzeri masrafsız ofis katı.", premium: false, images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"] },

    // Satılık Dükkan & Mağaza (5 Adet)
    { id: 126, type: "satilik-dukkan", title: "İskenderun Pac Meydanı Yakını Dev Satılık Dükkan", price: 12500000, city: "Hatay", district: "İskenderun", rooms: "Tek Alan", m2Brut: 220, m2Net: 200, age: "5", floor: "Zemin", heating: "Klima", baths: "1", facade: "Güney", furnished: "Hayır", seller: "Hatay Ticari Emlak", date: "12.10.2026", desc: "Çift cepheli, ön kullanımı olan, kurumsal kiracılı (kurumsal market) dükkan.", premium: true, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] },
    { id: 127, type: "satilik-dukkan", title: "İstanbul Kadıköy Moda Caddesinde Fırsat Mağaza", price: 28000000, city: "İstanbul", district: "Kadıköy", rooms: "2 Bölüm", m2Brut: 110, m2Net: 95, age: "20", floor: "Zemin", heating: "Klima", baths: "1", facade: "Doğu", furnished: "Hayır", seller: "Kadıköy Mağaza Emlak", date: "09.10.2026", desc: "Moda caddesi üzerinde, insan trafiğinin zirvede olduğu noktada satılık dükkan.", premium: true, images: ["https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800"] },
    { id: 128, type: "satilik-dukkan", title: "Antalya Muratpaşa Işıklar Bulvarı Üzeri Mağaza", price: 18500000, city: "Antalya", district: "Muratpaşa", rooms: "Zemin+Bodrum", m2Brut: 180, m2Net: 160, age: "12", floor: "Zemin", heating: "Klima", baths: "1", facade: "Batı", furnished: "Hayır", seller: "Antalya Ticari Gayrimenkul", date: "10.10.2026", desc: "Geniş vitrin cepheli, bacalı, kafe veya restoran kullanımına uygun dükkan.", premium: false, images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"] },
    { id: 129, type: "satilik-dukkan", title: "Adana Seyhan Turgut Özal Bulvarında Satılık Dükkan", price: 15000000, city: "Adana", district: "Seyhan", rooms: "Tek Alan", m2Brut: 140, m2Net: 125, age: "7", floor: "Zemin", heating: "Klima", baths: "1", facade: "Kuzey", furnished: "Hayır", seller: "Çukurova Emlak", date: "07.10.2026", desc: "Turgut Özal üzerinde yüksek kira amortisman süreli yatırımlık mağaza.", premium: false, images: ["https://images.unsplash.com/photo-1567449303078-57ad995bd301?w=800"] },
    { id: 130, type: "satilik-dukkan", title: "Samsun Atakum Sahilde Devren Satılık Kafe Dükkanı", price: 9800000, city: "Samsun", district: "Atakum", rooms: "Açık + Kapalı", m2Brut: 250, m2Net: 210, age: "4", floor: "Zemin", heating: "Doğalgaz", baths: "2", facade: "Batı", furnished: "Evet", seller: "Karadeniz Ticari", date: "05.10.2026", desc: "Tüm ruhsatları alınmış, ful ekipmanlı, hazır müşterili dükkan mülkiyeti.", premium: false, images: ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"] },

    // ---------------- SATILIK ARSA & TARLA ----------------
    // Satılık İmarlı Arsa (5 Adet)
    { id: 131, type: "satilik-imarli", title: "İzmir Urla Kalabak'ta Deniz Gören %30 Konut İmarlı Arsa", price: 8900000, city: "İzmir", district: "Urla", rooms: "Arsa", m2: 1200, zoning: "Konut (%30)", ada: "412", parsel: "18", deedStatus: "Müstakil Tapu", seller: "Urla Arsa Ofisi", date: "12.10.2026", desc: "Deniz manzaralı, ikiz villa yapımına uygun, elektrik ve suyu başında hazır imarlı arsa.", premium: true, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 132, type: "satilik-imarli", title: "İstanbul Çatalca'da Villalık %20 İmarlı Müstakil Arsa", price: 6500000, city: "İstanbul", district: "Çatalca", rooms: "Arsa", m2: 650, zoning: "Müstakil Konut", ada: "105", parsel: "4", deedStatus: "Müstakil Tapu", seller: "Çatalca Emlak Merkezi", date: "11.10.2026", desc: "Kuzey Marmara Otoyoluna yakın, villa imarlı, hemen inşaat ruhsatı alınabilir.", premium: true, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 133, type: "satilik-imarli", title: "Hatay Arsuz Karaağaç'ta Sahile 400m Konut İmarlı Arsa", price: 5400000, city: "Hatay", district: "Arsuz", rooms: "Arsa", m2: 500, zoning: "Konut (%35)", ada: "820", parsel: "12", deedStatus: "Müstakil Tapu", seller: "Arsuz Yatırım Emlak", date: "10.10.2026", desc: "Karaağaç bölgesinde, etrafında lüks villalar olan köşe parsel satılık arsa.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 134, type: "satilik-imarli", title: "Ankara Gölbaşı İncek'te Ticari+Konut İmarlı Arsa", price: 14000000, city: "Ankara", district: "Gölbaşı", rooms: "Arsa", m2: 1500, zoning: "Karma İmar", ada: "302", parsel: "9", deedStatus: "Müstakil Tapu", seller: "Başkent Arsa Emlak", date: "08.10.2026", desc: "Bulvar üzeri, yüksek kat imarlı, proje geliştirmeye son derece elverişli.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 135, type: "satilik-imarli", title: "Antalya Döşemealtı'nda Müstakil Villa İmarlı Arsa", price: 7200000, city: "Antalya", district: "Döşemealtı", rooms: "Arsa", m2: 800, zoning: "Konut (%20/40)", ada: "154", parsel: "3", deedStatus: "Müstakil Tapu", seller: "Antalya Arsa Dünyası", date: "06.10.2026", desc: "Nemsiz yayla havasında, müstakil havuzlu villa yapımına uygun arsa.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },

    // Satılık Tarla (5 Adet)
    { id: 136, type: "satilik-tarla", title: "Hatay Antakya Yolu Üzeri 12 Dönüm Yatırımlık Tarla", price: 3800000, city: "Hatay", district: "Antakya", rooms: "Tarla", m2: 12000, zoning: "Tarım Arazisi", ada: "112", parsel: "45", deedStatus: "Müstakil Tapu", seller: "Çiftçi Emlak", date: "11.10.2026", desc: "Kadastro yoluna cepheli, içme suyu ve elektrik hattına yakın verimli tarla.", premium: true, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 137, type: "satilik-tarla", title: "Tekirdağ Süleymanpaşa'da Otobana Cephe 8 Dönüm Tarla", price: 4200000, city: "Tekirdağ", district: "Süleymanpaşa", rooms: "Tarla", m2: 8000, zoning: "Mutlak Tarım", ada: "204", parsel: "11", deedStatus: "Müstakil Tapu", seller: "Trakya Yatırım Emlak", date: "09.10.2026", desc: "Kanal İstanbul ve otoyol aksına yakın geleceğe dönük prim garantili arsa/tarla.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 138, type: "satilik-tarla", title: "Konya Karatay'da 50 Dönüm Sulak Tarım Arazisi", price: 7500000, city: "Konya", district: "Karatay", rooms: "Tarla", m2: 50000, zoning: "Sulu Tarım", ada: "510", parsel: "88", deedStatus: "Müstakil Tapu", seller: "Anadolu Tarım Emlak", date: "07.10.2026", desc: "Derin kuyu ruhsatlı, trafolu, mısır ve buğday ekimine hazır düz arazi.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 139, type: "satilik-tarla", title: "Balıkesir Edremit'te Kazdağları Manzaralı Tarla", price: 2900000, city: "Balıkesir", district: "Edremit", rooms: "Tarla", m2: 4500, zoning: "Tarım", ada: "108", parsel: "6", deedStatus: "Müstakil Tapu", seller: "Körfez Arsa Ofisi", date: "05.10.2026", desc: "Ekolojik tarım ve Tiny House yapımına uygun doğa harikası konum.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 140, type: "satilik-tarla", title: "Aydın Söke'de Pamuk Ve Şeftali Ekili 20 Dönüm Tarla", price: 6100000, city: "Aydın", district: "Söke", rooms: "Tarla", m2: 20000, zoning: "Sulu Tarım", ada: "314", parsel: "22", deedStatus: "Müstakil Tapu", seller: "Ege Tarım Gayrimenkul", date: "04.10.2026", desc: "Büyük Menderes ovasında, damlama sulama tesisatlı yüksek rekolteli tarla.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },

    // Satılık Zeytinlik (5 Adet)
    { id: 141, type: "satilik-zeytinlik", title: "Hatay Belen'de 250 Ağaçlı Yetişkin Zeytinlik", price: 2800000, city: "Hatay", district: "Belen", rooms: "Zeytinlik", m2: 7500, zoning: "Zeytinlik", ada: "103", parsel: "19", deedStatus: "Müstakil Tapu", seller: "Belen Emlak", date: "12.10.2026", desc: "Yıllık yüksek zeytinyağı rekoltesi olan, yolu açık, taş duvarla çevrili alan.", premium: true, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 142, type: "satilik-zeytinlik", title: "Muğla Milas'ta 10 Dönüm Asırlık Memecik Zeytinliği", price: 4500000, city: "Muğla", district: "Milas", rooms: "Zeytinlik", m2: 10000, zoning: "Zeytinlik", ada: "402", parsel: "8", deedStatus: "Müstakil Tapu", seller: "Milas Arsa Gayrimenkul", date: "10.10.2026", desc: "Soğuk sıkım zeytinyağı üretimine uygun Memecik türü 300 adet zeytin ağacı.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 143, type: "satilik-zeytinlik", title: "Balıkesir Ayvalık Cunda Yakını Denize Nazır Zeytinlik", price: 8200000, city: "Balıkesir", district: "Ayvalık", rooms: "Zeytinlik", m2: 5200, zoning: "Zeytinlik", ada: "215", parsel: "3", deedStatus: "Müstakil Tapu", seller: "Ayvalık Emlak Dünyası", date: "08.10.2026", desc: "Cunda adası manzaralı, bağ evi yapma imkanı olan eşsiz zeytinlik.", premium: true, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 144, type: "satilik-zeytinlik", title: "İzmir Seferihisar'da Organik Sertifikalı Zeytinlik", price: 3900000, city: "İzmir", district: "Seferihisar", rooms: "Zeytinlik", m2: 6000, zoning: "Zeytinlik", ada: "119", parsel: "14", deedStatus: "Müstakil Tapu", seller: "Cittaslow Emlak", date: "06.10.2026", desc: "Damla sulama sistemi kurulu, hobi bahçesi yapımına elverişli arsa.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 145, type: "satilik-zeytinlik", title: "Bursa Gemlik'te Sofralık Trilye Zeytinliği", price: 3400000, city: "Bursa", district: "Gemlik", rooms: "Zeytinlik", m2: 4800, zoning: "Zeytinlik", ada: "308", parsel: "7", deedStatus: "Müstakil Tapu", seller: "Gemlik Gayrimenkul", date: "05.10.2026", desc: "Gemlik Trilye tipi kaliteli sofralık zeytin veren bakımlı arazi.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },


    // ---------------- KİRALIK KONUT ----------------
    // Kiralık Daire (5 Adet)
    { id: 201, type: "kiralik-daire", title: "İstanbul Beşiktaş Çarşıda Eşyalı Kiralık 1+1", price: 28000, city: "İstanbul", district: "Beşiktaş", rooms: "1+1", m2Brut: 65, m2Net: 55, age: "8", floor: "2", heating: "Kombi", baths: "1", facade: "Doğu", furnished: "Evet", seller: "Beşiktaş Emlak", date: "12.10.2026", desc: "Üniversitelere ve toplu taşımaya çok yakın, eşyalı temiz daire.", premium: true, images: ["https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800"] },
    { id: 202, type: "kiralik-daire", title: "İskenderun Mustafa Kemal Mah. Kiralık 3+1", price: 16000, city: "Hatay", district: "İskenderun", rooms: "3+1", m2Brut: 140, m2Net: 125, age: "3", floor: "4", heating: "Kombi", baths: "2", facade: "Güney-Doğu", furnished: "Hayır", seller: "Kılınç Gayrimenkul", date: "11.10.2026", desc: "Geniş mutfaklı, çift balkonlu, aileye uygun kiralık konut.", premium: false, images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"] },
    { id: 203, type: "kiralik-daire", title: "Ankara Tunalı Hilmi Caddesinde Lüks Kiralık 2+1", price: 22500, city: "Ankara", district: "Çankaya", rooms: "2+1", m2Brut: 100, m2Net: 88, age: "12", floor: "3", heating: "Merkezi", baths: "1", facade: "Güney", furnished: "Kısmen", seller: "Tunalı Emlak Ofisi", date: "09.10.2026", desc: "Tunalı caddesine paralel, elçilik personeline ve çalışanlara uygun.", premium: false, images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"] },
    { id: 204, type: "kiralik-daire", title: "İzmir Bornova Küçükpark'ta Metroya Sıfır 1+1", price: 18500, city: "İzmir", district: "Bornova", rooms: "1+1", m2Brut: 55, m2Net: 48, age: "2", floor: "5", heating: "Kombi", baths: "1", facade: "Batı", furnished: "Evet", seller: "Bornova Öğrenci Emlak", date: "08.10.2026", desc: "Ege Üniversitesi hastanesine ve kampüse yürüme mesafesinde sıfır eşyalı.", premium: false, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"] },
    { id: 205, type: "kiralik-daire", title: "Antalya Muratpaşa Lara'da Deniz Manzaralı 3+1", price: 32000, city: "Antalya", district: "Muratpaşa", rooms: "3+1", m2Brut: 150, m2Net: 135, age: "5", floor: "7", heating: "Klima", baths: "2", facade: "Güney", furnished: "Evet", seller: "Lara Real Estate", date: "07.10.2026", desc: "Falezler üzerinde, kesintisiz Akdeniz manzaralı kiralık daire.", premium: true, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"] },

    // Kiralık Rezidans (5 Adet)
    { id: 206, type: "kiralik-rezidans", title: "Ankara Çankaya Paragon Residence Lüks 2+1", price: 45000, city: "Ankara", district: "Çankaya", rooms: "2+1", m2Brut: 110, m2Net: 95, age: "2", floor: "15", heating: "Merkezi", baths: "2", facade: "Güney-Batu", furnished: "Evet", seller: "VIP Emlak", date: "11.10.2026", desc: "7/24 resepsiyon, kapalı otopark, havuz ve spor salonu üyelikli.", premium: true, images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"] },
    { id: 207, type: "kiralik-rezidans", title: "İstanbul Maslak 1453'te Ful Eşyalı Kiralık 1+1", price: 38000, city: "İstanbul", district: "Sarıyer", rooms: "1+1", m2Brut: 80, m2Net: 70, age: "4", floor: "11", heating: "Merkezi", baths: "1", facade: "Doğu", furnished: "Evet", seller: "Maslak Residence Gayrimenkul", date: "10.10.2026", desc: "Cadde mağazalarına, restoranlara doğrudan asansör erişimli lüks yaşam.", premium: true, images: ["https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800"] },
    { id: 208, type: "kiralik-rezidans", title: "İzmir Mistral Tower'da Kiralık Residence Katı", price: 42000, city: "İzmir", district: "Konak", rooms: "2+1", m2Brut: 120, m2Net: 105, age: "5", floor: "25", heating: "VRF", baths: "2", facade: "Batı", furnished: "Evet", seller: "Ege Tower Emlak", date: "08.10.2026", desc: "Körfez manzaralı, akıllı ev sistemli, otel konseptinde rezidans.", premium: false, images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"] },
    { id: 209, type: "kiralik-rezidans", title: "Gaziantep İkon Tower'da Kiralık Stüdyo Rezidans", price: 20000, city: "Gaziantep", district: "Şehitkamil", rooms: "1+1", m2Brut: 60, m2Net: 50, age: "1", floor: "9", heating: "Yerden Isıtma", baths: "1", facade: "Güney", furnished: "Evet", seller: "Gaziantep Vip Konut", date: "06.10.2026", desc: "Sıfır eşyalı, güvenlikli, kapalı otoparklı lüks residence dairesi.", premium: false, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"] },
    { id: 210, type: "kiralik-rezidans", title: "Bursa Nilüfer Sur Yapı Marka Rezidans 3+1", price: 35000, city: "Bursa", district: "Nilüfer", rooms: "3+1", m2Brut: 160, m2Net: 140, age: "3", floor: "14", heating: "Merkezi", baths: "2", facade: "Güney-Doğu", furnished: "Hayır", seller: "Marka Emlak", date: "05.10.2026", desc: "AVM üstü, alışveriş ve ulaşım kolaylığı olan prestijli konut.", premium: false, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"] },

    // Kiralık Müstakil Ev (5 Adet)
    { id: 211, type: "kiralik-mustakil", title: "Hatay Arsuz Gökmeydan'da Bahçeli Kiralık Ev", price: 18000, city: "Hatay", district: "Arsuz", rooms: "3+1", m2Brut: 150, m2Net: 130, age: "6", floor: "2", heating: "Klima", baths: "2", facade: "Dört Cephe", furnished: "Kısmen", seller: "Zeynep Hanım", date: "12.10.2026", desc: "Geniş bahçeli, verandalı, aileye uygun sezonluk veya yıllık kiralık.", premium: false, images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"] },
    { id: 212, type: "kiralik-mustakil", title: "Muğla Fethiye'de Doğa İçi Kiralık Müstakil Ev", price: 25000, city: "Muğla", district: "Fethiye", rooms: "2+1", m2Brut: 110, m2Net: 95, age: "4", floor: "1", heating: "Klima & Şömine", baths: "1", facade: "Güney", furnished: "Evet", seller: "Fethiye Doğa Evleri", date: "10.10.2026", desc: "Ölüdeniz'e 10 km mesafede, çam ormanları içinde huzurlu müstakil yaşam.", premium: true, images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"] },
    { id: 213, type: "kiralik-mustakil", title: "İzmir Urla Çeşmealtı'nda Denize Yakın Müstakil Ev", price: 28000, city: "İzmir", district: "Urla", rooms: "3+1", m2Brut: 140, m2Net: 120, age: "10", floor: "2", heating: "Kombi", baths: "2", facade: "Batı", furnished: "Evet", seller: "Urla Sahil Emlak", date: "09.10.2026", desc: "Müstakil bahçeli, barbekü alanlı, sahile 150m mesafede ev.", premium: false, images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"] },
    { id: 214, type: "kiralik-mustakil", title: "Antalya Kemer'de Çam Ormanı Yanı Müstakil Ev", price: 22000, city: "Antalya", district: "Kemer", rooms: "3+1", m2Brut: 135, m2Net: 115, age: "7", floor: "2", heating: "Klima", baths: "2", facade: "Dört Cephe", furnished: "Evet", seller: "Kemer Emlak Ofisi", date: "07.10.2026", desc: "Dağ ve doğa manzaralı, bahçesinde meyve ağaçları olan ev.", premium: false, images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"] },
    { id: 215, type: "kiralik-mustakil", title: "Sakarya Sapanca'da Havuzlu Kiralık Müstakil Ev", price: 30000, city: "Sakarya", district: "Merkez", rooms: "4+1", m2Brut: 180, m2Net: 155, age: "3", floor: "2", heating: "Yerden Isıtma", baths: "2", facade: "Güney", furnished: "Evet", seller: "Sapanca Tatil Evleri", date: "05.10.2026", desc: "Isıtmalı korunaklı özel havuzlu, hafta sonu veya yıllık kullanıma uygun.", premium: true, images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800"] },

    // Kiralık Villa (5 Adet)
    { id: 216, type: "kiralik-villa", title: "Bodrum Yalıkavak Marinaya Yakın Kiralık Lüks Villa", price: 65000, city: "Muğla", district: "Bodrum", rooms: "4+1", m2Brut: 280, m2Net: 240, age: "2", floor: "2", heating: "VRF", baths: "4", facade: "Güney-Batı", furnished: "Evet", seller: "Bodrum Luxury Rentals", date: "12.10.2026", desc: "Özel havuzlu, deniz manzaralı, lüks mobilyalarla donatılmış villa.", premium: true, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"] },
    { id: 217, type: "kiralik-villa", title: "İstanbul Beykoz Acarkent'te Kiralık Özel Villa", price: 120000, city: "İstanbul", district: "Beykoz", rooms: "6+2", m2Brut: 550, m2Net: 480, age: "8", floor: "3", heating: "Doğalgaz", baths: "5", facade: "Dört Cephe", furnished: "Kısmen", seller: "Acarkent Gayrimenkul", date: "11.10.2026", desc: "Devasa bahçeli, kapalı otoparklı, müştemilatlı prestijli villa.", premium: true, images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"] },
    { id: 218, type: "kiralik-villa", title: "Antalya Döşemealtı'nda Kiralık Müstakil Havuzlu Villa", price: 40000, city: "Antalya", district: "Döşemealtı", rooms: "4+1", m2Brut: 220, m2Net: 190, age: "1", floor: "2", heating: "Yerden Isıtma", baths: "3", facade: "Güney", furnished: "Evet", seller: "Antalya Villa Kiralama", date: "09.10.2026", desc: "Sıfır mobilyalı, akıllı ev otomasyonlu, korunaklı havuzlu villa.", premium: false, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"] },
    { id: 219, type: "kiralik-villa", title: "İzmir Urla Kekliktepe'de Doğa İçi Kiralık Villa", price: 55000, city: "İzmir", district: "Urla", rooms: "5+1", m2Brut: 320, m2Net: 270, age: "4", floor: "2", heating: "Isı Pompası", baths: "4", facade: "Dört Cephe", furnished: "Evet", seller: "Kekliktepe Emlak", date: "08.10.2026", desc: "Zeytin ağaçları içinde, tenis kortlu site içerisinde lüks villa.", premium: false, images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"] },
    { id: 220, type: "kiralik-villa", title: "Bursa Bademli'de Kiralık Akıllı Sistem Villa", price: 48000, city: "Bursa", district: "Mudanya", rooms: "5+2", m2Brut: 380, m2Net: 320, age: "3", floor: "3", heating: "Yerden Isıtma", baths: "4", facade: "Güney-Doğu", furnished: "Hayır", seller: "Bademli Prestij Emlak", date: "06.10.2026", desc: "Bademli'nin en gözde caddesinde, özel güvenlikli villa.", premium: false, images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"] },

    // ---------------- KİRALIK İŞ YERİ ----------------
    // Kiralık Ofis & Büro (5 Adet)
    { id: 221, type: "kiralik-ofis", title: "İstanbul Maslak Ayazağa'da Kiralık Plaza Katı", price: 60000, city: "İstanbul", district: "Sarıyer", rooms: "Açık Ofis", m2Brut: 180, m2Net: 155, age: "3", floor: "10", heating: "VRF", baths: "2", facade: "Güney", furnished: "Evet", seller: "Maslak Plaza Kiralama", date: "12.10.2026", desc: "Hazır dekorasyonlu, network altyapısı kurulu, prestijli plaza ofisi.", premium: true, images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"] },
    { id: 222, type: "kiralik-ofis", title: "Ankara Çukurambar'da Kiralık Lüks Büro Katı", price: 35000, city: "Ankara", district: "Çankaya", rooms: "4 Bölme", m2Brut: 130, m2Net: 110, age: "5", floor: "6", heating: "Merkezi", baths: "1", facade: "Batı", furnished: "Hayır", seller: "Çukurambar Emlak", date: "10.10.2026", desc: "Siyasi partilere, bakanlıklara ve hastanelere çok yakın konumda.", premium: false, images: ["https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"] },
    { id: 223, type: "kiralik-ofis", title: "İzmir Alsancak Liman Caddesinde Kiralık Ofis", price: 24000, city: "İzmir", district: "Konak", rooms: "2+1", m2Brut: 90, m2Net: 78, age: "15", floor: "3", heating: "Klima", baths: "1", facade: "Kuzey", furnished: "Hayır", seller: "Alsancak Emlak Ofisi", date: "09.10.2026", desc: "Liman caddesine cepheli, tabela değeri yüksek, gümrük müşavirliği veya avukatlık için ideal.", premium: false, images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"] },
    { id: 224, type: "kiralik-ofis", title: "Kocaeli Gebze Center Yakını Kiralık Büro", price: 18000, city: "Kocaeli", district: "Gebze", rooms: "2+1", m2Brut: 85, m2Net: 72, age: "4", floor: "2", heating: "Kombi", baths: "1", facade: "Doğu", furnished: "Hayır", seller: "Gebze Sanayi Emlak", date: "07.10.2026", desc: "Sanayi bölgesine ve E-5 karayoluna direkt erişimli pratik ofis.", premium: false, images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"] },
    { id: 225, type: "kiralik-ofis", title: "Adana Adliye Karşısında Kiralık Avukatlık Bürosu", price: 21000, city: "Adana", district: "Seyhan", rooms: "3+1", m2Brut: 110, m2Net: 95, age: "6", floor: "4", heating: "Kombi", baths: "1", facade: "Güney", furnished: "Evet", seller: "Adana Hukuk Emlak", date: "05.10.2026", desc: "Adliye sarayına yürüyerek 1 dakika mesafede hazır kurulu mobilyalı büro.", premium: true, images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"] },

    // Kiralık Dükkan & Mağaza (5 Adet)
    { id: 226, type: "kiralik-dukkan", title: "İskenderun Pac Meydanında Köşe Kiralık Dükkan", price: 65000, city: "Hatay", district: "İskenderun", rooms: "Dükkan", m2Brut: 130, m2Net: 115, age: "4", floor: "Zemin", heating: "Klima", baths: "1", facade: "Güney-Doğu", furnished: "Hayır", seller: "Mülk Sahibi", date: "12.10.2026", desc: "Yaya ve araç trafiğinin en yoğun olduğu lokasyonda, baca altyapılı dükkan.", premium: true, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] },
    { id: 227, type: "kiralik-dukkan", title: "İstanbul Şişli Halaskargazi Caddesinde Kiralık Mağaza", price: 95000, city: "İstanbul", district: "Şişli", rooms: "2 Katlı", m2Brut: 180, m2Net: 150, age: "25", floor: "Zemin", heating: "Klima", baths: "1", facade: "Batı", furnished: "Hayır", seller: "Şişli Kurumsal Emlak", date: "11.10.2026", desc: "Osmanbey tekstil merkezinde, dev vitrinli kiralık mağaza.", premium: true, images: ["https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800"] },
    { id: 228, type: "kiralik-dukkan", title: "Ankara Tunalı Hilmi Çarşısında Kiralık Dükkan", price: 48000, city: "Ankara", district: "Çankaya", rooms: "Tek Alan", m2Brut: 75, m2Net: 65, age: "18", floor: "Zemin", heating: "Merkezi", baths: "1", facade: "Doğu", furnished: "Hayır", seller: "Çankaya Mağaza Emlak", date: "09.10.2026", desc: "Butik, takı veya aksesuar konseptine uygun işlek cadde mağazası.", premium: false, images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"] },
    { id: 229, type: "kiralik-dukkan", title: "Bursa Osmangazi Kent Meydanı Yanı Kiralık İş Yeri", price: 38000, city: "Bursa", district: "Osmangazi", rooms: "Tek Alan", m2Brut: 100, m2Net: 88, age: "10", floor: "Zemin", heating: "Kombi", baths: "1", facade: "Güney", furnished: "Hayır", seller: "Bursa Ticari Emlak", date: "08.10.2026", desc: "Otobüs ve tramvay durakları karşısı, tabela değeri yüksek.", premium: false, images: ["https://images.unsplash.com/photo-1567449303078-57ad995bd301?w=800"] },
    { id: 230, type: "kiralik-dukkan", title: "Antalya Alanya Barlar Sokağında Kiralık Dükkan", price: 50000, city: "Antalya", district: "Alanya", rooms: "Açık Alanlı", m2Brut: 160, m2Net: 130, age: "8", floor: "Zemin", heating: "Klima", baths: "2", facade: "Güney", furnished: "Kısmen", seller: "Alanya Tourism Real Estate", date: "06.10.2026", desc: "Turizm sezonunda yüksek ciro garantili, ruhsatı hazır ticari mülk.", premium: false, images: ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"] },

    // Kiralık Depo & Antrepo (5 Adet)
    { id: 231, type: "kiralik-depo", title: "Kocaeli Gebze OSB Yakını Kiralık Tır Yanaşır Depo", price: 160000, city: "Kocaeli", district: "Gebze", rooms: "Depo Alanı", m2Brut: 1500, m2Net: 1400, age: "5", floor: "Zemin", heating: "Sanayi Tipi", baths: "2", facade: "Dört Cephe", furnished: "Hayır", seller: "Lojistik Emlak", date: "12.10.2026", desc: "9 metre tavan yüksekliği, 2 adet körüklü rampa, yangın söndürme altyapısı.", premium: true, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] },
    { id: 232, type: "kiralik-depo", title: "İstanbul Hadımköy Lojistik Bölgesinde Antrepo", price: 280000, city: "İstanbul", district: "Esenyurt", rooms: "Antrepo", m2Brut: 3000, m2Net: 2800, age: "3", floor: "Zemin", heating: "Yok", baths: "4", facade: "Dört Cephe", furnished: "Hayır", seller: "İstanbul Lojistik Gayrimenkul", date: "10.10.2026", desc: "Gümrüklü/gümrüksüz depolamaya uygun, güvenlikli sanayi sitesinde.", premium: true, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] },
    { id: 233, type: "kiralik-depo", title: "İzmir Torbalı Sanayi Bölgesinde Kiralık Depo", price: 95000, city: "İzmir", district: "Torbalı", rooms: "Açık + Kapalı", m2Brut: 900, m2Net: 820, age: "6", floor: "Zemin", heating: "Yok", baths: "2", facade: "Güney", furnished: "Hayır", seller: "Ege Sanayi Depo", date: "09.10.2026", desc: "Yüksek elektrik gücü çekilmiş (Trafo mevcut), imalathaneye veya depoya uygun.", premium: false, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] },
    { id: 234, type: "kiralik-depo", title: "Mersin Liman Yakını Akdeniz İlçesinde Kiralık Depo", price: 110000, city: "Mersin", district: "Akdeniz", rooms: "Kapalı Depo", m2Brut: 1200, m2Net: 1100, age: "8", floor: "Zemin", heating: "Yok", baths: "2", facade: "Doğu", furnished: "Hayır", seller: "Mersin Port Emlak", date: "07.10.2026", desc: "Mersin uluslararası limanına 5 km mesafede, konteyner yüklemesine uygun.", premium: false, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] },
    { id: 235, type: "kiralik-depo", title: "Ankara İvedik OSB'de Kiralık İş Yeri Ve Depo", price: 75000, city: "Ankara", district: "Yenimahalle", rooms: "3 Katlı Depo", m2Brut: 600, m2Net: 540, age: "10", floor: "Zemin+Bodrum", heating: "Kombi", baths: "2", facade: "Kuzey", furnished: "Hayır", seller: "İvedik Emlak Ofisi", date: "05.10.2026", desc: "Yük asansörlü, idari ofis katı bulunan, sanayi içinde merkezi depo.", premium: false, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] }
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