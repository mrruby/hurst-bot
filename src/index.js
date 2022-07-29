require("dotenv").config();
const ccxt = require("ccxt");
const TradingView = require("@mathieuc/tradingview");
const client = new TradingView.Client();
const cleanup = require("./cleanup").Cleanup(client);
const getData = require("./indicators.js");
const delay = require("./helpers");
const LastTradeState = require("./model/last-trade-state");

let lastTrade = LastTradeState.SELL;

const tick = async (config, binanceClient) => {
  const { asset, base, allocation } = config;
  const market = `${asset}/${base}`;

  const orders = await binanceClient.fetchPositions([market]);

  if (Number(orders[0].info.positionAmt) === 0) {
    lastTrade = LastTradeState.SELL;
  }

  console.log(Number(orders[0].info.positionAmt) === 0);
  console.log(orders);

  console.log(await getData(TradingView, client));
};

const run = async () => {
  const config = {
    asset: "BTC",
    base: "USDT",
    allocation: 0.1,
    spread: 0.2,
    tickInterval: 15 * 60 * 1000,
  };
  const binanceClient = new ccxt.binanceusdm({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
  });

  const d = new Date();
  const minutes = 15 - (d.getMinutes() % 15);

  // await delay(minutes*60*1000);
  tick(config, binanceClient);
  // setInterval(tick, config.tickInterval, config, binanceClient);
};

run();
