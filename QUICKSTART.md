# 🚀 Hızlı Başlangıç

## 3 Dakikada Uygulamayı Çalıştırın

### 1️⃣ Bağımlılıkları Yükleyin

```bash
npm install
cd mobile && npm install && cd ..
```

### 2️⃣ API Anahtarını Ayarlayın

`.env` dosyasını oluşturun ve API anahtarınızı ekleyin:

```env
TTS_API_KEY=sk_V2_hgu_kverhlFXOEI_Z6yryhUrPp3s257vVUXgWCPZt1wUu3v5
PORT=3000
```

### 3️⃣ IP Adresinizi Öğrenin

```powershell
# Windows PowerShell
ipconfig
```

IPv4 adresinizi not edin (örn: `192.168.1.100`)

### 4️⃣ Mobil Uygulamada IP'yi Güncelleyin

`mobile/App.js` dosyasında satır 22-23'ü düzenleyin:

```javascript
const API_URL = __DEV__ 
  ? 'http://192.168.1.100:3000'  // ← IP'nizi buraya yazın
  : 'https://your-backend-url.com';
```

### 5️⃣ Backend'i Başlatın

```bash
npm run server
```

Terminal'de şunu görmelisiniz:
```
🚀 TTS Backend sunucusu 3000 portunda çalışıyor
📍 http://localhost:3000
```

### 6️⃣ Mobil Uygulamayı Başlatın

Yeni terminal penceresi açın:

```bash
cd mobile
npm start
```

### 7️⃣ Telefonda Çalıştırın

1. **Expo Go** uygulamasını yükleyin (App Store/Play Store)
2. Expo Go'yu açın
3. Tarayıcıda gösterilen QR kodu tarayın
4. Uygulama otomatik yüklenecek

### ✅ Hazırsınız!

Uygulamayı açın ve:
- 🎲 "Rastgele" butonuna basın
- ✍️ Metin yazın veya rastgele metin oluşturun
- 🎤 "Konuştur" butonuna basın
- 👤 Avatar'ın konuşmasını izleyin!

## 🔧 Sorun mu var?

- 📱 **"Network request failed"**: Bilgisayar ve telefon aynı WiFi'de olmalı
- 🔑 **"API key bulunamadı"**: `.env` dosyasını oluşturduğunuzdan emin olun
- 🔊 **Ses çalmıyor**: API endpoint'ini kontrol edin

Detaylı kurulum için `SETUP.md` dosyasına bakın.

## 📚 Daha Fazla Bilgi

- [README.md](README.md) - Proje detayları
- [SETUP.md](SETUP.md) - Detaylı kurulum rehberi
