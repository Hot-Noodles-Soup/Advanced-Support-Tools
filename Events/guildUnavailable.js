const client = require("../index")

client.on("guildUnavailable", function(guild){
    console.error(`a guild becomes unavailable, likely due to a server outage: ${guild}`);
});