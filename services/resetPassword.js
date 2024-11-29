const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendMail');

// Request password reset function
const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  // Generate reset token and expiry time
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry

  
  // Send reset link via email
  const resetUrl = `http://localhost:5000/users/reset-password/${resetToken}`;
  const message = `You requested a password reset. Click this link to reset your password: ${resetUrl}`;
  
  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    text: message
  });
  await user.save();

  return { message: 'Password reset email sent' };
};

// Reset password function
const resetPassword = async (resetToken, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');


  // Find user with the matching token and check if it's not expired
  console.log(hashedToken)
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) throw new Error('Invalid or expired token');

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: 'Password has been reset' };
};

module.exports = { requestPasswordReset, resetPassword };
