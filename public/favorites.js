document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".add-to-favorites");
  
    favoriteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const blog = {
          id: button.getAttribute("data-id"),
          title: button.getAttribute("data-title"),
          image: button.getAttribute("data-image"),
        };
  
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const exists = favorites.find((fav) => fav.id === blog.id);
  
        if (!exists) {
          favorites.push(blog);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          alert("Blog added to favorites! ❤️");
        } else {
          alert("This blog is already in favorites!");
        }
      });
    });
  });
  