// Array of quotes
const quotes = [
    "The journey of a thousand miles begins with one step. - Lao Tzu",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "You only live once, but if you do it right, once is enough. - Mae West",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "To live is the rarest thing in the world. Most people exist, that is all. - Oscar Wilde"
];

// Function to display a random quote
function displayRandomQuote() {
    const quoteBox = document.getElementById('quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = quotes[randomIndex];
}

// Call the function when the page loads
window.onload = displayRandomQuote;
// Fetch and display S&P 500 prices
async function fetchSP500Data() {
    const apiKey = 'C5CIYHSF2FJH42HD';
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=${apiKey}`);
    const data = await response.json();

    const timeSeries = data['Time Series (Daily)'];
    const dates = Object.keys(timeSeries).slice(0, 10).reverse(); // Last 10 days
    const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

    // Create the S&P 500 chart
    const ctx = document.getElementById('sp500-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'S&P 500 Price',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Price (USD)' } }
            }
        }
    });
}

// Fetch and display Bitcoin prices
async function fetchBitcoinData() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();

    const ctx = document.getElementById('bitcoin-chart').getContext('2d');
    const price = parseFloat(data.bpi.USD.rate.replace(',', ''));

    // Dummy data for the last 10 hours
    const hours = Array.from({ length: 10 }, (_, i) => `${i + 1}h ago`);
    const prices = Array(10).fill(price);

    // Create the Bitcoin chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours.reverse(),
            datasets: [{
                label: 'Bitcoin Price',
                data: prices,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Price (USD)' } }
            }
        }
    });
}

// Initialize charts
window.onload = async () => {
    fetchSP500Data();
    fetchBitcoinData();
};
window.onload = async () => {
    displayRandomQuote(); // Call the quote display function
    await fetchSP500Data();
    await fetchBitcoinData();
};
