var worker;

function findPercentage(value1, value2) {
    document.getElementById('percentage_result').innerText  = (value1 / value2) * 100  + "%";
}

function postMessageToWorker(value) {
    if(value && value > 0) {
        if(worker) {
            document.getElementById('prime-numbers-result').innerHTML  = "<h4 style='color:red'>Processing. Please wait!</h4>";
            document.getElementById('find-primes').disabled = true;
            // post message
            worker.postMessage(value);
        } else {
            alert("Web workers are not supported. Please try a new browser");
        }
    } else {
        alert("Please provide a valid number.");
    }

}

function start() {
  if(window.Worker) {
      worker = new Worker("primes.js");
      worker.addEventListener("message", (message) => {
        document.getElementById('find-primes').disabled = false;
        document.getElementById('prime-numbers-result').innerHTML  = message.data;
      });
  }
}

start();
