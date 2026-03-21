import { ChatInputCommandInteraction, SlashCommandBuilder, ContextMenuCommandInteraction, ContextMenuCommandBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder | ContextMenuCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) => Promise<void>;
  cooldown?: number; // Cooldown in seconds (optional)
}
