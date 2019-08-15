/* eslint-disable no-undefined */
import {GitHubAuthorization} from "../src/main";
import {TaskRoot} from "@codesweets/core";
import assert from "assert";

(async () => {
  const root = await TaskRoot.create();
  const github = new GitHubAuthorization(root, {});
  await root.run();
  const response = await github.octokit.repos.getCommit({
    commit_sha: "29487b5af59464804af7dc9b82635e5ab9423cb0",
    owner: "codesweets",
    repo: "github"
  });
  console.log(response.data);
  assert.strictEqual(response.status, 200);
  console.log("Completed");
})();
