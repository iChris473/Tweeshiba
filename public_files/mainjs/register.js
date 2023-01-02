

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const confirmPassword = document.querySelector('.confirmPassword');
const password = document.querySelector('.password');
const wallet = document.querySelector('.wallet');
const email = document.querySelector('.email');
const telegram = document.querySelector('.telegram');
console.log(email, password)
const submitForm = async e => {

  e.preventDefault();

  if (confirmPassword.value != password.value) {
    window.alert("Passwords doesn't match")
    return
  }

  submit.disabled = true;

  submit.innerHTML = "Creating Account..."

  const newUser = {
    email: email.value,
    password: password.value,
    wallet: wallet.value,
    telegram: telegram.value
  }

  console.log(newUser)

  fetch(`${url}/user/register`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          window.alert(text.replace(/"/g, ''));
          return Promise.reject()
        });
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log(data);
      submit.innerHTML = "Register"
      window.location.href = "/"
    })
    .catch(function (error) {
      console.log(error)
      submit.disabled = false;
    })

}

form.addEventListener('submit', submitForm)