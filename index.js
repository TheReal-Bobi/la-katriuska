const fs = require('fs');
const Discord = require ('discord.js')
const client =  new Discord.Client();
const member = new Discord.Client();
const db = require('megadb');

const servidores = new db.crearDB(`servidores`);
const config = require("./config.json");

let prefix = config.prefix;

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'https://PartialJoyfulIrc.rodrigofernnde1.repl.co',
    title: 'Nombre',
    interval: 30 // minutes
});
 
monitor.on('up', (res) => console.log(`${res.website} está encedido.`));  
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));




client.on('ready', () => {
client.user.setPresence({status: "online",
activity: {
type: "LISTENING", 
name: "k!help"
}
})
});


let emptyinfo = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setDescription("¡No has puesto nada!")


let unknowncommand = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setDescription("¡Este comando no existe!")
    
let voteembed = new Discord.MessageEmbed()
  .setTitle("Para votarme, haz click aquí")
  .setColor(0x0AE86)
  .setURL("https://bit.ly/3cT840P")
  .setDescription("Si no funciona el link del título, pon esta dirección en tu barra de busqueda: https://bit.ly/3cT840P")


client.on('message', async (message) => {
 if(message.author.bot) return;
 if (!message.content.startsWith(prefix)) return;
const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();

  if(command === 'help'){
    const embedDatos = new Discord.MessageEmbed() 
    .setTitle("Ayuda de La Katriuska")
    .setColor(0x00AE86)
    .setDescription("Con este embed, puedes saber que puede hacer Useful Pou")
    .setFooter("Editor, foto fachera porfa · u <",client.user.avatarURL())
    .addField("Banear", "Banea a un usuario (k!ban {usuario} )")
    .addField("Expulsar", "Expulsa a un usuario (k!kick)",  true)
    .addField("Avatar", "Mira con mayor detalle el avatar de alguien (k!avatar / k!avatar [usuario])")
    .addField("España", "Viva españa (k!spain)", true)
    .addField("Donald Trump", "Donald Trump escribe en su Twitter lo-que-quieras (k!trump [texto])")
    .addField("Memes", "Te pongo unos memes (k!memes)")
    .addField("Perros", "Te pongo la foto de un perro (k!dogs)")
    .addField("Votar", "¡Ah, que quieres votarme en top.gg! (k!vote)")
  message.reply({ embed: embedDatos });
  }

if(command === 'avatar'){

if(message.author.bot)return message.reply('No acepto mensajes de bots');
let miembro = message.mentions.users.first() 
if (!miembro) { 
const embed = new Discord.MessageEmbed()
    .setImage(`${message.author.displayAvatarURL({dynamic: true, size : 1024 })}`)
    .setColor(0x66b3ff)
    .setTitle(`Este es tu avatar, ${message.author.tag}`);
    
message.reply(embed);

} else {
const embed = new Discord.MessageEmbed()
    .setImage(`${miembro.displayAvatarURL({dynamic: true, size : 1024 })}`)
    .setColor(0x66b3ff)
    .setTitle(`Este es el avatar de ${miembro.tag}`)    

message.reply(embed);

}
}

if(command === 'vote'){
 message.channel.send({embed : voteembed})
}

  if(command === 'ban'){
    
        let user = message.mentions.users.first();
      
        if (message.mentions.users.size < 1) return message.reply({embed: emptyinfo}).catch(console.error);
        if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
       const db = new Database()
        
    
        message.guild.member(user).ban;
        message.reply(`**Se ha baneado a ${user.username}con éxito.**`);
    
  }

  
   if(command === 'kick'){
    
        let user = message.mentions.users.first();
      
        if (message.mentions.users.size < 1) return message.reply({embed: emptyinfo}).catch(console.error);
        if (!message.guild.member(user).kickable) return message.reply('No puedo expulsar al usuario mencionado.');
        
    
        message.guild.member(user).kick;
        message.reply(`**Se ha expulsado a ${user.username}con éxito.**`);
    
  }

  if(command === 'spain'){
    message.reply('https://bit.ly/3cb3U4n');
  }

  if(command === 'delete'){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('¡No puedes usar este comando!')

    let del = args[0];

    if(!del) return message.reply({embed: emptyinfo})

  

    message.delete();
    message.channel.bulkDelete(del);

    if(del = 1) return message.reply('Se ha borrado un mensaje');

    
    message.reply(`Se han borrado ${del} mensajes.`);
    
    delay(2000);

    message
  
  }



  


});


client.on('message', async (message) => {
 if(message.author.bot) return;
 if (!message.content.startsWith(prefix)) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);

const command = args.shift().toLowerCase();

if(command === 'trump'){
  message.delete()
        let mensaje = args.join('%20')

        if(!mensaje) return message.channel.send(' Debes de colocar un mensaje para que trump lo diga!').then(m => m.delete({timeout: 7000}))
        let api = `https://api.no-api-key.com/api/v2/trump?message=${mensaje}`


        const TrumpDijo = new Discord.MessageEmbed() 
        .setImage(api)
        .setColor('RANDOM')

        message.reply(TrumpDijo)

}



});

client.on('message', message =>{
  var memes = ["https://bit.ly/3bAtMaN","https://bit.ly/3t3Y1ww", "https://bit.ly/3by3VQu", "https://bit.ly/3l1zm90", "https://bit.ly/38tdC0N", "https://bit.ly/3rzCvPL", "https://bit.ly/2PSZVSr", "https://bit.ly/38NKn94", "https://bit.ly/30SOmNe", "https://bit.ly/3lowOC9"]
  var random = Math.floor(Math.random()*(memes.length))

 if(message.content.startsWith("k!memes")){
   message.channel.send(memes[random]);
 }
 
})

client.on("message", message =>{
  var dogs = ["https://bit.ly/38Vk8hc", "https://bit.ly/38S3tuF", "https://bit.ly/3vEZwDF", "https://bit.ly/3r6Pec1", "https://bit.ly/3vFgoKa", "https://bit.ly/3rXx79q", "https://bit.ly/317ww9D", "https://bit.ly/3qXD84S", "https://bit.ly/3vFivxC", "https://bit.ly/3bWQxWs", "https://bit.ly/2NrPBjm", "https://bit.ly/3tAOXiO", "https://bit.ly/30W3HMZ", "https://bit.ly/3eR4irJ", "https://bit.ly/30XDLAw", "https://bit.ly/30W70Ea", "https://bit.ly/3eQOiFX", "https://bit.ly/3vAVtbp", "https://bit.ly/3tB1a79", "https://bit.ly/2P883Ok"]

  var random = Math.floor(Math.random()*dogs.length)

  if(message.content.startsWith("k!dogs")){
    message.channel.send(dogs[random]);
  }
})




client.login(config.token)
