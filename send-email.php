<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Загружаем .env переменные
function loadEnv($path = __DIR__ . '/.env')
{
    if (!file_exists($path))
        return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0)
            continue;
        list($key, $value) = explode('=', $line, 2);
        putenv(trim($key) . '=' . trim($value));
    }
}
loadEnv();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Безопасная обработка данных
    function sanitize($value)
    {
        return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
    }

    // Получаем данные из вашей формы
    $name = sanitize($_POST["name"] ?? '');
    $spouseName = sanitize($_POST["spouseName"] ?? '');
    $weddingDate = sanitize($_POST["weddingDate"] ?? '');
    $phone = sanitize($_POST["phone"] ?? '');
    $email = sanitize($_POST["email"] ?? '');
    $source = sanitize($_POST["source"] ?? '');
    $timestamp = date('d.m.Y H:i:s');

    // Валидация email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Неверный формат email.']);
        exit;
    }

    // Проверка обязательных полей
    if (empty($name) || empty($phone) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Заполните обязательные поля: Имя, Телефон и Email.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Настройка SMTP
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USERNAME');
        $mail->Password = getenv('SMTP_PASSWORD');
        $mail->SMTPSecure = getenv('SMTP_SECURE');
        $mail->Port = getenv('SMTP_PORT');
        $mail->CharSet = 'UTF-8';

        // Отправитель и получатель
        $mail->setFrom(
            getenv('SMTP_USERNAME'), 
            getenv('SMTP_FROM_NAME')
        );
        $mail->addAddress(getenv('SMTP_TO'));
        $mail->addReplyTo($email, $name);

        // Тема и содержимое письма
        $mail->isHTML(true);
        $mail->Subject = "Новая заявка от: $name";
        
        $mail->Body = "
        <html>
        <head>
            <title>Новая заявка с сайта Jewish Home</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #489cb7; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .field { margin-bottom: 10px; padding: 8px; border-bottom: 1px solid #ddd; }
                .field-label { font-weight: bold; color: #333; display: inline-block; width: 200px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Новая заявка с сайта Jewish Home</h1>
                </div>
                <div class='content'>
                    <div class='field'><span class='field-label'>Имя Фамилия:</span> $name</div>
                    <div class='field'><span class='field-label'>Имя Супруга:</span> $spouseName</div>
                    <div class='field'><span class='field-label'>Дата свадьбы/хупы:</span> $weddingDate</div>
                    <div class='field'><span class='field-label'>Телефон:</span> $phone</div>
                    <div class='field'><span class='field-label'>Email:</span> $email</div>
                    <div class='field'><span class='field-label'>Откуда узнали:</span> $source</div>
                    <div class='field'><span class='field-label'>Время отправки:</span> $timestamp</div>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Альтернативный текст для почтовых клиентов без HTML
        $mail->AltBody = "
        Новая заявка с сайта Jewish Home
        
        Имя Фамилия: $name
        Имя Супруга: $spouseName
        Дата свадьбы/хупы: $weddingDate
        Телефон: $phone
        Email: $email
        Откуда узнали: $source
        Время отправки: $timestamp
        ";

        
        // Отправляем письмо
        $mail->send();
        
        // Возвращаем успешный ответ в формате JSON
        echo json_encode(['success' => true, 'message' => 'Сообщение успешно отправлено!']);
        exit;
        
    } catch (Exception $e) {
        error_log("Ошибка при отправке: " . $mail->ErrorInfo);
        echo json_encode(['success' => false, 'message' => 'Ошибка при отправке: ' . $mail->ErrorInfo]);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса']);
    exit;
}
?>