const Discord = require("discord.js");

module.exports = {
	name: 'pp',
	description: 'You get the avatar of the user.',
	aliases: ['avatar'],
	usage: 'pp @User',
    cooldown: 500,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client, db) {
        
        let member = message.mentions.members.first()
        let embed = new Discord.MessageEmbed()

        if(member){
            embed.setTitle(member.user.username+"'s avatar").setImage(`${member.user.displayAvatarURL()}`)
        }else{
            embed.setTitle(":x: Error, This user not found!")
        }
        message.channel.send({embeds: [embed]})
	},
};