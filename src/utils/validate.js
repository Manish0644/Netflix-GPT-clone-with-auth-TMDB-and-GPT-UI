export const checkValidData = (name, email, password, isSignInForm) => {
  // Only validate name when signing up
  if (!isSignInForm) {
    const trimmedName = name.trim();

    // 3–30 chars, letters + single spaces between words
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (
      trimmedName.length < 3 ||
      trimmedName.length > 30 ||
      !nameRegex.test(trimmedName)
    ) {
      return "Name must be 3–30 characters (letters and spaces only)";
    }
  }

  const isEmailValid =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid)
    return "Password must include upper, lower, number, min 8 chars";

  return null;
};
