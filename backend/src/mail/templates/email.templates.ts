/**
 * BSW Brand Identity Constants
 */
const THEME = {
  primary: '#20AA9D',
  primaryDark: '#17857a',
  bgBody: '#f3f4f6',
  bgCard: '#ffffff',
  textMain: '#111827',
  textLight: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  alert: '#ef4444'
};

/**
 * LOGO CONFIGURATION
 * Direct link to the hosted image
 */
const LOGO_URL = "https://bsw.iitd.ac.in/assets/bsw_circle.svg";

/**
 * Shared layout components for email consistency
 */
const getHeader = () => `
  <div style="text-align: center; margin-bottom: 32px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    
    <img src="${LOGO_URL}" alt="BSW Logo" width="80" height="80" style="width: 80px; height: 80px; margin-bottom: 16px; display: inline-block; border: 0; outline: none; text-decoration: none; border-radius: 50%;">
    
    <div style="color: ${THEME.textMain}; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2;">Board for Student Welfare</div>
    <div style="color: ${THEME.primary}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">IIT Delhi</div>
  </div>
`;

const getFooter = () => `
  <div style="margin-top: 48px; border-top: 1px solid ${THEME.border}; padding-top: 32px; text-align: center; color: ${THEME.textLight}; font-size: 12px; line-height: 1.6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <p style="margin: 0 0 8px 0; font-weight: 700; color: ${THEME.textMain};">We have got your back.</p>
    <p style="margin: 0 0 24px 0;">
      Board for Student Welfare, IIT Delhi<br>
      Hauz Khas, New Delhi - 110016
    </p>
    
    <div style="margin-bottom: 24px;">
      <a href="mailto:bsw@iitd.ac.in" style="color: ${THEME.primary}; text-decoration: none; margin: 0 12px; font-weight: 600;">bsw@iitd.ac.in</a> | 
      <a href="https://bsw.iitd.ac.in" style="color: ${THEME.primary}; text-decoration: none; margin: 0 12px; font-weight: 600;">Website</a>
    </div>

    <p style="font-size: 11px; color: #9ca3af; margin: 0; max-width: 400px; margin-left: auto; margin-right: auto;">
      <strong>Note:</strong> This is an automated email. Please do not reply directly to this message. <br>
      If you face any issues, contact the BSW Technical Team at <a href="mailto:tech@bsw.iitd.ac.in" style="color: ${THEME.textLight}; text-decoration: underline;">tech@bsw.iitd.ac.in</a>.
    </p>
  </div>
`;

/**
 * Wraps dynamic content in the BSW standard HTML email layout
 */
