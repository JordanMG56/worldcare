let currentCategory = "Health";
let quoteHistory = [];
let currentQuoteIndex = 0;
let likedQuotes = new Set();

// Function to toggle the main menu (Themes and Categories)
function toggleMainSwitcherMenu() {
    const mainMenu = document.getElementById('mainSwitcherMenu');
    mainMenu.classList.toggle('hidden');
    mainMenu.classList.toggle('active');
}

// Function to toggle the theme drawer
function toggleThemeDrawer() {
    const drawer = document.getElementById('themeDrawer');
    drawer.classList.toggle('hidden');
    drawer.classList.toggle('active');
}

// Function to toggle the category menu
function toggleCategoryMenu() {
    const menu = document.getElementById('categoryMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('active');
}

// Function to select a category
function selectCategory(category) {
    currentCategory = category;
    quoteHistory = [];
    currentQuoteIndex = 0;
    updateQuote();
    toggleCategoryMenu();
}

// Function to change the quote
function changeQuote() {
    quoteHistory.push(currentQuoteIndex);
    const quoteBox = document.getElementById('quoteBox');
    quoteBox.classList.add('hidden');

    setTimeout(() => {
        const quotes = categories[currentCategory];
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        updateQuote();
        quoteBox.classList.remove('hidden');
    }, 500);
}

// Function to retrieve the previous quote
function previousQuote() {
    if (quoteHistory.length === 0) return;

    const quoteBox = document.getElementById('quoteBox');
    quoteBox.classList.add('hidden');

    setTimeout(() => {
        currentQuoteIndex = quoteHistory.pop();
        updateQuote();
        quoteBox.classList.remove('hidden');
    }, 500);
}

// Function to toggle the liked state for the current quote
function toggleLike() {
    const heartIcon = document.getElementById('heartIcon');
    const currentQuote = getCurrentQuote();

    if (likedQuotes.has(currentQuote.text)) {
        likedQuotes.delete(currentQuote.text);
        heartIcon.classList.remove('liked');
    } else {
        likedQuotes.add(currentQuote.text);
        heartIcon.classList.add('liked');
    }
}

// Function to share the current quote
function shareQuote() {
    const currentQuote = getCurrentQuote();
    const shareText = `"${currentQuote.text}" - ${currentQuote.author}`;

    if (navigator.share) {
        navigator.share({
            title: 'Motivational Quote',
            text: shareText
        }).catch((error) => console.log('Error sharing', error));
    } else {
        alert('Sharing is not supported on this browser.');
    }
}

// Function to get the current quote
function getCurrentQuote() {
    const quotes = categories[currentCategory];
    return quotes[currentQuoteIndex];
}

// Function to update the displayed quote
function updateQuote() {
    const currentQuote = getCurrentQuote();
    document.getElementById('quote').textContent = `"${currentQuote.text}"`;
    document.getElementById('author').textContent = `- ${currentQuote.author}`;

    const heartIcon = document.getElementById('heartIcon');
    if (likedQuotes.has(currentQuote.text)) {
        heartIcon.classList.add('liked');
    } else {
        heartIcon.classList.remove('liked');
    }
}