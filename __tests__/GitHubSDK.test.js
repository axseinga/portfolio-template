const { expect, it } = require("@jest/globals");
import GitHubSDK from "./../src/GitHubSDK";
const config = require("./../config.js");

/*const fetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
    );*/

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
    it("check if method getProjects exists", () => {
        const gh = new GitHubSDK();

        expect(typeof gh.getProjectsData).toBe("function");
    });
    it("if getProject method cannot fetch, throw an error", async () => {
        const username = "axseinga";
        const secretToken = "ghp_s374example";
        const gh = new GitHubSDK(username, secretToken);
        const errorMsg = "data cannot be fetched";

        try {
            await gh.getProjectsData();
        } catch (error) {
            expect(error).toBe(errorMsg);
        }
    });
    /*
    it("checks if getProjects() fetches data", async () => {
        const gh = new GitHubSDK(config.username, config.secretToken);
        const options = {
            method: "GET",
            headers: {
                Accept: "application/vnd.github.mercy-preview+json",
                Authorization: `token ${config.secretToken}`,
            },
            body: JSON.stringify(),
        };
        const json = await gh.getProjects();
        expect(fetchMock).toHaveBeenCalledWith(
            "https://api.github.com/users/axseinga/repos",
            options
        );
        console.log(json);
        expect(Array.isArray(json)).toEqual(true);
        expect(json.length).toEqual(0);
    });*/
    it("check if method selectProjectsData exists", () => {
        const gh = new GitHubSDK();

        expect(typeof gh.selectProjectsData).toBe("function");
    });
    it("check if method selectProjectData returns an object", async () => {
        const username = config.username;
        const secretToken = config.secretToken;
        const gh = new GitHubSDK(username, secretToken);
        const result = await gh.selectProjectsData();

        expect(typeof result).toBe("object");
    });
    it("check if method getProjectsForPortfolio exists", () => {
        const gh = new GitHubSDK();

        expect(typeof gh.getProjectsForPortfolio).toBe("function");
    });
});
