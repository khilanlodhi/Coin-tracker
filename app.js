const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let coinsdata = [];

function fetchCoinsWithThen(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      coinsdata = data;
      renderTable(data);
    })
    .catch(err => console.error('Fetch error:', err));
}
fetchCoinsWithThen();


function renderTable(data) {
  const tableBody = document.querySelector("#coinTable tbody");
  tableBody.innerHTML = "";

  data.forEach(coin => {
    const row = `
      <tr>
        <td>${coin.id}</td>
        <td><img src="${coin.image}" alt="${coin.name}"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>${coin.current_price.toLocaleString()}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td>${coin.market_cap.toLocaleString()}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
};

function searchCoins(){

    const input = document.getElementById("searchInput").value.toLowerCase();
    const filtered = coinsdata.filter(coin =>
        coin.name.toLowerCase().includes(input) ||
        coin.symbol.toLowerCase().includes(input)
    );

     renderTable(filtered);

}
// function searchCoins() {
//   const input = document.getElementById("searchInput").value.toLowerCase();
//   const filtered = coinsdata.filter(coin =>
//     coin.name.toLowerCase().includes(input) ||
//     coin.symbol.toLowerCase().includes(input)
//   );
//   renderTable(filtered);
// }



function sortByMarketCap(){
    const sorted = [...coinsdata].sort((a,b) => b.market_cap - a.market_cap);
    renderTable(sorted);
}

function sortByChange() {
  const sorted = [...coinsdata].sort((a, b) =>
    b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  renderTable(sorted);
}