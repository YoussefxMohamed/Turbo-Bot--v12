require("events").EventEmitter.defaultMaxListeners = 99999999999999;
const http = require("http");
const express = require("express");
const app = express();
const { MessageEmbed, Client  } = require("discord.js");
const { prefix, devs } = require("./config");
const client = new Client();
/*app.get('/', (res) => res.send('Running.'));
app.listen(3000)*/

client.on("ready", () => {
    console.log('Ready!');
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus("idle");
    client.user.setActivity("$help", { type: "Playing $help"});
  });
  client.on('ready', () => {
    function abady() { 
     let status = ["$help","Dev: Youssef Mohamed","Soon..."];
     let S = Math.floor(Math.random() * status.length);
     client.user.setActivity(status[S]);
    };
    setInterval(abady, 6000)
    });
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
 //PACKAGES
var { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const botversion = require("./package.json").version;
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const hastebins = require("hastebin-gen");
const pretty = require("pretty-ms");
const queue = new Map();
const lineReply = require('discord-reply')
var table = require("table").table;
const Discord = require("discord.js");
////////////////////////////////////////////////////////////////////////////////////   
////////////////////////////////////////////////////////////////////////////////////
// Public Commands
////////////////////////////////////////////////////////////////////////////////////
// SAY Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    if (command == "say") {
  message.delete()
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.lineReply(
          `> <a:grs:922517063774400563> **You Don't have __ADMINISTRATOR__ permission**`
        );
      message.channel.send(" " + args.join("  "));
    }
  });
////////////////////////////////////////////////////////////////////////////////////
// Role Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command === prefix + "role") {
    if(!message.member.hasPermission('MANAGE_ROLES')) 
     message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`)
let role = message.mentions.roles.first()
if(!role) return message.lineReply(`> <a:glt:929681265752412180> **Please Mention The Role After Command**`)
    let member = message.guild.member(message.mentions.users.first())
    if(!member) return message.lineReply("> <a:glt:929681265752412180> **Please Mention User**")
message.lineReply(`Done!`)
member.roles.add(role)
  }
});
////////////////////////////////////////////////////////////////////////////////////
// BAN Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
    if (message.author.bot) return;
    let user = message.mentions.members.first()
    let args = message.content.split(" ").slice(1);
    let command = message.content.split(" ")[0];
    if (command == prefix + "ban" || command == "ناحو" || command == "كسمك" || command == "بعبوص" || command == "خد") {
    if (!user) message.lineReply("> <a:glt:929681265752412180> **Please Mention User**");
    if (user === message.author) return message.lineReply('> <a:glt:929681265752412180> **لا يمكن اعطاء بان لنفسك **');
    if(!message.guild.member(user).bannable) return message.lineReply(`> <a:glt:929681265752412180> **لا يمكنك اعطاء بان لهذا العضو**`);
    else if (message.member.hasPermission("BAN_MEMBERS")) {
    user.ban().then(mem => {
       let banned = new Discord.MessageEmbed()
    .setImage("https://i.imgur.com/pgXofXt.gif")
    message.channel.send(`**<a:s72:950077654034440252> ${mem.user.username} banned from the server ! :airplane: **`, banned)
    })
    } else {
    message.lineReply(`> <a:grs:922517063774400563> **You Don't have __BAN_MEMBERS__ permission**`)
    }
    }
});
////////////////////////////////////////////////////////////////////////////////////
// KICK Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
    if (message.author.bot) return;
    let args = message.content.split(" ").slice(1);
    let user = message.mentions.members.first()
    let command = message.content.split(" ")[0];
    if (command == prefix + "kick" || command == "طير") {
    if (!user) return message.lineReply("> <a:glt:929681265752412180> **Please Mention User**");
    if (user === message.author) return message.lineReply('> <a:glt:929681265752412180> **لا يمكنك طرد نفسك **');
    if (!message.guild.member(user).kickable) return message.lineReply(`> <a:glt:929681265752412180> **لا يمكنك طرد هذا العضو**`);
    else if (message.member.hasPermission("KICK_MEMBERS")) {
        message.guild.member(user).kick().then(mem => {
        let kickembed = new Discord.MessageEmbed()
        .setAuthor(`KICKED !`)
        .setColor("#FF0000")
        .setTimestamp()
        .addField(":bust_in_silhouette: **User :**", "**[ " + `<@${mem.user.id}>` + " ]**")
        .addField("<:ORG:950077637978619914> **By :**", "**[ " + `<@${message.author.id}>` + " ]**");
      message.channel.send(kickembed);
    })
    } else {
    message.lineReply(`> <a:grs:922517063774400563> **You Don't have __KICK_MEMBERS__ permission**`);
    }
    }
});
////////////////////////////////////////////////////////////////////////////////////
// AVATAR BY ID
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  let member = message.mentions.users.first() || message.author
    if (message.content.split(" ")[0] === prefix + "avt") {
      if (message.author.bot || message.channel.type == "dm") return;
      var args = message.content.split(" ")[1];
      var avt = args || message.author.id;
      client.users.fetch(avt).then((user) => {
          avt = user;
          let avtEmbed = new Discord.MessageEmbed()
            .setColor("#03A9F4")
            .setAuthor(`Avatar of ${avt.username}`, avt.displayAvatarURL({ dynamic: true }))
            .setTitle("Avatar Link")
            .setURL(avt.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setImage(avt.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setFooter(`${member.username}`, member.displayAvatarURL({ dynamic: true }));
          message.channel.send(avtEmbed);
        })
        .catch(() => message.lineReply(`> <a:glt:929681265752412180> **Please Enter ID For User**`));
    }
  });
////////////////////////////////////////////////////////////////////////////////////
// Banner User // TEST
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  require("discord-banner")();
  let member = message.mentions.users.first() || message.author
    if (message.content.split(" ")[0] === prefix + "banner") {
      if (message.author.bot || message.channel.type == "dm") return;
      var args = message.content.split(" ")[1];
      var avt = args || message.author.id;
      client.users.fetch(avt).then((user) => {
          avt = user;
          let avtEmbed = new Discord.MessageEmbed()
            .setColor("#03A9F4")
            .setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
            .setTitle("Banner Link")
            .setURL(member.bannerURL({}))
            .setImage(member.bannerURL({}))
            .setFooter(member.username, member.displayAvatarURL({ dynamic: true }));
          message.channel.send(avtEmbed);
        })
        .catch(() => message.lineReply(`> <a:glt:929681265752412180> **Please Enter ID For User**`));
    }
  });
////////////////////////////////////////////////////////////////////////////////////
// UNMUTE Command
////////////////////////////////////////////////////////////////////////////////////
const SQLite = require("sqlite");
const path = require("path");
const invites = {};
client.on("message", (message) => {
  if (message.author.bot) return;
  let command = message.content.split(" ")[0];
  if (command === prefix + "unmute" || command === "اتكلم") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __Manage Roles__ permission**`).catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.cache.get((gg) => gg.name === "log");
    let muteRole = client.guilds.cache.get(message.guild.id)
      .roles.cache.find((gg) => gg.name === "Muted");
    if (!muteRole)
      return message
        .lineReply("> <a:grs:922517063774400563> **You don't have a role 'Muted'**")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .lineReply("> <a:glt:929681265752412180> **Please Mention User**")
        .catch(console.error);
    if (
      !message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;

    if (message.guild.member(user).roles.remove(muteRole.id)) {
      const avtEmbed = new Discord.MessageEmbed()
        .setColor("#FFEB3B")
        .setDescription(
          `> <a:s72:950077654034440252> **Member Has Been Unmuted**`
        );
      message.channel.send(avtEmbed);
    } else {
      message.guild
        .member(user)
        .roles.remove(muteRole)
        .then(() => {
          const avtEmbed = new Discord.MessageEmbed()
            .setColor("#FFEB3B")
            .setDescription(
              `> <a:s72:950077654034440252> **Member Has Been Unmuted**`
            );
          message.channel.send(avtEmbed);
        });
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////
// MUTE Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (message.author.bot) return;
  let command = message.content.split(" ")[0];
  if (command === prefix + "mute" || command === "اكتم") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .lineReply(`> <a:grs:922517063774400563> **You Don't have __Manage Roles__ permission**`)
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.cache.find((gg) => gg.name === "log");
    let muteRole = client.guilds
      .cache.get(message.guild.id)
      .roles.cache.find((gg) => gg.name === "Muted");
    if (!muteRole)
      return message
        .lineReply(`> <a:grs:922517063774400563> **You Don't have __MUTED__ role**`)
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .lineReply("> <a:glt:929681265752412180> **Please Mention User**")
        .catch(console.error);
    if (
      !message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;

    if (message.guild.member(user).roles.cache.has(muteRole.id)) {
      const avtEmbed = new Discord.MessageEmbed()
        .setColor("#FF1100")
        .setDescription(
          `> <a:s72:950077654034440252> **Member has been muted**`
        );
      message.channel.send(avtEmbed);
    } else {
      message.guild
        .member(user)
        .roles.add(muteRole)
        .then(() => {
          const avtEmbed = new Discord.MessageEmbed()
            .setColor("#FF1100")
            .setDescription(
              `> <a:s72:950077654034440252> **Member has been muted**`
            );
          message.channel.send(avtEmbed);
        });
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////
// CLOSE Channel Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  let command = message.content.split(" ")[0];
  if (command === prefix + "close" || command === "قفل" || command === "اقفل") {
    if (!message.channel.guild)
      return message.lineReply("> <a:glt:929681265752412180> **This is only for servers**");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_MESSAGES__ permission**`);
      message.channel.createOverwrite(message.guild.id, {
        SEND_MESSAGES: false
})
            .then(() => {
        message.delete();
        const bot = new Discord.MessageEmbed()
          .setColor("#FF1100")
          .setTitle(`> <a:s72:950077654034440252> **The Channel Has Been Closed**`);
        message.channel.send(bot);
      });
  }
});
////////////////////////////////////////////////////////////////////////////////////
// OPEN Channel Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
let command = message.content.split(" ")[0];
if (command === prefix + "open" || command === "فتح" || command === "افتح") {
  if (!message.channel.guild)
    return message.lineReply("> <a:glt:929681265752412180> **This is Only For Servers**");

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_MESSAGES__ permission**`);
  message.channel.createOverwrite(message.guild.id, {
    SEND_MESSAGES: true,
    VIEW_CHANNEL: false
})
    .then(() => {
      message.delete();
      const bot = new Discord.MessageEmbed()
        .setColor("#FF1100")
        .setTitle(`> <a:s72:950077654034440252> **The Channel Has Been Opened**`);
      message.channel.send(bot);
    });
  }
});    
////////////////////////////////////////////////////////////////////////////////////
// ROLES COMMAND
////////////////////////////////////////////////////////////////////////////////////
client.on("error", (err) => {
  console.log(err);});
client.on('message', message => {
  let command = message.content.split(" ")[0];
  if (command === prefix + "roles"){
    const Rank = message.guild.roles.cache.map(e => e.toString()).join("\n");
    const RankList = new Discord.MessageEmbed()
        .setTitle('<a:load:933157681429106828>** Roles **')
        .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
        .setColor('ORANGE')
        .setDescription(Rank)
        .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }))
    message.channel.send(RankList)
      }
    });
