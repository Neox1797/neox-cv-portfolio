# 📱 Guía de Configuración: Bot de Notificaciones en Telegram

Esta guía paso a paso te enseñará a crear tu propio **Bot de Telegram gratuito** para recibir una notificación instantánea en tu celular cada vez que alguien te escriba un mensaje desde tu portafolio web.

---

## 🛠️ Paso 1: Crear tu Bot en Telegram (1 minuto)

1. Abre la aplicación de **Telegram** en tu celular o computadora.
2. En la barra de búsqueda busca a **`@BotFather`** *(el bot oficial verificado con palomita azul)*.
3. Haz clic en **Start** o envíale el mensaje:
   ```text
   /newbot
   ```
4. Te pedirá asignarle un nombre a tu bot. Escribe:
   ```text
   Edgar Portfolio Notifier
   ```
5. Te pedirá asignar un nombre de usuario que termine en `bot`. Escribe por ejemplo:
   ```text
   edgar_portfolio_notifier_bot
   ```
6. **¡Listo!** `@BotFather` te entregará tu **API Token**. Luce como una cadena larga de texto similar a esta:
   ```text
   7123456789:ABCdefGhIJKlmNoPQRstUVwxYZ
   ```
   *(Guarda este Token, lo usaremos en el Paso 3)*.

---

## 🆔 Paso 2: Obtener tu `chat_id` Personal

1. En la búsqueda de Telegram busca al bot **`@userinfobot`**.
2. Presiona **Start** o envíale `/start`.
3. Te responderá con tus datos personales. Copia el número que aparece en **`Id`** (ejemplo: `987654321`).

---

## ⚡ Paso 3: Configurar el Webhook en Supabase (Sin Servidores)

1. Entra a tu panel en **[supabase.com](https://supabase.com/dashboard)** e ingresa a tu proyecto.
2. En el menú lateral izquierdo ve a **Database** ➔ **Webhooks** ➔ Haz clic en **Create a Webhook**.
3. Configura los campos exactamente así:

   * **Name**: `Telegram Push Notification`
   * **Table**: `contact_messages`
   * **Events**: Marca **ÚNICAMENTE `INSERT`**
   * **Webhook Type**: `HTTP Request`
   * **Method**: `POST`
   * **URL**:
     ```text
     https://api.telegram.org/bot<TU_BOT_TOKEN_DE_PASO_1>/sendMessage
     ```
     *(Ejemplo: `https://api.telegram.org/bot7123456789:ABCdefGhIJKlmNoPQRstUVwxYZ/sendMessage`)*

   * **HTTP Headers**:
     * Key: `Content-Type`
     * Value: `application/json`

   * **HTTP Body (Payload JSON)**:
     ```json
     {
       "chat_id": "<TU_CHAT_ID_DE_PASO_2>",
       "text": "📬 <b>¡Nuevo Mensaje en tu Portafolio!</b>\n\n👤 <b>Nombre:</b> {{record.name}}\n✉️ <b>Email:</b> {{record.email}}\n📌 <b>Asunto:</b> {{record.subject}}\n🌍 <b>Entorno:</b> {{record.environment}}\n\n💬 <b>Mensaje:</b>\n{{record.message}}",
       "parse_mode": "HTML"
     }
     ```

4. Haz clic en **Save**.

---

## 🧪 Paso 4: Probar la Notificación

1. Abre tu portafolio web (`http://localhost:5174/` o tu URL en Vercel).
2. Ve al formulario de contacto y envía un mensaje de prueba.
3. En menos de **1 segundo**, ¡sonará una notificación en tu teléfono enviada por tu nuevo Bot de Telegram! 📲🚀
