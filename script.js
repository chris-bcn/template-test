const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    // pick random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author is null
    if(!quote.author){
        quote.author = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    if(quoteText.length > 100) {
        quoteText.classList.add('long-quote');
     }
     else {
         quoteText.classList.remove('long-quote');
     }
     quoteText.textContent = quote.text;
     complete();
}

//Get Quotes from API
async function getQuotes() {
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } 
    catch (error){
        //Catch Error here
    }
}

function tweetQuote() { 
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



// On Load
getQuotes();