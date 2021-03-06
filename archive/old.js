const Discord = require('discord.js')
const config = require('./config.json')

// Create an instance of a Discord client
const client = new Discord.Client()

/**
 * When the bot is ready It will log.
 **/
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} I am ready!`)
})

const whitelist = ['put', 'our', 'ids', 'here']

function listen (message) {
  if (!whitelist.includes(message.author.id)) return
  const args = message.content.split(' ')
  args.shift()
  const cmd = args[0]
  args.shift()
  if (message.content.startsWith('$pjs')) {
    console.log(`${message.author.tag} said: ${message.content}`)
    if (cmd === 'example') {
      const example = args[0]
      if (!config.example[example]) {
        message.channel.send('The requested example was not found.')
        return
      }
      const exEmbed = new Discord.MessageEmbed(config.example[example])
      if (exEmbed) message.channel.send(exEmbed)
    } else if (cmd === 'codeFont') {
      message.channel.send(new Discord.MessageEmbed(config.code))
    } else if (cmd === 'purge') {
      if (!args[0]) return message.channel.send('wrong args')
      message.channel.bulkDelete(args[0])
      message.channel.send('Deleated ' + args[0] + ' messages')
    } else if (cmd === 'avatar') {
      if (args.length > 0) {
        client.users.fetch(args[0]).then((user) => {
          message.channel.send(user.displayAvatarURL())
        })
      } else {
        message.channel.send(message.author.displayAvatarURL())
      }
    }
  }
}

client.on('message', (message) => listen(message))

// Log our bot in using the token from https://discord.com/developers/application
client.login('')
