
document.addEventListener("DOMContentLoaded", function () {
    const createPostForm = document.getElementById("create-post-form");
    const postsContainer = document.getElementById("posts");
    const logoutButton = document.getElementById("logout-button"); // Add this line
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
  
    let posts = []; 
  
    createPostForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const mediaFile = document.getElementById("media").files[0];
  
      if (title && content) {
        const post = createPost(title, content, mediaFile);
        posts.push(post);
        renderPosts();
        createPostForm.reset();
      }
    });
  
    searchButton.addEventListener("click", function () {
      const keyword = searchInput.value.toLowerCase();
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
      );
      renderPosts(filteredPosts);
    });
  
    function createPost(title, content, mediaFile) {
      const post = {
        title,
        content,
        likes: 0,
        dislikes: 0,
        comments: [],
        mediaFile,
      };
      return post;
    }
  
    function renderPosts(postsToRender = posts) {
      postsContainer.innerHTML = "";
      postsToRender.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
  
        const postTitle = document.createElement("h2");
        postTitle.textContent = post.title;
        postTitle.addEventListener("click", () => toggleContent(postElement));
  
        const postContent = document.createElement("p");
        postContent.textContent = post.content;
  
        const likeButton = createButton(`Like (${post.likes})`);
        likeButton.addEventListener("click", () => {
          post.likes++;
          renderPosts();
        });
        
        const dislikeButton = createButton(`Dislike (${post.dislikes})`);
        dislikeButton.addEventListener("click", () => {
          post.dislikes++;
          renderPosts();
        });
        
  
        
        const editButton = createButton("Edit");
        editButton.addEventListener("click", () => {
          editPost(index);
        });

        const deleteButton = createButton("Delete");
        deleteButton.addEventListener("click", () => {
          deletePost(index);
        });

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Add a comment";
        commentInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            const comment = e.target.value;
            if (comment) {
              post.comments.push(comment);
              e.target.value = "";
              renderPosts();
            }
          }
        });
        
        const commentsList = document.createElement("ol");
        post.comments.forEach((comment) => {
          const commentItem = document.createElement("li");
          commentItem.textContent = comment;
          commentsList.appendChild(commentItem);
        });
  
        const postMedia = document.createElement("img");
        if (post.mediaFile) {
          postMedia.src = URL.createObjectURL(post.mediaFile);
          postMedia.classList.add("post-image");
        }
  
        postElement.appendChild(postTitle);
        postElement.appendChild(postContent);
        postElement.appendChild(likeButton);
        postElement.appendChild(dislikeButton);
        postElement.appendChild(editButton); 
        postElement.appendChild(deleteButton); 
        postElement.appendChild(commentInput);
        postElement.appendChild(commentsList);
        postElement.appendChild(postMedia);
  
        postsContainer.appendChild(postElement);
      });
    }
  
  function editPost(index) {
    const post = posts[index];
    const postElement = document.querySelector(`.post:nth-child(${index + 1})`);
    const postTitle = postElement.querySelector("h2");
    const postContent = postElement.querySelector("p");
  
    const newTitle = prompt("Edit Title:", post.title);
    const newContent = prompt("Edit Content:", post.content);
  
    if (newTitle !== null && newContent !== null) {
      post.title = newTitle;
      post.content = newContent;
  
      postTitle.textContent = newTitle;
      postContent.textContent = newContent;
    }
  }
  
    function createButton(label) {
      const button = document.createElement("button");
      button.textContent = label;
      return button;
    }
  
    function deletePost(index) {
      const confirmation = confirm("Are you sure you want to delete this post?");
      if (confirmation) {
        posts.splice(index, 1);
        renderPosts();
      }
    }
    function toggleContent(postElement) {
      const postContent = postElement.querySelector("p");
      postContent.style.display =
        postContent.style.display === "none" ? "block" : "none";
    }
    logoutButton.addEventListener("click", function () {
      window.location.href = "login.html";
  });
  });
  
