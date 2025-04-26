const { parentPort, workerData } = require('worker_threads');

parentPort.on('message', (message) => {
    const res = {
        data:processMessage(message.mesaj),
        messageId: message.messageId,
    }
    parentPort.postMessage(res);
});

function processMessage(message) {
  return `"${message}" received from ${workerData.workerId} thread`;
}