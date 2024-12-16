const SibApiV3Sdk = require('sib-api-v3-sdk');

// Configure SendinBlue API client
const client = SibApiV3Sdk.ApiClient.instance;

// Set up your SendinBlue API key (Make sure to add your actual API Key here)
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;  // Add your API key in the .env file

const sendEmail = async (toEmail, subject, htmlContent) => {
  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  // Define the sender email (Make sure this email is registered with SendinBlue)
  const sender = {
    email: 'yadavgopinath93@gmail.com',  // Fixed duplicate @gmail.com
    name:'Gopinath  '
};

  // Receiver email (The email you want to send to)
  const receivers = [
    {
      email: toEmail
    }
  ];

  // Send the email using SendinBlue
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: subject,
      htmlContent: htmlContent
    });

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error('Unable to send email');
  }
};

module.exports = sendEmail;
