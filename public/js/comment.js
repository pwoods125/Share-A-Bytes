async function newCommentFormHandler(event) {
  event.preventDefault();

  const userComment = document.querySelector('#usercomment').value.trim();

  if (userComment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        userComment,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to post comment!');
    }
  }
}

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);
