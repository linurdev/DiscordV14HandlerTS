import { ContextMenuCommandBuilder, ApplicationCommandType, MessageContextMenuCommandInteraction } from 'discord.js';
import { uwuifyText } from '../../functions/text';
import { errMessage } from '../../../config.json';

export const command = {
    data: new ContextMenuCommandBuilder()
        .setName('UwUify Message')
        .setType(ApplicationCommandType.Message),
    cooldown: 180,
    async execute(interaction: MessageContextMenuCommandInteraction) {
        await interaction.deferReply();

        try {
            const messageText = interaction.targetMessage.content;
            const uwuText = uwuifyText(messageText);
            await interaction.editReply(uwuText);
        } catch (error) {
            console.error('Error in UwUify Message context command:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};