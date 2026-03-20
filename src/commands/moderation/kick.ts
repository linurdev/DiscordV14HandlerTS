import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, GuildMember } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick someone')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to kick')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason to kick'))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason') || 'no reason specified';  // Get the reason for the kick

        if (!member || !(member instanceof GuildMember)) return;

        try {
			// Kick the member
            await member.kick(reason);
            await interaction.editReply(`**${member.user.tag}** has been kicked.`);
        } catch (error) {
            console.error('Error occurred while kicking a member:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};