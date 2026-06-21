const { parentPort, workerData } = require('worker_threads');
const mainworker = require(workerData.workerFile);
workerData.settings.id = workerData.workerId;

parentPort.on('message', async (message) => {
    try {
        const data = await mainworker(message.message, workerData.settings);
        parentPort.postMessage({ data, messageId: message.messageId });
    } catch (error) {
        parentPort.postMessage({ error: error.message, messageId: message.messageId });
    }
});