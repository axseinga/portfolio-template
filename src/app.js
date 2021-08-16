import GitHubSDK from "./../src/GitHubSDK";
const config = require("./../config.js");

document.addEventListener("DOMContentLoaded", init);

function init() {
    const gh = new GitHubSDK(config.username, config.secretToken);
    gh.getProjectsForPortfolio();
}