////////////////////////////////////////////////////////////////////////////////////
// MOVE COMMAND 
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command === prefix + "move" || command === "اسحب"){
    let args = message.content.split(" ");
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[1])
    );
    if (!message.channel.guild || message.author.bot) return;
    if (!message.guild.member(message.author).hasPermission("MOVE_MEMBERS"))
      return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MOVE_MEMBERS__ permission**`);
    if (!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return;
    if (!message.member.voice.channel)
      return message.lineReply("> <a:glt:929681265752412180> **Your are not in voice channel**");
    if (!user) return message.lineReply(`> <a:grs:922517063774400563> **${prefix}move <@mention user>**`);
    if (!message.guild.member(user.id).voice.channel)
      return message.lineReply(
        `> <a:glt:929681265752412180> **${user.user.username} Hasn't in Voice Channel**`);
    message.guild
      .member(user.id)
      .voice.setChannel(message.member.voice.channel.id)
      .then(() => {
        message.lineReply(
          `> <a:s72:950077654034440252> **<@${user.user.id}> Has Been Moved to  <#${
            message.guild.member(message.author).voice.channel.id
          }>** `
        );
      });
  }
});
////////////////////////////////////////////////////////////////////////////////////
// SET Log
////////////////////////////////////////////////////////////////////////////////////
const log = JSON.parse(fs.readFileSync("./log.json"));
client.on("message", (message) => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.cache.find((r) => r.name == room);
  if (message.content.startsWith(prefix + "setLog")) {
    if (!message.channel.guild)
      return message.lineReply("> <a:glt:929681265752412180> **This is only for servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `> <a:grs:922517063774400563> **You Don't have __MANAGE_GUILD__ permission**`
      );
    if (!room) return message.lineReply("> <a:glt:929681265752412180> **Please Type The Channel Name**");
    if (!findroom)
      return message.lineReply("> <a:glt:929681265752412180> **Please Type The Log Channel Name**");
    let embed = new Discord.MessageEmbed()
      .setTitle("<:org:950077637978619914> **Log Has Been Setup**")
      .setColor("YELLOW")
      .addField("<:update:950077647818489866>| **Channel:**", `${room}`)
      .addField("<:user:950077642848211054>| **Requested By:**", `${message.author}`)
      .setThumbnail(message.author.avatarURL({dynamic: true}))
      .setFooter(`${client.user.username}`);
    message.channel.send(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On",};
    fs.writeFile("./log.json", JSON.stringify(log), (err) => {
      if (err) console.error(err);
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////
// toggle Log
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (message.content.startsWith(prefix + "toggleLog")) {
    if (!message.channel.guild)
      return message.lineReply("> <a:glt:929681265752412180> **This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `> <a:grs:922517063774400563> **You Don't have __MANAGE_GUILD__ permission**`
      );
    if (!log[message.guild.id])
      log[message.guild.id] = {
        onoff: "Off",
      };
    if (log[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`> <:enable:950390565965529118> **The log Is __𝐎𝐍__**`),
        (log[message.guild.id].onoff = "On"),
      ];
    if (log[message.guild.id].onoff === "On")
      return [
        message.channel.send(`> <:disable:950390565630013440> **The log Is __𝐎𝐅𝐅__ **`),
        (log[message.guild.id].onoff = "Off"),
      ];
    fs.writeFile("./log.json", JSON.stringify(log), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Security Commands
////////////////////////////////////////////////////////////////////////////////////
var antibots = JSON.parse(fs.readFileSync("./antibots.json", "utf8"));
let saveAbot = () => {
  fs.writeFileSync(
    "./antibots.json",
    JSON.stringify(antibots, null, 2),
    err => {
      if (err) throw err;
    }
  );
};
client.on("message", message => {
  if (!message.guild) return;
  if (!antibots[message.guild.id])
    antibots[message.guild.id] = {
      onoff: "on"
    };
  if (message.content.startsWith(prefix + "antibots on")) {
    if (message.author.bot || !message.channel.guild) return;
    if (message.author.id !== message.guild.ownerID)
      return message.lineReply(
        "> 🔐 ** Sorry just For Owner**"
      );
    antibots[message.guild.id] = {
      onoff: "on"
    };
    saveAbot();
    message.lineReply("> 🔐 **AntiBots Join Is On**");
  }
  if (message.content.startsWith(prefix + "antibots off")) {
    if (message.author.bot || !message.channel.guild) return;
    if (message.author.id !== message.guild.ownerID)
      return message.lineReply(
        "> 🔐 **Sorry Just For Owner**"
      );
    antibots[message.guild.id] = {
      onoff: "off"
    };
    saveAbot();
    message.lineReply("> 🔓 **AntiBots Join Is Off**");
  }
  saveAbot();
});
 client.on("guildMemberAdd", member => {
    if(!antibots[member.guild.id]) antibots[member.guild.id] = {
  onoff: 'Off'
  }
    if(antibots[member.guild.id].onoff === 'Off') return;
  if(member.user.bot) return member.kick()
  saveAbot();
  });
////////////////////////////////////////////////////////////////////////////////////
// Bots List
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (message.content === prefix + "ls") {
    var list_all = [];
    message.guild.members.cache.forEach((bb) => {
      if (!bb.user.bot) return;
      list_all.push(`<@${bb.user.id}>`);
    });
    let embed = new Discord.MessageEmbed()
    .setTitle("<a:load:933157681429106828> **Bot Mention**")
    .setDescription(list_all.join("\n"))
    .setColor("YELLOW")
    .setThumbnail(message.guild.iconURL({dynamic: true, format: 'png'}))
    .setFooter(message.guild.name, message.guild.iconURL({dynamic: true, format: 'png'}))
    message.channel.send(embed)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// INVITE Link
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (message.content === "رابط") {
    const embed = new Discord.MessageEmbed()
    .setTitle("<a:rks:933077528933990401> **Bot Invite**")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=925849882634362950&permissions=8&scope=bot")
    .setDescription("**Thank you for adding **𝐓𝐮𝐫𝐛𝐨 𝐁𝐨𝐭** to your server <a:love:880872686891450479><a:turbo:944101598651633706>**")
    .setThumbnail(message.client.user.avatarURL({dynamic: true}))
    .setImage("https://i.imgur.com/Ewfi7jU.gif")
    .setFooter(`REQUESTED BY: ${message.author.tag}`, message.author.avatarURL({dynamic: true}))
 message.channel.send(embed)
 .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// TAX
////////////////////////////////////////////////////////////////////////////////////
const probot = require("probot-tax");
client.on("message", (message) => {
    if(message.content.startsWith( prefix + 'tax')) {
    let args = message.content.split(" ").slice(1).join(" ");
    if(args <= 1) return message.lineReply(`> <a:grs:922517063774400563> **Tax Number Must Be Greater Than 1 **`)
     else if (!args) return message.lineReply('> <a:grs:922517063774400563> **Please Enter Value**')
    let embed = new Discord.MessageEmbed()
    .setColor('#FFEB3B')
    .addField('**`Total Money  :`**', `**${args}**`, false)
    .addField('**`Total Money and Taxes  :`**', `**${probot.taxs(args)}**`, false)
    .setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
    .setThumbnail(message.author.avatarURL({dynamic: true}))
        message.channel.send(embed)
        .catch(console.error);
    }
});
////////////////////////////////////////////////////////////////////////////////////
// Hide Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  let command = message.content.split(" ")[0];
  if (command === prefix + "hide" || command === "اخفي" || command === "اخفاء") {
    message.delete();
    if (!message.channel.guild)
      return message.lineReply("> <a:glt:929681265752412180> **This is only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_MESSAGES__ permission**`);
    message.channel.createOverwrite(message.guild.id, {
      VIEW_CHANNEL: false
  })

      .then(() => {
        const bot = new Discord.MessageEmbed()
          .setColor("#FF1100")
          .setTitle(`> <a:s72:950077654034440252> **The Channel Has Been Successfully Hidden**`);
        message.channel.send(bot)
        .catch(console.error);
      });
  }
////////////////////////////////////////////////////////////////////////////////////
// SHOW
////////////////////////////////////////////////////////////////////////////////////
  if (command === prefix + "show" || command === "اظهر"  || command === "اظهار") {
    message.delete();
    if (!message.channel.guild)
      return message.lineReply("> <a:glt:929681265752412180> **This is only for servers**");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_MESSAGES__ permission**`);
      message.channel.createOverwrite(message.guild.id, {
        VIEW_CHANNEL: true
    })
      .then(() => {
        const bot = new Discord.MessageEmbed()
          .setColor("#FF1100")
          .setTitle(`> <a:s72:950077654034440252> **The Channel Has Been Successfully Shown**`);
        message.channel.send(bot)
        .catch(console.error);
      });
  }
});
client.on("error", (err) => {
  console.log(err);
});
////////////////////////////////////////////////////////////////////////////////////
// Warn
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "warn" || command == "ورن") {
    let MuteRole = client.guilds.cache.get(message.guild.id).roles.cache.find((gg) => gg.name === "Muted");
    let WarnRole = client.guilds.cache.get(message.guild.id).roles.cache.find((gg) => gg.name === "Warn");
   if(!message.member.hasPermission("ADMINSTRATOR"))
return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __ADMINSTRATOR__ permission**`);
let args = message.content.split(" ").slice(1);
 var user = message.mentions.users.first() || message.author;
 var reason = args.slice(1).join(' ');
 const embed = new Discord.MessageEmbed()
     .setColor('#0083ff')
     .setTimestamp();
 if (!user) {
     return message.lineReply("> <a:glt:929681265752412180> **Please Mention User**");
 } if (!reason) {
     embed.addField("**Why do You Want to Give a Warning ?**", ` ${user.tag}?`);
     return message.channel.send(embed);
 }
 embed.setTitle(" <a:s72:950077654034440252> **The Warn Has Been Sent**")
     .setDescription(`
     <:user:950077642848211054> **The Warn Has Been Sent to:** **<@${user.id}>**`)
     .setTimestamp();
 message.channel.send(embed);
 const embed1 = new Discord.MessageEmbed()
     .setColor('#FF1100')
     .setTimestamp()
     .setThumbnail(message.author.avatarURL({dynamic: true}))
     .setTitle("**You Got a Warning <a:grs:922517063774400563>**")
     .setDescription(`\n**You Got a Warning Because:** **${reason}** 
     <:ORG:950077637978619914> **BY:** **<@${message.author.id}>**`)
 user.send(embed1).catch(console.error);
 message.guild.member(user).roles.add(WarnRole)
 message.delete();
}
});
////////////////////////////////////////////////////////////////////////////////////
// Profile
////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "profile" || command == "P" || command == "p" || command == prefix + "Profile") {
      var args = message.content.split(" ").slice(1);
      var men = message.mentions.users.first();
      let user = message.mentions.users.first() || message.author;
          var baderp = new Discord.MessageEmbed()
              .setColor('Random')
              .setImage(`https://api.probot.io/profile/${user.id}`)
              .setURL(`https://api.probot.io/profile/${user.id}`)
          message.channel.send(baderp);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Spin Random Command
////////////////////////////////////////////////////////////////////////////////////
client.on('message', (msg) => {
  var word = [
    "> Please Edit Me .",
    "> Please Edit Me .",
    "> Please Edit Me .",
    "> Please Edit Me .",
    "> Please Edit Me .",
    "> Please Edit Me .",
    "> Please Edit Me ."
  ]
  if (msg.author.bot) return
  if (msg.content === prefix + "spin") {
    if(msg.guild.id != '872242482442809476') return;
    var result = word[Math.floor(Math.random() * word.length)];
    msg.channel.send(result)
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Say Embed
////////////////////////////////////////////////////////////////////////////////////
client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  let BESHO = message.content.split(" ").join(` `).slice(7)
  if (command === prefix + "embed") {
  if (!BESHO[1])
     return message.lineReply(`> <a:grs:922517063774400563> **Please write anything**`).catch(console.error);
    message.delete()
    message.channel.send(new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
  .setDescription(`**${BESHO}**`)
  .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
  .setColor("#03A9F4") )
  .catch(console.error);
  }
  });
////////////////////////////////////////////////////////////////////////////////////
// Delete Message
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) =>{
  let command = message.content.split(" ")[0];
  if (command == `نضف` || command == "مسح" || command == prefix + "clear" || command == "امسح") { 
  message.delete()
      if(!message.channel.guild) return message.lineReply(`> <a:glt:929681265752412180> **This Command For Servers Only**`); 
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_GUILD__ permission**`);
       if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return;
      let args = message.content.split(" ").slice(1)
      let messagecount = parseInt(args);
      if (args > 100) return message.channel.send(`\`\`\`javascript
  i cant delete more than 100 messages 
  \`\`\``).then(messages => messages.delete({ timeout: 2600 }))
  if (!messagecount) messagecount = '100';
  message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
      message.channel.send(
              (`\`\`\`js
${msgs.size} Messages Deleted
\`\`\``)).then(messages =>
          messages.delete({ timeout: 2600 }));   
  })
}
});
////////////////////////////////////////////////////////////////////////////////////
// Server Info 
////////////////////////////////////////////////////////////////////////////////////
client.on(`message`, message => {
  if (message.content.startsWith(prefix + "server")) {
      if (!message.channel.guild) return message.lineReply('> <a:glt:929681265752412180> **This is for servers only**');
      const text = message.guild.channels.cache.filter(r => r.type === "text").size + 1
      const voice = message.guild.channels.cache.filter(r => r.type === "voice").size
      const chs = text + voice
      const avaibles = message.guild.features.map(features => features.toString()).join("\n")

      const roles = message.guild.roles.cache.size

      const online = message.guild.members.cache.filter(m =>
          m.presence.status === 'online'
      ).size

      const idle = message.guild.members.cache.filter(m =>
          m.presence.status === 'idle'
      ).size

      const offline = message.guild.members.cache.filter(m =>
          m.presence.status === 'offline'
      ).size

      const dnd = message.guild.members.cache.filter(m =>
          m.presence.status === 'dnd'
      ).size
let total = online + idle + dnd
      const black = new Discord.MessageEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }))
          .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
          .setColor('#03A9F4')
          .addField('**🆔 Server ID**', `${message.guild.id}`, true)
          .addField('**📆 Created At**', `**${moment(message.guild.createdAt, `YYYYMMDD`).fromNow()}**`, true)
          .addField('**👑 Owner**', `${message.guild.owner}`, true)
          .addField(`**👥 Members (${message.guild.memberCount})**`, `**${total}** Online 🟢 \n **${message.guild.premiumSubscriptionCount}** Boosts ✨`, true)
          .addField(`**💬 Rooms (${chs})**`, `**${text}** Text | **${voice}** Voice`, true)
          .addField(`**🔐 Roles (${roles})**`, `To see a list with all roles use **$roles**`)
          .setFooter(message.author.username, message.author.avatarURL({dynamic: true}))
      message.channel.send(black)
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Broadcast
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if (message.content.startsWith(prefix + "bc")) {
  if (!message.member.hasPermission("ADMINSTRATOR")) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __ADMINISTRATOR__ Permission**`)
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' '); 
  message.guild.members.cache.filter(m => m.presence.status !== 'offline').forEach(m => {
 m.send(`${argresult}\n ${m}`);
})
setTimeout(function(){ 
  message.lineReply(`\`${message.guild.members.cache.filter(m => m.presence.status !== 'online').size}\` : Total Member`); 
  message.delete();
},4000) 
};     
});
////////////////////////////////////////////////////////////////////////////////////
// User 
////////////////////////////////////////////////////////////////////////////////////
client.on('message', msg => {
  if (msg.content.startsWith(prefix + "user")) {
  if(msg.author.bot) return;
    let user = msg.mentions.users.first() || msg.author;
    const embed = new Discord.MessageEmbed()
      .setColor("#03A9F4")
      .addFields(
        { name: '**Joined Discord:**', value: `\`${moment(user.createdAt, `YYYYMMDD`).fromNow()}\``, inline: true }, 
        { name: '**Joined Server:**', value: `\`${moment(msg.guild.member(user).joinedAt,`YYYYMMDD`).fromNow()}\`` , inline: true})
      .setAuthor(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .setFooter(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
    msg.channel.send(embed)
}
});
////////////////////////////////////////////////////////////////////////////////////
// Nick Name
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == `لقب` || command == prefix + "nick") {
    if (message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MANAGE_NICKNAMES") || !message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES"))
    var user = message.mentions.members.first();
    var args = message.content.split(" ").slice(2);
    var nick = args.join(" ");
    if (!user || !args) return message.lineReply(`> <a:grs:922517063774400563> **Usage:** ${prefix}nick \`\`@Name\`\` Nickname`);
    message.guild.member(user.user).setNickname(`${nick}`);
    message.channel.send(`> <a:s72:950077654034440252> **Successfully changed** **${user}** **Nickname to** **${nick}**`);
  }
}); 
////////////////////////////////////////////////////////////////////////////////////
// BOT INFO
////////////////////////////////////////////////////////////////////////////////////
client.on('message', mtg => {
  if (mtg.content.startsWith( prefix + "bot")) {
  mtg.channel.send({
  embed: new Discord.MessageEmbed()
     .setAuthor(client.user.username,client.user.avatarURL({dynamic: true}))
     .setThumbnail(client.user.avatarURL({dynamic: true}))
     .setColor('#03A9F4')
     .setTitle('**Info The Bot** <:ORG:950077637978619914>')
     .addField('**Bot Dev** <:dev:950077637068472441>' , `<@736038771535118377>`, true)
     .addField('**My Ping** <a:load:933157681429106828>' , `[**${Math.round(client.ws.ping)}ms**]`, true)
     .addField('**Servers** <a:hypeshiny2:950077636720345208> ', `**[ ${client.guilds.cache.size} ]**`, true)
     .addField('**Channels** <a:invinty:952606603197181952>' , `**[ ${client.channels.cache.size} ]**` , true)
     .addField('**Users** <a:red:952606606393237584>' ,`**[ ${client.users.cache.size} ]**` , true)
     .addField('**My Name** <:user:950077642848211054>' , `**[ ${client.user.username} ]**` , true)
     .addField('**My ID** 🆔' , `**[ ${client.user.id} ]**` , true)
     .setFooter(`By: ${mtg.author.username}`,mtg.author.avatarURL({dynamic: true}))
})
}
});
////////////////////////////////////////////////////////////////////////////////////
// Invites
////////////////////////////////////////////////////////////////////////////////////
client.on('message', async(msg) => {
  let user = msg.mentions.users.first() || msg.author ;
  if (msg.content.split(' ')[0].toLowerCase() == prefix + 'invites') {
    let guild = msg.guild
    var codes = [""]
    var nul = 0
    guild.fetchInvites()
      .then(invites => {
        invites.forEach(invite => {
          if (invite.inviter === user) {
            nul += invite.uses
            codes.push(`discord.gg/${invite.code}`)
          }
        })
        if (nul > 0) {
                const e = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL({dynamic: true}))
                .setColor("WHITE")
                .setThumbnail(msg.author.avatarURL({dynamic: true}))
                .setDescription(`** لقد قام بدعوة **${nul}** شخص <a:rks:933077528933990401>


|| ذلك بعد مسح المزيف والذين خرجوا من السيرفر <a:s72:950077654034440252> || **`)
          msg.channel.send(e)
        } else {
          var embed = new Discord.MessageEmbed()
            .setColor("#000000")
            .addField(`${msg.author.username}`, `لم تقم بدعوة أي شخص لهذة السيرفر`)
          msg.channel.send(embed);
          return;
        }
      })
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Vote
////////////////////////////////////////////////////////////////////////////////////
var yes = '950077654034440252'
var no = '929681265752412180'
client.on('message', (message) => {
  if (message.content.startsWith(prefix + 'vote')) {
    const args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.lineReply(`> <a:grs:922517063774400563> **Write The Vote**`)
    var embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`**New Vote** <:vote:950077638825873448>`)
      .setThumbnail(message.author.avatarURL({dynamic: true}))
      .setDescription(`**${args}**`)
      .setFooter(`${message.author.username} `, message.author.avatarURL({dynamic: true}))
    message.lineReply(`@everyone`,embed).then(sent => {
      sent.react(yes).then(rec => {
        sent.react(no).then(rec2 => {
        });
      });
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Short link
////////////////////////////////////////////////////////////////////////////////////
const shorten = require('isgd');
client.on('message', (ninja) => {
  if (ninja.content.startsWith(prefix + 'short')) {
    if (!ninja.channel.guild) return;
    ninja.channel
    if (!ninja.member.hasPermission('ADMINISTRATOR'))
      return ninja.lineReply(`> <a:grs:922517063774400563> **You Don't have __ADMINISTRATOR__ Permission**`);
    let args = ninja.content.split(" ").slice(1);
    if (!args[0]) return ninja.lineReply('> <a:grs:922517063774400563> **Usage**: ' + prefix + 'short + (LINK)')
    if (!args[1]) {
      shorten.shorten(args[0], function(res) {
        if (res.startsWith('Error:')) return ninja.lineReply('> <a:grs:922517063774400563> **Usage**: ' + '!short');
        ninja.lineReply(`> <a:s72:950077654034440252> **Links Shortcut:** **${res}**`);
      })
    } else {
      shorten.custom(args[0], args[1], function(res) {
        if (res.startsWith('Error:')) return ninja.lineReply(`> **Links Shortcut:** **${res}**`);
        ninja.lineReply(`>  **Links Shortcut:** **${res}**`);
      })
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Unban Command
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "unban" || command == "ارجع" || command == "رجع") {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __BAN_MEMBERS__ Permission**`)
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (args == "all" || args == "الكل") {
      message.guild.fetchBans().then(zg => {
        zg.cache.forEach(NoNo => {
          message.guild.members.cache.unban(NoNo);
        });
      });
      return message.lineReply(`> <a:s72:950077654034440252> **Unbanned All Members**`)
    }
    if (!args)
      return message.lineReply("> <a:grs:922517063774400563> **Please Type the member ID User**");
    message.guild.members.cache.unban(args)
      .then(m => {
        message.lineReply(`> <a:s72:950077654034440252> **✅ Unbanned ${m.username}**`);
      })
      .catch(stry => {
        message.lineReply(new MessageEmbed()
.setColor("#FF0000")
.setDescription(`> 🙄 ** - I can't find \`${args}\` in the ban list**`));
      });
  }
});

////////////////////////////////////////////////////////////////////////////////////
// Avatar Command
////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "avatar" || command == "A" ) {
    
    let args = message.content.split(" ").slice(1).join(" ");   
   let member = message.mentions.users.first() || message.author
    let avatar = member.displayAvatarURL({dynamic: true, size: 1024, format: 'png'})
      const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar URL`)
        .setAuthor(`${member.username}`, member.displayAvatarURL({ dynamic: true }))
        .setURL(member.displayAvatarURL({dynamic: true, size: 1024, format: 'png'}))
        .setImage(avatar)
        .setFooter(`${member.username}`, member.displayAvatarURL({ dynamic: true }))
        .setColor("ORANGE")
        message.channel.send(embed)
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Remove Background
////////////////////////////////////////////////////////////////////////////////////
const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } = require("remove.bg");
const { getUserBanner } = require("discord-banner");
client.on('message', message =>{
  if(message.author.bot) return;
  if(!message.guild) return; 
  if(message.content.startsWith(prefix + 'remo')){
    message.delete();
  const url = message.content.split(' ').slice(1).join(' ')
  if(!url) return message.lineReply(`> <a:grs:922517063774400563> **${prefix}remove <URL>**`)
  const outputFile = `${__dirname}/${message.author.id}.png`;
  
try {
  removeBackgroundFromImageUrl({
    url,
    apiKey: "oEecsQFNG5NnzBVrVTUj6WxV",
    size: "regular",
    type: "png",
    outputFile
    }).then(a=>{
      message.channel.send({files : [outputFile]})
      })
  } catch (error) {
    console.log(RemoveBgError)
    message.channel.send(error)
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Auto Replay Command
////////////////////////////////////////////////////////////////////////////////////
client.on('message',message => {
  const auto = require('./auto.json')
  if(!auto) return console.log(`**هناك خطأ في ملف الرد للبوت**`)
  let args = message.content.split(' ')
  if(message.content.startsWith(prefix + 'auto')){
      if(!message.guild) return;
      if(message.author.bot) return;
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __ADMINISTRATOR__ permission**`)
      if(!args[1]) return message.lineReply(new Discord.MessageEmbed().setDescription(`
      **Command: auto-respoce**

**Usage:**
#auto (msg) (respoce)

**Examples:**
#auto (msg) (respoce)
#unmute hello hi`))
      if(!args[2]) return message.lineReply(new Discord.MessageEmbed().setDescription(`
      **Command: auto-respoce**

**Usage:**
#auto (msg) (respoce)

**Examples:**
#auto (msg) (respoce)
#unmute hello hi`))
      auto[args[1]+message.guild.id] = {
          msg : args[1],
          guild : message.guild.id,
          reply : args[2]
      }
      fs.writeFile('./auto.json',JSON.stringify(auto,null,5),err=>{
          console.error(err);
      })
      message.lineReply(`> <a:s72:950077654034440252> **Done Added Auto Role**`)
  }
  if(message.content.startsWith(prefix + 'adelete')){
      if(!message.guild) return;
      if(message.author.bot) return;
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __ADMINISTRATOR__ permission**`)
      if(!args[1]) return message.lineReply(`**${prefix}adelete \`Massage\` \`Respoce\`**`)
      if(!auto[args[1]+message.guild.id]) return message.lineReply(`> 🙄 ** - I can't find the Auto Replay`)
      delete auto[args[1]+message.guild.id]
      fs.writeFile('./auto.json',JSON.stringify(auto,null,5),err=>{
          console.error(err);
      })
      message.lineReply(`> <a:s72:950077654034440252> **Done Deleted Auto Replay**`)
    }
    let niro  = message.content
    if(!auto[niro+message.guild.id]) return;
    if(niro == auto[niro+message.guild.id].msg) {
      if(message.content.startsWith("GIVE") || message.content.startsWith("line") || message.content.startsWith("ID") || message.content.startsWith("خط") || message.content.startsWith("PART")){message.delete();}
    message.channel.send(auto[niro+message.guild.id].reply)
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Credit command
////////////////////////////////////////////////////////////////////////////////////
client.on('message', async message => {

  let Fire = message.content.split(' ')[0].substring(prefix.length);
  let mention = message.mentions.users.first() || message.author;
  if (Fire === 'adcredits') {
    let args = message.content.split(' ');
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.lineReply('> <a:grs:922517063774400563> **Please Type Credits**');
    if (!credits[mention.id]) return;
    credits[mention.id].credits += +args[1];
    fs.writeFileSync('./credits.json', JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.lineReply(`> <a:s72:950077654034440252> **Adedd Money For : \`${args[1]}\` Done **`);
  } else if (Fire === 'rcredits') {
    let args = message.content.split(' ');
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.lineReply('> <a:grs:922517063774400563> **Please Type Credits**');
    if (!credits[mention.id]) return;
    credits[mention.id].credits += -args[1];
    fs.writeFileSync('./credits.json', JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.lineReply(`> <a:s72:950077654034440252> **Removed Money For : \`${args[1]}\`**`);
  }
});


const credits = JSON.parse(fs.readFileSync('./credits.json'));
var time = require('./credits.json');
client.on('message', async message => {
  if (message.author.bot || message.channel.type === 'dm') return;
  let args = message.content.split(' ');
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync('./credits.json', JSON.stringify(credits, null, 4));
  let command = args[0].toLowerCase();
  if (command == `${prefix}credits` || command == "C" || command == "c") {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if(credits[mention.id].credits = null)
    message.lineReply("> **لا اجد هذا العضو **")
    if (!args[2]) {
      message.lineReply(
        `**${mention.username}, your :credit_card: balance is  \`${
        credits[mention.id].credits
        }\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2]) || [',', '.'].includes(args[2]))
        return message.lineReply(`> <a:glt:929681265752412180> **|Error **`);

      if (args[2] < 1) return message.lineReply(`> <a:glt:929681265752412180> **|Error**`);
      if (mention.bot) return message.lineReply(`> <a:glt:929681265752412180> **|Error**`);
      if (mentionn.id === message.author.id)
        return message.lineReply(`> <a:glt:929681265752412180> **|Error**`);
      if (args[2] > credits[author].credits)
        return message.lineReply(
          `> <a:glt:929681265752412180>  **| Error ,You don't have credits in your account**`
        );
      if (args[2].includes('-')) return message.lineReply(`> <a:glt:929681265752412180>  **|Error**`);
      let resulting =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] - args[2] * (5 / 100));
      let tax =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] * (5 / 100));
      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let fourth = Math.floor(Math.random() * 9);
      let num = `${first}${second}${third}${fourth}`;
      let Canvas = require('canvas');
      let canvas = Canvas.createCanvas(108, 40);
      let ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage(
        'https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png'
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.font = '20px Arial Bold';
      ctx.fontSize = '20px';
      ctx.fillStyle = '#ffffff';
      message.lineReply(
          `**${
          message.author.username
          }, Transfer Fees: \`${tax}\`, Amount: \`$${resulting.toLocaleString()}\`**
type these numbers to confirm: `
        )
        .then(async essss => {
          message.channel.send(`\`${num}\``).then(m => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ['time']
              })
              .then(collected => {
                if (collected.first().content === num) {
                  essss.delete();
                  message.lineReply(
                    `**:moneybag: | ${
                    message.author.username
                    }, Done Trans \`$${resulting.toLocaleString()}\` To ${mentionn}**`
                  );
                  mention.send(
                    `**:money_with_wings: | Transfer Receipt **\`\`\`You Have Received \`$${resulting.toLocaleString()}\` From User ${
                    message.author.username
                    }; (ID (${message.author.id})\`\`\``
                  );
                  m.delete();
                  credits[author].credits += Math.floor(
                    -resulting.toLocaleString()
                  );
                  credits[mentionn.id].credits += Math.floor(
                    +resulting.toLocaleString()
                  );
                  fs.writeFileSync(
                    './credits.json',
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                  essss.delete();
                }
              });
          });
        });
    } else {
      message.channel.send(
        `> <a:glt:929681265752412180> **|Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`
      );
    }
  }
  if (command == `${prefix}daily` || command == "D" || command == "d") {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send(
        `**:stopwatch: |  ${
        message.author.username
        }, your daily :dollar: credits refreshes in ${pretty(times, {
          verbose: true
        })}.**`
      );
      fs.writeFile('./credits.json', JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `**:atm: | ${message.author.username} you received your :yen: 250 daily credits!**`);
      fs.writeFile('./credits.json', JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Scrim Commands
////////////////////////////////////////////////////////////////////////////////////
// TDM Form Registration
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if(message.guild.id != '872242482442809476') return;
  if (message.content === "$Ttdm") {
  if(!message.member.hasPermission("MANAGE_ROLES"))
 return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
    message.delete();
    const bot = new Discord.MessageEmbed()
      .setColor("#FFEB3B")
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setTitle("طريقة التسجيل <a:s72:950077654034440252> ")
      .setDescription(
`**        
Team Name :
Team Leader :
P1 :
P2:
Logo (if you have )**`)
      .setImage("https://i.imgur.com/P9QVop4.gif")
      .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }));
    message.channel.send("@everyone",bot)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Classic Form Registration
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if(message.guild.id != '872242482442809476') return;
  if (message.content === "$Tcla") {
  if(!message.member.hasPermission("MANAGE_ROLES"))
 return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
 message.delete();
    const bot2 = new Discord.MessageEmbed()
      .setColor("#FFEB3B")
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setTitle("طريقة التسجيل <a:s72:950077654034440252> ")
      .setDescription(
        `**
Team Name :
Team Leader :
P1:
P2:
P3:
P4:
Logo **`)
      .setImage("https://i.imgur.com/NmrD2dX.gif")
      .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }));
      message.channel.send("@everyone",bot2)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// CLASSIC RULES
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (message.content === "$claRULE") {
  if(message.guild.id != '872242482442809476') return;
  if(!message.member.hasPermission("MANAGE_ROLES"))
 return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
 message.delete();
    const bot = new Discord.MessageEmbed()
      .setColor("#FFEB3B")
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setTitle("**Scrim Rules** <a:rule:880872686279094372> ")
      .setDescription(
        `**
ممنوع التفنيش بوكسات او طاسة الا في حالة عدم وجود سلاح و طلق

ممنوع نهائيا الجليتشات و الملفات التعديل

اي لاعب سولو سيتم اقصائه

متسجلش لو مش هتلعب اول روم يا متوحد

يرجوا الالتزام ب علي الاقل 2 من نفس ال نيم تاج

التصوير مطلوب من الجميع

ممنوع فتح المايك العام

الفلير مسموح

اي مخالفة لل قواعد هتأدي ل استبعاد ال تيم كلو**`
      )
      .setImage("https://probot.media/0Nl8JidD17.gif")
      .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }));
      message.channel.send("@everyone",bot)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// CLASSIC POINT
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if(message.guild.id != '872242482442809476') return;
  if (message.content === "$claINFO") {
  if(!message.member.hasPermission("MANAGE_ROLES"))
 return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
 message.delete();
    const bot = new Discord.MessageEmbed()
      .setColor("#FFEB3B")
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setTitle("**Point System** <a:grs:922517063774400563> ")
      .setDescription(
        `**
1 st Place 20 Points

2 nd Place 14 Points

3 rd Place 10 Points

4 th Place 8 Points

5 th Place 7 Points

6 th Place 6 Points

7 th Place 5 Points

8 th Place 4 Points

9 th Place 3 Points

10 th Place 2 Points

--------------------
> Kill = 1 Point |
--------------------
**`)
      .setImage("https://probot.media/JadMOeIOtg.gif")
      .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }));
      message.channel.send("@everyone",bot)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// TDM RULES
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if(message.guild.id != '872242482442809476') return;
  if (message.content === "$tdmRULE") {
  if(!message.member.hasPermission("MANAGE_ROLES"))
 return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
 message.delete();
    const bot = new Discord.MessageEmbed()
      .setColor("#FFEB3B")
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setTitle("**Tdm Rules** <a:grs:922517063774400563> ")
      .setDescription(
        `**<a:s72:950077654034440252> مسموح البيستول
<a:s72:950077654034440252> مسموح الفيست والخوذة
<a:glt:929681265752412180> ممنوع استخدام أسلحه غير الامفور
<a:glt:929681265752412180> ممنوع استخدام الامفور التلجي فوق لفل 3
<a:glt:929681265752412180> ممنوع التحالف
<a:glt:929681265752412180> ممنوع استخدام النيدات
<a:glt:929681265752412180> ممنوع التأخر عن معاد الروم اكتر من خمس دقائق
<a:glt:929681265752412180> ممنوع الزحلقه
<a:glt:929681265752412180> ممنوع فتح مايك العام
<a:glt:929681265752412180> ممنوع الوقوف في البييز اكثر من عشر ثواني

---------------------
> لازم التصوير <a:dabos:922517076885798962> |
---------------------
**`)
      .setImage("https://probot.media/Cv77UM4buz.gif")
      .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }))
      message.channel.send("@everyone",bot)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Id Tdm
