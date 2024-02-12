import { SlashCommandBuilder } from "discord.js";

const random_choice = new SlashCommandBuilder()
  .setName('random_choice')
  .setDescription('Enter your choices separated by commas, like this: choice1, choice2, choice3...')
  .addStringOption(option =>
    option.setName('choices')
      .setDescription('Enter your choices separated by commas.')
      .setRequired(true)
  );

const from_to_random_number = new SlashCommandBuilder()
  .setName('random')
  .setDescription('Generates a random number between two values.')
  .addIntegerOption(option =>
    option.setName('from')
      .setDescription('The lower bound (inclusive).')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName('to')
      .setDescription('The upper bound (inclusive).')
      .setRequired(true)
  );

const yes_or_no = new SlashCommandBuilder()
  .setName('yes_or_no')
  .setDescription('Get a yes or no answer.');

const askgpt = new SlashCommandBuilder()
  .setName('askgpt')
  .setDescription('Ask GPT-3.5 Turbo a question.')
  .addStringOption(option =>
    option.setName('question')
      .setDescription('Ask GPT-3.5 Turbo a question.')
      .setRequired(true)
  );

export default [random_choice, from_to_random_number, askgpt,];