import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinIndex, setCoinIndex] = useState(0);
  const [usdValue, setUsdValue] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setIsLoading(false);
      });
  }, []);

  const coinSelect = (event) => {
    setCoinIndex(event.target.value);
  };

  const usdChange = (event) => {
    setUsdValue(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! {!isLoading ? `- ${coins.length} coins` : ""}</h1>
      {isLoading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={coinSelect}>
          {coins.map((coin, index) => {
            return (
              <option key={index} value={index}>
                {coin.name}({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            );
          })}
        </select>
      )}
      {!isLoading ? (
        <div>
          <input
            type="number"
            placeholder="USD"
            value={usdValue}
            onChange={usdChange}
          />
          <input
            type="number"
            placeholder={coins[coinIndex].symbol}
            disabled
            value={usdValue / coins[coinIndex].quotes.USD.price}
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;
