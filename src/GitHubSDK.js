import { data } from "browserslist";

global.fetch = require("node-fetch");

export default class GitHubSDK {
    constructor(username, secretToken) {
        this.username = username;
        this.secretToken = secretToken;
    }

    async getProjectsForPortfolio() {
        const projects = await this.selectProjectsData();
        const forPortfolio = projects.filter(
            (item) => !item.name.includes("practice")
        );
        //console.log(forPortfolio);
        return forPortfolio;
    }

    async selectProjectsData() {
        const projects = [];
        const data = await this.getProjectsData();
        data.forEach((item) => {
            const project = {
                id: item.id,
                name: item.name,
                url: item.html_url,
                description: item.description,
                topics: item.topics,
                images: item.homepage,
            };
            projects.push(project);
        });
        //console.log(projects);
        return projects;
    }

    async getProjectsData() {
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
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then((data) => {
                //console.log(data);
                const dataAPI = data;
                return dataAPI;
            })
            .catch((err) => {
                console.log("data cannot be fetched");
            });
    }
}
