const profileOverview = document.querySelector(".overview"); //profile overview
const username = "mauramcgurk"; //need quotes!!!
const repoList = document.querySelector(".repo-list");
const repoBlock = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");

const getProfileData = async function () {
    const request = await fetch (`https://api.github.com/users/${username}`);
    const profileData = await request.json();
    //console.log(profileData);
    displayProfile(profileData); //
};

const displayProfile = function (profileData) { //keep it outside so it's available for all. Don't pass request as paramaeter bc it has too much extra info. Json data is what we need. 
    const userInfo = document.createElement("user-info");
    userInfo.innerHTML = `
      <figure>
        <img alt="user avatar" src=${profileData.avatar_url} /> 
      </figure>
      <div>
        <p><strong>Name:</strong> ${profileData.name}</p>
        <p><strong>Bio:</strong> ${profileData.bio}</p>
        <p><strong>Location:</strong> ${profileData.location}</p>
        <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
      </div>` //this is all in a string bc need to embed within $ later and string is easiest way
    
   profileOverview.appendChild(userInfo); //adding as a child. InnerHTML is kind of doing the same thing.

    getRepos();
  };

const getRepos = async function () {
    const request = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await request.json();
    console.log(repos);
    displayRepoNames(repos);
};

getProfileData(); //calling function - if you don't call it nothing will happen. That's why you call outside function. Making it isn't enough.

const displayRepoNames = async function (repos) {
  for (let repo of repos) {
    const li = document.createElement("li");//must be in loop because creating 18 times. If outside, doesn't work
    li.classList.add("repo");
    li.innerHTML = `
      <h3>${repo.name}</h3>`;
    repoList.appendChild(li); 
  }
};

repoList.addEventListener("click", function (e) {//we basically turned this into a button (the whole section)
  if (e.target.matches("h3")) {//doing the check
    let repoName = e.target.innerText //we know it's the h3 that we targeted earlier
  getRepoData (repoName);
  }
});

const getRepoData = async function (repoName) {
  const request = await fetch (`https://api.github.com/repos/${username}/${repoName}`);//I get a 404 error in console?
  const repoInfo = await request.json();
  console.log(repoInfo);
  //displayProfile(profileData); //I erased this by accident and my profile pic disappeared! Then I added back and it was "Undefined"?
  const fetchLanguages = await fetch (repoInfo.languages_url); // ask Arnav / I'm not sure what needs to happen here to use language property?
  const languageData = await fetchLanguages.json();
  //console.log(languageData);
  const languages = []; //empty array is for adding to
  for (const language in languages) { //Am I confusing var names here?
    console.log(language);
    languages.push(language);
  }

  displayRepoData(repoInfo, languages);
};


const displayRepoData = async function (repoInfo, languages) {
  individualRepoData.innerHTML = "";
  individualRepoData.classList.remove ("hide");
  repoBlock.classList.add ("hide"); //Is something going wrong here - after clicking on one, I can only see that one; the other 17 disappear unless I refresh page
 
  const div = document.createElement("div"); 
  
  div.innerHTML = 
  `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

  individualRepoData.append(div);
};

//displayRepoData ();

