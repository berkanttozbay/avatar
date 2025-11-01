import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator, 
  Dimensions 
} from 'react-native';
import { Video } from 'expo-av'; // Video oynatmak için
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native'; // Bekleme animasyonu için
import { Ionicons } from '@expo/vector-icons'; // İkonlar için

// Cihazın boyutlarını al
const { width } = Dimensions.get('window');

// Backend URL - Kendi bilgisayarınızın IP adresini yazın
// `ipconfig` (Windows) veya `ifconfig` (macOS/Linux) ile öğrenin
const API_URL = 'http://192.168.56.1:3000'; // ÖNEMLİ: Kendi IP'niz ile değiştirin

const AVATAR_ID = '75d59f620e2e4e1a9c9a7a9998f2f43c'; // Kullandığınız avatar ID'si
const POLLING_INTERVAL = 4000; // 4 saniyede bir video durumunu kontrol et

export default function App() {
  const [text, setText] = useState(''); // Metin alanındaki yazı
  const [loading, setLoading] = useState(false); // Video oluşturuluyor mu?
  const [isWaiting, setIsWaiting] = useState(true); // Avatar konuşuyor mu, bekliyor mu?

  // Konuşma geçmişi (100 Puanlık özellik)
  const [history, setHistory] = useState([]); // { text: "...", url: "..." } objeleri
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  const videoPlayerRef = useRef(null);
  const pollingIntervalRef = useRef(null); // Polling işlemini durdurmak için referans

  // Polling işlemini temizle (component unmount olursa)
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Polling (Durum Kontrolü) Fonksiyonu
  const pollVideoStatus = (videoId) => {
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/api/video-status/${videoId}`);
        const data = await response.json();

        if (data.status === 'completed') {
          // VİDEO HAZIR!
          clearInterval(pollingIntervalRef.current); // Kontrolü durdur
          setLoading(false);
          
          const newEntry = { text: text, url: data.video_url };
          const newHistory = [...history, newEntry];
          
          setHistory(newHistory);
          setCurrentIndex(newHistory.length - 1);
          setCurrentVideoUrl(data.video_url);
          setIsWaiting(false); // Bekleme animasyonunu durdur, videoyu göster
          setText(''); // Metin alanını temizle
          
        } else if (data.status === 'failed') {
          // HATA
          clearInterval(pollingIntervalRef.current);
          setLoading(false);
          // Hata mesajını mobil arayüzde göster (Alert yerine)
          alert(`Hata: Video oluşturulamadı: ${data.error?.message || 'Bilinmeyen Hata'}`);
        }
        // 'processing' ise hiçbir şey yapma, interval devam etsin
      } catch (err) {
        clearInterval(pollingIntervalRef.current);
        setLoading(false);
        alert('Hata: Video durumu alınamadı: ' + err.message);
      }
    }, POLLING_INTERVAL);
  };

  // 1. Adım: Video Oluşturma İsteğini Başlat
  const generateAvatarVideo = async () => {
    if (!text.trim()) {
      alert('Uyarı: Lütfen bir metin girin');
      return;
    }
    
    // Mevcut polling varsa durdur
    if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
    }
    
    setLoading(true);
    setIsWaiting(true); // Her ihtimale karşı bekleme animasyonuna dön
    setCurrentVideoUrl(null);

    try {
      const response = await fetch(`${API_URL}/api/generate-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, avatar_id: AVATAR_ID })
      });
      const data = await response.json();

      if (data.success && data.video_id) {
        // 2. Adım: Video ID'sini aldık, şimdi durumu sorgulamaya başla
        pollVideoStatus(data.video_id);
      } else {
        setLoading(false);
        alert(`Hata: Video ID'si alınamadı: ${data.error || 'API Hatası'}`);
      }
    } catch (err) {
      setLoading(false);
      alert('Hata: Video oluşturma isteği başarısız: ' + err.message);
    }
  };

  // Geçmiş Butonları (100 Puan)
  const handleHistory = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'back' && currentIndex > 0) {
      newIndex--;
    } else if (direction === 'forward' && currentIndex < history.length - 1) {
      newIndex++;
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setCurrentVideoUrl(history[newIndex].url);
      setIsWaiting(false); // Videoyu oynat
      
      // Video oynatılırken otomatik oynatmayı sağla
      if (videoPlayerRef.current) {
        // Expo AV'de video kaynağını değiştirmek ve oynatmak için loadAsync kullanılır
        videoPlayerRef.current.loadAsync({ uri: history[newIndex].url }, {}, true);
      }
    }
  };
  
  // Video oynatma durumu güncellendiğinde
  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setIsWaiting(true);
      setCurrentVideoUrl(null);
    }
  };

  return (
    <LinearGradient
      colors={['#141E30', '#243B55']} // Koyu Mavi Gradient (React Native'de LinearGradient)
      style={styles.fullScreenGradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* AVATAR BAŞLIĞI */}
          <Text style={styles.headerText}>Prof. Dr. Ahmet Yılmaz</Text>

          {/* AVATAR GÖSTERİM ALANI */}
          <View style={styles.videoContainer}>
            {isWaiting ? (
              // 1. Bekleme Durumu (Lottie Animasyonu)
              <LottieView
                source={{ uri: "https://lottie.host/e8a4a210-2f96-4c45-a0c3-98a0d2600234/uI8uF9YjdO.json" }}
                autoPlay
                loop
                style={styles.lottie}
              />
            ) : (
              // 2. Konuşma Durumu (Expo Video Oynatıcı)
              <Video
                ref={videoPlayerRef}
                style={styles.video}
                source={{ uri: currentVideoUrl }}
                useNativeControls={false} // Kontrolleri kapat
                resizeMode="cover"
                isLooping={false}
                shouldPlay // Otomatik oynatmayı başlat
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
              />
            )}
          </View>

          {/* İLERİ/GERİ BUTONLARI */}
          <View style={styles.historyControls}>
            <TouchableOpacity
              onPress={() => handleHistory('back')}
              disabled={currentIndex <= 0}
              style={[styles.historyButton, currentIndex <= 0 && styles.disabledButton]}
            >
              <Ionicons name="arrow-back-circle-sharp" size={40} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.historyText}>
              {history.length > 0 ? `${currentIndex + 1} / ${history.length}` : 'Geçmiş Yok'}
            </Text>
            
            <TouchableOpacity
              onPress={() => handleHistory('forward')}
              disabled={currentIndex >= history.length - 1}
              style={[styles.historyButton, currentIndex >= history.length - 1 && styles.disabledButton]}
            >
              <Ionicons name="arrow-forward-circle-sharp" size={40} color="white" />
            </TouchableOpacity>
          </View>


          {/* METİN GİRİŞ ALANI */}
          <TextInput
            style={styles.textInput}
            placeholder="Avatara söyletmek istediğiniz metni girin..."
            placeholderTextColor="#8899AA"
            value={text}
            onChangeText={setText}
            multiline
          />

          {/* BUTON */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={generateAvatarVideo}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.buttonText}>Video Oluşturuluyor...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Avatarı Konuştur</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// React Native Stilleri
const styles = StyleSheet.create({
  fullScreenGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  videoContainer: {
    width: width * 0.9, // Ekran genişliğinin %90'ı
    aspectRatio: 16 / 9, // Video oranı
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#243B55',
  },
  video: {
    ...StyleSheet.absoluteFillObject, // Container'ı doldur
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  historyControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  historyButton: {
    padding: 5,
  },
  disabledButton: {
    opacity: 0.25,
  },
  historyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top', // Android'de metnin üstten başlamasını sağlar
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    width: '100%',
    backgroundColor: '#3B82F6', // Tailwind blue-500
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#6B7280', // Tailwind gray-500
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
