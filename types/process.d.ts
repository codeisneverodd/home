/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_APP_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_PAT: string;
    GITHUB_PRIVATE_KEY: string;
  }
}
