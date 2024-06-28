const client = require("../index")
client.on("messageDelete", function(message){
    console.log(`message is deleted -> ${message}`);
});