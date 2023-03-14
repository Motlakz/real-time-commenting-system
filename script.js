fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const currentUser = data.currentUser;
        const comments = data.comments;
    
        // reflect the data
        console.log('Current user:', currentUser);
        console.log('Comments:', comments);
    
        // Accessing individual comment objects and their properties
        const firstComment = comments[0];
        console.log('First comment:', firstComment);
        console.log('Comment content:', firstComment.content);
        console.log('Comment score:', firstComment.score);
    
        // Looping through comments and their replies
        comments.forEach(comment => {
          console.log('Comment:', comment);
          if (comment.replies.length > 0) {
            comment.replies.forEach(reply => {
              console.log('Reply:', reply);
            });
          }
        });
        
        
        const commentsSection = document.getElementById('comments-section');

        data.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `
                <small>${comment.score} likes</small>
                <img src="${comment.user.image.png}" srcset="${comment.user.image.png} 1x, ${comment.user.image.webp} 2x" alt="${comment.user.username}">
                <p>${comment.user.username}</p>
                <p>${comment.content}</p>
                <small>${comment.createdAt}</small>
            `;

            // Create replies HTML elements
            if (comment.replies.length > 0) {
                const repliesElement = document.createElement('ul');
                repliesElement.classList.add('replies');

                comment.replies.forEach(reply => {
                const replyElement = document.createElement('div');
                replyElement.innerHTML = `
                    <small>${reply.score} likes</small>
                    <img src="${reply.user.image.png}" srcset="${reply.user.image.png} 1x, ${reply.user.image.webp} 2x" alt="${reply.user.username}">
                    <p>${reply.user.username}</p>
                    <p>${reply.content}</p>
                    <small>${reply.createdAt}</small>
                `;

                repliesElement.appendChild(replyElement);
                });

                commentElement.appendChild(repliesElement);
            }

            commentsSection.appendChild(commentElement);
            });

            // Create currentUser HTML element
            const currentUserElement = document.createElement('div');
            currentUserElement.innerHTML = `
            <small>${data.currentUser.score} likes</small>
            <img src="${data.currentUser.image.png}" srcset="${data.currentUser.image.png} 1x, ${data.currentUser.image.webp} 2x" alt="${data.currentUser.username}">
            <p>${data.currentUser.username}</p>
            `;
            commentsSection.appendChild(currentUserElement);

            // Add textarea
            const newCommentElement = document.createElement('textarea');
            newCommentElement.placeholder = "Add comment";
            commentsSection.appendChild(newCommentElement);
    })

    // throw an error to the console if the data doesn't reflect
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

    