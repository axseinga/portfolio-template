const { expect, it } = require("@jest/globals");
import GitHubSDK from "./../src/GitHubSDK";

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
});
