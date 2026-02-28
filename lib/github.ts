export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  html_url: string;
}

/**
 * Fetches repository commits with ISR caching (5-minute revalidation)
 * @param owner - Repository owner
 * @param name - Repository name
 * @param limit - Maximum number of commits to fetch (default: 10)
 * @returns Array of commit data, empty array on error
 */
export async function fetchRepoCommits(
  owner: string,
  name: string,
  limit: number = 10
): Promise<GitHubCommit[]> {
  try {
    const url = new URL(`https://api.github.com/repos/${owner}/${name}/commits`);
    url.searchParams.set("per_page", Math.min(limit, 100).toString());

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Add token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
    });

    // Return empty array for 404 or 403 errors
    if (response.status === 404 || response.status === 403) {
      return [];
    }

    // Return empty array for other HTTP errors
    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // Ensure data is an array
    if (!Array.isArray(data)) {
      return [];
    }

    // Transform and shape the response
    return data
      .slice(0, limit)
      .map((commit: any): GitHubCommit => {
        const message = commit.commit?.message || "";
        const firstLine = message.split("\n")[0];
        const truncatedMessage =
          firstLine.length > 72 ? firstLine.substring(0, 72) : firstLine;

        return {
          sha: commit.sha || "",
          message: truncatedMessage,
          date: commit.commit?.author?.date || "",
          html_url: commit.html_url || "",
        };
      });
  } catch (error) {
    // Return empty array on network or parsing errors
    return [];
  }
}