////////////////////////////////////////////////////////////////////////////////////
client.on('message', (message) => {
  if(message.guild.id != '872242482442809476') return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let MADE = message.content.split(" ");
  let BY = message.content.split(" ");
  let BESHO = message.content.split(" ").slice(3);
  if (command === "idTDM") {
       if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`)
      if (!BY[1])
        return message.lineReply(`> <a:glt:929681265752412180> **Usage: ${prefix}idTDM \`(ID)\` \`(PASSWORD)\` \`(START)\` **\n`).catch(console.error);
      if (!MADE[2])
        return message.lineReply(`> <a:glt:929681265752412180> **Usage: ${prefix}idTDM \`(ID)\` \`(PASSWORD)\` \`(START)\` **\n`).catch(console.error);
      if (!BESHO[0])
        return message.lineReply(`> <a:glt:929681265752412180> **Usage: ${prefix}idTDM \`(ID)\` \`(PASSWORD)\` \`(START)\` **\n`).catch(console.error);
  message.delete()
    message.channel.send(`
  
    **<a:gna7sh:930187075649679401><a:t_:930190463384842261><a:d_:930856769771696210><a:m_:930190482162712586><a:love:930190460683685978><a:i_:930190442862112778><a:d_:930856769771696210><a:gna7ym:930187081299423263>**
­
**<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>

> <a:shm2:930795173351407676>MAP : TDM

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>

> <a:shm2:930795173351407676>ID : ­${BY[1]}

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>

> <a:shm2:930795173351407676>PASSWORD : ­${MADE[2]}

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>

> <a:shm2:930795173351407676>START : ­${BESHO.join(" ")}

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
­
طبعاا الكاريزماات تخش عشان متاخدش بان من السيرفر <a:shb:930193756114808872>

<@&933116201704501308>**
`).catch(console.error);
  }
  });
