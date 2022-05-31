require("dotenv").config();
const ccxt = require("ccxt");
const axios = require("axios");

const tick = async (config, binanceClient) => {
  const { asset, base, spread, allocation } = config;
  const market = `${asset}/${base}`;

  const orders = await binanceClient.fetchPositions([market]);
  console.log(orders);
};

const run = () => {
  const config = {
    asset: "BTC",
    base: "USDT",
    allocation: 0.1,
    spread: 0.2,
    tickInterval: 2000,
  };
  const binanceClient = new ccxt.binanceusdm({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
  });
  tick(config, binanceClient);
  setInterval(tick, config.tickInterval, config, binanceClient);
};

run();
