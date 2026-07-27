# Mineflayer 26.2

Independent GAME LAB distribution of Mineflayer for Minecraft Java Edition
26.2.

This repository is maintained by
[Complexity-ML](https://github.com/Complexity-ML) as part of the GAME LAB
runtime. It is based on the upstream
[PrismarineJS Mineflayer](https://github.com/PrismarineJS/mineflayer)
project, with a dedicated 26.2 compatibility stack.

## Compatibility

| Component | Version |
| --- | --- |
| Minecraft Java Edition | 26.2 |
| Protocol | 776 |
| Data version | 4903 |
| Node.js | 22 or newer |
| Package | `4.37.1+complexity.26.2.2` |

## Install

The standalone package is distributed as a GitHub Release asset:

```bash
npm install https://github.com/Complexity-ML/mineflayer-26.2/releases/download/complexity-26.2.3/mineflayer-complexity-26.2.3.tgz
```

Use the matching 26.2 builds of the protocol, data, chunk, and physics
packages when integrating the stack manually. GAME LAB already pins the
complete compatible set.

## Private server example

```js
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: '127.0.0.1',
  port: 25565,
  username: 'GAME_LAB_Bot',
  auth: 'offline',
  version: '26.2'
})

bot.once('spawn', () => {
  console.log('Bot spawned at', bot.entity.position)
})

bot.on('kicked', console.log)
bot.on('error', console.error)
```

Only use `auth: 'offline'` on a private server you own or are explicitly
authorized to operate. For authenticated servers, use a legitimate Microsoft
account and the appropriate Mineflayer authentication configuration.

## 26.2 stack

| Layer | Repository |
| --- | --- |
| Mineflayer | [mineflayer-26.2](https://github.com/Complexity-ML/mineflayer-26.2) |
| Protocol | [node-minecraft-protocol-26.2](https://github.com/Complexity-ML/node-minecraft-protocol-26.2) |
| Node data API | [node-minecraft-data-26.2](https://github.com/Complexity-ML/node-minecraft-data-26.2) |
| Raw data | [minecraft-data-26.2](https://github.com/Complexity-ML/minecraft-data-26.2) |
| Data generator | [minecraft-data-generator-26.2](https://github.com/Complexity-ML/minecraft-data-generator-26.2) |
| Chunk decoder | [prismarine-chunk-26.2](https://github.com/Complexity-ML/prismarine-chunk-26.2) |
| Physics | [prismarine-physics-26.2](https://github.com/Complexity-ML/prismarine-physics-26.2) |

## Validation

- 21 internal 26.2 integration tests pass; one test remains intentionally
  pending.
- A live bot spawned on an official Minecraft Java 26.2 server, decoded 473
  chunks, received world-time updates, and completed without protocol errors.
- The full stack is exercised by the
  [GAME LAB](https://github.com/Complexity-ML/game-lab) Minecraft adapter.

## Documentation

The complete inherited API, examples, plugins, and testing documentation is in
[docs/README.md](docs/README.md).

## Maintenance and attribution

This is an independent downstream distribution. It is not an official
PrismarineJS release and is not affiliated with Mojang Studios or Microsoft.

The original Mineflayer authors and contributors retain credit for the
upstream work. Complexity-ML maintains the 26.2 compatibility changes and
release artifacts in this repository.

## License

[MIT](LICENSE)
