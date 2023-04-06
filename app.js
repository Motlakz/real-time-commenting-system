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
        <div class="comment-card">
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
        </div>
      `;

      commentsSection.appendChild(commentElement);

      // Create replies HTML elements
      if (comment.replies.length > 0) {
        const repliesElement = document.createElement('ul');
        repliesElement.classList.add('replies');

        comment.replies.forEach(reply => {
          const replyElement = document.createElement('li');
          replyElement.innerHTML = `
            <li>
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
            </li>
          `;

          repliesElement.appendChild(replyElement);
        });

        commentsSection.appendChild(repliesElement);
      }
    });
    
    var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function handleVoteClick(event, increment) {
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
    
    const upvoteElements = document.querySelectorAll('.upvote');
    upvoteElements.forEach((upvoteElement) => {
      upvoteElement.addEventListener('click', (event) => {
        handleVoteClick(event, true);
      });
    });
    
    const downvoteElements = document.querySelectorAll('.downvote');
    downvoteElements.forEach((downvoteElement) => {
      downvoteElement.addEventListener('click', (event) => {
        handleVoteClick(event, false);
      });
    });    

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Create currentUser HTML element for a user that is viewing and about to make a new comment or send a reply
    const currentUserElement = document.createElement('div');
    currentUserElement.classList.add('comment-card');

    currentUserElement.innerHTML = `
    <div class="new-comment-card">
        <img src="${data.currentUser.image.png}" srcset="${data.currentUser.image.png} 1x, ${data.currentUser.image.webp} 2x" alt="${data.currentUser.username}">
        <textarea name="comment" id="new-comment" cols="70" rows="5" placeholder="Add a comment..."></textarea>
        <button type="submit">SEND</button>
    </div>
    `;
    commentsSection.appendChild(currentUserElement);
    
  })

  // throw an error to the console if the data doesn't reflect
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

