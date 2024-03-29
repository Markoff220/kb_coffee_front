 let tg = window.Telegram.WebApp;
 tg.expand();


// Функция отправки данных в ТГ | Отправки кода подтверждения на почту
document.addEventListener('DOMContentLoaded', function() {
    // Отправка кода на почту
    document.getElementById('send_code').addEventListener('click', function() {
        var email = document.getElementById('email').value;

        if (!email.includes('strelka')) {
            document.getElementById('emailError').style.display = 'block';
            return;
            };

        // Данные для отправки
        let data = {
            'type': 'check',
            'name': document.getElementById('name').value,
            'username': document.getElementById('username').value,
            'department': document.getElementById('department').value,
            "email": email,
        };

        tg.sendData(JSON.stringify(data));
        });


    });

