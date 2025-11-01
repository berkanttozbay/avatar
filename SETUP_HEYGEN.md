# HeyGen + ElevenLabs Kurulum Rehberi

## 🎯 Genel Bakış

Bu proje HeyGen Avatar ve ElevenLabs TTS kullanarak konuşan avatar uygulaması oluşturur.

## 📋 İçindekiler

1. [API Anahtarları](#api-anahtarları)
2. [Backend Kurulumu](#backend-kurulumu)
3. [Mobil Uygulama Kurulumu](#mobil-uygulama-kurulumu)
4. [Test Etme](#test-etme)
5. [Sorun Giderme](#sorun-giderme)

---

## 🔑 API Anahtarları

### Zaten Yapılandırılmış

API anahtarları `server/index.js` dosyasında yapılandırılmıştır:

```javascript
const HEYGEN_API_KEY = "sk_V2_hgu_kverhlFXOEI_Z6yryhUrPp3s257vVUXgWCPZt1wUu3v5";
const ELEVENLABS_API_KEY = "sk_049b335dc25ce8fc90b7e09564f5e3741cbabe02ac445557";
```

### Kendi API Anahtarlarınızı Kullanma

Eğer kendi API anahtarlarınızı kullanmak isterseniz `.env` dosyası oluşturun:

```bash
# .env
HEYGEN_API_KEY=your_heygen_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here
PORT=3000
```

Ardından `server/index.js` dosyasındaki fallback değerleri kaldırın.

---

## 🚀 Backend Kurulumu

### Adım 1: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 2: Backend'i Başlatın

```bash
npm run server
```

### Başarılı Başlatma

Terminal'de şunları görmelisiniz:

```
🚀 HeyGen + ElevenLabs Backend sunucusu 3000 portunda çalışıyor
📍 http://localhost:3000
🎬 HeyGen API Key: Yapılandırılmış ✅
🎤 ElevenLabs API Key: Yapılandırılmış ✅
```

---

## 📱 Mobil Uygulama Kurulumu

### Adım 1: Bağımlılıkları Yükleyin

```bash
cd mobile
npm install
```

### Adım 2: IP Adresinizi Öğrenin

**Windows PowerShell:**
```powershell
ipconfig
```

"IPv4 Address" değerini not edin (örn: `192.168.1.100`)

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

### Adım 3: App.js'de IP'yi Güncelleyin

`mobile/App.js` dosyasını açın ve satır 23'ü düzenleyin:

```javascript
const API_URL = __DEV__ 
  ? 'http://192.168.1.100:3000'  // ← Buraya IP'nizi yazın
  : 'https://your-backend-url.com';
```

### Adım 4: Mobil Uygulamayı Başlatın

```bash
npm start
```

Expo DevTools tarayıcıda açılır.

### Adım 5: Telefonda Çalıştırın

1. **Expo Go** uygulamasını yükleyin (App Store / Play Store)
2. Expo Go'yu açın
3. QR kodu tarayın
4. Uygulama otomatik yüklenecek

---

## 🧪 Test Etme

### Backend Testi

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "heyGenApiConfigured": true,
  "elevenLabsApiConfigured": true,
  "timestamp": "2024-..."
}
```

**Rastgele Metin Test:**
```bash
curl http://localhost:3000/api/random-text
```

### TTS Testi (Postman/cURL)

```bash
curl -X POST http://localhost:3000/api/ttzos \
  -H "Content-Type: application/json" \
  -d '{"text":"Merhaba dünya"}' \
  --output test.mp3
```

### Mobil Uygulama Testi

1. Uygulamayı açın
2. 🎲 **Rastgele** butonuna basın
3. ✍️ Metin girin
4. 🎤 **Konuştur** butonuna basın
5. 🔊 Sesin çaldığını dinleyin

---

## 🐛 Sorun Giderme

### Item: "Network request failed"

**Çözüm:**
- ✅ Bilgisayar ve telefon aynı WiFi ağında mı?
- ✅ IP adresi doğru mu? (`mobile/App.js` satır 23)
- ✅ Backend sunucusu çalışıyor mu? (`npm run server`)
- ✅ Windows Firewall port 3000'i açık mı?

**Firewall Kuralı Eklemek (Windows):**
```powershell
# Administrator olarak PowerShell açın
or Netsh advfirewall firewall add rule name="Node Server" dir=in action=allow protocol=TCP localport=3000
```

### Sorun: TTS ses çalmıyor

**Çözüm:**
- ✅ ElevenLabs API anahtarı doğru mu?
- ✅ Network logları kontrol edin (Metro bundler)
- ✅ Console loglarını kontrol edin
- ✅ Telefonun ses açık mı?

**Debug:**
```bash
# Metro bundler loglarını görmek için
cd mobile
npm start
# Loglarda API isteğini kontrol edin
```

### Sorun: HeyGen avatar oluşmuyor

**Çözüm:**
- ✅ HeyGen API anahtarı doğru mu?
- ✅ API kredisi yeterli mi? (HeyGen hesabınızda kontrol edin)
- ✅ Console loglarını kontrol edin

**Test:**
```bash
curl -X POST http://localhost:3000/api/heygen-avatar \
  -H "Content-Type: application/json" \
  -d '{"text":"Test metin"}'
```

### Sorun: Expo Go uygulaması açılmıyor

**Çözüm:**
- ✅ Telefon ve bilgisayar aynı ağda mı?
- ✅ QR kod doğru mu taranıyor?
- ✅ Expo Go güncel mi?

**Cache Temizle:**
```bash
cd mobile
npx expo start -c
```

---

## 📊 Endpoint'ler

### POST /api/heygen-avatar
**Request:**
```json
{
  "text": "Merhaba!",
  "avatar_id": "Lucie"  // Opsiyonel
}
```

**Response:**
```json
{
  "success": true,
  "video_id": "...",
  "streaming_session_id": "...",
  "video_url": "https://...",
  "message": "Avatar video oluşturuluyor..."
}
```

### POST /api/tts
**Request:**
```json
{
  "text": "Merhaba dünya",
  "voice_id": "21m00Tcm4TlvDq8ikWAM"  // Opsiyonel
}
```

**Response:** MP3 audio binary data

### GET /api/random-text
**Response:**
```json
{
  "text": "Rastgele metin..."
}
```

---

## 🎨 Özelleştirme

### Avatar ID Değiştirme

HeyGen'de farklı bir avatar kullanmak için:

```javascript
// server/index.js dosyasında
avatar_id: avatar_id || "YOUR_AVATAR_ID"  // Varsayılan: "Lucie"
```

### Ses Değiştirme

ElevenLabs'da farklı bir ses kullanmak için:

```javascript
// server/index.js dosyasında
const elevenLabsVoice = voice_id || "YOUR_VOICE_ID";  // Varsayılan: "Rachel"
```

**Popüler Voice ID'ler:**
- Rachel: `21m00Tcm4TlvDq8ikWAM`
- Adam: `pNInz6obpgDQGcFmaJgB`
- Antoni: `ErXwobaYiN019PkySvjV`

---

## 📝 Notlar

- API anahtarları development için kodda hardcoded'dur
- Production'da kesinlikle `.env` kullanın
- HeyGen API kredisi sınırlı olabilir
- ElevenLabs ücretsiz plan günde belirli karakter limiti sunar

---

## 🆘 Yardım

Sorunlar için:
1. Console loglarını kontrol edin
2. Network isteklerini inceleyin
3. API dokümantasyonlarını okuyun:
   - [HeyGen Docs](https://docs.heygen.com)
   - [ElevenLabs Docs](https://docs.elevenlabs.io)

---

## ✅ Başarılı Kurulum Kontrolü

Tüm adımları tamamladıktan sonra:

- ✅ Backend sunucusu çalışıyor
- ✅ Health check başarılı
- ✅ Mobil uygulama bağlanıyor
- ✅ TTS çalışıyor
- ✅ Avatar oluşturuluyor (HeyGen)

**Artık uygulamanızı kullanmaya hazırsınız! 🎉**
