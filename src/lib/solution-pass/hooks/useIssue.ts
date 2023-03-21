import {
  CreateRepoIssueReqBody,
  CreateRepoIssuesResponse,
  ListRepoIssuesResponse
} from "@/pages/api/issue";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useIssue() {
  const toast = useToast();
  const issueQuery = useQuery<ListRepoIssuesResponse>({
    queryFn: async () => {
      const res = await axios.get("/api/issue");
      return res.data;
    },
    queryKey: ["issues"]
  });

  const createIssueMutation = useMutation({
    mutationFn: async ({
      title,
      code,
      assignees
    }: {
      title: string;
      code: string;
      assignees: string[];
    }) => {
      const reqBody: CreateRepoIssueReqBody = {
        title,
        assignees,
        body: codeToMarkdown(code)
      };
      const response = await axios.post<CreateRepoIssuesResponse>(
        "/api/issue",
        reqBody,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      return response.data;
    },
    onSuccess: () => {},
    onError: () => {
      toast({
        title: "정답 업로드에 실패했어요.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  });

  return { issueQuery, createIssueMutation };
}

function codeToMarkdown(code: string) {
  return `\`\`\`js
${code}
\`\`\``;
}
