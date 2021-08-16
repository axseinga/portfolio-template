import GitHubSDK from "./../src/GitHubSDK";
import "./style.css";
const config = require("./../config.js");

document.addEventListener("DOMContentLoaded", init);

function init() {
    const gh = new GitHubSDK(config.username, config.secretToken);
    //gh.getProjectsForPortfolio();
    gh.createPortfolio();
}
