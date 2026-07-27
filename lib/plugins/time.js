module.exports = inject

function inject (bot) {
  bot.time = {
    doDaylightCycle: null,
    bigTime: null,
    time: null,
    timeOfDay: null,
    day: null,
    isDay: null,
    moonPhase: null,
    bigAge: null,
    age: null,
    rate: null,
    partialTick: null
  }
  bot._client.on('update_time', (packet) => {
    const modernClocks = packet.clockUpdates
    const age = longToBigInt(modernClocks ? packet.gameTime : packet.age)
    const overworldClock = modernClocks?.find(clock => clock.clock === 0)
    const elapsedTicks = bot.time.bigAge === null ? 0n : age - bot.time.bigAge
    const time = overworldClock
      ? longToBigInt(overworldClock.totalTicks)
      : modernClocks
        ? (bot.time.bigTime ?? age) + BigInt(Math.trunc(Number(elapsedTicks) * (bot.time.rate ?? 1)))
        : longToBigInt(packet.time)
    const doDaylightCycle = modernClocks
      ? (overworldClock?.rate ?? bot.time.rate ?? 1) !== 0
      : packet.tickDayTime !== undefined
        ? !!packet.tickDayTime
        : time >= 0n
    // When doDaylightCycle is false, we need to take the absolute value of time
    const finalTime = doDaylightCycle ? time : (time < 0n ? -time : time)

    bot.time.doDaylightCycle = doDaylightCycle
    if (overworldClock) {
      bot.time.rate = overworldClock.rate
      bot.time.partialTick = overworldClock.partialTick
    }
    bot.time.bigTime = finalTime
    bot.time.time = Number(finalTime)
    bot.time.timeOfDay = bot.time.time % 24000
    bot.time.day = Math.floor(bot.time.time / 24000)
    bot.time.isDay = bot.time.timeOfDay >= 0 && bot.time.timeOfDay < 13000
    bot.time.moonPhase = bot.time.day % 8
    bot.time.bigAge = age
    bot.time.age = Number(age)

    bot.emit('time')
  })
}

function longToBigInt (arr) {
  if (typeof arr === 'bigint') return arr
  if (typeof arr === 'number') return BigInt(Math.trunc(arr))
  return BigInt.asIntN(64, (BigInt(arr[0]) << 32n)) | BigInt(arr[1])
}
