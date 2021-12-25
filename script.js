const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show new quote
function newQuote() {
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