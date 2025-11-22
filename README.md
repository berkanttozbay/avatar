# Language Tutor API

Rails 8+ API backend for a Language Learning Mobile Application with Avatar support, STT (Speech-to-Text), and TTS (Text-to-Speech) features.

## Özellikler

- **Rails 8.1+** API Mode
- **Hardcoded Test Data** - Veritabanı kullanılmıyor, tüm veriler controller'larda sabit olarak tanımlı
- **Swagger/OpenAPI** dokümantasyonu
- **CORS** desteği (tüm originlere açık)
- **RESTful API** endpoints

## Kurulum

### Gereksinimler

- Ruby 3.2+
- Rails 8.1+
- Bundler

### Adımlar

1. Gem'leri yükleyin:
```bash
bundle install
```

2. Sunucuyu başlatın:
```bash
rails server
```

**Not:** Veritabanı kurulumu gerekmez. Tüm test verileri controller'larda hardcoded olarak tanımlıdır.

## API Endpoints

### Temel Endpoints

1. `GET /api/v1/subjects` - Tüm konuları listeler (3 adet test verisi)
2. `GET /api/v1/subjects/:id` - Belirli bir konuyu getirir
3. `GET /api/v1/avatars` - Mevcut avatarları listeler (2 adet test verisi)
4. `GET /api/v1/avatars/:id` - Belirli bir avatarı getirir
5. `GET /api/v1/subjects/:subject_id/videos` - Bir konuya ait videoları getirir (6 adet test verisi)
6. `GET /api/v1/videos/:id` - Belirli bir videoyu getirir
7. `POST /api/v1/analyses` - Kullanıcı ses kaydını analiz eder (mock analiz sonucu döner)
8. `GET /api/v1/analyses` - Tüm analizleri listeler
9. `GET /api/v1/analyses/:id` - Belirli bir analizi getirir
10. `GET /api/v1/reports/weekly` - Haftalık raporu getirir
11. `GET /api/v1/reports` - Tüm raporları listeler

## Test Verileri

Tüm test verileri controller'larda sabit olarak tanımlıdır:

- **3 Subject** (Business English, Daily Conversation, Academic Writing)
- **2 Avatar** (Emma, John)
- **6 Video** (Her subject için 2 video)
- **1 Analysis** (Örnek analiz)
- **2 Report** (Haftalık raporlar)

## Swagger Dokümantasyonu

Swagger UI'a erişmek için:
```
http://localhost:3000/api-docs
```

Swagger JSON/YAML dosyasını oluşturmak için:
```bash
rake rswag:specs:swaggerize
```

## Veri Yapısı

### Subject
- id, title, level (1-5), icon_url

### Avatar
- id, name, personality_prompt, voice_id, image_url

### Video
- id, subject_id, title, video_url, transcript, duration_seconds

### Analysis
- id, video_id, user_audio_url, stt_output, grammar_score (0-100), pronunciation_feedback

### Report
- id, period_start, period_end, average_score, vocabulary_count, generated_summary

## Test

RSpec testlerini çalıştırmak için:
```bash
bundle exec rspec
```

## Notlar

- **Veritabanı kullanılmıyor** - Tüm veriler controller'larda hardcoded olarak tanımlıdır
- CORS ayarları tüm originlere açık olarak yapılandırılmıştır (`*`). Production ortamında güvenlik için spesifik origin'ler belirtilmelidir.
- Windows'ta restart mekanizması devre dışı bırakılmıştır (Puma config)

## Lisans

MIT
