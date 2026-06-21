const { Worker } = require('worker_threads');
const os = require('os');
const path = require('path');
const { randomUUID } = require('crypto');

const workers = [];
const responseHandlers = new Map();
const Global_settings = {
    roundRobin: true,
    workerFile: 'worker.js',
    noCrash: true,
}
let nowthread = 0;

function sendDirectMsg(workerId, message) {
    return new Promise((resolve, reject) => {
        const worker = workers[workerId];
        const messageId = randomUUID();
        responseHandlers.set(messageId, {resolve, reject});
        worker.postMessage({
            message: message,
            messageId: messageId
        });
    });
}

function sendToAll(message) {
    workers.forEach((worker) => {
        worker.postMessage({
            message: message,
            messageId: randomUUID()
        });
    });
}

function sendMsg(message) {
    if (Global_settings.roundRobin) nowthread = (nowthread + 1) % workers.length;
    return sendDirectMsg(nowthread, message);
}

function createWorker(settings, id) {
    const worker = new Worker(path.join(__dirname, "worker.js"), {
        workerData: {
            workerId: id,
            workerFile: path.join(process.cwd(), Global_settings.workerFile),
            settings: Global_settings
        }
    });

    worker.on('message', (response) => {
        if (response.messageId !== undefined && responseHandlers.has(response.messageId)) {
            const { resolve, reject } = responseHandlers.get(response.messageId);
            if (response.error) {
                reject(new Error(response.error));
            } else {
                resolve(response.data);
            }
            responseHandlers.delete(response.messageId);
        }
    });

    worker.on('error', (err) => {
        console.error(`Worker ${id} hata verdi:`, err);
        if(!Global_settings.noCrash) process.exit(1);
    });

    worker.on('exit', () => {
        workers[id] = createWorker(settings, id);
    });

    return worker;
}


module.exports = function (settings) {
    if (!settings.workerFile) throw new Error("ThreadWarden: Worker file is not defined.");
    Object.assign(Global_settings, settings);

    for (let i = 0; i < os.cpus().length; i++) {
        workers.push(createWorker(settings, i));
    }

    if (!Global_settings.roundRobin) {
        const si = require('systeminformation');
        setInterval(() => {
            si.currentLoad()
                .then(data => {
                    const loads = data.cpus.map((cpu, idx) => ({
                        thread: idx,
                        load: cpu.load
                    }));
                    const minLoadThread = loads.reduce((min, curr) => curr.load < min.load ? curr : min, loads[0]);
                    nowthread = minLoadThread.thread

                    if (global.debug) console.log(`En boş thread: ${minLoadThread.thread}, Kullanım: ${minLoadThread.load.toFixed(2)}%`);
                })
                .catch(error => console.error(error));
        }, settings.systeminformation_interval || 5000);
    }


    return {
        sendMsg,
        sendDirectMsg,
        sendToAll
    };
};