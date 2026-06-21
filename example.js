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