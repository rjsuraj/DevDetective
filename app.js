const get = (value) => document.querySelector(value);
const searchInput = get("[data-searchInput]");
const searchBtn = get("[data-searchBtn]");
const crossIcon = get(".cross-icon");
const errorMsg = get(".error-msg");

const userImg = get("[data-user-img]");
const userName = get("[data-user-name]");
const userId = get("[data-user-id]");
const joinedDate = get(".date");
const userBio = get(".user-bio");
const repos = get("[data-repos]");
const followers = get("[data-followers]");
const following = get("[data-following]");
const userLocation = get("[data-location]");
const blog = get("[data-blog]")
const twitterUserName = get("[data-twitter]")
const companyName = get("[data-company]")

const root = document.documentElement.style;
const modeBtn = get(".mode-btn");
const modeText = get(".mode-text");
const darkModeIcon = get(".dark-mode-icon");
const lightModeIcon = get(".light-mode-icon");
let darkmode;


async function fetchUserInfo(userName) {

    try {

        let response = await fetch(`https://api.github.com/users/${userName}`);
        let userData = await response.json();

        if (!(userData.login))
            throw userData

        renderUserInfo(userData);
    }
    catch (error) {
        if(error.message === "Not Found")
            errorMsg.classList.add("active");
    }

}

function renderUserInfo(userData) {

    errorMsg.classList.remove("active");
    function checkNull(param1, param2) {

        if (param1 === "" || param1 === null) {
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return false;
        }
        else {
            param2.style.opacity = 1;
            param2.previousElementSibling.style.opacity = 1;
            return true;
        }
    }

    userImg.src = userData.avatar_url;
    userName.textContent = userData.name;
    userId.textContent = `@${userData.login}`;
    userId.href = userData.html_url? `${userData.html_url}`: "#";

    let formattedDate = new Date(userData.created_at);
    formattedDate = formattedDate.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
    joinedDate.textContent = `Joined ${formattedDate}`;

    repos.textContent = userData.public_repos;

    followers.textContent = userData.followers;

    following.textContent = userData.following;

    userBio.textContent = userData.bio ? userData.bio : "This profile has no bio";

    userLocation.textContent = checkNull(userData.location, userLocation) ? userData.location : "Not Available";

    blog.textContent = checkNull(userData.blog, blog) ? userData.blog : "Not Available";
    blog.href = userData.blog? `${userData.blog}`: "#";

    twitterUserName.textContent = checkNull(userData.twitter_username, twitterUserName) ? userData
        .twitter_username : "Not Available";
    twitterUserName.href = userData.twitter_username? `https://twitter.com/${userData.twitter_username}`: "#";

    companyName.textContent = checkNull(userData.company, companyName) ? userData.company : "Not Available";

}

function setDarkMode() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow", "0px 16px 30px -10px rgba(0, 0, 0, 0.2)");

    modeText.textContent = "LIGHT";
    lightModeIcon.classList.add("active");
    darkModeIcon.classList.remove("active");

    darkmode = true;
    localStorage.setItem("dark-mode", darkmode);

}

function setLightMode() {
    root.setProperty("--lm-bg", "#f6f8ff");
    root.setProperty("--lm-bg-content", "#fefefe");
    root.setProperty("--lm-text", "#4b6a9b");
    root.setProperty("--lm-text-alt", "#2b3442");
    root.setProperty("--lm-shadow", "0px 16px 30px -10px rgba(70, 96, 187, 0.2)");

    modeText.textContent = "DARK";
    lightModeIcon.classList.remove("active");
    darkModeIcon.classList.add("active");

    darkmode = false;
    localStorage.setItem("dark-mode", darkmode);

}

function init() {

    let prefersDarkmode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    //if user has not visited(means localstorage value is null) our website then check user preference
    if (localStorage.getItem("dark-mode") === null) {
        // user system preference is darkmode
        if (prefersDarkmode)
            setDarkMode();
        //user system preference is lightmode
        else
            setLightMode();
    }
    else if (localStorage.getItem("dark-mode") === "true")
        setDarkMode();
    else
        setLightMode();

    // default rjsurj user display
    fetchUserInfo("rjsuraj");
}


searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (searchInput.value)
        fetchUserInfo(searchInput.value);
})

searchInput.addEventListener("input",()=>{

    if(searchInput.value)
        crossIcon.classList.add("active");
    else{
        crossIcon.classList.remove("active");
        errorMsg.classList.remove("active");
    }
})

crossIcon.addEventListener("click",()=>{

    crossIcon.classList.remove("active");
    errorMsg.classList.remove("active");
    searchInput.value = "";
})

modeBtn.addEventListener("click", () => {

    if (darkmode === false) {
        setDarkMode();
    }
    else {
        setLightMode();
    }
})


init();