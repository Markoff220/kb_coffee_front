 let tg = window.Telegram.WebApp;
 tg.expand();


// Функция отправки данных в ТГ | Отправки кода подтверждения на почту
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.button-send-code');

    buttons.forEach(function(button) {
        document.getElementById('username').value = tg.InitDataUnsafe.username
        document.getElementById('name').value = tg.InitDataUnsafe.firstname

        // Отправка кода на почту
        document.getElementById('send_code').addEventListener('click', function() {
            var email = document.getElementById('email').value;

            if (!email.includes('strelka')) {
                document.getElementById('emailError').style.display = 'block';
                return;
                };
            // Данные для отправки
            let data = {
                'type': 'send',
                "email": email
            };

            sendPostRequest(data);

            document.getElementById('firstForm').style.display = 'none';
            document.getElementById('secondForm').style.display = 'block';
            });

    // Проверка кода на валидность
    document.getElementById('check_code').addEventListener('click', function() {
        var code = document.getElementById('input_code').value;
        alert(code);
        let data = {
            'type': 'check',
            'telegram_id': tg.InitDataUnsafe.id,
            'name': document.getElementById('name').value,
            'username': document.getElementById('username').value,
            'department': document.getElementById('department').value,
            "email": email,
            'code': code
        };
        sendPostRequest(data).then(function(response) {
                // Обработка успешного выполнения запроса
                if (response.ok) {
                    tg.close();
                } else {
                    alert('Неверный код');
                }
            })
    });
})});




// Функция для запуска таймера обратного отсчета
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval); // Останавливаем интервал
            display.style.display = "none"; // Скрываем таймер
            document.getElementById('resend_code').style.border = "none"; // Убираем границы у кнопки
            document.getElementById('resend_code').style.color = "#0088cc"; // Возвращаем цвет текста
            document.getElementById('resend_code').style.color = "#0088cc"; // Возвращаем цвет текста
            document.getElementById('resend_code').style.pointerEvents = "auto"; // Делаем кнопку активной
        }
    }, 1000);
}


// При загрузке страницы запускаем таймер на 2 минуты (120 секунд)
window.onload = function () {
    var twoMinutes = 120,
        display = document.getElementById('timer');
    startTimer(twoMinutes, display);
};


// Функция отправки POST запроса на отправку кода подтверждения
async function sendPostRequest(data) {
    const url = 'http://127.0.0.1:5000';  // Адрес Flask сервера

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
         return response;  // Возвращаем объект ответа
    } catch (error) {
        console.error('Ошибка:', error);
    }

};
