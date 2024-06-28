/* Modules */
const config = require("cfg-lib");
var mysql = require("mysql");

let conf = new config.Config("./config/config.cfg");

var db_config;
/** Mysql Config */

db_config = {
  host: conf.get("login_dev.host"),
  user: conf.get("login_dev.user"),
  password: conf.get("login_dev.password"),
  database: conf.get("login_dev.database"),
  charset: 'utf8mb4'
};

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
      console.log(`\nMysql: Connection!\n`);
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "PROTOCOL_PACKETS_OUT_OF_ORDER"
    ) {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

async function getGuild(gid) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM guilds WHERE guild_id = ?;`;
    connection.query(sql, [gid], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function insertGuild(gid) {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO guilds (guild_id) VALUES (?);`;
    connection.query(sql, [gid], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function deleteGuild(gid) {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM guilds WHERE guild_id = ?;`;
    connection.query(sql, [gid], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getGuilds() {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM guilds;`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getSettings(gid) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM guild_settings WHERE guild_id = ?;`;
    connection.query(sql, [gid], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function insertSettings(gid, settings) {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO guild_settings (guild_id, settings) VALUES (?, ?);`;
    connection.query(sql, [gid, JSON.stringify(settings)], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function updateSettings(gid, settings) {
  return new Promise((resolve, reject) => {
    var sql = `UPDATE guild_settings SET settings = ? WHERE guild_id = ?;`;
    connection.query(sql, [JSON.stringify(settings), gid], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function insertTicketTemplate(gid, label, settings, content) {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO ticket_templates (guild_id, label, settings, content) VALUES (?, ?, ?, ?);`;
    connection.query(sql, [gid, label, JSON.stringify(settings), JSON.stringify(content)], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getTicketTemplateById(id) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM ticket_templates WHERE id = ?;`;
    connection.query(sql, [id], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function updateTicketTemplate(id, label, settings, content) {
  return new Promise((resolve, reject) => {
    var sql = `UPDATE ticket_templates SET label = ?, settings = ?, content = ? WHERE id = ?;`;
    connection.query(sql, [label, JSON.stringify(settings), JSON.stringify(content), id], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function deleteTicketTemplate(id) {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM ticket_templates WHERE id = ?;`;
    connection.query(sql, [id], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function insertTicket(ticketId, gid, channelId, messageId, creatorId) {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO tickets (ticket_id, guild_id, channel_id, message_id, creator_id) VALUES (?, ?, ?, ?, ?);`;
    connection.query(sql, [ticketId, gid, channelId, messageId, creatorId], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getTicketById(ticketId) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM tickets WHERE ticket_id = ?;`;
    connection.query(sql, [ticketId], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function deleteTicket(ticketId) {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM tickets WHERE ticket_id = ?;`;
    connection.query(sql, [ticketId], function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

handleDisconnect();
/** Function  to exports */
module.exports = {
  getGuild,
  insertGuild,
  deleteGuild,
  getGuilds,
  getSettings,
  insertSettings,
  updateSettings,
  insertTicketTemplate,
  getTicketTemplateById,
  updateTicketTemplate,
  deleteTicketTemplate,
  insertTicket,
  getTicketById,
  deleteTicket
};
