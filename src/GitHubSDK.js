import { data } from "browserslist";

export default class GitHubSDK {
    constructor(username, secretToken) {
        this.username = username;
        this.secretToken = secretToken;
    }

    async checkHowManyCommits(projectName) {
        const url = `https://api.github.com/repos/${this.username}/${projectName}/commits`;
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
                const commitsCount = data.length - 1;
                return commitsCount;
            })
            .catch((err) => {
                console.log("data cannot be fetched");
            });
    }

    async checkWhenUpdated(projectName) {
        const url = `https://api.github.com/repos/${this.username}/${projectName}/commits`;
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
                const dataAPI = data[0].commit.committer.date;
                const date = dataAPI.slice(0, -10);
                return date;
            })
            .catch((err) => {
                console.log("data cannot be fetched");
            });
    }

    async getProjectByName(projectName) {
        const url = `https://api.github.com/repos/${this.username}/${projectName}`;
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
                const dataAPI = data;
                return dataAPI;
            })
            .catch((err) => {
                console.log("data cannot be fetched");
            });
    }

    async getAllProjects() {
        const url = `https://api.github.com/users/${this.username}/repos?per_page=50`;
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
                    const statusCode = resp.status;
                    const data = resp.json();
                    return Promise.all([statusCode, data]);
                }
                return Promise.reject(resp);
            })
            .catch((err) => {
                console.log("data cannot be fetched");
            });
    }
}
