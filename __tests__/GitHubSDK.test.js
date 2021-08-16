const { expect, it } = require("@jest/globals");
import GitHubSDK from "./../src/GitHubSDK";
const config = require("./../config.js");

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

        expect(typeof gh.getProjects).toBe("function");
    });
    it("if getProject method cannot fetch, throw an error", async () => {
        const username = "axseinga";
        const secretToken = "ghp_s374example";
        const gh = new GitHubSDK(username, secretToken);
        const errorMsg = "data cannot be fetched";

        try {
            await gh.getProjects();
        } catch (error) {
            expect(error).toBe(errorMsg);
        }
    });
    /*
    it("if getProject method fetch, return data", async () => {
        const username = config.username;
        const secretToken = config.secretToken;
        const gh = new GitHubSDK(username, secretToken);

        expect(gh.getProjects).toBe(promise);
    });*/
});
