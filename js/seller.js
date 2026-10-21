let currentTransactionType = 'satilik'; 
let uploadedImagesBase64 = []; // Yüklenen fotoğrafları tutacağımız dizi

// --- TÜRKİYE 81 İL VE İLÇE MOTORU ---
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

document.addEventListener('DOMContentLoaded', () => {
    // İlleri Yükle
    const ilanIl = document.getElementById('ilanIl');
    if(ilanIl) {
        tumIller.sort().forEach(il => {
            const opt = document.createElement('option');
            opt.value = il; opt.textContent = il;
            ilanIl.appendChild(opt);
        });
        // Sayfa yüklendiğinde Onaya Gönder butonunu güvenle dinlemeye al
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitListingBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfanın sıfırlanmasını/yenilenmesini engeller
            submitListing();
        });
    }
});
    }

    // Giriş Yapan Kullanıcının Adını Panele Yazdır
    const savedUser = JSON.parse(localStorage.getItem('emlak360_user'));
    const userDisplay = document.getElementById('panelUserDisplay');
    if(savedUser && userDisplay) {
        userDisplay.innerText = `${savedUser.name} (${savedUser.role === 'kurumsal' ? 'Kurumsal Acente' : 'Bireysel'})`;
    }
    
    // Varsayılan Kategoriyi Ayarla
    updateDynamicFields();
});

// İlçeleri Getir
function loadDistricts() {
    const ilanIl = document.getElementById('ilanIl');
    const ilanIlce = document.getElementById('ilanIlce');
    if(!ilanIlce) return;
    
    ilanIlce.innerHTML = '<option value="">İlçe Seçin</option>';
    const secilenIl = ilanIl.value;
    
    if(secilenIl && turkiyeData[secilenIl]) {
        turkiyeData[secilenIl].forEach(ilce => {
            const opt = document.createElement('option');
            opt.value = ilce; opt.textContent = ilce;
            ilanIlce.appendChild(opt);
        });
    }
}

// Fotoğraf Yükleme ve Önizleme Algoritması (Base64)
function previewImages() {
    const fileInput = document.getElementById('imageUpload');
    const previewContainer = document.getElementById('imagePreviewContainer');
    
    Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImagesBase64.push(e.target.result); // Veritabanı için kaydet
            
            // Ekranda göster
            const imgWrapper = document.createElement('div');
            imgWrapper.style.position = 'relative';
            
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.width = "100px";
            imgElement.style.height = "100px";
            imgElement.style.objectFit = "cover";
            imgElement.style.borderRadius = "8px";
            imgElement.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
            
            imgWrapper.appendChild(imgElement);
            previewContainer.appendChild(imgWrapper);
        };
        reader.readAsDataURL(file);
    });
}

