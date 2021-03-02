module.exports.run = async (client, message, args) => {
    if (message.author.id !== client.config.owner) {
        return message.reply('You do not have permissions to use this command!');
    }

    const code = args

    try{
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);

        const MAX_CHARS = 3 + 2 +clean.length + 3;
        if(MAX_CHARS > 2000) {
            return message.channel.send(
                `Output exceeded 2000 characters. Exported to the attached file`, {
                    files: [{
                        attachment: Buffer.from(clean),
                        name: `output.txt`
                    }]
                }
            );
        }
        return message.channel.send(clean, {code: `js`});
    } catch (err) {
        await message.channel.send(await client.clean(client, err), {code: `bash`});
    }
};

module.exports.help = {
    name: 'eval'
};