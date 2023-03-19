fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const currentUser = data.currentUser;
    const comments = data.comments;

    // reflect the data
    console.log('Current user:', currentUser);
    console.log('Comments:', comments);

    const commentsSection = document.getElementById('comments-section');

    data.comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment-card');

      commentElement.innerHTML = `
        <small class="vote"><button class="upvote"> + </button>${comment.score}<button class="downvote"> - </button></small>
        <div class="flex">
        <img src="${comment.user.image.png}" srcset="${comment.user.image.png} 1x, ${comment.user.image.webp} 2x" alt="${comment.user.username}">
        <span>${comment.user.username}</span>
        <small>${comment.createdAt}</small>
        <a class="reply-btn"><i class="fas fa-reply"></i> Reply</a>
        </div>
        <p>${comment.content}</p>
      `;

      commentsSection.appendChild(commentElement);

      // Create replies HTML elements
      if (comment.replies.length > 0) {
        const repliesElement = document.createElement('ul');
        repliesElement.classList.add('replies');

        comment.replies.forEach(reply => {
          const replyElement = document.createElement('li');
          replyElement.innerHTML = `
            <small class="vote"><button class="upvote"> + </button>${reply.score}<button class="downvote"> - </button></small>
            <div class="flex">
            <img src="${reply.user.image.png}" srcset="${reply.user.image.png} 1x, ${reply.user.image.webp} 2x" alt="${reply.user.username}">
            <span>${reply.user.username}</span>
            <small>${reply.createdAt}</small>
            <a class="reply-btn"><i class="fas fa-reply"></i> Reply</a>
            </div>
            <p>${reply.content}</p>
          `;

          repliesElement.appendChild(replyElement);
        });

        commentsSection.appendChild(repliesElement);
      }
    });

    // Create currentUser HTML element
    const currentUserElement = document.createElement('div');
    currentUserElement.classList.add('comment-card');

    currentUserElement.innerHTML = `
      <small>${data.currentUser.score}</small>
      <div class="flex">
      <img src="${data.currentUser.image.png}" srcset="${data.currentUser.image.png} 1x, ${data.currentUser.image.webp} 2x" alt="${data.currentUser.username}">
      <p>${data.currentUser.username}</p>
      <textarea placeholder="Add comment"></textarea>
      <button>SEND</button>
      <div>
    `;
    commentsSection.appendChild(currentUserElement);


  })

  // throw an error to the console if the data doesn't reflect
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });
