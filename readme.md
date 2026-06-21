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

## worker.js
```javascript
module.exports = async function (message, worker) {
    return `Worker ${worker.id} processed: ${message}`;
}
```

## index.js
```javascript
const {     
  sendDirectMsg,
  sendToAll,
  sendMsg 
} = require('./module/index.js')({
  roundRobin: true,
  workerFile: 'exampleworker.js',
  noCrash: false
});

async function test() {
  // Send a message to all workers
  //sendToAll("This message was sent to all workers!");


 // Send a specific message to a specific worker
 // sendDirectMsg(6, "worker1");
 setInterval(async ()=>{
    const response = await sendMsg("Hello worker!"); 
    console.log("Worker response:", response);
  },100)


}

test();
```
