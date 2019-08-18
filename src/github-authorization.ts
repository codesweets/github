import {TaskMeta, TaskWithData} from "@codesweets/core";
import Octokit from "@octokit/rest";

export interface GitHubAuthorizationData {
  username?: string;
  password_or_token?: string;
}

export class GitHubAuthorization extends TaskWithData<GitHubAuthorizationData> {
  public static meta: TaskMeta = new TaskMeta({
    construct: GitHubAuthorization,
    schema: require("ts-schema!./github-authorization.ts?GitHubAuthorizationData"),
    typename: "GitHubAuthorization",
    uiSchema: {
      password_or_token: {
        "ui:widget": "password"
      }
    }
  })

  public octokit: Octokit

  protected async onInitialize () {
    const getAuth = () => {
      if (this.data.username || this.data.password_or_token) {
        return {
          on2fa: () => {
            throw new Error("Two factor authentication is not yet supported");
          },
          password: this.data.password_or_token,
          username: this.data.username
        };
      }
      return null;
    };
    this.octokit = new Octokit({
      auth: getAuth()
    });
  }
}
