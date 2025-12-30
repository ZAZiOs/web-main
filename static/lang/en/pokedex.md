## Telegram Pokédex Bot

---

[{github} Source code](https://github.com/ZAZiOs/pokedex-tg-bot) &nbsp;&nbsp; [{telegram} Pokédex bot](https://t.me/pkedexbot)

---

I developed the Telegram bot [Pokédex](https://t.me/pkedexbot), which allows quickly retrieving information about any Pokémon via **Telegram's inline mode**. The bot uses the open [**PokéAPI**](http://pokeapi.co/) and provides a convenient output format with the Pokémon's key characteristics.

### Bot Functionality

The bot works through inline queries:
simply enter a Pokémon's name or its Pokédex number—and the bot will return a detailed card.

The card includes:

* name and Pokédex number;
* official short Pokédex entry;
* types and weaknesses;
* height, weight, and category;
* abilities, including the hidden ability;
* a neatly formatted structure with emoji markers.

**Example result:**

[<img src="/mdcontent/pokedex.png" alt="Pokedex example">](/mdcontent/pokedex.png)

### Technical Implementation

When creating the bot, I used:

- Telegraf.js
- PokéAPI