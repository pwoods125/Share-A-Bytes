const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signupUsername').value.trim();
  const password = document.querySelector('#pwsignup').value.trim();
  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name: username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.signupbtn')
  .addEventListener('click', signupFormHandler);
