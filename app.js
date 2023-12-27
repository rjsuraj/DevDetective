const searchInput = document.querySelector("[data-searchInput]");
const searchBtn = document.querySelector("[data-searchBtn]");

async function fetchUserInfo() {

    let userName = searchInput.value;
    let response = await fetch(`https://api.github.com/users/${userName}`);
    let userData = await response.json();
    console.log(userData);

    renderUserInfo(userData);
}

function renderUserInfo(userData){

    let userImg = document.querySelector("[data-user-img]");
    let userName = document.querySelector("[data-user-name]");
    let userId = document.querySelector("[data-user-id]");
    let joinedDate = document.querySelector(".date");
    let userBio = document.querySelector(".user-bio");
    let repos = document.querySelector("[data-repos]");
    let followers = document.querySelector("[data-followers]");
    let following = document.querySelector("[data-following]");
    let location = document.querySelector("[data-location]")
    let blog = document.querySelector("[data-blog]")
    let twitterUserName = document.querySelector("[data-twitter]")
    let companyName = document.querySelector("[data-company]")

    userImg.src = userData.avatar_url;
    userName.textContent = userData.name;
    userId.textContent = userData.login;
    
    let formattedDate = new Date(userData.created_at);
    formattedDate = formattedDate.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
    joinedDate.textContent = `Joined ${formattedDate}`;

    repos.textContent = userData.public_repos;
    followers.textContent = userData.followers;
    following.textContent = userData.following;

    if (userData.bio)
        userBio.textContent = userData.bio;
    else
        userBio.textContent = "This profile has no bio";

    if (userData.location)
        location.textContent = userData.location;
    else
        location.textContent = "Not Available";

    if (userData.blog)
        blog.textContent = userData.blog;
    else
        blog.textContent = "Not Available";

    if (userData.twitter_username)
        twitterUserName.textContent = userData.twitter_username;
    else
        twitterUserName.textContent = "Not Available";

    if (userData.company)
        companyName.textContent = userData.company;
    else
        companyName.textContent = "Not Available";

}

searchBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    fetchUserInfo();
})