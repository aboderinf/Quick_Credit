const loginBtn = document.querySelector('#loginBtn');
const email = document.querySelector('#email');
const admin = 'admin@quickcredit.com';

loginBtn.onclick = () => {
  if (email.value === admin) {
    window.location.href = 'Admin.html';
  }
  else { window.location.href = 'User.html' ;}
};
