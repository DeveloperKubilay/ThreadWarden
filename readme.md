# ThreadWarden - Distributed Worker Threading System 🚀

![Demo](https://i.imgur.com/TCA0H0b.gif)

ThreadWarden is a high-performance Node.js library that distributes work across multiple CPU cores using worker threads. It automatically balances the load by sending tasks to the least busy thread, maximizing your application's performance.

## ✨ Features

- 🧵 **Multi-Threading**: Utilizes all available CPU cores
- ⚖️ **Load Balancing**: Automatically sends work to the least busy thread
- 📨 **Flexible Messaging**: Send messages to specific workers or all workers
- 🔄 **Self-Healing**: Workers automatically restart if they crash

## 🔧 Installation

```bash
npm install threadwarden
```

## 🚀 Usage

First, create a worker file that will be executed in each thread:
## worker.js
```javascript
// worker.js - This defines what each worker should do with received messages
module.exports = function (message, workerId) {
    // Process the message
    if (typeof message === "number")
        return message + 1;  // For numbers, add 1
        
    // For other messages, return a formatted response
    return `Worker ${workerId} processed: ${message}`;
}
```

Then, initialize ThreadWarden with your worker file:
## index.js
```javascript
async function main() {
    // Initialize ThreadWarden with the path to your worker file
    const { sendMsg, sendDirectMsg, sendToAll } = await require('threadwarden')("./worker.js");

    // Send a message to the least busy worker thread
    const response = await sendMsg(1);
    console.log("1+1=", response);  // Output: 1+1= 2

    // Send a message to a specific worker thread
    const specificResponse = await sendDirectMsg(2, "Hello worker!");
    console.log(specificResponse);  // Output depends on your worker implementation

    // Broadcast a message to all worker threads
    sendToAll({ notification: "System update in progress" });
}
main();
```

## 🔍 API Reference

### require('threadwarden')(workerFilePath)
Initializes ThreadWarden with the specified worker file. Returns a Promise that resolves to an object containing the messaging functions.

### sendMsg(message)
Sends a message to the worker with the lowest CPU load and returns a Promise with the response.

### sendDirectMsg(workerId, message)
Sends a message to a specific worker by ID and returns a Promise with the response.

### sendToAll(message)
Broadcasts a message to all workers (no response).

### Worker File Structure
Your worker file should export a function that accepts two parameters:
- `message`: The data sent to the worker
- `workerId`: The ID of the worker processing the message

The function should return the result to be sent back to the main thread.

---

# ThreadWarden - Dağıtılmış İş Parçacığı Sistemi 🚀

ThreadWarden, işleri birden çok CPU çekirdeğine worker thread'ler kullanarak dağıtan yüksek performanslı bir Node.js kütüphanesidir. En az meşgul olan iş parçacığına görevler göndererek yükü otomatik olarak dengeler ve uygulamanızın performansını en üst düzeye çıkarır.

## ✨ Özellikler

- 🧵 **Çoklu İş Parçacığı**: Mevcut tüm CPU çekirdeklerini kullanır
- ⚖️ **Yük Dengeleme**: İşi otomatik olarak en az meşgul iş parçacığına gönderir
- 📨 **Esnek Mesajlaşma**: Belirli worker'lara veya tüm worker'lara mesaj gönderme
- 🔄 **Kendini Onarma**: Worker'lar çökerse otomatik olarak yeniden başlar

## 🔧 Kurulum

```bash
npm install threadwarden
```

## 🚀 Kullanım

Önce, her iş parçacığında çalıştırılacak bir worker dosyası oluşturun:

## worker.js
```javascript
// worker.js - Her worker'ın gelen mesajlarla ne yapacağını tanımlar
module.exports = function (message, workerId) {
    // Mesajı işle
    if (typeof message === "number")
        return message + 1;  // Sayılar için 1 ekle
        
    // Diğer mesajlar için biçimlendirilmiş bir yanıt döndür
    return `Worker ${workerId} işledi: ${message}`;
}
```

Ardından, ThreadWarden'ı worker dosyanızla başlatın:

## index.js
```javascript
async function main() {
    // ThreadWarden'ı worker dosyanızın yoluyla başlatın
    const { sendMsg, sendDirectMsg, sendToAll } = await require('threadwarden')("./worker.js");

    // En az meşgul worker thread'e mesaj gönder
    const response = await sendMsg(1);
    console.log("1+1=", response);  // Çıktı: 1+1= 2

    // Belirli bir worker thread'e mesaj gönder
    const specificResponse = await sendDirectMsg(2, "Merhaba worker!");
    console.log(specificResponse);  // Çıktı worker implementasyonunuza bağlıdır

    // Tüm worker thread'lere mesaj yayınla
    sendToAll({ bildirim: "Sistem güncellemesi devam ediyor" });
}
main();
```

## 🔍 API Referansı

### require('threadwarden')(workerFilePath)
ThreadWarden'ı belirtilen worker dosyasıyla başlatır. Mesajlaşma fonksiyonlarını içeren bir nesne ile çözülen bir Promise döndürür.

### sendMsg(message)
En düşük CPU yüküne sahip worker'a mesaj gönderir ve yanıtla birlikte Promise döndürür.

### sendDirectMsg(workerId, message)
Kimliğe göre belirli bir worker'a mesaj gönderir ve yanıtla birlikte Promise döndürür.

### sendToAll(message)
Tüm worker'lara mesaj yayınlar (yanıt yoktur).

### Worker Dosyası Yapısı
Worker dosyanız iki parametre alan bir fonksiyon dışa aktarmalıdır:
- `message`: Worker'a gönderilen veri
- `workerId`: Mesajı işleyen worker'ın ID'si

Fonksiyon, ana iş parçacığına geri gönderilecek sonucu döndürmelidir.
