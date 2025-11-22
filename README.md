# Language Tutor API

Rails 8+ API backend for a Language Learning Mobile Application with Avatar support, STT (Speech-to-Text), and TTS (Text-to-Speech) features.

## 🚀 Özellikler

- **Rails 8.1+** API Mode
- **Hardcoded Test Data** - Veritabanı kullanılmıyor, tüm veriler controller'larda sabit olarak tanımlı
- **Swagger/OpenAPI** dokümantasyonu
- **CORS** desteği (tüm originlere açık)
- **RESTful API** endpoints

## 📋 Gereksinimler

- Ruby 3.2+
- Rails 8.1+
- Bundler

## 🛠️ Kurulum

1. **Gem'leri yükleyin:**
```bash
bundle install
```

2. **Sunucuyu başlatın:**
```bash
rails server
```

**Not:** Veritabanı kurulumu gerekmez. Tüm test verileri controller'larda hardcoded olarak tanımlıdır.

## 📚 API Endpoints

### Subjects (Konular)

- `GET /api/v1/subjects` - Tüm konuları listeler (3 adet test verisi)
- `GET /api/v1/subjects/:id` - Belirli bir konuyu getirir

### Avatars (Sanal Eğitmenler)

- `GET /api/v1/avatars` - Mevcut avatarları listeler (2 adet test verisi)
- `GET /api/v1/avatars/:id` - Belirli bir avatarı getirir

### Videos (Ders İçerikleri)

- `GET /api/v1/subjects/:subject_id/videos` - Bir konuya ait videoları getirir (6 adet test verisi)
- `GET /api/v1/videos` - Tüm videoları listeler
- `GET /api/v1/videos/:id` - Belirli bir videoyu getirir

### Analyses (Konuşma Analizleri)

- `GET /api/v1/analyses` - Tüm analizleri listeler
- `GET /api/v1/analyses/:id` - Belirli bir analizi getirir
- `POST /api/v1/analyses` - Yeni analiz oluşturur (mock analiz sonucu döner)

**POST Request Body:**
```json
{
  "analysis": {
    "video_id": 1,
    "user_audio_url": "https://example.com/audio/test.mp3"
  }
}
```

### Reports (İlerleme Raporları)

- `GET /api/v1/reports/weekly` - Haftalık raporu getirir
- `GET /api/v1/reports` - Tüm raporları listeler

## 📊 Test Verileri

Tüm test verileri controller'larda sabit olarak tanımlıdır:

- **3 Subject** (Business English, Daily Conversation, Academic Writing)
- **2 Avatar** (Emma, John)
- **6 Video** (Her subject için 2 video)
- **1 Analysis** (Örnek analiz)
- **2 Report** (Haftalık raporlar)

## 📖 Swagger Dokümantasyonu

### Swagger UI'a Erişim

Tarayıcınızda şu adrese gidin:
```
http://localhost:3000/api-docs
```

### Swagger Dosyasını Oluşturma

Swagger JSON/YAML dosyasını oluşturmak için:
```bash
rake rswag:specs:swaggerize
```

Bu komut `swagger/v1/swagger.yaml` dosyasını oluşturur.

### Swagger UI'da Test Etme

1. `http://localhost:3000/api-docs` adresine gidin
2. Her endpoint'in yanındaki **"Try it out"** butonuna tıklayın
3. Gerekli parametreleri girin (POST için body örneği var)
4. **"Execute"** butonuna tıklayın
5. Yanıtı görüntüleyin

## 📝 Veri Yapısı

### Subject
```json
{
  "id": 1,
  "title": "Business English",
  "level": 3,
  "icon_url": "https://example.com/icons/business.png"
}
```

### Avatar
```json
{
  "id": 1,
  "name": "Emma",
  "personality_prompt": "Friendly, encouraging, and patient...",
  "voice_id": "voice_emma_001",
  "image_url": "https://example.com/avatars/emma.png"
}
```

### Video
```json
{
  "id": 1,
  "subject_id": 1,
  "title": "Meeting Basics",
  "video_url": "https://example.com/videos/meeting-basics.mp4",
  "transcript": "Hello, welcome to our lesson...",
  "duration_seconds": 300
}
```

### Analysis
```json
{
  "id": 1,
  "video_id": 1,
  "user_audio_url": "https://example.com/audio/user-response-001.mp3",
  "stt_output": "I think the meeting was very productive...",
  "grammar_score": 85,
  "pronunciation_feedback": "Your pronunciation is clear..."
}
```

### Report
```json
{
  "id": 1,
  "period_start": "2024-01-01T00:00:00Z",
  "period_end": "2024-01-07T23:59:59Z",
  "average_score": 85.5,
  "vocabulary_count": 150,
  "generated_summary": "This week you've made great progress!"
}
```

## 🧪 Test

RSpec testlerini çalıştırmak için:
```bash
bundle exec rspec
```

## 🔧 Yapılandırma

### CORS

CORS ayarları `config/initializers/cors.rb` dosyasında yapılandırılmıştır. Şu anda tüm originlere açık (`*`). Production ortamında güvenlik için spesifik origin'ler belirtilmelidir.

### Veritabanı

Bu proje veritabanı kullanmaz. Tüm veriler controller'larda hardcoded olarak tanımlıdır. ActiveRecord devre dışı bırakılmıştır.

## 📌 Notlar

- **Veritabanı kullanılmıyor** - Tüm veriler controller'larda hardcoded olarak tanımlıdır
- Windows'ta restart mekanizması devre dışı bırakılmıştır (Puma config)
- CORS ayarları tüm originlere açık olarak yapılandırılmıştır (`*`). Production ortamında güvenlik için spesifik origin'ler belirtilmelidir.

## 🚀 Hızlı Başlangıç

```bash
# 1. Gem'leri yükle
bundle install

# 2. Sunucuyu başlat
rails server

# 3. Swagger UI'a git
# http://localhost:3000/api-docs

# 4. Swagger dosyasını oluştur (opsiyonel)
rake rswag:specs:swaggerize
```

## 📄 Lisans

MIT

## 👤 Geliştirici

Bu proje Rails 8+ API Mode kullanılarak geliştirilmiştir.

