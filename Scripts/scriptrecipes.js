function showSection(sectionId) {
  const recipe = document.getElementById(sectionId);
  const recipeIndex = document.getElementById("segment2");
  if (!recipe) return;

  document.querySelectorAll(".recipes-page .abouts.food").forEach((section) => {
    section.classList.remove("activa");
    section.style.display = "none";
  });

  if (recipeIndex) recipeIndex.style.display = "none";
  document.body.classList.add("recipe-detail-open");
  recipe.classList.add("activa");
  recipe.style.display = "block";
  recipe.scrollIntoView({ behavior: "smooth", block: "start" });
}

function volverRecetas() {
  const recipeIndex = document.getElementById("segment2");

  document.querySelectorAll(".recipes-page .abouts.food").forEach((section) => {
    section.classList.remove("activa");
    section.style.display = "none";
  });

  document.body.classList.remove("recipe-detail-open");

  if (recipeIndex) {
    recipeIndex.style.display = "block";
    recipeIndex.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
