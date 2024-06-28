const client = require('../index')
const { showDiscountMenu, showBasePriceModal, editBasePrice, editBaseDiscount, caculatePrimeForUser, payPrimeForUser } = require('../controllers/adminMenuController')
const { CommandInteractionOptionTypes } = require('discord.js')
const { Clear, isMemberHasAdminPrivilge, isMemberIsEmployee } = require('../controllers/utils')
const { setMenu } = require('../controllers/setMenuController')
const { sendAdminMenuEmbed } = require('../controllers/embedController')
const { showDuoMenu, calculateDuoPrice, calculatePremiumPrice, showPremiumMenu, cancelSale, showCustomOrderMenu, customOrderHandler, registerBillForUser, showUserInfo, showTop } = require('../controllers/billsController')
const calculatePrime = require('../SlashCommands/calculatePrime')

client.on('interactionCreate', async (interaction) => {
  // Slash Command Handling

  console.log("Interaction detected");

  /* Modal Handling */
  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case 'basePriceMenuModal':
        editBasePrice(interaction);
        break;
      case 'baseDiscountMenuModal':
        editBaseDiscount(interaction);
        break;
      case 'duoMenuModal':
        calculateDuoPrice(interaction);
        break;
      case 'premiumMenuModal':
        calculatePremiumPrice(interaction);
        break;
      case 'customOrderMenuModal':
        customOrderHandler(interaction);
        break;
      default:
        console.log("Commande inconnue");
        break;
    }
  }
  /* Button Handling */
  if (interaction.isButton()) {
    //await interaction.deferReply({ ephemeral: false }).catch(() => { });
    switch (interaction.customId) {
      case 'duo':
        if (!isMemberIsEmployee(interaction.member)) return await interaction.reply({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        showDuoMenu(interaction);
        break;
      case 'duo_prenium':
        if (!isMemberIsEmployee(interaction.member)) return await interaction.reply({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        showPremiumMenu(interaction);
        break;
      case 'costum_order':
        if (!isMemberIsEmployee(interaction.member)) return await interaction.reply({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        showCustomOrderMenu(interaction);
        break;
      case 'base_price':
        if (!isMemberHasAdminPrivilge(interaction.member)) return await interaction.reply({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        await showBasePriceModal(interaction);
        break;
      case 'base_discount':
        if (!isMemberHasAdminPrivilge(interaction.member)) return await interaction.reply({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        await showDiscountMenu(interaction);
        break;
      case 'cancel_sale':
        cancelSale(interaction);
        break;
      default:
        console.log("Commande inconnue");

        break;
    }
  }

  /* Command Handling */
  if (interaction.isCommand()) {
    console.log("Interaction is a command");
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    switch (cmd.data.name) {
      case 'setmenu':
        await interaction.deferReply({ ephemeral: true }).catch(() => { });
        isMemberHasAdminPrivilge(interaction.member) ? await setMenu(interaction) : await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        break;
      case 'adminmenu':
        if (isMemberHasAdminPrivilge(interaction.member)) {
          await sendAdminMenuEmbed(interaction);
          await interaction.followUp({ content: "Generation du menu en cours...", ephemeral: true });
        } else {
          await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        }
        break;
      case 'calculateprime':
        if (!isMemberIsEmployee(interaction.member)) return await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        caculatePrimeForUser(interaction);
        break;
      case 'payprime':
        if (!isMemberHasAdminPrivilge(interaction.member)) return await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        payPrimeForUser(interaction);
        break;
      case 'clear':
        isMemberHasAdminPrivilge(interaction.member) ? await Clear(interaction) && await interaction.followUp({ content: "Supression des messages en cours", ephemeral: true }) : await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        break;
      case 'registerbill':
        isMemberHasAdminPrivilge(interaction.member) ? await registerBillForUser(interaction) : await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        break;
      case 'getuser':
        isMemberIsEmployee(interaction.member) ? await showUserInfo(interaction) : await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        break;
      case 'top':
        isMemberIsEmployee(interaction.member) ? await showTop(interaction) : await interaction.followUp({ content: "Vous n'avez pas les droits pour effectuer cette commande.", ephemeral: true });
        break;
      default:
        console.log("Commande inconnue");
        await interaction.reply({ content: "Commande inconnue.", ephemeral: true });
        break;
    }

  }
});
