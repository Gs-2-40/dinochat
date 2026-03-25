function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (username && password) {
        // Сохраняем имя пользователя
        localStorage.setItem('currentUser', username);
        // Перенаправляем на страницу чатов
        window.location.href = 'chats.html';
    } else {
        errorMsg.style.display = 'block';
    }
}

// Добавляем возможность войти по нажатию Enter
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    });
});