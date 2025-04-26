const { Worker } = require('worker_threads');
const path = require('path');
const os = require('os');
const si = require('systeminformation'); 

const numThreads = os.cpus().length;
const workers = [];
const responseHandlers = new Map();
let messageIdCounter = 0;
let nowthread = 0;

function sendDirectMsg(workerId, message) {
    return new Promise((resolve, reject) => {
        if (workerId < 0 || workerId >= workers.length) {
            return reject(new Error('Geçersiz worker ID'));
        }

        const messageId = messageIdCounter++;
        responseHandlers.set(messageId, resolve);
        workers[workerId].postMessage({ 
            mesaj: message,
            messageId: messageId
        });
    });
}

function sendToAll(message) {
    workers.forEach((worker) => {
        worker.postMessage({ 
            mesaj: message
        });
    });
}

function sendMsg(message) {
    return sendDirectMsg(nowthread, message);
}

function createWorker(id) {
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), { 
        workerData: { 
            workerId: id
        }
    });
    
    worker.on('message', (response) => {
        if (response.messageId !== undefined && responseHandlers.has(response.messageId)) {
            const resolve = responseHandlers.get(response.messageId);
            resolve(response.data);
            responseHandlers.delete(response.messageId);
        }
    });
    
    worker.on('error', (err) => {
        console.error(`Worker ${id} hata verdi:`, err);
    });
    
    worker.on('exit', () => {
        workers[id] = createWorker(id);
    });
    
    return worker;
}

function main() {
    for (let i = 0; i < numThreads; i++) {
        workers.push(createWorker(i));
    }

    setInterval(() => {
        si.currentLoad()
          .then(data => {
            const loads = data.cpus.map((cpu, idx) => ({
              thread: idx,
              load: cpu.load
            }));
            const minLoadThread = loads.reduce((min, curr) => curr.load < min.load ? curr : min, loads[0]);
            nowthread = minLoadThread.thread
      
            if(global.debug) console.log(`En boş thread: ${minLoadThread.thread}, Kullanım: ${minLoadThread.load.toFixed(2)}%`);
          })
          .catch(error => console.error(error));
      }, 2000);
}

main();

module.exports = {
    sendDirectMsg,
    sendToAll,
    sendMsg
};