const profileOverview = document.querySelector(".overview"); //profile overview
const username = "mauramcgurk"; 
const repoList = document.querySelector(".repo-list");
const repoBlock = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos"); 
const filterInput = document.querySelector(".filter-repos");

const getProfileData = async function () {
    const request = await fetch (`https://api.github.com/users/${username}`);
    const profileData = await request.json();
    displayProfile(profileData); 
};

const displayProfile = function (profileData) { 
    const container = document.createElement("container");
    container.classList.add("user-info");
    container.innerHTML = `
      <figure>
        <img alt="user avatar" src=${profileData.avatar_url} /> 
      </figure>
      <div>
        <p><strong>Name:</strong> ${profileData.name}</p>
        <p><strong>Bio:</strong> ${profileData.bio}</p>
        <p><strong>Location:</strong> ${profileData.location}</p>
        <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
      </div>` 
    
   profileOverview.appendChild(container); 

    getRepos();
  };

const getRepos = async function () {
    const request = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await request.json();
    displayRepoNames(repos);
};

getProfileData(); 

const displayRepoNames = async function (repos) {
  filterInput.classList.remove ("hide");
  for (let repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `
      <h3>${repo.name}</h3>`;
    repoList.appendChild(li); 
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText 
  getRepoData (repoName);
  }
});

const getRepoData = async function (repoName) {
  const request = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await request.json();
  const fetchLanguages = await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  const languages = []; 
  for (const language in languageData) { 
    languages.push(language);
  }

  displayRepoData(repoInfo, languages);
};


const displayRepoData = async function (repoInfo, languages) {
  individualRepoData.innerHTML = "";
  individualRepoData.classList.remove ("hide");
  repoBlock.classList.add ("hide"); 
  viewReposButton.classList.remove ("hide");
 
  const div = document.createElement("div"); 
  
  div.innerHTML = 
  `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
  individualRepoData.append(div);
};

viewReposButton.addEventListener("click", function (e) {
  repoBlock.classList.remove ("hide"); 
  individualRepoData.classList.add ("hide");
  viewReposButton.classList.add ("hide");
  }
);

filterInput.addEventListener("input", function (e) {
 const searchTextInput = e.target.value;

 const repos = document.querySelectorAll(".repo");
 const inputSearch = searchTextInput.toLowerCase();

 for (const repo of repos) { 
  const lowerCaseRepoName = repo.innerText.toLowerCase();
  if (lowerCaseRepoName.includes(inputSearch)) {
    repo.classList.remove ("hide");
  } 
else {
  repo.classList.add ("hide");
  } 
  }
});