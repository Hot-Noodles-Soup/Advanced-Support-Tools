const client = require("../index");
const { sendHelloWorld } = require("../controllers/embedController");
const { pushSlashCommand } = require("../controllers/utils");
const { send } = require("process");

/**  What i want to do here is
 * At every Lunch Remove every command of all server, then repush them, is the best way i found to make sur every body have the last updated command without delay.
 * Frist Del command
 * Second Push command
 * Then Overwrite command
 */
client.on("ready", async () => {
  
  client.user.setPresence({
    activities: [{ name: 'Les Caisses de PizzaThis', type: 3 }], // Type 0 est pour Joue à
    status: 'online' // Vous pouvez choisir entre 'online', 'idle', 'dnd', ou 'invisible'
});

  console.log("client ready")

  pushSlashCommand(client);
  const Guilds = client.guilds.cache.map((guild) => guild);
  var i = 0;
  Guilds.forEach((guild) => {
    console.log(client.user.username, ` is connected to the Discord. (${guild.name})`)
      i++;
  });
});
