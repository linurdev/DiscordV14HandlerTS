import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('reverse')
        .setDescription('Reverses the text you type.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to reverse')
                .setRequired(true)
        ),
    cooldown: 60,
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        try {
            const text = interaction.options.getString('text', true);
            const reversed = text.split('').reverse().join('');
            await interaction.editReply(reversed);
        } catch (error) {
            console.error('Error in reverse command:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};