////////////////////////////////////////////////////////////////////////////////////
// Id Classic
////////////////////////////////////////////////////////////////////////////////////
client.on('message', (message) => {
  if(message.guild.id != '872242482442809476') return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let MAP = message.content.split(" ");
  let MADE = message.content.split(" ");
  let BY = message.content.split(" ");
  let BESHO = message.content.split(" ");
  if (command == "id") {
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`)
      if (!MAP[1])
        return message.lineReply(`> <a:glt:929681265752412180> **Usage: ${prefix}id \`(MAP)\` \`(ID)\` \`(PASSWORD)\` \`(START)\` **\n`).catch(console.error);
      if (!BY[2])
        return message.lineReply(`> <a:glt:929681265752412180> **Usage: ${prefix}id \`(MAP)\` \`(ID)\` \`(PASSWORD)\` \`(START)\` **\n`).catch(console.error);
      if (!MADE[3])
        return message.lineReply(`> <a:glt:929681265752412180> **Usage: ${prefix}id \`(MAP)\` \`(ID)\` \`(PASSWORD)\` \`(START)\` **\n`).catch(console.error);
      if (!BESHO[4])
        return message.lineReply(`> <a:glt:929681265752412180> **Usage: ${prefix}id \`(MAP)\` \`(ID)\` \`(PASSWORD)\` \`(START)\` **\n`).catch(console.error);
  message.delete()
    message.channel.send(`
  
  ­
  <a:gna7sh:930187075649679401><a:s_:930190463535816735><a:c_:930191251897217096><a:r_:930190480996728922><a:i_:930190442862112778><a:m_:930190482162712586><a:love:930190460683685978><a:i_:930190442862112778><a:d_:930856769771696210><a:gna7ym:930187081299423263>
  
  ­
  **<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  
  > <a:shm2:930795173351407676>­­ MAP : ${MAP[1]} 
  
  <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  
  > <a:shm2:930795173351407676>­­ ID : ­${BY[2]}
  
  <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  
  > <a:shm2:930795173351407676>­­ PASSWORD : ­${MADE[3]}
  
  <a:line:930859851133890570>­­ <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  
  > <a:shm2:930795173351407676>­­ START : ­${BESHO[4]}
  
  <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  ­
  طبعاا الكاريزماات تخش عشان متنورش البلاك ليست <a:shb:930193756114808872>**
  
  <@&872242482442809479>
  `)
  .catch(console.error);
  }
  });
