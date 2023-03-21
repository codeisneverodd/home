import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const ONWER = "codeisneverodd";
const REPO = "programmers-coding-test";
const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListRepoIssuesResponse | CreateRepoIssuesResponse>
) {
  if (req.method === "GET") {
    try {
      const { data } = await octokit.rest.issues.listForRepo({
        owner: ONWER,
        repo: REPO
      });

      res.status(200).json(data);
    } catch {
      res.status(500).json([]);
    }
  }

  if (req.method === "POST") {
    try {
      const { title, assignees, body } = req.body as CreateRepoIssueReqBody;

      const { data } = await octokit.rest.issues.create({
        owner: ONWER,
        repo: REPO,
        labels: ["확인중 👀"],
        title,
        assignees,
        body
      });

      res.status(200).json(data);
    } catch (e) {
      res.status(500).json([]);
    }
  }
}

export type ListRepoIssuesResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.issues.listForRepo
>["data"];

export type CreateRepoIssuesResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.issues.create
>["data"];

export type CreateRepoIssueReqBody = {
  title: string;
  assignees: string[];
  body: string;
};
