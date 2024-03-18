//Assigning DOM Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function generateNewQuote() {
    showLoading();
    const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author is null
    if (!randomQuote.author) {
        authorText.textContent = "Unknown Author";
    } else {
        authorText.textContent = randomQuote.author;
    }
    //if quote text too long, make it smaller
    if (randomQuote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set quote, hide loader
    quoteText.textContent = randomQuote.text;
    hideLoading();
}

async function getQuotesFromAPI() {
    showLoading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        generateNewQuote();
    } catch (error) {
        console.log(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', generateNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotesFromAPI();