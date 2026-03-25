// Проверяем авторизацию
if (!checkAuth()) {
    throw new Error('Не авторизован');
}

const currentUser = localStorage.getItem('currentUser');
const currentChat = JSON.parse(localStorage.getItem('currentChat'));

if (!currentChat) {
    window.location.href = 'chats.html';
}

// Инициализация хранилища сообщений
if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify({}));
}

// Устанавливаем информацию о чате
document.getElementById('currentUser').textContent = currentUser;
document.getElementById('chatName').textContent = currentChat.name;
document.getElementById('chatAvatar').textContent = currentChat.name[0];

// Загрузка сообщений для текущего чата
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages'));
    const chatKey = `${currentUser}_${currentChat.id}`;
    const chatMessages = messages[chatKey] || [];
    
    const messagesArea = document.getElementById('messagesArea');
    messagesArea.innerHTML = '';
    
    chatMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender === currentUser ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div class="message-bubble">${escapeHtml(msg.text)}</div>
            <div class="message-time">${msg.time}</div>
        `;
        messagesArea.appendChild(messageDiv);
    });
    
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Отправка сообщения
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text) {
        const messages = JSON.parse(localStorage.getItem('messages'));
        const chatKey = `${currentUser}_${currentChat.id}`;
        
        if (!messages[chatKey]) {
            messages[chatKey] = [];
        }
        
        messages[chatKey].push({
            sender: currentUser,
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        
        localStorage.setItem('messages', JSON.stringify(messages));
        input.value = '';
        loadMessages();
    }
}

// Функция для экранирования HTML (защита от XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Обработка нажатия Enter
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function goBack() {
    window.location.href = 'chats.html';
}

// Загрузка списка чатов в боковой панели
function renderChatsList() {
    const chatsList = document.getElementById('chatsList');
    chatsList.innerHTML = '';
    
    MESSENGER_CONFIG.chats.forEach(chat => {
        const chatElement = document.createElement('div');
        chatElement.className = 'chat-item';
        chatElement.onclick = () => {
            localStorage.setItem('currentChat', JSON.stringify({
                id: chat.id,
                name: chat.name
            }));
            window.location.reload();
        };
        chatElement.innerHTML = `
            <div class="chat-avatar">${chat.avatar}</div>
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
            </div>
        `;
        chatsList.appendChild(chatElement);
    });
}

// Инициализация
loadMessages();
renderChatsList();