require("dotenv").config();
const ccxt = require("ccxt");
const TradingView = require("@mathieuc/tradingview");
const client = new TradingView.Client();
const cleanup = require('./cleanup').Cleanup(client);
const getData = require("./indicators.js");
const delay = require("./helpers");

const tick = async (config, binanceClient) => {
  const { asset, base, spread, allocation } = config;
  const market = `${asset}/${base}`;

  const orders = await binanceClient.fetchPositions([market]);
  console.log(await getData(TradingView, client));
};

const run = async () =>  {
  const config = {
    asset: "BTC",
    base: "USDT",
    allocation: 0.1,
    spread: 0.2,
    tickInterval: 15*60*1000,
  };
  const binanceClient = new ccxt.binanceusdm({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
  });

    const d = new Date();
  const minutes = 15 - d.getMinutes() % 15

  await delay(minutes*60*1000);
  tick(config, binanceClient);
  setInterval(tick, config.tickInterval, config, binanceClient);
};

run();
