const { expect } = require("@jest/globals");
import GitHubSDK from "./../src/GitHubSDK";

describe("GitHubDSK", () => {
    it("check if class GitHubDSK exist", () => {
        const gh = new GitHubSDK();
    });
});
