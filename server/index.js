// Backend Server - HeyGen Avatar + ElevenLabs TTS Proxy
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// API Anahtarları (process.env'den gelmeli)
// Lütfen bu anahtarları kod içinde sabit bırakmayın, .env dosyasından yükleyin.
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY || "sk_V2_hgu_kverhlFXOEI_Z6yryhUrPp3s257vVUXgWCPZt1wUu3v5";
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || "sk_049b335dc25ce8fc90b7e09564f5e3741cbabe02ac445557";

// Middleware'ler
app.use(cors()); // Mobil uygulamadan gelen isteklere izin ver
app.use(express.json()); // Gelen JSON body'leri parse et

/**
 * Endpoint 1: Video Oluşturma İsteğini Başlat
 * Gerekli body: { text: "...", avatar_id: "..." }
 * Dönen cevap: { video_id: "..." }
 */
app.post("/api/generate-video", async (req, res) => {
  try {
    const { text, avatar_id } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Metin gereklidir" });
    }

    const payload = {
      caption: false,
      dimension: {
        width: 1280,
        height: 720
      },
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: avatar_id || "75d59f620e2e4e1a9c9a7a9998f2f43c", // Varsayılan avatar
            avatar_style: "normal"
          },
          voice: {
            type: "text",
            voice_id: "21m00Tcm4TlvDq8ikWAM", // ElevenLabs voice ID
            input_text: text,
            elevenlabs_settings: {
              api_key: ELEVENLABS_API_KEY, // ElevenLabs API anahtarını buraya ekleyin
              model: "eleven_multilingual_v2",
              stability: 0.5,
              similarity_boost: 0.5,
              style: 0.3
            }
          },
          background: {
            type: "color",
            value: "#f6f6fc"
          }
        }
      ]
    };

    const response = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": HEYGEN_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("HeyGen API Hatası:", result);
      return res.status(response.status).json(result);
    }
    
    // Mobil uygulamaya video_id'yi gönderiyoruz
    return res.json({
      success: true,
      video_id: result.data.video_id // HeyGen v2'de video_id 'data' objesi içinde
    });

  } catch (error) {
    console.error("Sunucu hatası (/generate-video):", error);
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
});

/**
 * Endpoint 2: Video Durumunu Sorgula
 * Gerekli param: :id (video_id)
 * Dönen cevap: { status: "processing" } veya { status: "completed", video_url: "..." }
 */
app.get("/api/video-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Video ID gereklidir" });
    }

    const statusResponse = await fetch(`https://api.heygen.com/v2/video/status?video_id=${id}`, {
      method: "GET",
      headers: {
        "X-Api-Key": HEYGEN_API_KEY
      }
    });

    const statusResult = await statusResponse.json();

    if (!statusResponse.ok) {
      console.error("HeyGen Durum API Hatası:", statusResult);
      return res.status(statusResponse.status).json(statusResult);
    }

    const status = statusResult.data.status;

    if (status === "completed") {
      // Video hazırsa URL'ini gönder
      return res.json({
        status: "completed",
        video_url: statusResult.data.video_url
      });
    } else if (status === "failed") {
      // Hata oluştuysa
      return res.json({
        status: "failed",
        error: statusResult.data.error
      });
    } else {
      // Hala işleniyorsa
      return res.json({
        status: "processing"
      });
    }

  } catch (error) {
    console.error("Sunucu hatası (/video-status):", error);
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
