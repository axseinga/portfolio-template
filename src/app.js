import GitHubSDK from "./../src/GitHubSDK";
import "./style.css";
const config = require("./../config.js");

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const gh = new GitHubSDK(config.username, config.secretToken);
    await createPortfolio(gh);
}

async function createPortfolio(gh) {
    const projects = await createProjects(gh);
    const parentContainer = document.querySelector(".portfolio__main");
    const imgs = [
        "https://github.com/axseinga/trip-booking-app-api/raw/master/screenshots/api1.png",
        "https://github.com/axseinga/js-slider-gallery/raw/master/assets/screenshot.png",
        "https://github.com/axseinga/tip-calculator-app/raw/main/design/screenshot.png",
        "https://github.com/axseinga/crowdfunding-product-page-main/raw/main/design/screenshot.png",
        "https://github.com/axseinga/sunnyside-agency-landing-page-main/raw/main/design/screenshot.png",
        "https://github.com/axseinga/applab-landing-page/raw/master/assets/screenshot.png",
    ];
    projects.forEach((item, index) => {
        const markup = createMarkup(item, imgs[index]);
        parentContainer.insertAdjacentHTML("afterbegin", markup);
    });
}

async function createProjects(gh) {
    const projectsRaw = await selectProjects(gh);
    const projects = [];
    if (projectsRaw) {
        projectsRaw.forEach((item) => {
            const name = item.name.split("-").join(" ");
            const topics = item.topics.join().replace(/,/g, " ");
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
        console.log(projects);
        return projects;
    }
}

async function selectProjects(gh) {
    const projects = [];
    const project1 = await gh.getProjectByName("trip-booking-app-api");
    projects.push(project1);
    const project2 = await gh.getProjectByName("js-slider-gallery");
    projects.push(project2);
    const project3 = await gh.getProjectByName("tip-calculator-app");
    projects.push(project3);
    const project4 = await gh.getProjectByName(
        "crowdfunding-product-page-main"
    );
    projects.push(project4);
    const project5 = await gh.getProjectByName(
        "sunnyside-agency-landing-page-main"
    );
    projects.push(project5);
    const project6 = await gh.getProjectByName("applab-landing-page");
    projects.push(project6);
    return projects;
}

function createMarkup(project, img) {
    return `
    <article class="main__project project" id="${project.id}">
        <h2 class="project__title">${project.name}</h2>
        <div class="project__content">
            <img src="${img}" alt="Miniature of project" class="project__img" />
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
