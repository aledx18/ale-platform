import type { AuthError } from "@supabase/supabase-js";

const MESSAGES: Record<string, string> = {
  invalid_credentials: "Email or password is incorrect.",
  email_not_confirmed: "Confirm your email before signing in.",
  user_already_exists: "An account with this email already exists.",
  weak_password: "Password is too weak.",
  over_request_rate_limit: "Too many attempts. Try again later.",
  otp_expired: "This link has expired. Request a new one.",
  same_password: "New password must be different from the current one.",
};

export function getAuthErrorMessage(error: AuthError | Error | null | undefined): string {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  if ("code" in error && typeof error.code === "string") {
    const mapped = MESSAGES[error.code];
    if (mapped) {
      return mapped;
    }
  }

  if (error.message) {
    const lower = error.message.toLowerCase();
    if (lower.includes("invalid login credentials")) {
      return MESSAGES.invalid_credentials ?? error.message;
    }
    if (lower.includes("email not confirmed")) {
      return MESSAGES.email_not_confirmed ?? error.message;
    }
    if (lower.includes("user already registered")) {
      return MESSAGES.user_already_exists ?? error.message;
    }
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