const wrapEmail = (content: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { margin: 0; padding: 0; background-color: ${THEME.bgBody}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
      .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
      .card { background-color: ${THEME.bgCard}; padding: 48px 40px; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); text-align: left; }
      .btn { display: inline-block; background-color: ${THEME.primary}; color: #ffffff !important; text-decoration: none; padding: 16px 36px; border-radius: 50px; font-weight: bold; font-size: 15px; letter-spacing: 0.5px; transition: background-color 0.3s; box-shadow: 0 4px 6px -1px rgba(32, 170, 157, 0.3); }
      h1 { color: ${THEME.textMain}; font-size: 24px; font-weight: 800; margin-top: 0; margin-bottom: 20px; letter-spacing: -0.5px; text-align: center; }
      p { color: ${THEME.textLight}; font-size: 16px; line-height: 1.6; margin-bottom: 24px; }
      .data-box { background-color: #f8fafc; border: 1px solid ${THEME.border}; border-radius: 16px; padding: 24px; margin: 32px 0; }
      .data-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 6px; display: block; }
      .data-value { font-size: 16px; color: ${THEME.textMain}; font-weight: 600; margin-bottom: 16px; display: block; }
      .data-value:last-child { margin-bottom: 0; }
    </style>
  </head>
  <body>
    <div class="container">
      ${getHeader()}
      <div class="card">
        ${content}
      </div>
      ${getFooter()}
    </div>
  </body>
  </html>
`;

/**
 * Helper to retrieve Base URL without trailing slash
 */
const getBaseUrl = () => (process.env.BASE_URL || 'http://localhost:5173').replace(/\/$/, '');

export const BSWEmailTemplates = {
  
  /**
   * 1. OTP Verification Email
   */
  getOtpEmail: (name: string, otp: string) => wrapEmail(`
    <h1>Verify your Identity</h1>
    <p>Hi ${name},</p>
    <p>You requested a One-Time Password (OTP) to verify your account or perform a secured action on the BSW Portal.</p>
    <div style="background-color: #f0fdfa; border: 2px dashed ${THEME.primary}; border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0;">
      <span style="display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: ${THEME.primaryDark}; margin-bottom: 12px; font-weight: 800;">Your Verification Code</span>
      <span style="font-size: 42px; font-weight: 800; letter-spacing: 12px; color: ${THEME.textMain}; line-height: 1;">${otp}</span>
    </div>
    <p style="text-align: center; font-size: 14px;">This code is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.</p>
  `),

  /**
   * 2. Password Reset Link Email
   */
  getResetPasswordEmail: (name: string, token: string) => {
    const resetLink = `${getBaseUrl()}/resetPassword?token=${token}`;
    
    return wrapEmail(`
      <h1>Reset Your Password</h1>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to set a new one:</p>
      <div style="text-align: center; margin: 40px 0;">
        <a href="${resetLink}" class="btn">Reset Password</a>
      </div>
      <p style="font-size: 14px; color: #9ca3af; text-align: center;">This link expires in 30 minutes. If you didn't request this, you can safely ignore this email.</p>
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f3f4f6;">
        <p style="font-size: 12px; color: #d1d5db; text-align: center; margin-bottom: 8px;">Link not working? Paste this URL in your browser:</p>
        <p style="font-size: 12px; color: ${THEME.primary}; text-align: center; word-break: break-all; margin: 0;">${resetLink}</p>
      </div>
    `);
  },

  /**
   * 3. Signup Verification / Onboarding Email
   */
  getVerificationEmail: (name: string, token: string) => {
    const verifyLink = `${getBaseUrl()}/verifyEmail?token=${token}`;

    return wrapEmail(`
      <h1>Welcome to BSW! 🎉</h1>
      <p>Hi ${name},</p>
      <p>Your account is almost ready. To activate your account and complete your onboarding, please verify your email address.</p>
      <div style="text-align: center; margin: 40px 0;">
        <a href="${verifyLink}" class="btn">Verify Account</a>
      </div>
      <p style="font-size: 14px; color: #9ca3af; text-align: center;">This link helps us ensure you are a valid user of IIT Delhi.</p>
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f3f4f6;">
        <p style="font-size: 12px; color: #d1d5db; text-align: center; margin-bottom: 8px;">Link not working? Paste this URL:</p>
        <p style="font-size: 12px; color: ${THEME.primary}; text-align: center; word-break: break-all; margin: 0;">${verifyLink}</p>
      </div>
    `);
  },

  /**
   * 4. Password Change Success
   */
  getPasswordChangedEmail: (name: string) => wrapEmail(`
    <h1>Password Updated</h1>
    <p>Hi ${name},</p>
    <p>The password for your BSW Portal account was recently changed.</p>
    <div style="background-color: #fff1f2; border-left: 4px solid ${THEME.alert}; padding: 20px; border-radius: 8px; margin: 32px 0;">
      <p style="color: #991b1b; margin: 0; font-size: 15px; line-height: 1.5;"><strong>Security Alert:</strong> If you did not make this change, please contact <a href="mailto:tech@bsw.iitd.ac.in" style="color: #991b1b; text-decoration: underline;">tech@bsw.iitd.ac.in</a> immediately to secure your account.</p>
    </div>
    <p>You can now log in with your new credentials.</p>
  `),

  /**
   * 5. Complaint Registration Acknowledgement
   */
  getComplaintEmail: (name: string, complaintId: string, category: string, subject: string) => wrapEmail(`
    <h1>Grievance Registered</h1>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out. We have successfully registered your grievance. Our representatives will review it shortly.</p>
    <div class="data-box">
      <span class="data-label">Reference ID</span>
      <span class="data-value" style="font-family: monospace; font-size: 18px;">#${complaintId}</span>
      <span class="data-label">Category</span>
      <span class="data-value">${category}</span>
      <span class="data-label">Subject</span>
      <span class="data-value">${subject}</span>
    </div>
    <p>You can track the progress of your grievance on the portal using your Reference ID. We aim to respond within 3-5 working days.</p>
    <div style="text-align: center; margin: 40px 0;">
      <a href="https://bsw.iitd.ac.in/portal/grievances/${complaintId}" class="btn">View Status</a>
    </div>
  `),

  /**
   * 6. General Feedback Acknowledgement
   */
  getFeedbackEmail: (name: string, feedbackType: string) => wrapEmail(`
    <h1>Thanks for your Feedback!</h1>
    <p>Hi ${name},</p>
    <p>We've received your ${feedbackType} feedback. Your input helps us improve the student experience at IIT Delhi.</p>
    <div style="background-color: #eff6ff; border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0; border: 1px solid #dbeafe;">
      <p style="margin: 0; color: #1e40af; font-weight: 700; font-size: 18px; font-style: italic;">"Your voice matters."</p>
    </div>
    <p>Our team reviews all feedback periodically to drive policy changes and portal improvements. If your feedback requires a direct response, we will get back to you soon.</p>
  `),

  /**
   * 7. Post-Onboarding Welcome Email
   */
  getWelcomeEmail: (name: string) => {
    const dashboardLink = `${getBaseUrl()}/profile`;
    
    return wrapEmail(`
      <h1>You're In! Welcome to the Family. 💙</h1>
      <p>Hi ${name},</p>
      <p>Congratulations! Your onboarding is complete, and your profile is successfully set up.</p>
      <p>You now have full access to the BSW Portal. Here is what you can do next:</p>
      
      <div style="background-color: #f0fdfa; border-radius: 16px; padding: 24px; margin: 32px 0;">
        <ul style="margin: 0; padding-left: 20px; color: ${THEME.textMain}; line-height: 2;">
          <li>📢 <strong>Stay Updated:</strong> Check the latest official IITD notices.</li>
          <li>💬 <strong>Voice Concerns:</strong> Register anonymous grievances securely.</li>
          <li>📚 <strong>Resources:</strong> Access question papers and academic guides.</li>
        </ul>
      </div>

      <p>We are here to make your journey at IIT Delhi smoother and more memorable.</p>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${dashboardLink}" class="btn">Go to Dashboard</a>
      </div>
    `);
  },

  /**
   * 8. Complaint Resolved Notification
   */
  getComplaintResolvedEmail: (name: string, complaintId: string) => {
    const complaintLink = `${getBaseUrl()}/complaints/${complaintId}`;

    return wrapEmail(`
      <h1>Grievance Resolved ✅</h1>
      <p>Hi ${name},</p>
      <p>We are pleased to inform you that your registered grievance has been successfully reviewed and marked as <strong>resolved</strong> by the Board for Student Welfare.</p>
      
      <div class="data-box">
        <span class="data-label">Reference ID</span>
        <span class="data-value" style="font-family: monospace; font-size: 18px;">#${complaintId}</span>

        <span class="data-label">Status</span>
        <span class="data-value" style="color: ${THEME.success};">Resolved</span>
      </div>

      <p>If you believe the issue persists or requires further attention, you may reopen the grievance or create a new one through the portal.</p>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${complaintLink}" class="btn">View Grievance</a>
      </div>

      <p style="font-size: 14px; color: #9ca3af; text-align: center;">
        Thank you for helping us improve the student experience at IIT Delhi.
      </p>
    `);
  }
};