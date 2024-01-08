module.exports =  {
    name: 'Ping',
    description: 'Responde con el ping del bot',
    callback: async (client: any, interaction: any) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Ping ${ping}ms`)
    }
}