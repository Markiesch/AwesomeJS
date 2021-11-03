const projectSection = document.querySelector(".projects--section");

for (const project of projects) {
  projectSection.innerHTML += `
    <article>
      <a href="projects/${project.title}/" class="image--container">
        <img src="assets/images/projects/${project.title}.png" alt="${project.title}" />
      </a>
      <div class="information">
        <h2 class="title">${project.title}</h2>
        <p class="paragraph">${project.description}</p>
        <a class="link" href="${project.authorLink}" aria-label="author" target="_blank" rel="noopener">${project.authorName}</a>
      </div>
    </article>
  `;
}

// Inserting fillers
projectSection.innerHTML += "<article class='filler'></article><article class='filler'></article>";
