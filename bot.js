const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "!"

bot.on("ready", function() {
    console.log(`${bot.user.username} is online!`);
});

client.login(process.env.NDI1MzkwODU1MTg1MTA0ODk3.DZG02g.kVphaSU2ekH-lr5G1rtq7L-ada8);

bot.on("guildMemberAdd", function(member) {
    let welcomeChannel = member.guild.channels.find("name", "welcome");
    let otherChannel = member.guild.channels.find("name", "management-logs");

    welcomeChannel.send(member.toString() + ", Welcome to the Weazel News App! If you are here as a guest, please type in !guest. If you are here for an interview, please type in !interview. Thank you!");
    otherChannel.send(member.toString() + " has joined the Weazel News discord server.");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    let logsChannel = message.guild.channels.find(`name`, "management-logs");

    switch (args[0].toLowerCase()) {
          case "guest":
              let gMember = message.guild.member(message.author.id);
              let gRole = message.guild.roles.find(`name`, `Guest`);

              gMember.addRole(gRole.id);

              message.delete();
              let guestEmbed = new Discord.RichEmbed()
                .setTitle("Weazel News Welcomes You!")
                .setDescription(`**Welcome to Weazel News!**\n\nPlease set your nickname to your in-character name by using !nick in #guests.\n\n**Thank you,**\n***Weazel News Representative***`)
                .setColor(0xa93eff)
                .setThumbnail("https://i.imgur.com/PuU7Bdm.png?1")
                .setFooter("Weazel News", "https://i.imgur.com/6auXW1B.png")

              try{
                message.author.send(guestEmbed)
                message.channel.send("An email has been sent to you! (Check your PMs).").then(msg => msg.delete(5000));
              }catch(e){
                message.reply("Your email address (private messages) are locked, therefore I cannot send you the nessecary email. Please unlock your PMs.");
              }
              break;
          case "clear":
              if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**ERROR:** You must be a management rank in Weazel News to use this command!");
              if(!args[0]) return message.channel.send("**ERROR:** You must provide an amount of messages to clear!")
              message.channel.bulkDelete(args[1]).then(() => {
                message.channel.send(`*Cleared ${args[1]} messages.*`).then(msg => msg.delete(5000));
              });
              break;
          case "nick":
              let nickName = args.slice(1).join(" ");
              message.delete();
              message.member.setNickname(nickName);

              message.channel.send(`Your nickname has been changed to ${nickName}!`);
              break;
          case "interview":
              let iMember = message.guild.member(message.author);
              let iRole = message.guild.roles.find(`name`, `Interviewee`);
              iMember.addRole(iRole.id);
              message.delete();
              let interviewEmbed = new Discord.RichEmbed()
                .setTitle("Weazel News Management")
                .setDescription(`**Dear ${iMember},**\n\nThank you for joining the Weazel News Social App. We see you are here for a job interview, and are happy to have you! Please contact one of our managers whenever you can and let them know you are available for an interview. Please also change your nickname to your IC name.\n\n**Thank you,**\n***Weazel News Representative***`)
                .setColor(0xa93eff)
                .setThumbnail("https://i.imgur.com/PuU7Bdm.png?1")
                .setFooter("Weazel News", "https://i.imgur.com/6auXW1B.png")

                try{
                  message.author.send(interviewEmbed)
                  logsChannel.send(interviewEmbed)
                  message.channel.send("An email has been sent to you! (Check your PMs).").then(msg => msg.delete(5000));
                }catch(e){
                  message.reply("Your email address (private messages) are locked, therefore I cannot send you the nessecary email. Please unlock your PMs.");
                }
                break;
            case "hire":
                if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("**ERROR:** You must be a manager of Weazel News for this command.");
                let hMember = message.guild.member(message.mentions.users.first());
                let hhMember = message.guild.member(message.mentions.users.first()).displayName;
                let hRole = message.guild.roles.find(`name`, `Intern`)
                hMember.addRole(hRole.id)
                message.delete();
                let hireEmbed = new Discord.RichEmbed()
                  .setTitle("Weazel News Management")
                  .setDescription(`**Congratulations ${hhMember},**\n\nYou have been accepted into the Weazel News team as an **Intern.** Please read #faq-help and #announcements. If you have any questions, feel free to ask!\n\n**Kind Regards,**\n***Weazel News Representative***`)
                  .setColor(0xa93eff)
                  .setThumbnail("https://i.imgur.com/PuU7Bdm.png?1")
                  .setFooter("Weazel News", "https://i.imgur.com/6auXW1B.png")

                try{
                  hMember.send(hireEmbed)
                  logsChannel.send(hireEmbed)
                  message.channel.send("An email was sent to the new employee.").then(msg => msg.delete(5000));
                }catch(e){
                  message.reply("Their PM's are locked. Send them the hire email maunally.");
                }
                break;
            case "fire":
                if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("**ERROR:** You must be a manager of Weazel News for this command.");
                let fMember = message.guild.member(message.mentions.users.first());
                let ffMember = message.guild.member(message.mentions.users.first()).displayName;
                message.delete();
                let fireEmbed = new Discord.RichEmbed()
                  .setTitle("Weazel News Management")
                  .setDescription(`**Dear ${ffMember},**\n\nYour employment with Weazel News has been **terminated.** This can be for many reasons. If you have any questions as to of why your employment has been terminated, feel free to contact a manager at Weazel News.\n\n**Kind Regards,**\n***Weazel News Representative***`)
                  .setColor(0xa93eff)
                  .setThumbnail("https://i.imgur.com/PuU7Bdm.png?1")
                  .setFooter("Weazel News", "https://i.imgur.com/6auXW1B.png")

                try{
                  fMember.send(fireEmbed);
                  setTimeout(() => {
                    message.guild.member(fMember).kick()
                  }, 1000);
                }catch(e){
                  message.reply("Their PM's are locked, please let them know they were fired manually.");
                }
                logsChannel.send(fireEmbed)
                message.channel.send("An email was sent to the ex-employee.").then(msg => msg.delete(5000));
                break;
            case "loa":
                let loaMember = message.guild.member(message.author);
                let wRank = args[1]
                let wLoa1 = args[2]
                let wLoa2 = args[3]
                let wReason = args.slice(4).join(" ");
                let loaChannel = message.guild.channels.find(`name`, `leave-of-absence`)
                message.delete();
                let loaEmbed = new Discord.RichEmbed()
                  .setTitle("Weazel News Leave of Absence Form")
                  .addField("Name", message.member.displayName)
                  .addField("Rank", wRank)
                  .addField("Date of LOA", wLoa1)
                  .addField("Date of Return", wLoa2)
                  .addField("Reason", wReason)
                  .addField("Signature", message.member.displayName)
                  .setColor(0xa93eff)
                  .setThumbnail("https://i.imgur.com/PuU7Bdm.png?1")
                  .setFooter("Weazel News", "https://i.imgur.com/6auXW1B.png")

                try{
                  loaMember.send(loaEmbed);
                  logsChannel.send(loaEmbed)
                  loaChannel.send(loaEmbed)
                  message.channel.send("Your leave of absence has been logged and we've sent you a copy of the form. Thank you!").then(msg => msg.delete(5000));
                }catch(e){
                  message.reply("Your PM's are locked, therefore I cannot send you your own copy of the LOA.")
                }
                break;
                case "loa2":
                    let loafirstName = args[1]
                    let loalastName = args[2]
                    let wwRank = args[3]
                    let wwLoa1 = args[4]
                    let wwLoa2 = args[5]
                    let wwReason = args.slice(6).join(" ");
                    let loaaChannel = message.guild.channels.find(`name`, `leave-of-absence`)
                    message.delete();
                    let loaaEmbed = new Discord.RichEmbed()
                      .setTitle("Weazel News Leave of Absence Form")
                      .addField("Name", `${loafirstName} ${loalastName}`)
                      .addField("Rank", wwRank)
                      .addField("Date of LOA", wwLoa1)
                      .addField("Date of Return", wwLoa2)
                      .addField("Reason", wwReason)
                      .addField("Signature", `${loafirstName} ${loalastName}`)
                      .setColor(0xa93eff)
                      .setThumbnail("https://i.imgur.com/PuU7Bdm.png?1")
                      .setFooter("Weazel News", "https://i.imgur.com/6auXW1B.png")

                      loaaChannel.send(loaaEmbed);
                    break;
        }
    });

bot.login('NDI1MzkwODU1MTg1MTA0ODk3.DZG02g.kVphaSU2ekH-lr5G1rtq7L-ada8');
