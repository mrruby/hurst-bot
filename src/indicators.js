

async function getData(tradingView, client) {
  const chart = new client.Session.Chart();
  chart.setMarket("BINANCE:BTCUSDT", {
    timeframe: "15",
    range: 2,
  });

  function getIndicatorData(indicator, props) {
    return new Promise((res) => {
      const STD = new chart.Study(indicator);
  
      STD.onUpdate(() => {
        res(STD.periods[0][props]);
      });
    });
  }

  const hccc = await tradingView.getIndicator("PUB;1192");
  hccc.setOption("Medium_Cycle_Multiplier", 1.8);
  const hccco = await tradingView.getIndicator("PUB;1213");
  hccco.setOption("Medium_Cycle_Multiplier", 1.6);
  const MediumCycleTop = await getIndicatorData(hccc, "MediumCycleTop");
  const MediumCycleBottom = await getIndicatorData( hccc, "MediumCycleBottom");
  const FastOsc = await getIndicatorData(hccco, "FastOsc");

  return {
    MediumCycleTop,
    MediumCycleBottom,
    FastOsc,
  };
}

module.exports = getData;