////////////////////////////////////////////////////////////////////////////////////
// Test Scrim
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`)
  if (message.content.startsWith("تيست سكرم")) {
    if(message.guild.id != '872242482442809476') return;
    if(!message.member.hasPermission("MANAGE_ROLES"))
    return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
    message.delete();
    message.channel.send(`> **Test For Role Id Pass Classic <a:love:880872686891450479>**

<@&872242482442809479>`)
  }
});
client.on("message", (message) => {
  if (message.content.startsWith("> **Test")) {
message.react("950077654034440252");
setTimeout(function(){ 
  message.lineReply(
    `دوس علي <a:s72:950077654034440252> يا كاريزمه بدل متاخد بال <a:shb:930193756114808872>
<@&872242482442809479>`
  )
},10000);
}
});
////////////////////////////////////////////////////////////////////////////////////
// Fedback Classic
////////////////////////////////////////////////////////////////////////////////////
client.on('message', (message) => {
  if(!message.member.hasPermission("MANAGE_ROLES"))
  return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
  if(message.guild.id != '872242482442809476') return;
  let command = message.content.split(" ")[0];
  if (command == "فيدباك") {
    message.delete();
        message.channel.send(`
<a:fire2:950921713871355984> <a:love2:950077636711956531> وبكدة تكون السكرم بتاعتنا خلصت تنورونا في سكرماتنا الجاية 
متنسوش الفيدباك بقا عشان ننزل الريزلت <#872242483420094506> 
<@&872242482442809479><a:emojiserver:950419977075306536>`);
    
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Roles Scrim ID
////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
  if(!message.member.hasPermission("MANAGE_ROLES"))
  return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
  if(message.guild.id != '872242482442809476') return;
  let command = message.content.split(" ")[0];
  if (command == "رولز") {
    message.delete();
        message.channel.send(`
> <a:fire2:950921713871355984> ・**برجاء التصوير من جميع التيمات، والتأكد من حضور كل الرومات**

> <a:fire2:950921713871355984> ・**التيم الي هيحضر التلت رومات هياخد الرول دي** <@&950950574537461801> **وهتزود فرصه قبوله في الاسكريمات **
        
> <a:fire2:950921713871355984> ・ **الي مش هيخش التلت رومات مش هيتحسبلوا بوينتات**
        
> <a:fire2:950921713871355984> ・**على الاقل اتنين بنفس النيم التاج**
        
> <a:fire2:950921713871355984> ・**يرجي من كل تيم أخذ سكرين للمركز تحسبا للبج**
        
