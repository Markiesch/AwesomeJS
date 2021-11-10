// Selecting DOM elements
const card = document.querySelector(".card");
const input = document.querySelector("input");

const BASE_URL = "https://api.github.com/users/";

input.addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;

  if (input.value) {
    getUser(input.value);
    input.value = "";
  }
});

async function getUser(username) {
  // Fetching user
  const resp = await fetch(BASE_URL + username);
  const respData = await resp.json();

  // Getting repositories
  const repos = await fetch(BASE_URL + username + "/repos");
  const reposData = await repos.json();

  createUserCard(respData);
  addReposToCard(reposData);
}

function createUserCard(user) {
  card.innerHTML = `
			<div class="avatar--container">
				<img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
			</div>
			<article>
				<h1>${user.login} ${user.name ? `<span>${user.name}</span>` : ""}</h1>
				<p>${user.bio || ""}</p>

				<div class="stats">
					<p>${user.followers || "0"}<span>Follower${user.followers === 1 ? "" : "s"}</span></p>
					<p>${user.following || "0"}<span>Following</span></p>
					<p>${user.public_repos || "0"}<span>Repos</span></p>
				</div>

				<div class="repos"></div>
			</article=>
    `;
}

function addReposToCard(repos) {
  const repositoryEl = document.querySelector(".repos");
  for (const repo of repos) repositoryEl.innerHTML += `<a class="repo" href="${repo.html_url}" target="_blank">${repo.name}</a>`;
}

// Initialize
getUser("Markiesch");
