// Проверяем авторизацию
if (!checkAuth()) {
    throw new Error('Не авторизован');
}

// Загружаем имя текущего пользователя
const currentUser = localStorage.getItem('currentUser');
document.getElementById('currentUser').textContent = currentUser;

// Функция для отображения списка чатов
function renderChats() {
    const chatsList = document.getElementById('chatsList');
    chatsList.innerHTML = '';
    
    MESSENGER_CONFIG.chats.forEach(chat => {
        const chatElement = document.createElement('div');
        chatElement.className = 'chat-item';
        chatElement.onclick = () => openChat(chat.id, chat.name);
        chatElement.innerHTML = `
            <div class="chat-avatar">${chat.avatar}</div>
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">Нажмите для открытия чата</div>
            </div>
        `;
        chatsList.appendChild(chatElement);
    });
}

// Функция открытия чата
function openChat(chatId, chatName) {
    // Сохраняем данные о выбранном чате
    localStorage.setItem('currentChat', JSON.stringify({
        id: chatId,
        name: chatName
    }));
    // Переходим в чат
    window.location.href = 'chat.html';
}

// Инициализация страницы
renderChats();