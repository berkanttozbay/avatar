# Konuşan Avatar Mobil Uygulaması

HeyGen Avatar + ElevenLabs TTS kullanarak rastgele metinleri seslendiren konuşan avatar mobil uygulaması.

## 🎯 Özellikler

- ✨ Modern ve kullanıcı dostu arayüz
- 🎬 **HeyGen Avatar**: AI destekli gerçekçi avatar videoları
- 🎤 **ElevenLabs TTS**: Profesyonel metinden sese dönüşüm
- 👤 Avatar animasyonları
- 🎲 Rastgele metin üretme
- 🔒 Güvenli API anahtarı yönetimi
- 📱 iOS ve Android desteği

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16+)
- npm veya yarn
- Expo CLI
- HeyGen API Key
- ElevenLabs API Key

### Backend Kurulumu

1. Proje klasöründe:
```bash
npm install
```

2. Backend sunucuyu başlatın:
```bash
npm run server
```

**Not:** API anahtarları kodda yapılandırılmıştır (development için). Production'da `.env` kullanın.

### Mobil Uygulama Kurulumu

1. Mobil klasöründe:
```bash
cd mobile
npm install
```

2. `mobile/App.js` dosyasındaki `API_URL` değerini bilgisayarınızın IP adresi ile güncelleyin:
```javascript
const API_URL = 'http://192.168.1.XXX:3000'; // Bilgisayarınızın IP'si
```

3. Uygulamayı başlatın:
```bash
npm start
```

4. Expo Go uygulamasını telefonunuza yükleyin ve QR kodu tarayın

## 📁 Proje Yapısı

```
Avatar/
├── server/
│   └── index.js          # Backend (HeyGen + ElevenLabs)
├── mobile/
│   ├── App.js            # Ana React Native uygulaması
│   ├── package.json
│   └── assets/           # Avatar animasyonları
├── package.json          # Backend bağımlılıkları
├── README.md             # Proje dokümantasyonu
└── QUICKSTART.md         # Hızlı başlangıç
```

## 🔧 API Endpoints

### POST /api/heygen-avatar
HeyGen avatar video oluşturur.

**Request:**
```json
{
  "text": "Konuşmak istediğiniz metin",
  "avatar_id": "Lucie"  // Opsiyonel
}
```

**Response:**
```json
{
  "success": true,
  "video_id": "video_id",
  "streaming_session_id": "session_id",
  "video_url": "https://...",
  "message": "Avatar video oluşturuluyor..."
}
```

### POST /api/tts
ElevenLabs kullanarak TTS yapar.

**Request:**
```json
{
  "text": "Seslendirmek istediğiniz metin",
  "voice_id": "21m00Tcm4TlvDq8ikWAM"  // Opsiyonel
}
```

**Response:** MP3 audio dosyası

### GET /api/random-text
Rastgele metin döndürür.

**Response:**
```json
{
  "text": "Rastgele oluşturulmuş metin"
}
```

## 🎨 Kullanılan Teknolojiler

### Backend
- **Express.js**: RESTful API
- **HeyGen API**: AI Avatar videoları
- **ElevenLabs API**: Text-to-Speech
- **CORS**: Cross-origin desteği

### Frontend
- **React Native**: Mobil uygulama framework
- **Expo**: Geliştirme platformu
- **Expo AV**: Ses çalma
- **Lottie**: Avatar animasyonları
- **Linear Gradient**: Modern UI

## 🔐 API Anahtarları

### Geliştirme (Development)
API anahtarları `server/index.js` dosyasında yapılandırılmıştır:
- HeyGen: `sk_V2_hgu_kverhlFXOEI_Z6yryhUrPp3s257vVUXgWCPZt1wUu3v5`
- ElevenLabs: `sk_049b335dc25ce8fc90b7e09564f5e3741cbabe02ac445557`

### Production
Production için `.env` dosyası kullanın:
```env
HEYGEN_API_KEY=your_heygen_key
ELEVENLABS_API_KEY=your_elevenlabs_key
PORT=3000
```

## 🐛 Sorun Giderme

### Mobil uygulama sunucuya bağlanamıyor
- ✅ Bilgisayar ve telefon aynı WiFi ağında olmalı
- ✅ API_URL doğru IP adresini içermeli
- ✅ Windows Firewall port 3000'i açık olmalı

### TTS ses çalmıyor
- ✅ ElevenLabs API anahtarı doğru mu?
- ✅ Network logları kontrol edin
- ✅ Telefonun ses açık mı?

### HeyGen avatar oluşmuyor
- ✅ HeyGen API anahtarı doğru mu?
- ✅ API kredisi yeterli mi?
- ✅ Console loglarını kontrol edin

## 📝 Kullanım

1. Uygulamayı başlatın
2. "Rastgele" butonuna tıklayarak örnek metin alın
3. Veya kendi metninizi yazın
4. "Konuştur" butonuna basın
5. Avatar'ın metni seslendirmesini izleyin

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilmektedir. Büyük değişiklikler için lütfen önce bir issue açın.

## 📄 Lisans

ISC License

## 🆘 Destek

Sorunlarınız için GitHub Issues kullanın.