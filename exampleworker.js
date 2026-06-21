const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


module.exports = async function (message, worker) {
    sleep(200);
    return `Worker ${worker.id} processed: ${message}`;
}