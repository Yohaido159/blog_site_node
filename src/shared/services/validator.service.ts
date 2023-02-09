export const emailValidate = (email: string): boolean => {
  /*
    ^: Matches the start of the string.
    [a-zA-Z0-9._%+-]+: Matches one or more characters that can be uppercase or lowercase letters (a-z or A-Z), digits (0-9), period (.), underscore (_), percent sign (%), plus sign (+), or hyphen (-). This part of the expression represents the local part of the email address.
    @: Matches the at sign (@).
    [a-zA-Z0-9.-]+: Matches one or more characters that can be uppercase or lowercase letters (a-z or A-Z), digits (0-9), period (.), or hyphen (-). This part of the expression represents the domain name.
    \.: Matches the period (.).
    [a-zA-Z]{2,}: Matches two or more characters that can be uppercase or lowercase letters (a-z or A-Z). This part of the expression represents the top-level domain (TLD) such as .com, .net, .org, etc.
    $: Matches the end of the string.
*/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const passwordValidate = (password: string): boolean => {
  /*
    One lowercase letter
    One uppercase letter
    One digit
    A minimum length of 8 characters.
    */
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return passwordRegex.test(password);
};

