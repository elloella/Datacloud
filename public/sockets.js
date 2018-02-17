function socketEvents(data){
  //incomingData = data;
  console.log(data);
}
/*
let ws;
let wsUri = "ws:";
let loc = window.location;

//console.log(loc);
if (loc.protocol === "https:") { wsUri = "wss:"; }
// This needs to point to the web socket in the Node-RED flow
// ... in this case it's ws/socket
wsUri += "//" + loc.host + loc.pathname.replace("socket","ws/socket");

function wsConnect() {
  //console.log("connect",wsUri);
  ws = new WebSocket(wsUri);
  //var line = "";    // either uncomment this for a building list of messages
  ws.onmessage = function(msg) {
    let line = "";  // or uncomment this to overwrite the existing message
    // parse the incoming message as a JSON object
    let data = msg.data;
    console.log(data);
    // build the output from the topic and payload parts of the object
    //line += "<p>"+data+"</p>";
    // replace the messages div with the new "line"
    //document.getElementById('messages').innerHTML = line;
    //ws.send(JSON.stringify({data:data}));
  }

  ws.onopen = function() {
    // update the status div with the connection status
    //document.getElementById('status').innerHTML = "connected";
    //ws.send("Open for data");
    console.log("connected");
  }

  ws.onclose = function() {
    // update the status div with the connection status
    //document.getElementById('status').innerHTML = "not connected";
    // in case of lost connection tries to reconnect every 3 secs
    setTimeout(wsConnect, 3000);
  }
}

function doit(m) {
  if (ws) {
    ws.send(m);
  }
}
*/