// Sihirbaz İleri / Geri Adımları
function nextStep(stepNumber) {
    document.querySelectorAll('.wizard-step-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    
    const targetContent = document.getElementById(`step-${stepNumber}`);
    const targetIndicator = document.getElementById(`step-${stepNumber}-indicator`);
    
    if(targetContent) targetContent.classList.add('active');
    if(targetIndicator) targetIndicator.classList.add('active');
}

function prevStep(stepNumber) { nextStep(stepNumber); }

// Satılık / Kiralık Seçimi
function setTransactionType(type) {
    currentTransactionType = type;
    document.querySelectorAll('.trans-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${type}`).classList.add('active');
}

// Arsa vs Konut Dinamik Form Alanı Kontrolü
function updateDynamicFields() {
    const kategori = document.getElementById('ilanKategori').value;
    const binaFields = document.getElementById('binaFields');
    const arsaFields = document.getElementById('arsaFields');

    if(!binaFields || !arsaFields) return;

    if(kategori === 'imarli' || kategori === 'tarla' || kategori === 'zeytinlik') {
        binaFields.style.display = 'none';
        arsaFields.style.display = 'block';
    } else {
        binaFields.style.display = 'block';
        arsaFields.style.display = 'none';
    }
}

/// PROFESYONEL İLAN KAYIT (DTO) ALGORİTMASI
function submitListing() {
    console.log("Onaya Gönder butonuna tıklandı!"); // Konsoldan kontrol için

    const kategoriElement = document.getElementById('ilanKategori');
    const baslikElement = document.getElementById('ilanBaslik');
    const fiyatElement = document.getElementById('ilanFiyat');
    const ilElement = document.getElementById('ilanIl');
    const ilceElement = document.getElementById('ilanIlce');

    // Elementlerin sayfada var olup olmadığını ve değerlerini kontrol edelim
    if (!kategoriElement || !baslikElement || !fiyatElement || !ilElement || !ilceElement) {
        alert("Hata: Form üzerindeki bazı temel alanlar (Kategori, Başlık, Fiyat, İl, İlçe) HTML'de bulunamadı!");
        return;
    }

    const kategori = kategoriElement.value;
    const isArsa = (kategori === 'imarli' || kategori === 'tarla' || kategori === 'zeytinlik');

    const baslik = baslikElement.value;
    const fiyat = fiyatElement.value;
    const il = ilElement.value;
    const ilce = ilceElement.value;

    if (!baslik || !fiyat || !il || !ilce) {
        alert("Lütfen İlan Başlığı, Fiyat, İl ve İlçe alanlarını eksiksiz doldurun.");
        return;
    }

    const savedUser = JSON.parse(localStorage.getItem('emlak360_user'));
    const sellerName = savedUser ? `${savedUser.name} (${savedUser.role === 'kurumsal' ? 'Kurumsal Acente' : 'Bireysel'})` : "Emlak360 Yetkili Üye";

    // Eğer kullanıcı fotoğraf yüklemediyse varsayılan bir emlak görseli atıyoruz
    const finalImages = (typeof uploadedImagesBase64 !== 'undefined' && uploadedImagesBase64.length > 0) 
        ? uploadedImagesBase64 
        : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"];

    // İlan DTO Objesi
    const yeniIlanDTO = {
        id: Math.floor(100000 + Math.random() * 900000), 
        type: `${currentTransactionType}-${kategori}`,
        title: baslik,
        desc: document.getElementById('ilanAciklama')?.value || "Kurumsal satıcı tarafından açıklama girilmemiştir.",
        price: parseFloat(fiyat) || 0, 
        city: il, 
        district: ilce,
        neighborhood: document.getElementById('ilanMahalle')?.value || "Merkez",
        date: new Date().toLocaleDateString('tr-TR'),
        seller: sellerName,
        status: "Bekliyor",
        premium: false,
        images: finalImages 
    };

    if(isArsa) {
        yeniIlanDTO.m2 = document.getElementById('ilanArsaM2')?.value || "Belirtilmemiş";
        yeniIlanDTO.rooms = "Arsa";
        yeniIlanDTO.zoning = document.getElementById('ilanImar')?.value || "Belirtilmemiş";
        yeniIlanDTO.ada = document.getElementById('ilanAda')?.value || "-";
        yeniIlanDTO.parsel = document.getElementById('ilanParsel')?.value || "-";
        yeniIlanDTO.deedStatus = document.getElementById('ilanTapu')?.value || "Belirtilmemiş";
    } else {
        yeniIlanDTO.m2Brut = document.getElementById('ilanM2Brut')?.value || "100";
        yeniIlanDTO.m2Net = document.getElementById('ilanM2Net')?.value || "90";
        yeniIlanDTO.m2 = yeniIlanDTO.m2Brut; 
        yeniIlanDTO.rooms = document.getElementById('ilanOda')?.value || "3+1";
        yeniIlanDTO.age = document.getElementById('ilanYas')?.value || "0";
        yeniIlanDTO.floor = document.getElementById('ilanKat')?.value || "Giriş Kat";
        yeniIlanDTO.heating = document.getElementById('ilanIsitma')?.value || "Doğalgaz";
        yeniIlanDTO.baths = document.getElementById('ilanBanyo')?.value || "1";
        yeniIlanDTO.facade = document.getElementById('ilanCephe')?.value || "Güney";
        yeniIlanDTO.furnished = document.getElementById('ilanEsyali')?.value || "Hayır";
    }

    // LocalStorage üzerinden Admin Onay Kuyruğuna Ekle
    let bekleyenIlanlar = JSON.parse(localStorage.getItem('adminPendingListings')) || [];
    bekleyenIlanlar.push(yeniIlanDTO);
    localStorage.setItem('adminPendingListings', JSON.stringify(bekleyenIlanlar));

    alert("İlanınız başarıyla oluşturuldu ve sistem admin onayına iletildi! Yönlendiriliyorsunuz...");
    window.location.href = "../index.html"; 
}