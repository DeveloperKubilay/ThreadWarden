const { parentPort, workerData } = require('worker_threads');
const mainworker = require(workerData.workerFile);  

parentPort.on('message', (message) => {
    const res = {
        data:mainworker(message.mesaj, workerData.workerId),
        messageId: message.messageId,
    }
    parentPort.postMessage(res);
});