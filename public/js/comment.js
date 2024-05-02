async function newCommentFormHandler(event) {
  event.preventDefault();

  const comment = document
    .querySelector('input[name="usercomments"]')
    .value.trim();
  const { postid } = event.target.dataset;

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        comment,
        postid,
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
  .querySelector('#new-comment-form')
  .addEventListener('submit', newCommentFormHandler);
