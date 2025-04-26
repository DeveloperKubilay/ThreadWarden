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

```javascript
const { sendMsg, sendDirectMsg, sendToAll } = require('threadwarden');

// Send a message to the least busy worker thread
const response = await sendMsg("Process this data");
console.log(response);

// Send a message to a specific worker thread
const specificResponse = await sendDirectMsg(2, "Worker 2, process this");
console.log(specificResponse);

// Broadcast a message to all worker threads
sendToAll("Attention all workers!");
```

## 🔍 API Reference

### sendMsg(message)
Sends a message to the worker with the lowest CPU load and returns a Promise with the response.

### sendDirectMsg(workerId, message)
Sends a message to a specific worker by ID and returns a Promise with the response.

### sendToAll(message)
Broadcasts a message to all workers (no response).

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

```javascript
const { sendMsg, sendDirectMsg, sendToAll } = require('threadwarden');

// En az meşgul worker thread'e mesaj gönder
const response = await sendMsg("Bu veriyi işle");
console.log(response);

// Belirli bir worker thread'e mesaj gönder
const specificResponse = await sendDirectMsg(2, "Worker 2, bunu işle");
console.log(specificResponse);

// Tüm worker thread'lere mesaj yayınla
sendToAll("Dikkat tüm worker'lar!");
```

## 🔍 API Referansı

### sendMsg(message)
En düşük CPU yüküne sahip worker'a mesaj gönderir ve yanıtla birlikte Promise döndürür.

### sendDirectMsg(workerId, message)
Kimliğe göre belirli bir worker'a mesaj gönderir ve yanıtla birlikte Promise döndürür.

### sendToAll(message)
Tüm worker'lara mesaj yayınlar (yanıt yoktur).
