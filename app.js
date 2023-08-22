// Load the JSON file using an AJAX request
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    
    // parse the JSON data
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
            <span class="votes">
              <div class="upvote">
                <img src="./images/icon-plus.svg">
              </div>
              <span class="count">${comment.score}</span>
              <div class="downvote">
                <img src="./images/icon-minus.svg">
              </div>
            </span>
            <div class="details">
                <img src="${comment.user.image.png}" srcset="${comment.user.image.png} 1x, ${comment.user.image.webp} 2x" alt="${comment.user.username}">
                <span>${comment.user.username}</span>
                <small>${comment.createdAt}</small>
                <span><a href="" class="reply-btn"><i class="fas fa-reply"> </i> Reply</a></span>
            </div>
            <div class="comment">
                <p>${comment.content}</p>
            </div>
      `;

      commentsSection.appendChild(commentElement);

      // Create replies HTML elements
      if (comment.replies.length > 0) {
        const repliesElement = document.createElement('ul');

        comment.replies.forEach(reply => {
          const replyElement = document.createElement('li');
          replyElement.innerHTML = `
                <div class="replies">
                    <span class="votes">
                      <div class="upvote">
                        <img src="./images/icon-plus.svg">
                      </div>
                      <span class="count">${reply.score}</span>
                      <div class="downvote">
                        <img src="./images/icon-minus.svg">
                      </div>
                    </span>
            
                    <div class="details">
                        <img src="${reply.user.image.png}" srcset="${reply.user.image.png} 1x, ${reply.user.image.webp} 2x" alt="${reply.user.username}">
                        <span>${reply.user.username}</span>
                        <small>${reply.createdAt}</small>
                        <span><a href="" class="reply-btn"><i class="fas fa-reply"> </i> Reply</a></span>
                    </div>
            
                    <div class="reply">
                      <p>${reply.content}</p>
                    </div>
                </div>
          `;

          repliesElement.appendChild(replyElement);
        });

        commentsSection.appendChild(repliesElement);
        }
      });
      
    // function that increases and decreases votes on click
    function handleVoteCount(event, increment) {
      const countElement = event.target.closest('.votes').querySelector('.count');
      let currentCount = parseInt(countElement.innerText);
      const alreadyVoted = event.target.dataset.voted === 'true';

      if (alreadyVoted) {
        modal.style.display = "block";
          } else {
            if (increment) {
              currentCount++;
            } else {
              currentCount--;
              if (currentCount < 0) { 
                currentCount = 0;
              }
            }
            countElement.innerText = currentCount;
            event.target.dataset.voted = 'true';
          }
      }
    
    // if upvote is clicked, let vote added be true
    const upvoteElements = document.querySelectorAll('.upvote');
    upvoteElements.forEach((upvoteElement) => {
        upvoteElement.addEventListener('click', (event) => {
          handleVoteCount(event, true);
        });
    });
        
    // if downvote is clicked, let vote decreased be true/vote increased be false
    const downvoteElements = document.querySelectorAll('.downvote');
    downvoteElements.forEach((downvoteElement) => {
        downvoteElement.addEventListener('click', (event) => {
          handleVoteCount(event, false);
        });
    });

    // modal that tells user they've already voted
    var modal = document.getElementById("myModal");
    var closeBtn = document.getElementsByClassName("close")[0];

    closeBtn.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Create currentUser HTML element for a user that is viewing and about to make a new comment or send a reply
    const currentUserElement = document.createElement('div');
    currentUserElement.classList.add('new-comment-card');

    currentUserElement.innerHTML = `
    <img src="${data.currentUser.image.png}" srcset="${data.currentUser.image.png} 1x, ${data.currentUser.image.webp} 2x" alt="${data.currentUser.username}">
    <textarea name="comment" id="new-comment" cols="70" rows="5" placeholder="Add a comment..."></textarea>
    <button type="submit">SEND</button>
    `;
    commentsSection.appendChild(currentUserElement);
      
    // Retrieve the "SEND" button element
    const sendButton = document.querySelector('button[type="submit"]');
        
    // Attach an event listener to the "SEND" button
    sendButton.addEventListener('click', function() {
      // Retrieve the value of the comment textarea
      const commentTextarea = document.getElementById('new-comment');
      const comment = commentTextarea.value;
      
      if (comment === '') {
        alert('Please enter a comment');
        return;
      }

      // Create a new reply object with the comment and other relevant data
      const reply = {
        user: data.currentUser,
        content: comment,
        createdAt: new Date().toLocaleDateString(),
        score: 0
      };

      // Create a new reply element for the new reply
      const newReplyElement = createReplyElement(reply);

      // Append the new reply element to the list of existing replies
      const repliesList = document.querySelector('ul');
      repliesList.appendChild(newReplyElement);

      // Clear the comment textarea
      commentTextarea.value = '';
    });

    function createReplyElement(reply) {
      const replyElement = document.createElement('li');
      const replyContent = document.createElement('div');
      replyContent.classList.add('replies');

      const votesElement = document.createElement('span');
      votesElement.classList.add('votes');
      votesElement.innerHTML = `
        <div class="upvote">
          <img src="./images/icon-plus.svg">
        </div>
        <span class="count">${reply.score}</span>
        <div class="downvote">
          <img src="./images/icon-minus.svg">
        </div>
      `;

      const detailsElement = document.createElement('div');
      detailsElement.classList.add('details');
      detailsElement.innerHTML = `
        <img src="${reply.user.image.png}" srcset="${reply.user.image.png} 1x, ${reply.user.image.webp} 2x" alt="${reply.user.username}">
        <span>${reply.user.username}</span>
        <small>${reply.createdAt}</small>
        <div class="buttons">
          <a href="" class="cancel-btn" style="display:none">Cancel</a>
          <a href="" class="hide-btn"><i class="fas fa-eye"> </i> Hide Reply</a>
          <a href="" class="save-btn" style="display:none">Save</a>
          <a href="" class="delete-btn"><i class="fas fa-trash"> </i> Delete</a>
          <a href="" class="edit-btn">Edit</a>
        </div>

        <textarea class="edit-textarea" style="display:none" cols="65" rows="5" placeholder="Add a comment...">${reply.content}</textarea>
      `;

      // allow the edit button for the current user reply to open a new textarea and save the updated comment with a new timestamp
      const editButton = detailsElement.querySelector('.edit-btn');
      editButton.addEventListener('click', function(event) {
        event.preventDefault();
        const contentElement = replyContent.querySelector('p');
        const editTextarea = detailsElement.querySelector('.edit-textarea');
        const saveButton = detailsElement.querySelector('.save-btn');
        const cancelButton = detailsElement.querySelector('.cancel-btn');
        contentElement.style.display = 'none';
        editTextarea.style.display = 'block';
        editTextarea.focus();

        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
        cancelButton.style.display = 'inline-block';
        detailsElement.querySelector('.hide-btn').style.display = 'none';
      });

      const saveButton = detailsElement.querySelector('.save-btn');
      saveButton.addEventListener('click', function(event) {
        event.preventDefault();
        const contentElement = replyContent.querySelector('p');
        const editTextarea = detailsElement.querySelector('.edit-textarea');
        const editContent = editTextarea.value;
        const editTime = new Date().toLocaleString();

        contentElement.innerText = editContent;
        reply.content = editContent;
        reply.createdAt = editTime;

        contentElement.style.display = 'block';
        editTextarea.style.display = 'none';

        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';
        detailsElement.querySelector('.cancel-btn').style.display = 'none';
        detailsElement.querySelector('.hide-btn').style.display = 'inline-block';
      });

      const cancelButton = detailsElement.querySelector('.cancel-btn');
      cancelButton.addEventListener('click', function(event) {
        event.preventDefault();
        const contentElement = replyContent.querySelector('p');
        const editTextarea = detailsElement.querySelector('.edit-textarea');
        
        contentElement.style.display = 'block';
        editTextarea.style.display = 'none';

        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
        detailsElement.querySelector('.hide-btn').style.display = 'inline-block';
      });


      const contentElement = document.createElement('p');
      contentElement.innerText = reply.content;

      replyContent.appendChild(votesElement);
      replyContent.appendChild(detailsElement);
      replyContent.appendChild(contentElement);

      replyElement.appendChild(replyContent);

      const hideButton = detailsElement.querySelector('.hide-btn');
      hideButton.addEventListener('click', function(event) {
        event.preventDefault();
        replyElement.style.filter = "blur(3px)";
      });

      const deleteButton = detailsElement.querySelector('.delete-btn');
      deleteButton.addEventListener('click', function(event) {
        event.preventDefault();
        const modal = document.querySelector('.delete-modal');
        modal.style.display = 'block';
        const deleteConfirmBtn = document.querySelector('#delete-confirm-btn');
        deleteConfirmBtn.addEventListener('click', function(event) {
          event.preventDefault();
          replyElement.remove();
          modal.style.display = 'none';
        });
        const cancelBtns = document.querySelectorAll('.cancel, .close');
        for (let i = 0; i < cancelBtns.length; i++) {
          cancelBtns[i].addEventListener('click', function(event) {
            event.preventDefault();
            modal.style.display = 'none';
          });
        }
      });

      return replyElement;
    }
    
})
  // throw an error to the console if the data doesn't reflect
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

