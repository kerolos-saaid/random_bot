import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { GenerativeModel } from "@google/generative-ai";
import { authenticate } from "@google-cloud/local-auth";
import commands from "./commands/commands.js";
import dotenv from "dotenv";
import OpenAI from "openai";
import keep_alive from "./keep_alive.js";
dotenv.config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const APPLICATION_ID = process.env.APPLICATION_ID;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const rest = new REST().setToken(TOKEN);

/*const model = new GenerativeModel({
  apiKey: process.env.GEMINI_API_KEY,
  credential: await authenticate(), // Authenticate locally
  modelId: 'gemini-pro-t5-3b',
});*/

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "random_choice") {
    try {
      const choices = interaction.options.getString("choices");
      const separatedChoicesArray = choices.split(",");
      const choosenChoice =
        separatedChoicesArray[
          Math.floor(Math.random() * separatedChoicesArray.length)
        ];
      await interaction.reply(`${choosenChoice} sounds like a good choice!`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === "yes_or_no") {
    await interaction.reply(`${Math.random() < 0.5 ? "Yes" : "No"}`);
  }
  if (interaction.commandName === "random") {
    try {
      const fromOption = interaction.options.getInteger("from");
      const toOption = interaction.options.getInteger("to");

      if (!fromOption || !toOption) {
        return interaction.reply({
          content: 'Please provide both "from:" and "to:" values.',
          ephemeral: true,
        });
      }

      if (fromOption >= toOption) {
        return interaction.reply({
          content: '"from:" value must be less than "to:" value.',
          ephemeral: true,
        });
      }

      const randomNumber = Math.floor(
        Math.random() * (toOption - fromOption + 1) + fromOption,
      );

      const embed = new MessageEmbed()
        .setTitle("Random Number")
        .setDescription(
          `Between **${fromOption}** and **${toOption}**: **${randomNumber}**`,
        );

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === "askgpt") {
    await interaction.reply({
      content: "Under Construction",
      ephemeral: true,
    });
  }
});
client.on("ready", () => {
  client.application.commands.set(commands);
  console.log(`Logged in as ${client.user.tag}!`);
});
client.login(TOKEN);
