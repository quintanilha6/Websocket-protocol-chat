/*
 * author:  João Quintanilha
 * Service Oriented computing
 * FER 2017/18
 */



var server = require('ws').Server;
var s = new server({ port: 5001 });




s.on('connection', function(ws) {
  ws.on('message', function(message) {

    console.log("Received: " + message);

    //Attach the name to the corrent client of the WS
    message = JSON.parse (message);
    if (message.type == "name") {
      ws.userName = message.data;

      s.clients.forEach(function e(client){
        if(client != ws)   //If itself, dont send message
          client.send(JSON.stringify({
            type: "welcome",
            name: ws.userName
          }));
      });

      return;
    }


    //Let all clients know about the messages
    s.clients.forEach(function e(client){
      if(client != ws)   //If itself, dont send message
        client.send(JSON.stringify({
          name: ws.userName,
          data: message.data
        }));
    });

  });

//not working.. ????
/*  s.on('disconnect', function() {
    console.log("I lost a client");
  });*/

});
