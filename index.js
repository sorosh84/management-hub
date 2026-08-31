// Function to switch between tabs
// Function to switch between tabs
function openTab(tabId) {
    // 1. Hide all tab content sections
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.remove('active-content');
    });

    // 2. Remove 'active' class from all tab buttons
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 3. Show the selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active-content');
    }

    // 4. Highlight the button that was clicked using window.event
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}


function playRPS(playerChoice) { 
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    
    const emojis = {
        rock: '🪨',
        paper: '📃',
        scissors: '✂️'
    };

    const playerEmoji = emojis[playerChoice];
    const computerEmoji = emojis[computerChoice];

    const resultDisplay = document.getElementById('rps-result');
    let result = ""; 
  
    // 1. Tie check
    if (playerChoice === computerChoice) {
        result = `🤝 It's a tie! You both picked ${playerChoice} ${playerEmoji}.`;
    }
    // 2. Win check
    else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') || 
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        result = `🎉 You won! You picked ${playerChoice} ${playerEmoji} and computer picked ${computerChoice} ${computerEmoji}.`;
    }
    // 3. Loss check
    else { 
        result = `❌ You lost! You picked ${playerChoice} ${playerEmoji} and computer picked ${computerChoice} ${computerEmoji}.`;
    }

    resultDisplay.innerText = result;
}


// DICE ROLLER LOGIC

function rollDice() {
    // Generate a random number from 1 to 6
    const diceValue = Math.floor(Math.random() * 6) + 1;

    
    const diceEmojis = {
        1: '⚀ unlucky mate',
        2: '⚁ not bad ',
        3: '⚂ good',
        4: '⚃ doing very good',
        5: '⚄ well done ',
        6: '⚅ this is your day '
    };

    const resultDisplay = document.getElementById('dice-result');
    
    
    resultDisplay.innerText = `You rolled a ${diceValue}! ${diceEmojis[diceValue]}`;
}
// ==========================================
// WEATHER APP LOGIC (Fetch API)
// ==========================================
async function getWeather() {
    const cityInput = document.getElementById('city-input').value.trim();
    const resultDisplay = document.getElementById('weather-result');

    if (!cityInput) {
        resultDisplay.innerText = "Please enter a city name first.";
        return;
    }

    resultDisplay.innerText = "Loading weather data...";

    try {
        // 1. Convert City Name -> Latitude & Longitude
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            resultDisplay.innerText = `City "${cityInput}" not found. Try another city!`;
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Fetch Current Weather using Lat & Long
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const temp = weatherData.current_weather.temperature;
        const windspeed = weatherData.current_weather.windspeed;

        
        resultDisplay.innerHTML = `
            <h3>${name}, ${country}</h3>
            <p class="weather-temp">🌡️ ${temp}°C</p>
            <p>💨 Wind Speed: ${windspeed} km/h</p>
        `;
    } catch (error) {
        console.error("Error fetching weather:", error);
        resultDisplay.innerText = "Failed to fetch weather data. Check internet connection.";
    }
}
// ==========================================
// STOPWATCH LOGIC
// ==========================================
let stopwatchInterval = null;
let elapsedTime = 0; // Tracks total time 

function startStopwatch() {

    if (stopwatchInterval !== null) return;

    const startTime = Date.now() - elapsedTime;

    stopwatchInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 10); 
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // Format with leading zeros (e.g., 01:05:09)
    const formattedMin = String(minutes).padStart(2, '0');
    const formattedSec = String(seconds).padStart(2, '0');
    const formattedMs = String(milliseconds).padStart(2, '0');

    // Update HTML element
    const display = document.getElementById('stopwatch-display');
    if (display) {
        display.innerText = `${formattedMin}:${formattedSec}:${formattedMs}`;
    }
}
// ==========================================
// CALCULATOR LOGIC
// ==========================================

// Appends numbers or operators to the screen
function appendCalc(val) {
    const display = document.getElementById('calc-display');
    if (display.value === 'Error') {
        display.value = val;
    } else {
        display.value += val;
    }
}

// Clears the display screen
function clearCalc() {
    document.getElementById('calc-display').value = '';
}

// Deletes the last entered character
function deleteLastCalc() {
    const display = document.getElementById('calc-display');
    display.value = display.value.slice(0, -1);
}

// Evaluates the mathematical expression
function calculateResult() {
    const display = document.getElementById('calc-display');
    if (!display.value) return;

    try {
        // Safe math evaluation using Function constructor
        display.value = Function(`'use strict'; return (${display.value})`)();
    } catch (error) {
        display.value = 'Error';
    }
}
