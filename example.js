const {     
  sendDirectMsg,
  sendToAll,
  sendMsg 
} = require('./module.js');

async function test() {
  //Runs on the worker with the lowest processor load
  setInterval(async ()=>{
    const response = await sendMsg("Hello worker!"); 
    console.log("Worker response:", response);
  },2000)


  // Send a message to all workers
  sendToAll("This message was sent to all workers!");



  //@param {number} workerId - The ID of the worker to send the message to.
  //@param {string} message - The message to send.
  //Send a message to a specific worker
  sendDirectMsg(6, "worker1");


}

test();