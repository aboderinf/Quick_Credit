const signupBtn = document.getElementById('signupBtn');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cPassword = document.getElementById('cPassword');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

const signupErr = document.querySelector('div#signupErr');
const emailErr = document.querySelector('div#emailErr');
const passwordErr = document.querySelector('div#passwordErr');
const cPasswordErr = document.querySelector('div#cPasswordErr');

// Adapted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
function isValidPassword(value) {
  if (!/[a-z]/.test(value)) {
    return 'Your password must contain at least one lowercase letter';
  } if (!/[A-Z]/.test(value)) {
    return 'Your password must contain at least one uppercase letter';
  } if (!/\d/.test(value)) {
    return 'Your password must contain at least one number';
  } if (!/[@$!%*?&]/.test(value)) {
    return 'Your password must contain at least one of these special characters: @, $, !, %, *, ?, &';
  } if (value.length < 6) {
    return 'Your password must be composed of at least 6 characters';
  }
  return 'true';
}

email.onchange = () => {
  emailErr.innerHTML = /\S+@\S+\.\S+/.test(email.value) ? '' : 'Please enter a valid email';
  signupErr.innerHTML = '';
  cPasswordErr.innerHTML = '';
};
password.onchange = () => {
  passwordErr.innerHTML = isValidPassword(password.value) === 'true' ? '' : isValidPassword(password.value);
  cPasswordErr.innerHTML = cPassword.value === password.value ? '' : "Passwords don\'t match";
};
cPassword.oninput = () => {
  cPasswordErr.innerHTML = cPassword.value === password.value ? '' : "Passwords don\'t match";
};

signupBtn.onmouseover = () => {
  if (emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || cPasswordErr.innerHTML !== '') {
    signupBtn.style.opacity = 0.6;
  } else {
    signupBtn.style.opacity = 1;
    signupBtn.style.cursor = 'pointer';
  }
};

signupBtn.onclick = () => {
  if (emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || cPasswordErr.innerHTML !== '') {
    signupErr.innerHTML = 'Please correct the errors in red below';
  }
  else if (firstName.value === '' || lastName.value === '') {
    signupErr.innerHTML = 'Please fill in all the fields';
  }
};
