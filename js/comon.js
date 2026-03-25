// Общие данные для всего приложения
const MESSENGER_CONFIG = {
    chats: [
        { id: 1, name: 'Анна', avatar: 'А' },
        { id: 2, name: 'Михаил', avatar: 'М' },
        { id: 3, name: 'Екатерина', avatar: 'Е' },
        { id: 4, name: 'Дмитрий', avatar: 'Д' }
    ]
};

// Функция для проверки авторизации
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Функция для выхода
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentChat');
    window.location.href = 'login.html';
}