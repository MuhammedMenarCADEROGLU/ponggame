![Capture](https://github.com/MuhammedMenarCADEROGLU/ponggame/assets/49329087/cdd5f396-b164-496f-9d0d-be5918b40bc1)

**Oyun Amacı:**
- Pong, her oyuncunun bir raketi kontrol ettiği klasik bir iki oyunculu oyundur.
- Amaç, topu rakibinizin geri dönemeyeceği şekilde raketinizle vurmaktır.

**Oyun Elemanları:**
1. **Raketler:** Oyuncuların sol ve sağ taraflardaki raketleri.
2. **Top:** Raketler arasında hareket eden bir top.
3. **Skorlar:** Her oyuncunun skorunu tutar.

**Oyun Akışı:**
1. Oyuncular ekranın her iki tarafında başlar.
2. "Oyunu Başlat" düğmesine tıklandığında top hareket etmeye başlar.
3. Oyuncular sağ raketi kontrol etmek için ok tuşlarını kullanır, sol raket ise basit bir yapay zeka tarafından kontrol edilir.
4. Top, raketlerden ve duvarlardan seker.
5. Bir oyuncu topu kaçırırsa, rakip bir puan alır.
6. Oyun, oyuncular durmaya karar verene kadar devam eder.

### Kod Açıklaması:

**HTML (`index.html`):**
- Oyunun yapısını tanımlar; raketler, top, skorlar ve başlat düğmesi.

**CSS (`styles.css`):**
- Oyun öğeleri için stil sağlar, bunları ekranda konumlandırır.
- Raketlerin, topun, skorların ve başlat düğmesinin görünümünü belirler.

**JavaScript (`script.js`):**
1. **Başlatma:**
   - Raketler, top, oyun konteynırı ve başlat düğmesi için HTML öğelerini alır.
   - Top pozisyonu ve hızı, oyuncu skorları, raket hareket bayrakları ve oyun durumu için değişkenleri başlatır.

2. **Olay Dinleyicileri:**
   - Sağ raketin hareketini kontrol etmek için tuş olaylarını dinler.
   - Oyunu başlatmak için "Oyunu Başlat" düğmesi tıklanmasını dinler.

3. **Oyun Mantığı (`update` fonksiyon):**
   - Raket hareketi, top hareketi, çarpışmalar ve skorlama için sürekli güncellemeleri ele alır.
   - Sağ raketin pozisyonunu tuş vuruşlarına bağlı olarak ayarlar.
   - Sol raket için temel bir yapay zeka uygular.
   - Top hareketini, duvarlar ve raketlerle çarpışmaları ve skorlamayı yönetir.
   - Oyun skorlarını günceller.
   - Zamanla top hızını artırır.
   - Akıcı animasyonlar için `requestAnimationFrame` fonksiyonunu kullanır.

4. **Sıfırlama ve Oyunu Başlatma (`resetGame` ve `startGame` fonksiyonları):**
   - Oyun durumunu, top pozisyonunu ve hızlarını sıfırlar.
   - Bir puan kazanıldığını veya oyunun sıfırlandığını göstermek için arka plan rengini kısa bir süre değiştirir.
   - Gerekli olduğunda başlat düğmesini gösterir ve gizler.

5. **Oyun Döngüsü:**
   - Akıcı animasyonlar sağlamak için `requestAnimationFrame` kullanılarak `update` fonksiyonu sürekli olarak çağrılır.

Genel olarak, kod yapıyı belirlemek için HTML, stil için CSS ve oyun mantığı için JavaScript kullanır. Oyuncu bir raketi kontrol eder, diğerini 
basit bir yapay zeka kontrol eder ve amaç topu raketler arasında zıplatmaktır. Oyun, "Oyunu Başlat" düğmesine tıklanarak başlar ve durana kadar devam eder.