<@&872242482442809479>`);
    
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Black List Time
////////////////////////////////////////////////////////////////////////////////////
client.on('message', async(msg) => {
  if(!msg.member.hasPermission("MANAGE_ROLES"))
  return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
  if(msg.guild.id != '872242482442809476') return;
  if (msg.content.startsWith(prefix + "black")) {
      var args = msg.content.split(" ");
      var time = args[3];
      var user = msg.mentions.members.first() || client.users.cache.get(args[1]);
      var member = msg.guild.member(user);
      var role = msg.guild.roles.cache.find(r => r.name === args[2]) || msg.mentions.roles.cache.first() || msg.guild.roles.cache.find(r => r.id === args[2])
      if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.lineReply(
          new Discord.MessageEmbed()
          .setAuthor('❌ | Error', msg.author.avatarURL({dynamic: true}))
          .setColor("RED")
          .setDescription(`**<a:glt:929681265752412180> | You Don't Have Permission!.**`)
          .setThumbnail(msg.author.avatarURL({dynamic: true}))
      );
      if (!user) return msg.channel.send(
          new Discord.MessageEmbed()
          .setAuthor('❌ | Error', msg.author.avatarURL({dynamic: true}))
          .setColor("RED")
          .setDescription(`**<a:glt:929681265752412180> | Please Mention/Id Someone!.**`)
          .setThumbnail(msg.author.avatarURL({dynamic: true}))
      );
      if (!role) return msg.channel.send(
          new Discord.MessageEmbed()
          .setAuthor('❌ | Error', msg.author.avatarURL({dynamic: true}))
          .setColor("RED")
          .setDescription(`**<a:glt:929681265752412180> | Please Mention/Id/Name The Role!.**`)
          .setThumbnail(msg.author.avatarURL({dynamic: true}))
      );
      if (!time) time = "24h"
      if (user.id === msg.author.id) return msg.channel.send(
          new Discord.MessageEmbed()
          .setAuthor('❌ | Error', msg.author.avatarURL({dynamic: true}))
          .setColor("RED")
          .setDescription(`**<a:glt:929681265752412180> | You Can't Give Your Self A Role!.**`)
          .setThumbnail(msg.author.avatarURL({dynamic: true}))
      );
      if (user.id === client.user.id) return msg.channel.send(
          new Discord.MessageEmbed()
          .setAuthor('❌ | Error', msg.author.avatarURL({dynamic: true}))
          .setColor("RED")
          .setDescription(`**<a:glt:929681265752412180> | You Can't Give Me A Role!.**`)
          .setThumbnail(msg.author.avatarURL({dynamic: true}))
      );
      member.roles.add(role);
      msg.channel.send(
          new Discord.MessageEmbed()
          .setAuthor('✔ | Done', msg.author.avatarURL({dynamic: true}))
          .setColor("GREEN")
          .setDescription(`<a:s72:950077654034440252> | <@${user.id}> Has Been Gived **𝐁𝐋𝐀𝐂𝐊 𝐋𝐈𝐒𝐓** For ${ms(ms(time))}`)
      );
      setTimeout(() => {
          member.roles.remove(role)
      }, ms(time))
  }
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// HELP COMMANDS
////////////////////////////////////////////////////////////////////////////////////
// Help Org
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if(!message.member.hasPermission("MANAGE_ROLES"))
  return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __MANAGE_ROLES__ permission**`);
  if(message.guild.id != '872242482442809476') return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
    if (command === "helporg") {
      message.react("950077654034440252");
      const embed = new Discord.MessageEmbed()
        .setColor("#FFEB3B")
        .setThumbnail("https://i.imgur.com/NRYF2ma.png")
        .setTitle("<a:grs:922517063774400563> **Help Org**")
        .setDescription(
          `**<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  \`${prefix}Ttdm\` : طريقة تسجيل ال TDM
  \`${prefix}Tcla\` : كلاسيك رول
  \`${prefix}claINFO\` : نظام البوينتس بتاعت الكلاسيك 
  \`${prefix}tdmRULE\` : رول ال TDM 
  \`${prefix}idTDM\` :الاستخدام : $idTDM+ID+PASS+TIME -> $idTDM 12345678 ULT 9:00 
  \`${prefix}id\` : ايدي كلاسيك  - $id+MAP+ID+PASS+TIME -> $id <:er:931287030128865321> 12345678 ULT 9:00 
  \`تيست سكرم\` : عشان تيست رول الاي دي للكلاسيك
  \`فيدباك\` : تعمله بعد نهائية السكرم
  \`رولز\` : تحطها في بداية تشانل ايدي الكلاسيك
  <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  **`)
      message.channel.send(embed)
      .catch(console.error);
    }
  });
////////////////////////////////////////////////////////////////////////////////////
// Help Bot
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
    if (message.content.startsWith(prefix + "help")) {
      message.react("950077654034440252");
      const embed = new Discord.MessageEmbed()
        .setColor("#FFEB3B")
        .setThumbnail("https://i.imgur.com/NRYF2ma.png")
        .setTitle("**TURBO BOT Commands <a:grs:922517063774400563> **")
        .setDescription(
          `**<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  <a:gna7ym:930187081299423263> الأوامر العامة <a:gna7sh:930187075649679401> 
  \`${prefix}bot\` : لعرض معلومات عن البوت
  \`${prefix}profile\` : عرض بروفايلك مثل البرو بوت
  \`${prefix}credit\` : لعرض اموالك في البوت
  \`${prefix}daily\` : لاخذه اموال يوميا
  \`${prefix}server\` : عرض معلومات السيرفر 
  \`${prefix}user\` : لعرض معلومات عنك 
  \`${prefix}avt\` :يعرض لك صورت  اي شخص عن طريق الايدي 
  \`${prefix}avatar\` : لعرض صورتك أو صورة الي تمنشنه 
  \`${prefix}tax\` : لمعرفة ضريبة ProBot
  \`${prefix}invites\` : لمعرفة عدد دعوات العضو
  \`${prefix}vote\` : لعمل Vote
  \`${prefix}short\` : لتصغير رابط
  \`${prefix}remo\` : لازالة خلفية الصور
  \`${prefix}embed\` : عمل ايمبد جامدة
  \`رابط\` : لانشاء رابط دعوة البوت
  <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  <a:tag:929797450061987880> الأوامر الإدارية <a:tag:929797450061987880>
  \`${prefix}clear\` : لمسح الشات 
  \`${prefix}ban\` : لحظر شخص من السيرفر
  \`${prefix}kick\` : لطرد شخص من السيرفر
  \`${prefix}warn\` : لاعطاء تحذير لشخص   
  \`${prefix}open\` : لفتح الشات
  \`${prefix}close\` : لقفل الشات 
  \`${prefix}mute\` : لإسكات شخص
  \`${prefix}unmute\` : لـ فك إسكات شخص
  \`${prefix}move\` :لنقل شخص من قناة صوتية 
  \`${prefix}setup\` : إنشاء تيكت
  \`${prefix}nick\` : لتغيير اسم العضو 
  \`${prefix}auto\` : لصنع رد تلقائي 
  \`${prefix}closet\` : لحذف روم التكت
  \`${prefix}say\` : البوت يكرر كلامك
  \`${prefix}bc\` : لعمل رسالة ترسل لجميع اعضاء السيرفر
  \`${prefix}setLog\` : لتحديد روم السجلات 
  \`${prefix}toggleLog\` : لتغير روم السجلات 
  \`${prefix}ls\` : لإظهار جميع بوتات السيرفر
  \`${prefix}roles\` : اظهار جميع رولات السيرفر
  \`${prefix}role\` : لاعطاء شخص رتبة
  <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  <a:prv:932029032629956618> أوامر الحماية <a:prv:932029032629956618>
  \`${prefix}antibots on\` : منع دخول بوتات
  \`${prefix}antibots off\` : السماح للبوتات بالدخول
  <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
  **`)
        .setImage("https://i.imgur.com/Ewfi7jU.gif")
      message.channel.send(embed)
      .catch(console.error);
    }
  });
