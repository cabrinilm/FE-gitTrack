export function mapAuthError(error: any): string {

  console.error("Auth error:", error);

  const message = error?.message?.toLowerCase() || '';

 
  if (message.includes('already registered') || message.includes('duplicate key')) {
    return "Email already in use. Please log in or use a different email.";
  }

 
  if (message.includes('weak_password') || message.includes('at least 6 characters')) {
    return "Password is too weak. It must be at least 6 characters long.";
  }

  
  return "An error occurred during sign up. Please try again.";
}