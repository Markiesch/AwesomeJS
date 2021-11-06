const template = {
  // The title of your project
  title: "Project title",
  // A description that tells something about your project
  description: "The project description goes here, and this is just some extra text.",
  // Your name, surname or username
  authorName: "Author",
  // Your social media link (github preferred)
  authorLink: "https://github.com/author",
};

const projects = [
  {
    title: "password-generator",
    description: "Generate random passwords!",
    authorName: "Markiesch",
    authorLink: "https://github.com/Markiesch",
  },
  {
    title: "progressbar",
    description: "A simple progress bar that you can modify with buttons!",
    authorName: "Markiesch",
    authorLink: "https://github.com/Markiesch",
  },
  {
    title: "colorflipper",
    description: "Generate random colors with a click on a button!",
    authorName: "Markiesch",
    authorLink: "https://github.com/Markiesch",
  },
  {
    title: "newyear-countdown",
    description: "A countdown to the next first of Januari",
    authorName: "Markiesch",
    authorLink: "https://github.com/Markiesch",
  },
  {
    title: "clamp-generator",
    description: "An easy to use Clamp Generator for the best typography",
    authorName: "Markiesch",
    authorLink: "https://github.com/Markiesch",
  },
  {
    title: "notes",
    description: "A notes web-application where you can store and download your favorite notes.",
    authorName: "Markiesch",
    authorLink: "https://github.com/Markiesch",
  },
];

const projectSection = document.querySelector(".projects--section");

for (const project of projects) {
  projectSection.innerHTML += `
    <article>
      <a href="projects/${project.title}/" class="image--container">
        <img src="assets/projects/${project.title}.png" alt="${project.title}" />
      </a>
      <div class="information">
        <h2 class="title">${project.title}</h2>
        <p class="paragraph description">${project.description}</p>
        <div class="link--container">
          <p class="paragraph author">by <a href="${project.authorLink}" aria-label="author" target="_blank" rel="noopener">${project.authorName}</a></p>
          <a href="https://github.com/Markiesch/AwesomeJS/tree/main/projects/${project.title}" aria-label="sourcecode" target="_blank" rel="noopener">
            <svg viewBox="0 0 384 512">
              <path d="M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zM123.206 400.505a5.4 5.4 0 0 1-7.633.246l-64.866-60.812a5.4 5.4 0 0 1 0-7.879l64.866-60.812a5.4 5.4 0 0 1 7.633.246l19.579 20.885a5.4 5.4 0 0 1-.372 7.747L101.65 336l40.763 35.874a5.4 5.4 0 0 1 .372 7.747l-19.579 20.884zm51.295 50.479l-27.453-7.97a5.402 5.402 0 0 1-3.681-6.692l61.44-211.626a5.402 5.402 0 0 1 6.692-3.681l27.452 7.97a5.4 5.4 0 0 1 3.68 6.692l-61.44 211.626a5.397 5.397 0 0 1-6.69 3.681zm160.792-111.045l-64.866 60.812a5.4 5.4 0 0 1-7.633-.246l-19.58-20.885a5.4 5.4 0 0 1 .372-7.747L284.35 336l-40.763-35.874a5.4 5.4 0 0 1-.372-7.747l19.58-20.885a5.4 5.4 0 0 1 7.633-.246l64.866 60.812a5.4 5.4 0 0 1-.001 7.879z">
              </path>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
