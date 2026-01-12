// Скрытая фиксированная последовательность [20, 1, 46, 13]
const HIDDEN_SEQUENCE = [20, 4, 46, 13, 3, 42];
let currentIndex = 0;
let generateCounter = 0;
let history = [];

// Элементы DOM
const randomNumberEl = document.getElementById('randomNumber');
const generateBtn = document.getElementById('generateBtn');
const counterEl = document.getElementById('counter');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const minRangeInput = document.getElementById('minRange');
const maxRangeInput = document.getElementById('maxRange');
const recordButton = document.getElementById('recordButton');
const widgetButton = document.getElementById('widgetButton');

// Функция получения следующего числа из скрытой последовательности
function getNextNumber() {
    const number = HIDDEN_SEQUENCE[currentIndex];
    currentIndex = (currentIndex + 1) % HIDDEN_SEQUENCE.length;
    return number;
}

// Функция добавления числа в историю
function addToHistory(number) {
    const timestamp = new Date().toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    history.unshift({
        number: number,
        time: timestamp,
        id: Date.now()
    });
    
    if (history.length > 15) {
        history = history.slice(0, 15);
    }
    
    updateHistoryDisplay();
}

// Функция обновления отображения истории
function updateHistoryDisplay() {
    if (history.length === 0) {
        historyList.innerHTML = '<li class="history-empty">История генераций пуста</li>';
        return;
    }
    
    let historyHTML = '';
    
    history.forEach(item => {
        historyHTML += `
            <li class="history-item">
                <span class="history-number">${item.number}</span>
                <span class="history-time">${item.time}</span>
            </li>
        `;
    });
    
    historyList.innerHTML = historyHTML;
}

// Функция очистки истории
function clearHistory() {
    history = [];
    updateHistoryDisplay();
}

// Функция генерации нового числа
function generateNewNumber() {
    const number = getNextNumber();
    
    // Добавляем анимацию появления
    randomNumberEl.classList.remove('fade-in');
    void randomNumberEl.offsetWidth; // Сбрасываем анимацию
    randomNumberEl.classList.add('fade-in');
    
    randomNumberEl.textContent = number;
    
    // Добавляем в историю
    addToHistory(number);
    
    // Увеличиваем счетчик
    generateCounter++;
    counterEl.textContent = generateCounter;
}

// Функции для дополнительных кнопок
function handleRecordButton() {
    alert("Функция записи видео находится в разработке.");
}

function handleWidgetButton() {
    alert("Чтобы добавить виджет генератора на свой сайт, свяжитесь с разработчиком.");
}

// Обработчики событий
generateBtn.addEventListener('click', generateNewNumber);
clearHistoryBtn.addEventListener('click', clearHistory);
recordButton.addEventListener('click', handleRecordButton);
widgetButton.addEventListener('click', handleWidgetButton);

// Обработчики для клавиши Enter в полях ввода
minRangeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') generateNewNumber();
});

maxRangeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') generateNewNumber();
});

// При загрузке страницы инициализируем
window.addEventListener('load', () => {
    counterEl.textContent = generateCounter;
    updateHistoryDisplay();

});


