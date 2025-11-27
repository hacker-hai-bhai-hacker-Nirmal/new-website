// src/types/brevo.d.ts
// Type definitions for Brevo email service

export interface EmailResult {
  success: boolean;
  messageId?: string;
  message: string;
  error?: string;
}

export interface BrevoEmailData {
  sender: {
    name: string;
    email: string;
  };
  to: Array<{
    email: string;
    name: string;
  }>;
  subject: string;
  htmlContent: string;
}

export interface BrevoApiResponse {
  messageId: string;
}
