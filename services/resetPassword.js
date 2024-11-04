const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendMail'); // Assuming this utility sends emails

// Request password reset function
const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  // Generate reset token and expiry time
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry

  await user.save();

  // Send reset link via email
  // const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  // const message = `You requested a password reset. Click this link to reset your password: ${resetUrl}`;
  
  // await sendEmail({
  //   to: user.email,
  //   subject: 'Password Reset Request',
  //   text: message
  // });

  return { message: 'Password reset email sent',
    resetToken: user.resetPasswordToken,
    resetExpires: user.resetPasswordExpires
   };
};

// Reset password function
const resetPassword = async (resetToken, newPassword) => {
  // const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Find user with the matching token and check if it's not expired
  // console.log(hashedToken)
  const user = await User.findOne({
    resetPasswordToken: resetToken,
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