////////////////////////////////////////////////////////////////////////////////////
// Help Music
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (embed13) => {
  if (embed13.content === prefix + "help") {
    const bot = new Discord.MessageEmbed()
            .setAuthor(`Music Commands ⚡`,"https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif")
      .setColor("#FFEB3B")
      .setThumbnail("https://i.imgur.com/NRYF2ma.png")
      .setImage("https://i.imgur.com/Ewfi7jU.gif")
      .setDescription(`
  \`$join\` - **الثبات في قناة صوتية 24/7 ** 
  \`$stop\` - **ايقاف الموسيقي ومغادرة القناة الصوتية**
  \`$volume\` -  **تغيير مستوي صوت الاغنية** 
  \`$help\` - **للحصول علي جميع أوامر البوت** 
  \`$loop\` - **تكرار الاغنية الحالية** 
  \`$jump\` - **تخطي إلى أغنية في قائمة الانتظار** 
  \`$leave\` - **مغادرة القناة الصوتية** 
  \`$nowplaying\` - **معرفة ما هي الأغنية التي يتم تشغيلها حاليا** 
  \`$pause\` - **يوقف الأغنية مؤقتًا** 
  \`$play\` - **قم بتشغيل أغانيك المفضلة** 
  \`$queue\` - **يظهر كل الأغاني المدرجة حاليا في قائمة الانتظار** 
  \`$radio\` - **يقوم بتشغيل اغاني عشوائية** 
  \`$resume\` - **إستئناف الأغنية** 
  \`$skip\` - **تخطي الأغنية الحالية** 
`)
    embed13.channel.send(bot)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Help Giveaway
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (embed17) => {
  if (embed17.content === prefix + "help") {
    const bot = new Discord.MessageEmbed()
      .setColor("#FFEB3B")
      .setThumbnail("https://i.imgur.com/NRYF2ma.png")
      .setImage("https://i.imgur.com/Ewfi7jU.gif")
      .setTitle("Giveaway Commands <a:GIV:950077653371723807>")
      .setDescription("**・Giveaway **\n `$start` [channel-name] [Time] [winners] [Prize] \n `$reroll` [prize name] \n `$end` [prize name] \n <a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570> \n **・Examples** \n `$start` #giveaway 5m 1 Testing \n `$end` Testing \n `$reroll` Testing")
    embed17.channel.send(bot);
  }
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Message Log
////////////////////////////////////////////////////////////////////////////////////
client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[voiceOld.guild.id])
    log[voiceOld.guild.id] = {
      onoff: "Off"
    };
  if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
  var logChannel = voiceOld.guild.channels.cache.find(
    c => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
  );
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.username;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.MessageEmbed()
        .setTitle("**VOICE MUTE**")
        .setThumbnail(
          "https://www.freeiconspng.com/uploads/audio-mute-off-sound-off-icon-7.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** <@${voiceOld.id}> (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }
    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUnmutev = new Discord.MessageEmbed()
        .setTitle("**VOICE UNMUTE**")
        .setThumbnail(
          "https://i.imgur.com/tCn6eT9.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** <@${voiceOld.id}> (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }
    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverDeafv = new Discord.MessageEmbed()
        .setTitle("**VOICE DEAF**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** <@${voiceOld.id}> (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }
    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUndeafv = new Discord.MessageEmbed()
        .setTitle("**VOICE UNDEAF**")
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** <@${voiceOld.id}> (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    if (!log[voiceOld.guild.id])
      log[voiceOld.guild.id] = {
        onoff: "Off"
      };
    if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
    let voiceLeave = new Discord.MessageEmbed()
      .setTitle("**CHANGED VOICE ROOM**")
      .setColor("GREEN")
      .setThumbnail(message)
      .setDescription(
        `**\n**<a:s72:950077654034440252> Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel.id})\n**To:** \`\`${voiceNew.channel.name}\`\` (ID: ${voiceNew.channel.id})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});
client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return;
  if (!log[message.guild.id])
    log[message.guild.id] = {
      onoff: "Off"
    };
  if (log[message.guild.id].onoff === "Off") return;
  var logChannel = message.guild.channels.cache.find(
    c => c.name === `${log[message.guild.id].channel}`
  );
  if (!logChannel) return;
 
  let messageDelete = new Discord.MessageEmbed()
    .setTitle("**MESSAGE DELETE**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .setDescription(
      `**\n**<:drop:950390565642575883> Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL({dynamic: true, format: 'png'}));
 
  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.cache.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;
 
  if (oldMessage.content.startsWith("https://")) return;
 
  let messageUpdate = new Discord.MessageEmbed()
    .setTitle("**MESSAGE EDIT**")
    .setThumbnail(oldMessage.author.avatarURL({dynamic: true}))
    .setColor("BLUE")
    .setDescription(
      `**\n**<:update:950077647818489866> Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL({dynamic: true, format: 'png'}));
 
  logChannel.send(messageUpdate);
});
 
client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.cache.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;
 
  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    let roleCreate = new Discord.MessageEmbed()
      .setTitle("**ROLE CREATE**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**<a:s72:950077654034440252> Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL({dynamic: true, format: 'png'}));
 
    logChannel.send(roleCreate);
  });
});
 
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.cache.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;
 
  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    let roleDelete = new Discord.MessageEmbed()
      .setTitle("**ROLE DELETE**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**<a:s72:950077654034440252> Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL({dynamic: true, format: 'png'}));
 
    logChannel.send(roleDelete);
  });
});
 
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[oldRole.guild.id])
    log[oldRole.guild.id] = {
      onoff: "Off"
    };
  if (log[oldRole.guild.id].onoff === "Off") return;
  var logChannel = oldRole.guild.channels.cache.find(
    c => c.name === `${log[oldRole.guild.id].channel}`
  );
  if (!logChannel) return;
 
  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    if (oldRole.name !== newRole.name) {
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateName = new Discord.MessageEmbed()
        .setTitle("**ROLE NAME UPDATE**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**<:update:950077647818489866> Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL({dynamic: true, format: 'png'}));
 
      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateColor = new Discord.MessageEmbed()
        .setTitle("**ROLE COLOR UPDATE**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**<:update:950077647818489866> Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL({dynamic: true, format: 'png'}));
 
      logChannel.send(roleUpdateColor);
    }
  });
});
 
client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.cache.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;
 
  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }
 
  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    let channelCreate = new Discord.MessageEmbed()
      .setTitle("**CHANNEL CREATE**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**<a:s72:950077654034440252> Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL({dynamic: true, format: 'png'}));
 
    logChannel.send(channelCreate);
  });
});
 
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.cache.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;
 
  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }
 
  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    let channelDelete = new Discord.MessageEmbed()
      .setTitle("**CHANNEL DELETE**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**<a:s72:950077654034440252> Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL({dynamic: true, format: 'png'}));
 
    logChannel.send(channelDelete);
  });
});
 
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  if (!log[oldChannel.guild.id])
    log[oldChannel.guild.id] = {
      onoff: "Off"
    };
  if (log[oldChannel.guild.id].onoff === "Off") return;
  var logChannel = oldChannel.guild.channels.cache.find(
    c => c.name === `${log[oldChannel.guild.id].channel}`
  );
  if (!logChannel) return;
 
  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }
 
  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.MessageEmbed()
        .setTitle("**CHANNEL EDIT**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**<:update:950077647818489866> Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL({dynamic: true, format: 'png'}));
 
      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      if (log[oldChannel.guild.id].onoff === "Off") return;
      let newTopic = new Discord.MessageEmbed()
        .setTitle("**CHANNEL EDIT**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**<:update:950077647818489866> Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
          "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
          "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
          oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL({dynamic: true, format: 'png'}));
 
      logChannel.send(newTopic);
    }
  });
});
 
client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.cache.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;
 
  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    if (userID === client.user.id) return;
 
    let banInfo = new Discord.MessageEmbed()
      .setTitle("**BANNED**")
      .setThumbnail(userAvatar)
      .setColor("DARK_RED")
      .setDescription(
        `**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL({dynamic: true, format: 'png'}));
 
    logChannel.send(banInfo);
  });
});
 
client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.cache.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;
 
  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
    if (userID === client.user.id) return;
 
    let unBanInfo = new Discord.MessageEmbed()
      .setTitle("**UNBANNED**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:airplane_arriving:  Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL({dynamic: true, format: 'png'}));
 
    logChannel.send(unBanInfo);
  });
});
 
client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  var logChannel = oldMember.guild.channels.cache.find(
    c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  if (!logChannel) return;
 
  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
    var userTag = logs.entries.first().executor.tag;
 
    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`اسمه الاصلي`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`اسمه الاصلي`";
      } else {
        var newNM = newMember.nickname;
      }
 
      let updateNickname = new Discord.MessageEmbed()
        .setTitle("**UPDATE MEMBER NICKNAME**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**<a:s72:950077654034440252> Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL({dynamic: true, format: 'png'}));
 
      logChannel.send(updateNickname);
    }
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      let role = newMember.roles.cache
        .filter(r => !oldMember.roles.cache.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[oldMember.guild.id].onoff === "Off") return;
      let roleAdded = new Discord.MessageEmbed()
        .setTitle("**ADDED ROLE TO MEMBER**")
        .setThumbnail(oldMember.guild.iconURL({dynamic: true, format: 'png'}))
        .setColor("GREEN")
        .setDescription(
          `**\n**<a:s72:950077654034440252> Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);
 
      logChannel.send(roleAdded);
    }
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      let role = oldMember.roles.cache
        .filter(r => !newMember.roles.cache.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
      let roleRemoved = new Discord.MessageEmbed()
        .setTitle("**REMOVED ROLE FROM MEMBER**")
        .setThumbnail(oldMember.guild.iconURL({dynamic: true, format: 'png'}))
        .setColor("RED")
        .setDescription(
          `**\n**<a:s72:950077654034440252> Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);
 
      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    if (!log[oldMember.guild.id])
      log[oldMember.guild.id] = {
        onoff: "Off"
      };
    if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
    let newOwner = new Discord.MessageEmbed()
      .setTitle("**UPDATE GUILD OWNER**")
      .setThumbnail(oldMember.guild.iconURL({dynamic: true, format: 'png'}))
      .setColor("GREEN")
      .setDescription(
        `**\n**<a:s72:950077654034440252> Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL({dynamic: true, format: 'png'}));
 
    logChannel.send(newOwner);
  }
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Other Commands
////////////////////////////////////////////////////////////////////////////////////
// AUTO REPLAY
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  var yoyo = [
    "**لو مش حاجه مهمة هنيئا لك <a:shb:930193756114808872> \n <@736038771535118377>**",
    "**اجمد ديفيلوبر شفته في حياتي <a:load:933157681429106828> <a:hypeshiny2:950077636720345208> <a:youssef:944101599310127156> \n  <@736038771535118377>**"
  ]
  if (message.content === "يوسف") {
    if(message.guild.id != '872242482442809476') return;
    var result = yoyo[Math.floor(Math.random() * yoyo.length)];
    message.channel.send(result)
    .catch(console.error);
  }
});

client.on("message", (message) => {
  var yoyo = [
    "**اجمد بوت في الشرق الاوسط  <a:turbo:944101598651633706> <:dev:950077637068472441>**",
    "**قلب تربو من جوااا <a:love2:950077636711956531> <:4936peepolove:880872691219988532>**",
    "**اخووويااااا <a:nar:950077644089720882>**"
  ]
  if (message.content === "تربو") {
    var result = yoyo[Math.floor(Math.random() * yoyo.length)];
    message.lineReply(result)
    .catch(console.error);
    }
});

client.on("message", (message) => {
  var yoyo = [
    "**اجمد بوت في الشرق الاوسط  <a:turbo:944101598651633706> <:dev:950077637068472441>**",
    "**قلب تربو من جوااا <a:love2:950077636711956531> <:4936peepolove:880872691219988532>**",
    "**اخووويااااا <a:nar:950077644089720882>**"
  ]
  if (message.content === "تيربو") {
    var result = yoyo[Math.floor(Math.random() * yoyo.length)];
    message.lineReply(result)
    .catch(console.error);
    }
});
////////////////////////////////////////////////////////////////////////////////////
// Server Rules
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if(message.guild.id != '872242482442809476') return;
  if (message.content === "!serRULE") {
  if(!message.member.hasPermission("ADMINISTRATOR"))
 return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __ADMINISTRATOR__ permission**`);
 message.delete();
    const bot = new Discord.MessageEmbed()
      .setColor("#FFEB3B")
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setTitle("SERVER RULES <a:hypeshiny2:950077636720345208> ")
      .setDescription(
        `**
1 - عدم أثارة المشاكل بالسيرفر او عالخاص

2 - احترم خصوصية الآخرين وعدم احراجهم

3 - مراعاة نظام كل روم و سياسته وقوانينه

4 - ممنوع السبام أو إرسال بكثرة بوقت قصير

5 - ممنوع طلب المال - بطاقات الستور - الألعاب

6 - يمنع دخول السيرفر بالأسماء والصور الغير لائقة

7 - يمنع نشر الروابط مثل السيرفرات , المقاطع , التويتش

8 - احترم جميع الموجودين في السيرفر احترم المشرفين

9 - في حاله وجود مشكله ابلغ الإدارة

10 - في حاله نشر أي سيرفر اخر في الخاص بلغ الإدارة

11 - يمنع استخدام برامج تغير الصوت

12 - ممنوع التكلم عن : السياسة .الدين .القبائل . الهاك

13 - في حاله وجود خلاف او انتهاك للقوانين يرجى إبلاغ احد المشرفين

14 - في حالة تخطي قوانين السيرفر يتم طردك من السيرفر**`
      )
      .setImage("https://probot.media/FCI8yRTiYE.gif")
      .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true }));
      message.channel.send("@everyone",bot)
    .catch(console.error);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Prove Your Self
