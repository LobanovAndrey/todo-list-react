export const signInMessages = {
  header: "Welcome back",
  submitButton: "Sign In",
  secondaryButton: "Sing Up",
  separatorText: "OR",
  loginWithGoogle: "Login with Google",
  loginWithGitGub: "Login with GitHub",
  secondaryButtonText: "Don't have an account?",
} as const;

export const signUpMessages = {
  header: "Create your account",
  submitButton: "Sign Up",
  secondaryButton: "Sign In",
  secondaryButtonText: "You already have an account?"
} as const;

export const validationMessages = {
  invalidEmail: "The email address is invalid",
  emptyEmail: "The email address cannot be empty",
  emailAlreadyExists: "The user already exists",
  emailNotFound: "Email address not found",
  emptyPassword: "Password cannot be empty",
  invalidPassword:
    "Passwords must be at least 6 characters and a number",
  wrongPassword: "Wrong password",
} as const;

export const placeholders = {
  emailTop: "Email",
  passwordTop: "Password",
  emailInput: "Enter email",
  passwordInput: "Enter password",
} as const;

