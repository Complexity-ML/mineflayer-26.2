# Mineflayer 26.2

This is the complete API and usage documentation for the independent
[Complexity-ML Mineflayer 26.2](https://github.com/Complexity-ML/mineflayer-26.2)
distribution. It is based on the upstream
[PrismarineJS Mineflayer](https://github.com/PrismarineJS/mineflayer)
project and preserves its documentation and contributor attribution.

Minecraft Java 26.2 compatibility is maintained together with the dedicated
protocol, data, chunk, and physics repositories under the Complexity-ML
organization.

[![Official Discord](https://img.shields.io/static/v1.svg?label=OFFICIAL&message=DISCORD&color=blue&logo=discord&style=for-the-badge)](https://discord.gg/GsEFRM8)

| <sub>EN</sub> [English](README.md) | <sub>RU</sub> [русский](ru/README_RU.md) | <sub>ES</sub> [Español](es/README_ES.md) | <sub>FR</sub> [Français](fr/README_FR.md) | <sub>TR</sub> [Türkçe](tr/README_TR.md) | <sub>ZH</sub> [中文](zh/README_ZH_CN.md) | <sub>BR</sub> [Português](br/README_BR.md) |
|-------------------------|----------------------------|----------------------------|----------------------------|----------------------------|-------------------------|--------------------|

Create Minecraft bots with a powerful, stable, and high-level JavaScript
[API](api.md), also usable from Python.

First time using Node.js? You may want to start with the [tutorial](tutorial.md). Know Python? Checkout some [Python examples](https://github.com/PrismarineJS/mineflayer/tree/master/examples/python) and try out [Mineflayer on Google Colab](https://colab.research.google.com/github/PrismarineJS/mineflayer/blob/master/docs/mineflayer.ipynb).

## Features

 * This Complexity-ML release adds Minecraft Java 26.2 to the versions inherited from upstream. <!--version-->
 * Entity knowledge and tracking.
 * Block knowledge. You can query the world around you. Milliseconds to find any block.
 * Physics and movement - handle all bounding boxes
 * Attacking entities and using vehicles.
 * Inventory management.
 * Crafting, chests, dispensers, enchantment tables.
 * Digging and building.
 * Miscellaneous stuff such as knowing your health and whether it is raining.
 * Activating blocks and using items.
 * Chat.

### Roadmap

See the [GAME LAB repository](https://github.com/Complexity-ML/game-lab)
for the governed agent runtime that consumes this distribution.

## Installation

Install Node.js 22 or newer from [nodejs.org](https://nodejs.org/), then
install the standalone GitHub Release asset:

```bash
npm install https://github.com/Complexity-ML/mineflayer-26.2/releases/download/complexity-26.2.3/mineflayer-complexity-26.2.3.tgz
```

GAME LAB pins the matching versions of every 26.2 stack component.

## Documentation

| link | description |
|---|---|
|[tutorial](tutorial.md) | Begin with Node.js and mineflayer |
| [FAQ.md](FAQ.md) | Got a question ? go there first |
| **[api.md](api.md)** <br/>[unstable_api.md](unstable_api.md) | The full API reference |
| [history.md](history.md) | The changelog for mineflayer |
| [examples/](../examples) | Check out all the Mineflayer examples |


## Maintenance

Open 26.2-specific issues and changes in the
[Complexity-ML repository](https://github.com/Complexity-ML/mineflayer-26.2).
For upstream behavior, consult the original
[PrismarineJS project](https://github.com/PrismarineJS/mineflayer).

## Usage

**Videos**

A tutorial video explaining the basic set up process for a bot can be found [here.](https://www.youtube.com/watch?v=ltWosy4Z0Kw)

If you want to learn more, more video tutorials are [there,](https://www.youtube.com/playlist?list=PLh_alXmxHmzGy3FKbo95AkPp5D8849PEV) and the corresponding source codes for those bots is [there.](https://github.com/TheDudeFromCI/Mineflayer-Youtube-Tutorials)

[<img src="https://img.youtube.com/vi/ltWosy4Z0Kw/0.jpg" alt="tutorial 1" width="200">](https://www.youtube.com/watch?v=ltWosy4Z0Kw)
[<img src="https://img.youtube.com/vi/UWGSf08wQSc/0.jpg" alt="tutorial 2" width="200">](https://www.youtube.com/watch?v=UWGSf08wQSc)
[<img src="https://img.youtube.com/vi/ssWE0kXDGJE/0.jpg" alt="tutorial 3" width="200">](https://www.youtube.com/watch?v=ssWE0kXDGJE)
[<img src="https://img.youtube.com/vi/walbRk20KYU/0.jpg" alt="tutorial 4" width="200">](https://www.youtube.com/watch?v=walbRk20KYU)

**Getting Started**

Without a version specified, the version of the server will be guessed automatically.
Without auth specified, the mojang auth style will be guessed.

### Echo Example
```js
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'Bot', // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
  auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
  // port: 25565,              // set if you need a port that isn't 25565
  // version: false,           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)
```

If `auth` is set to `microsoft`, you will be prompted to login to microsoft.com with a code in your browser. After signing in on your browser, 
the bot will automatically obtain and cache authentication tokens (under your specified username) so you don't have to sign-in again. 

To switch the account, update the supplied `username`. By default, cached tokens will be stored in your user's .minecraft folder, or if `profilesFolder` is specified, they'll instead be stored there.
For more information on bot options, see the 26.2
[node-minecraft-protocol API](https://github.com/Complexity-ML/node-minecraft-protocol-26.2/blob/main/docs/API.md#mccreateclientoptions).

#### Connecting to a Realm

To join a Realm that your Minecraft account has been invited to, you can pass a `realms` object with a selector function like below.

```js
const client = mineflayer.createBot({
  username: 'email@example.com', // minecraft username
  realms: {
    // This function is called with an array of Realms the account can join. It should return the one it wants to join.
    pickRealm: (realms) => realms[0]
  },
  auth: 'microsoft'
})
```

### See what your bot is doing

Thanks to the [prismarine-viewer](https://github.com/PrismarineJS/prismarine-viewer) project, it's possible to display in a browser window what your bot is doing.
Just run `npm install prismarine-viewer` and add this to your bot:
```js
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
})
```
And you'll get a *live* view looking like this:

[<img src="https://prismarinejs.github.io/prismarine-viewer/test_1.16.1.png" alt="viewer" width="500">](https://prismarinejs.github.io/prismarine-viewer/)

#### More Examples

| example | description |
|---|---|
|[viewer](../examples/viewer) | Display your bot world view in the browser |
|[pathfinder](../examples/pathfinder) | Make your bot go to any location automatically |
|[chest](../examples/chest.js) | Use chests, furnaces, dispensers, enchantment tables |
|[digger](../examples/digger.js) | Learn how to create a simple bot that is capable of digging blocks |
|[discord](../examples/discord.js) | Connect a discord bot with a mineflayer bot |
|[jumper](../examples/jumper.js) | Learn how to move, jump, ride vehicles, attack nearby entities |
|[ansi](../examples/ansi.js) | Display your bot's chat with all of the chat colors shown in your terminal |
|[guard](../examples/guard.js) | Make a bot guard a defined area from nearby mobs |
|[multiple-from-file](../examples/multiple_from_file.js) | Add a text file with accounts and have them all login |

And many more in the [examples](../examples) folder.

### Modules

A lot of the active development is happening inside of small npm packages which are used by mineflayer.

#### The Node Way&trade;

> "When applications are done well, they are just the really application-specific, brackish residue that can't be so easily abstracted away. All the nice, reusable components sublimate away onto github and npm where everybody can collaborate to advance the commons." — substack from ["how I write modules"](https://web.archive.org/web/20220301041352/https://gist.github.com/substack/5075355) (2013)

#### Modules

These are the main modules that make up mineflayer:

| module | description |
|---|---|
| [minecraft-protocol](https://github.com/Complexity-ML/node-minecraft-protocol-26.2) | Parse and serialize Minecraft packets, plus authentication and encryption.
| [minecraft-data](https://github.com/Complexity-ML/node-minecraft-data-26.2) | Provide versioned Minecraft data to Node.js clients, servers, and libraries.
| [prismarine-physics](https://github.com/Complexity-ML/prismarine-physics-26.2) | Provide the physics engine for Minecraft entities.
| [prismarine-chunk](https://github.com/Complexity-ML/prismarine-chunk-26.2) | Hold and decode Minecraft chunk data.
| [node-vec3](https://github.com/PrismarineJS/node-vec3) | 3d vector math with robust unit tests
| [prismarine-block](https://github.com/PrismarineJS/prismarine-block) | Represent a minecraft block with its associated data
| [prismarine-chat](https://github.com/PrismarineJS/prismarine-chat) | A parser for a minecraft chat message (extracted from mineflayer)
| [node-yggdrasil](https://github.com/PrismarineJS/node-yggdrasil) | Node.js library to interact with Mojang's authentication system, known as Yggdrasil
| [prismarine-world](https://github.com/PrismarineJS/prismarine-world) | The core implementation of worlds for prismarine
| [prismarine-windows](https://github.com/PrismarineJS/prismarine-windows) | Represent minecraft windows
| [prismarine-item](https://github.com/PrismarineJS/prismarine-item) | Represent a minecraft item with its associated data
| [prismarine-nbt](https://github.com/PrismarineJS/prismarine-nbt) | An NBT parser for node-minecraft-protocol
| [prismarine-recipe](https://github.com/PrismarineJS/prismarine-recipe) | Represent minecraft recipes
| [prismarine-biome](https://github.com/PrismarineJS/prismarine-biome) | Represent a minecraft biome with its associated data
| [prismarine-entity](https://github.com/PrismarineJS/prismarine-entity) | Represent a minecraft entity


### Debug

You can enable some protocol debugging output using `DEBUG` environment variable:

```bash
DEBUG="minecraft-protocol" node [...]
```

On windows :
```
set DEBUG=minecraft-protocol
node your_script.js
```

## Third Party Plugins

Mineflayer is pluggable; anyone can create a plugin that adds an even
higher level API on top of Mineflayer.

The most updated and useful are :

 * [minecraft-mcp-server](https://github.com/yuniko-software/minecraft-mcp-server) A MCP server for mineflayer, allowing using mineflayer from an LLM
 * [pathfinder](https://github.com/Karang/mineflayer-pathfinder) - advanced A* pathfinding with a lot of configurable features
 * [prismarine-viewer](https://github.com/PrismarineJS/prismarine-viewer) - simple web chunk viewer
 * [web-inventory](https://github.com/ImHarvol/mineflayer-web-inventory) - web based inventory viewer
 * [statemachine](https://github.com/PrismarineJS/mineflayer-statemachine) - A state machine API for more complex bot behaviors
 * [Armor Manager](https://github.com/G07cha/MineflayerArmorManager) - automatic armor management
 * [Dashboard](https://github.com/wvffle/mineflayer-dashboard) - Frontend dashboard for mineflayer bot
 * [PVP](https://github.com/PrismarineJS/mineflayer-pvp) - Easy API for basic PVP and PVE.
 * [Auto Eat](https://github.com/link-discord/mineflayer-auto-eat) - Automatic eating of food.
 * [Auto Crystal](https://github.com/link-discord/mineflayer-autocrystal) - Automatic placing & breaking of end crystals.
 * [Tool](https://github.com/TheDudeFromCI/mineflayer-tool) - A utility for automatic tool/weapon selection with a high level API.
 * [Hawkeye](https://github.com/sefirosweb/minecraftHawkEye) - A utility for using auto-aim with bows.
 * [GUI](https://github.com/firejoust/mineflayer-GUI) - Interact with nested GUI windows using async/await
 * [Projectile](https://github.com/firejoust/mineflayer-projectile) - Get the required launch angle for projectiles
 * [Movement](https://github.com/firejoust/mineflayer-movement) - Smooth and realistic player movement, best suited for PvP
 * [Collect Block](https://github.com/PrismarineJS/mineflayer-collectblock) - Quick and simple block collection API.

 But also check out :

 * [radar](https://github.com/andrewrk/mineflayer-radar/) - web based radar
   interface using canvas and socket.io. [YouTube Demo](https://www.youtube.com/watch?v=FjDmAfcVulQ)
 * [auto-auth](https://github.com/G07cha/MineflayerAutoAuth) - chat-based bot authentication
 * [Bloodhound](https://github.com/Nixes/mineflayer-bloodhound) - determine who and what is responsible for damage to another entity
 * [tps](https://github.com/SiebeDW/mineflayer-tps) - get the current tps (processed tps)
 * [panorama](https://github.com/IceTank/mineflayer-panorama) - take Panorama Images of your world
 * [player-death-event](https://github.com/tuanzisama/mineflayer-death-event) - emit player death event in Mineflayer.

## Projects Using Mineflayer

 * [Voyager](https://github.com/MineDojo/Voyager) An Open-Ended Embodied Agent with Large Language Models
 * [mindcraft](https://github.com/kolbytn/mindcraft) Lib for using mineflayer with LLMs
 * [rom1504/rbot](https://github.com/rom1504/rbot)
   - [YouTube - building a spiral staircase](https://www.youtube.com/watch?v=UM1ZV5200S0)
   - [YouTube - replicating a building](https://www.youtube.com/watch?v=0cQxg9uDnzA)
 * [Darthfett/Helperbot](https://github.com/Darthfett/Helperbot)
 * [vogonistic/voxel](https://github.com/vogonistic/mineflayer-voxel) - visualize what
   the bot is up to using voxel.js
 * [JonnyD/Skynet](https://github.com/JonnyD/Skynet) -  log player activity onto an online API
 * [MinecraftChat](https://github.com/rom1504/MinecraftChat) (last open source version, built by AlexKvazos) -  Minecraft web based chat client
 * [Cheese Bot](https://github.com/Minecheesecraft/Cheese-Bot) - Plugin based bot with a clean GUI. Made with Node-Webkit.
 * [Chaoscraft](https://github.com/schematical/chaoscraft) - Minecraft bot using genetic algorithms, see [its youtube videos](https://www.youtube.com/playlist?list=PLLkpLgU9B5xJ7Qy4kOyBJl5J6zsDIMceH)
 * [hexatester/minetelegram](https://github.com/hexatester/minetelegram) -  Minecraft - Telegram bridge, build on top of mineflayer & telegraf.
 * [PrismarineJS/mineflayer-builder](https://github.com/PrismarineJS/mineflayer-builder) - Prints minecraft schematics in survival, keeping orientation
 * [SilkePilon/OpenDeliveryBot](https://github.com/SilkePilon/OpenDeliveryBot) - Minecraft bot in python to deliver items from place to place.
 * [and hundreds more](https://github.com/PrismarineJS/mineflayer/network/dependents) - All the projects that github detected are using mineflayer


## Testing

### Testing everything

Simply run: 

```bash
npm test
```

### Testing specific version
Run 

```bash
npm run mocha_test -- -g <version>
```

where `<version>` is a minecraft version like `1.12`, `1.15.2`...

### Testing specific test
Run 

```bash
npm run mocha_test -- -g <test_name>
```

where `<test_name>` is a name of the test like `bed`, `useChests`, `rayTrace`...

### Example

```bash
npm run mocha_test -- -g "1.18.1.*BlockFinder"
```
to run the block finder test for 1.18.1

## License

[MIT](/LICENSE)

The original Mineflayer authors and contributors retain credit for the
upstream work. Complexity-ML maintains the independent 26.2 compatibility
changes. This distribution is not affiliated with Mojang Studios or
Microsoft.
