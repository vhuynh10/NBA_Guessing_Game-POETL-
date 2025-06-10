const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 128;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~\\-]/.test(password);

    const errors = [];
    password = password.trim();

    if (password.length < minLength) errors.push(`Password must be at least ${minLength} characters long`);
    if (password.length > maxLength) errors.push(`Password must not exceed ${maxLength} characters`);
    if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
    if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
    if (!hasNumber) errors.push('Password must contain at least one number');
    if (!hasSpecialChar) errors.push('Password must contain at least one special character');

    return {
        isValid: errors.length === 0,
        errors
    };
};

export default validatePassword;
