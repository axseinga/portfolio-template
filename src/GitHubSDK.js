import { data } from "browserslist";

global.fetch = require("node-fetch");

export default class GitHubSDK {
    constructor(username, secretToken) {
        this.username = username;
        this.secretToken = secretToken;
    }

    async createPortfolio() {
        const projects = await this.getProjectsForPortfolio();
        const parentContainer = document.querySelector(".portfolio__main");
        projects.forEach((project) => {
            const markup = this.createMarkup(project);
            parentContainer.insertAdjacentHTML("afterbegin", markup);
        });
    }

    async getProjectsForPortfolio() {
        const projects = await this.selectProjectsData();
        const forPortfolio = projects.filter(
            (item) => !item.name.includes("practice")
        );
        console.log(forPortfolio);
        return forPortfolio;
    }

    async selectProjectsData() {
        const projects = [];
        const data = await this.getProjectsData();
        if (data) {
            data.forEach((item) => {
                const name = item.name.split("-").join(" ");
                const topics = item.topics.join().replace(/,/g, " ");
                console.log(topics);
                const project = {
                    id: item.id,
                    name: name,
                    url: item.html_url,
                    description: item.description,
                    topics: topics,
                    images: item.homepage,
                };
                projects.push(project);
            });
            //console.log(projects);
            return projects;
        }
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

    createMarkup(project) {
        return `
        <article class="main__project project">
            <h2 class="project__title">${project.name}</h2>
            <div class="project__content">
                <img src="" alt="" class="project__img" />
            </div>
            <p class="project__description">
            ${project.description}
            </p>
            <p class="project__technologies">${project.topics}</p>
            <div class="project__buttons">
                <button class="btn project__repo">
                    <a href="${project.url}" class="link project__repo-link"
                    >See code</a>
                </button>
                <button class="btn project__live">
                    <a href="${project.images}" class="link project__live-link"
                    >See it live</a
                    >
                </button>
            </div>
        </article>
        `;
    }
}