////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (message.content.startsWith("اثبت")) {
    if(message.guild.id != '872242482442809476') return;
    if(!message.member.hasPermission("ADMINISTRATOR"))
    return message.lineReply(`> <a:grs:922517063774400563> **You Don't have __ADMINISTRATOR__ permission**`);
    message.delete();
    const bot = new Discord.MessageEmbed()
      .setColor("#03A9F4")
      .setThumbnail(message.guild.iconURL({dynamic: true, format: 'png'}))
      .setTitle("**Reaction Role** <a:load:933157681429106828>")
      .setDescription(
        `**<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>

PC | لو انت كمبيوتر مش محتاجه يعني |  :desktop: 

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>

Mobile | لو انت موبايل سهله اهي | :mobile_phone: 

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>

90 Frame | :heart_on_fire:

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
 
60 Frame |  :pirate_flag:  

<a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570><a:line:930859851133890570>
**`
      )
      .setImage("https://i.imgur.com/wYSpQa9.gif");
      message.channel.send("@everyone",bot);
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Line Auto
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if(message.guild.id != '872242482442809476') return;
  if (message.channel.id !== "872242483420094506") return;
  if(message.author.id === client.user.id) return
    const bot = new Discord.MessageEmbed()
      .setColor("#FD1100")
      .setImage(`https://i.imgur.com/GzMoqJh.gif`)
    message.channel.send(bot);

});
client.on("message", message => {
  if(message.guild.id != '872242482442809476') return;
  if (message.channel.id !== "918004475640287262") return;
  if(message.author.id === client.user.id) return
    const bot = new Discord.MessageEmbed()
      .setColor("#FD1100")
      .setImage(`https://i.imgur.com/GzMoqJh.gif`)
    message.channel.send(bot);

});
client.on("message", message => {
  if(message.guild.id != '872242482442809476') return;
  if (message.channel.id !== "872242483420094507") return;
  if(message.author.id === client.user.id) return
  message.channel.send(`https://i.imgur.com/rFeSVEB.gif`)
});
///////////////////////////////////////////////////////////////////////////////
// Reaction Auto
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if(message.guild.id != '872242482442809476') return;
  if(message.channel.id !== "918004475640287262") return;
  if(message.author.id === client.user.id) return
message.react("930187075649679401");
message.react("880872686891450479");
message.react("933077528933990401");
message.react("929797397318623262");
message.react("930187081299423263");
});

client.on("message", message => {
  if(message.guild.id != '872242482442809476') return;
  if (message.channel.id !== "872242483420094506") return;
  if(message.author.id === client.user.id) return
message.react("930187075649679401");
message.react("880872686891450479");
message.react("933077528933990401");
message.react("929797397318623262");
message.react("930187081299423263");
});

client.on("message", message => {
  if(message.guild.id != '872242482442809476') return;
  if (message.channel.id !== "872242483420094507") return;
  if(message.author.id === client.user.id) return
message.react("930187075649679401");
message.react("950921713871355984");
message.react("931289400246145054");
message.react("931289400246145054");
message.react("950921713871355984");
message.react("930187081299423263");
});
////////////////////////////////////////////////////////////////////////////////////
// Verifed Bot
////////////////////////////////////////////////////////////////////////////////////
client.on('message', nibo => {
  if (nibo.content === prefix + "ver") {
    const embed = new Discord.MessageEmbed()
.setColor("#03A9F4")
.setTitle(`**Verified Bot**`)
.setDescription(`لقد دخل بوتك  ${client.guilds.cache.size} سيرفر من 100 \n **Dont Give Up**`)
.setFooter(`${client.user.username}`)
nibo.channel.send(embed);
}});
////////////////////////////////////////////////////////////////////////////////////
// DM MESSAGE
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if (message.channel.type === 'dm') {
    const developer = client.users.cache.find(y => y.id === '736038771535118377')
    if (message.author.bot) return
    if (message.content.length == 0) return
    let embed = new Discord.MessageEmbed()
    .setTitle('**New Message in DM**')
    .setColor("RED")
    .setAuthor(message.author.username , message.author.avatarURL({dynamic: true}))
    .setFooter(client.user.username , client.user.avatarURL({dynamic: true}))
    .setTimestamp()
    .addField(`Message :`, ` \`\`\`\n ${message.content} \`\`\` `)
    developer.send(`**Message By: ${message.author}**\n**ID : ${message.author.id}**`,embed)
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Welcome
////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', async(scooby) =>{
  let membercount = scooby.guild.memberCount;
  if(scooby.guild.id != '872242482442809476') return;
  let channel = scooby.guild.channels.cache.get('872242482753183803');
  if (!channel) return;
  let embed = new Discord.MessageEmbed()
  .setColor("#FFFF00")
  .setImage("https://i.imgur.com/LKvlDpb.gif")
  channel.send(`
<a:tag:929797450061987880>︱𝗛𝗲𝘆 ! 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗧𝗼 𝗢𝘂𝗿 𝗦𝗲𝗿𝘃𝗲𝗿 **${scooby.guild.name}** <a:fire:929797397318623262>  

<a:tag:929797450061987880>︱𝗪𝗲𝗹𝗰𝗼𝗺𝗲 <a:shm2:930795173351407676> **<@!${scooby.id}>** <a:prv:932029032629956618>

<a:tag:929797450061987880>︱𝗣𝗹𝗲𝗮𝘀𝗲 𝗥𝗲𝗮𝗱 𝗧𝗵𝗲 𝗥𝘂𝗹𝗲𝘀 𝗔𝘁 <a:shm2:930795173351407676> <#872242483021623387> <a:grs:922517063774400563>

<a:tag:929797450061987880>︱𝗪𝗲 𝗛𝗼𝗽𝗲 𝗬𝗼𝘂 𝗪𝗶𝗹𝗹 𝗘𝗻𝗷𝗼𝘆 𝗬𝗼𝘂𝗿 𝗦𝘁𝗮𝘆 𝗪𝗶𝘁𝗵 𝗨𝗦 <a:love:880872686891450479>

<a:tag:929797450061987880>︱𝐘𝐨𝐮𝐫 𝐌𝐞𝐦𝐛𝐞𝐫 𝐍𝐮𝐦𝐛𝐞𝐫 **${membercount}**`, embed);
});
////////////////////////////////////////////////////////////////////////////////////
// Bye
////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberRemove', (member) => {
  if(member.guild.id != '872242482442809476') return;
  let guild = client.guilds.cache.get("872242482442809476");
  let asar1 = client.channels.cache.find(ch => ch.id === '872242483235524681')
  let embed = new Discord.MessageEmbed()
  .setColor("#FFFF00")
  .setTitle("KICKED !")
  .setThumbnail(member.guild.iconURL({ format: 'png', dynamic: true }))
  .setDescription(`** لقد خرج ${member} من السيرفر  :airplane: **`)
  .setFooter(member.guild.name, member.guild.iconURL({ format: 'png', dynamic: true }))
  .setTimestamp()
     asar1.send(embed)
     
});
////////////////////////////////////////////////////////////////////////////////////
// Bot Online
////////////////////////////////////////////////////////////////////////////////////
client.on('ready', () => {
  setInterval(function() {
  let asar1 = client.channels.cache.find(ch => ch.id === '939794527433158770')
     if(client){
const client = new Client();
  let embed = new Discord.MessageEmbed()
  .setColor("#FFFF00")
  .setDescription(`**BOT ONLINE 🟢**`)
     asar1.send(embed)
     }
    }, 120000)

});
////////////////////////////////////////////////////////////////////////////////////
// Logo
////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
  if(message.guild.id != '872242482442809476') return;
  let command = message.content.split(" ")[0];
  if (command == "لوجو") {
        message.channel.send("https://i.imgur.com/BWDjteD.png");
    
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Exit & Enter Guild
////////////////////////////////////////////////////////////////////////////////////
client.on("guildCreate", guild => {
  let guildOwner = guild.members.cache.get(guild.ownerID)
  const developer = client.users.cache.find(y => y.id === '927726627142660221')
  let embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(guild.iconURL({ dynamic: true, format: 'png' }))
    .setTitle(`Server Name : ${guild.name}
Owner Name : ${guildOwner.user.tag}
Members : ${guild.memberCount}
Servers : ${client.guilds.cache.size}`)
    .setTimestamp()
    .setFooter(guildOwner.user.tag,guildOwner.user.avatarURL({dynamic: true}))
    developer.send(embed);
  });
client.on("guildDelete", guild => {
  let guildOwner = guild.members.cache.get(guild.ownerID)
  const developer = client.users.cache.find(y => y.id === '927726627142660222')
  let embed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setThumbnail(guild.iconURL({ dynamic: true, format: 'png' }))
    .setTitle(`Server Name : ${guild.name}
Owner Name : ${guildOwner.user.tag}
Servers : ${client.guilds.cache.size}`)
    .setTimestamp()
    .setFooter(guildOwner.user.username,guildOwner.user.avatarURL({dynamic: true}))
      developer.send(embed);
});
////////////////////////////////////////////////////////////////////////////////////
// Auto Role
////////////////////////////////////////////////////////////////////////////////////
let role = "872242482442809480"
client.on("message" , (member) => {
  if(member.guild.id != '872242482442809476') return;
if (member.guild.addMember)
member.guild.roles.add(role)
});
////////////////////////////////////////////////////////////////////////////////////
// Broadcast Auto 
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message =>{
  if(message.content.startsWith("")) {
  if(message.author.bot) return; 
  const args = message.content.split(" ").slice(" ").join(" ")
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.delete();
  if(message.channel.id !== "951245615470346280" ) return;
  let c = 0;      message.guild.members.cache.some(member => {if (!member.user.bot) member.send(`${args}\n${member}`).then(c++).catch(err => console.log(''))});
  message.delete()
  const embed = new Discord.MessageEmbed()
  .setTitle("**Done Send Brodcast** <a:s72:950077654034440252>")
  .setColor("RED")
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .addField("**Message**", `\`\`\`${args}\`\`\``, true)
  .addField("**To**", `\`\`\`${c}\`\`\``, true)
  .setTimestamp()
  message.channel.send(embed).then(m =>{
  m.delete(8000)
  })
  }
  });
////////////////////////////////////////////////////////////////////////////////////
// suggestions auto
////////////////////////////////////////////////////////////////////////////////////
client.on("message", message =>{
  if(message.content.startsWith("")) {
  if(message.author.bot) return; 
  if(message.channel.id !== "927726626794524749" ) return;
  const args = message.content.split(" ").slice(" ").join(" ")
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setTitle("**New suggestion** <a:fire2:950921713871355984>")
  .setColor("BLUE")
  .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .setDescription(`\`\`\`${args}\`\`\``)
  .setFooter(`Thank you for your suggestion ♥`)
  .setImage("https://i.imgur.com/WBUnVzp.gif")
  .setTimestamp()
  message.channel.send(embed)
  }
  });
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
client.login("OTI1ODQ5ODgyNjM0MzYyOTUw.YczG5Q.FGLfbj34WeEEsbHMtwW4ecBVMYg");