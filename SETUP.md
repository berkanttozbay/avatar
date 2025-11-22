# Detaylı Kurulum Rehberi

## Adım 1: Node.js Kurulumu

Windows için:
1. [nodejs.org](https://nodejs.org) adresinden LTS sürümünü indirin
2. Kurulum sihirbazını takip edin
3. Terminal'de doğrulayın:
```bash
node --version
npm --version
```

## Adım 2: Expo CLI Kurulumu

```bash
npm install -g expo-cli
```

## Adım 3: Proje Bağımlılıklarını Yükleyin

### Backend için:
```bash
npm install
```

### Mobil Uygulama için:
```bash
cd mobile
npm install
```

## Adım 4: API Anahtarını Yapılandırın

1. `.env` dosyası oluşturun (ana klasörde):
```bash
cp .env.example .env
```

2. `.env` dosyasını düzenleyin ve API anahtarınızı ekleyin:
```env
TTS_API_KEY=sk_V2_hgu_kverhlFXOEI_Z6yryhUrPp3s257vVUXgWCPZt1wUu3v5
PORT=3000
```

## Adım 5: Bilgisayarınızın IP Adresini Öğrenin

### Windows:
```powershell
ipconfig
```
"IPv4 Address" değerini not edin (örn: 192.168.1.100)

### Mac/Linux:
```bash
ifconfig | grep "inet "
```

## Adım 6: Mobil Uygulamada IP Adresini Güncelleyin

`mobile/App.js` dosyasını açın ve satır 22'deki değeri değiştirin:

```javascript
const API_URL = __DEV__ 
  ? 'http://192.168.1.100:3000'  // ← Buraya bilgisayarınızın IP'sini yazın
  : 'https://your-backend-url.com';
```

## Adım 7: Lottie Animasyon Dosyası

### Seçenek 1: Lottie Dosyası Kullan
1. [LottieFiles.com](https://lottiefiles.com/search?q=talking) adresinden "talking" veya "speaking" araması yapın
2 وآس bir animasyon seçip JSON olarak indirin
3. `mobile/assets/avatar-speaking.json` olarak kaydedin

### Seçenek 2: Basit Avatar Kullan
`App.js`'de Lottie yerine emoji avatar zaten mevcut.

## Adım 8: Backend Sunucusunu Başlatın

Ana klasörde:
```bash
npm run server
```

Başarı comfort ماش می‌شود:
```
🚀 TTS Backend sunucusu 3000 planar
📍 http://localhost:3000
🔑 API Key: Yapılandırılmış
```

## Adım 9: Mobil Uygulamayı Başlatın

Yeni bir terminal açın:
```bash
cd mobile
npm start
```

Expo DevTools tarayıcıda açılır.

## Adım 10: Telefonunuzda Çalıştırın

### Android:
1. Google Play Store'dan "Expo Go" uygulamasını yükleyin
2. Expo Go'yu açın
3. QR kodu tarayın (Expo DevTools'da gösterilir)
4. Uygulama otomatik yüklenir

### iOS:
1. App Store'dan "Expo Go" uygulamasını yükleyin
2. Expo Go'yu açın
3. Kamera ile QR kodu tarayın
4. Uygulama yüklenir

## Adım 11: Test Edin

1. Uygulamada "🎲 Rastgele" butonuna basın
2. Bir metin oluşturun
3. "🎤 Konuştur" butonuna basın
4. Avatar'ın konuşmasını dinleyin

## Sık Karşılaşılan Sorunlar

### "Network request failed" Hatası
- ✅ Bilgisayar ve telefon aynı WiFi ağında mı?
- ✅ IP adresi doğru mu?
- ✅ Backend sunucusu çalışıyor mu?
- ✅ Windows Firewall port 3000'i açık mı?

### "API key bulunamadı" Hatası
- ✅ `.env` dosyası var mı?
- ✅ API anahtarı doğru mu?
- ✅ Sunucuyu yeniden başlattınız mı?

### Expo Go "Unable to connect" Hatası
- ✅ QR kodu doğru mu tarandı?
- ✅ Eski Expo oturumunu kapatın
- ✅ `expo start -c` ile cache'i temizleyin

### Ses çalmıyor
- ✅ API endpoint doğru mu?
- ✅ Network logları kontrol edin
- ✅ Telefonun ses açık mı?

## Production Deployment

### Backend (Heroku örneği):
```bash
heroku create your-app-name
git push heroku main
heroku config:set TTS_API_KEY=your_key
```

### Mobil Uygulama (EAS Build):
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform all
```

## İletişim

Sorularınız için GitHub Issues kullanın.
