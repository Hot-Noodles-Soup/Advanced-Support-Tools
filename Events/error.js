const client = require("../index")

client.on("error", function(error){
    console.error(`client's WebSocket encountered a connection error: ${error}`);
});