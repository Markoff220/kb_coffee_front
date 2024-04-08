let tg = window.Telegram.WebApp;
tg.expand();


// Функция отправки данных в ТГ | Отправки кода подтверждения на почту
document.addEventListener('DOMContentLoaded', function() {
    // Отправка кода на почту
    document.getElementById('send_code').addEventListener('click', function() {
        var fields = ['email', 'name', 'username', 'department'];
        var errStatus = 0;

        fields.forEach(function(field) {
            var value = document.getElementById(field).value;
            var errorElement = document.getElementById(field + 'Error');

            if (field === 'email') {
                var atIndex = value.indexOf('@');

                if (atIndex !== -1) {
                    var domain = value.slice(atIndex + 1);
                    if (!(domain.includes('strelka') || domain.includes('architectsrussia'))) {
                        errorElement.style.display = 'block';
                        errStatus = 1;
                        return; // Прерываем выполнение текущей итерации
                    }
                }
                else {
                    errorElement.style.display = 'block';
                    errStatus = 1;
                }

            } else if (value === '') {
                errorElement.style.display = 'block';
                errStatus = 1;
            } else {
                errorElement.style.display = 'none';
            }
        });

        if (errStatus === 0) {
            // Данные для отправки
            let data = {
                'type': 'check',
                'name': document.getElementById('name').value,
                'username': document.getElementById('username').value,
                'department': document.getElementById('department').value,
                "email": document.getElementById('email').value,
            };
            tg.sendData(JSON.stringify(data));
        }
    });
});
