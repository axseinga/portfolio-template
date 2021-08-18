const { expect, it } = require("@jest/globals");
import GitHubSDK from "./../src/GitHubSDK";
const config = require("./../config.js");
global.fetch = require("node-fetch");

describe("GitHubDSK", () => {
    it("check if class GitHubDSK exist", () => {
        const gh = new GitHubSDK();
    });
    it("should have set username and secret token when creating an instance", () => {
        const username = "axseinga";
        const secretToken = "ghp_s374example";
        const gh = new GitHubSDK(username, secretToken);

        expect(gh.username).toBe(username);
        expect(gh.secretToken).toBe(secretToken);
    });
    it("if getProjectsData method cannot fetch, throw an error", async () => {
        const username = "axseinga";
        const secretToken = "ghp_s374example";
        const gh = new GitHubSDK(username, secretToken);
        const errorMsg = "data cannot be fetched";

        try {
            await gh.getAllProjects();
        } catch (error) {
            expect(error).toBe(errorMsg);
        }
    });
    it("getAllProjects: check if data from fetch has requested parameter: id", async () => {
        const username = config.username;
        const secretToken = config.secretToken;
        const gh = new GitHubSDK(username, secretToken);

        const [response, data] = await gh.getAllProjects();
        expect(data[0].id).toBeDefined();
    });
    it("getAllProjects: check if status response is 200", async () => {
        const username = config.username;
        const secretToken = config.secretToken;
        const gh = new GitHubSDK(username, secretToken);

        const [response, data] = await gh.getAllProjects();
        expect(response).toBe(200);
    });
    it("getProjectByName check if data from fetch has requested parameter: name", async () => {
        const username = config.username;
        const secretToken = config.secretToken;
        const gh = new GitHubSDK(username, secretToken);
        const projectName = "trip-booking-app-api";

        const data = await gh.getProjectByName(projectName);
        expect(data.name).toBeDefined();
    });
    it("checkWhenUpdated check if data from fetch match date", async () => {
        const username = config.username;
        const secretToken = config.secretToken;
        const gh = new GitHubSDK(username, secretToken);
        const projectName = "trip-booking-app-api";
        const regex = /^([0-9]+(-[0-9]+)+)$/i;

        const data = await gh.checkWhenUpdated(projectName);
        const mockData = "2021-08-13";
        expect(data).toBe(mockData);
    });
    it("checkHowManyCommits check if data from fetch is a number", async () => {
        const username = config.username;
        const secretToken = config.secretToken;
        const gh = new GitHubSDK(username, secretToken);
        const projectName = "trip-booking-app-api";

        const data = await gh.checkHowManyCommits(projectName);
        expect(typeof data).toBe("number");
    });
});
