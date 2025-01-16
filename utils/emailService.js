const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: {
      name: 'GameZone HQ',
      address: process.env.EMAIL_USER
    },
    to: userEmail,
    subject: 'Welcome to GameZone - Your Gaming Journey Begins!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2C3E50; margin-bottom: 10px;">Welcome to GameZone! 🎮</h1>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <p style="color: #2C3E50; font-size: 16px; line-height: 1.6;">Dear ${userName},</p>
          
          <p style="color: #2C3E50; font-size: 16px; line-height: 1.6;">Welcome to GameZone! We're thrilled to have you join our gaming community. Your account has been successfully created, and you're now ready to embark on an exciting gaming journey with us.</p>
          
          <p style="color: #2C3E50; font-size: 16px; line-height: 1.6;">With your GameZone account, you can:</p>
          <ul style="color: #2C3E50; font-size: 16px; line-height: 1.6;">
            <li>Access exclusive gaming content</li>
            <li>Connect with fellow gamers</li>
            <li>Track your gaming achievements</li>
            <li>Participate in gaming events and tournaments</li>
          </ul>
        </div>
        
        <div style="margin-top: 30px;">
          <p style="color: #2C3E50; font-size: 16px; line-height: 1.6;">If you have any questions or need assistance, our support team is always here to help. Just reply to this email!</p>
          
          <p style="color: #2C3E50; font-size: 16px; line-height: 1.6;">Game on!</p>
          
          <p style="color: #2C3E50; font-size: 16px; line-height: 1.6;">Best regards,<br>The GameZone Team</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
          <p>This email was sent to ${userEmail}. If you didn't create a GameZone account, please ignore this email.</p>
          <p>GameZone HQ • Your Ultimate Gaming Destination</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail
};