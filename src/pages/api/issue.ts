import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Octokit } from "octokit";
import { authOptions } from "./auth/[...nextauth]";

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
      const session = (await getServerSession(req, res, authOptions)) as {
        accessToken: string;
      };
      const newOctokit = new Octokit({
        auth: session.accessToken ?? process.env.GITHUB_PAT
      });
      const { title, body } = req.body as CreateRepoIssueReqBody;

      const { data } = await newOctokit.rest.issues.create({
        owner: ONWER,
        repo: REPO,
        labels: ["확인중 👀"],
        title,
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
  body: string;
};
