import {
  CreateRepoIssueReqBody,
  CreateRepoIssuesResponse,
  ListRepoIssuesResponse
} from "@/pages/api/issue";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Lang } from "./useRepo";

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
      probId,
      title,
      code,
      author,
      assignees,
      lang
    }: {
      probId: string;
      title: string;
      code: string;
      author: string;
      assignees: string[];
      lang: Lang;
    }) => {
      const reqBody: CreateRepoIssueReqBody = {
        title,
        assignees,
        body: codeToMarkdown({ code, probId, author, lang })
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

function codeToMarkdown({
  code,
  probId,
  author,
  lang
}: {
  code: string;
  probId: string;
  author: string;
  lang: Lang;
}) {
  return `
## 제출한 정답 
\`\`\`js
${code}
\`\`\`
## 풀이 데이터
\`\`\`json
{
  "probId": "${probId}",
  "author": "${author}",
  "lang": "${lang}",
  "createdAt": ${Date.now()}
}
\`\`\`
`;
}
