global.fetch = require("node-fetch");

console.log("github");

export default class GitHubSDK {
    constructor(username, secretToken) {
        this.username = username;
        this.secretToken = secretToken;
    }

    async getProjects() {
        const url = `https://api.github.com/users/${this.username}/repos`;
        const promise = fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/vnd.github.mercy-preview+json",
                Authorization: `token ${this.secretToken}`,
            },
            body: JSON.stringify(),
        });
        return promise
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log("data cannot be fetched");
            });
    }
}
