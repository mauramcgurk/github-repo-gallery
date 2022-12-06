const profileOverview = document.querySelector(".overview"); //profile overview
const username = "mauramcgurk"; //need quotes!!!
const repoList = document.querySelector(".repo-list");

const getProfileData = async function () {
    const request = await fetch (`https://api.github.com/users/${username}`);
    const profileData = await request.json();
    console.log(profileData);
    displayProfile(profileData); //
}

const displayProfile = function (profileData) { //keep it outside so it's available for all. Don't pass request as paramaeter bc it has too much extra info. Json data is what we need. 
    const userInfo = document.createElement("user-info");
    userInfo.innerHTML = `<figure>
    <img alt="user avatar" src=${profileData.avatar_url} /> 
  </figure>
  <div>
    <p><strong>Name:</strong> ${profileData.name}</p>
    <p><strong>Bio:</strong> ${profileData.bio}</p>
    <p><strong>Location:</strong> ${profileData.location}</p>
    <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
  </div>` //thi is all in a string bc need to embed within $ later and string is easiest way
    profileOverview.appendChild(userInfo); //adding as a child. InnerHTML is kind of doing the same thing.
}

const getRepos = async function () {
    const request = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    const repos = await request.json();
    console.log(repos);
}

getRepos();

getProfileData(); //calling function - if you don't call it nothing will happen. That's why you call outside function. Making it isn't enough.


const getRepoData = async function () {//this is Step 3 of 7 "Fetch Repo Data"
  
}

const displayRepoNames = async function () {
  
}