export const VERIFICATION_LOG_EXPIRATION_MINUTES = 60;

export const VERIFICATION_EMAIL_SUBJECT =
  "Verify your email for Healing4Heroes";
export const VERIFICATION_EMAIL_BODY = (code: number) =>
  `Verification code: ${code}`;
