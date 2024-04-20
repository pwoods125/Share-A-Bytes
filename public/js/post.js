async function newFormHandler(event) {
  event.preventDefault();

  const postTitle = document.querySelector('#post_title').value;
  const content = document.querySelector('#content').value;

  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      postTitle,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to create post!');
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
