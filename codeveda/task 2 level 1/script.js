document.addEventListener('DOMContentLoaded', function () {
  let form = document.getElementById('registration-form');

  let nameInput = document.getElementById('name');
  let emailInput = document.getElementById('email');
  let phoneInput = document.getElementById('phone');
  let passwordInput = document.getElementById('password');

  let nameError = document.getElementById('name-error');
  let emailError = document.getElementById('email-error');
  let phoneError = document.getElementById('phone-error');
  let passwordError = document.getElementById('password-error');

  let strengthFill = document.getElementById('strength-fill');
  let strengthLabel = document.getElementById('strength-label');
  let successMsg = document.getElementById('success-msg');

  // Helper to display error messages and styles
  function showError(inputElement, errorSpan, message) {
    errorSpan.textContent = message;
    inputElement.classList.add('input-error');
    inputElement.classList.remove('input-success');
  }

  function clearError(inputElement, errorSpan) {
    errorSpan.textContent = '';
    inputElement.classList.remove('input-error');
    inputElement.classList.add('input-success');
  }

  // Individual field validation logic
  function validateName() {
    let value = nameInput.value.trim();
    if (value === '') {
      showError(nameInput, nameError, 'Name is required.');
      return false;
    }
    if (value.length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    let value = emailInput.value.trim();
    if (value === '') {
      showError(emailInput, emailError, 'Email is required.');
      return false;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(emailInput, emailError, 'Please enter a valid email (e.g. user@example.com).');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    let value = phoneInput.value.trim();
    if (value === '') {
      showError(phoneInput, phoneError, 'Phone number is required.');
      return false;
    }
    let phonePattern = /^\d{10}$/;
    if (!phonePattern.test(value)) {
      showError(phoneInput, phoneError, 'Phone number must be exactly 10 digits.');
      return false;
    }
    clearError(phoneInput, phoneError);
    return true;
  }

  function validatePassword() {
    let value = passwordInput.value;
    if (value === '') {
      showError(passwordInput, passwordError, 'Password is required.');
      updateStrengthBar(0);
      return false;
    }
    if (value.length < 8) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
      updateStrengthBar(1);
      return false;
    }
    
    let hasLetter = /[a-zA-Z]/.test(value);
    let hasNumber = /\d/.test(value);
    if (!hasLetter || !hasNumber) {
      showError(passwordInput, passwordError, 'Password must contain at least one letter and one number.');
      updateStrengthBar(2);
      return false;
    }

    clearError(passwordInput, passwordError);

    let hasSpecial = /[^a-zA-Z0-9]/.test(value);
    let score = 2;
    if (value.length >= 12) score++;
    if (hasSpecial) score++;
    
    updateStrengthBar(score);
    return true;
  }

  function updateStrengthBar(score) {
    let levels = [
      { width: '0%',   color: '#e2e8f0', label: '',        labelColor: '#94a3b8' },
      { width: '25%',  color: '#ef4444', label: 'Weak',    labelColor: '#ef4444' },
      { width: '50%',  color: '#f59e0b', label: 'Fair',    labelColor: '#f59e0b' },
      { width: '75%',  color: '#84cc16', label: 'Good',    labelColor: '#84cc16' },
      { width: '100%', color: '#22c55e', label: 'Strong',  labelColor: '#22c55e' }
    ];
    let level = levels[score];
    strengthFill.style.width = level.width;
    strengthFill.style.backgroundColor = level.color;
    strengthLabel.textContent = level.label;
    strengthLabel.style.color = level.labelColor;
  }

  // Listeners for on-blur validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  passwordInput.addEventListener('blur', validatePassword);

  passwordInput.addEventListener('input', function () {
    let value = passwordInput.value;
    let score = 0;
    if (value.length > 0) score = 1;
    if (value.length >= 8) score = 2;
    if (value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value)) score = 3;
    if (score === 3 && (value.length >= 12 || /[^a-zA-Z0-9]/.test(value))) score = 4;
    updateStrengthBar(score);
  });

  // Handle full form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    successMsg.style.display = 'none';

    let isNameValid = validateName();
    let isEmailValid = validateEmail();
    let isPhoneValid = validatePhone();
    let isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
