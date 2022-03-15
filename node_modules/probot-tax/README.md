# Welcome To Probot Tax Package
in this package i show you how to create probot tax command

# Installation
`npm i probot-tax --save`

# How To Use

For Example in discord.js
```
const probot = require("probot-tax");
client.on("message", message => {
    if(message.content.startsWith(prefix + 'tax')) {
        message.channel.send(probot.taxs(10))
    }
})
```

