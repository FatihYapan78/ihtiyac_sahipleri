const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('.'));
app.use(express.json());

// Yardım kayıtlarını saklamak için JSON dosyası
const YARDIMLAR_FILE = 'yardimlar.json';

// Yardım kayıtlarını oku
function getYardimlar() {
    try {
        if (fs.existsSync(YARDIMLAR_FILE)) {
            return JSON.parse(fs.readFileSync(YARDIMLAR_FILE, 'utf8'));
        }
        return {};
    } catch (error) {
        console.error('Yardımlar dosyası okuma hatası:', error);
        return {};
    }
}

// Yardım kayıtlarını kaydet
function saveYardimlar(yardimlar) {
    try {
        fs.writeFileSync(YARDIMLAR_FILE, JSON.stringify(yardimlar, null, 2));
    } catch (error) {
        console.error('Yardımlar dosyası yazma hatası:', error);
    }
}

// Yeni yardım kaydı ekle
app.post('/kaydet-yardim', (req, res) => {
    try {
        const yardimKaydi = req.body;
        const yardimlar = getYardimlar();
        
        // Kişiye ait yardım listesini al veya oluştur
        if (!yardimlar[yardimKaydi.kisiId]) {
            yardimlar[yardimKaydi.kisiId] = [];
        }
        
        // Yeni kaydı ekle
        yardimlar[yardimKaydi.kisiId].push({
            tarih: yardimKaydi.tarih,
            tur: yardimKaydi.tur,
            miktar: yardimKaydi.miktar,
            notlar: yardimKaydi.notlar,
            kayitTarihi: new Date().toISOString()
        });
        
        saveYardimlar(yardimlar);
        res.json({ success: true });
    } catch (error) {
        console.error('Yardım kayıt hatası:', error);
        res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu' });
    }
});

// Yardım geçmişini getir
app.get('/yardim-gecmisi', (req, res) => {
    try {
        const kisiId = req.query.id;
        const yardimlar = getYardimlar();
        
        // Kişiye ait yardımları döndür
        res.json(yardimlar[kisiId] || []);
    } catch (error) {
        console.error('Yardım geçmişi getirme hatası:', error);
        res.status(500).json({ error: 'Yardım geçmişi alınırken bir hata oluştu' });
    }
});

// Ana sayfayı serve et
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Detay sayfasını serve et
app.get('/detay', (req, res) => {
    res.sendFile(path.join(__dirname, 'detay.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server http://localhost:${port} adresinde çalışıyor`);
});
