import { NextResponse } from "next/server";
import { fetchRepoCommits, GitHubCommit } from "@/lib/github";

/**
 * GET /api/github/commits
 * Fetches commits from a GitHub repository
 *
 * Query Parameters:
 * - repo (required): Repository in format "owner/name"
 * - limit (optional): Number of commits to fetch (default: 10, max: 20)
 *
 * Success Response (200):
 * Array of commit objects with sha, message, date, html_url
 *
 * Error Responses:
 * - 400: Missing or invalid repo parameter
 * - 404: Repository not found
 * - 500: Server error fetching commits
 */
export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const repo = searchParams.get("repo");
    const limitParam = searchParams.get("limit");

    // Validate repo parameter format
    if (!repo) {
      return NextResponse.json(
        { error: "Missing or invalid 'repo' parameter. Format: owner/name" },
        { status: 400 }
      );
    }

    // Validate repo format is "owner/name"
    const repoParts = repo.split("/");
    if (repoParts.length !== 2 || !repoParts[0] || !repoParts[1]) {
      return NextResponse.json(
        { error: "Missing or invalid 'repo' parameter. Format: owner/name" },
        { status: 400 }
      );
    }

    const [owner, name] = repoParts;

    // Parse and validate limit parameter
    let limit = 10; // Default limit
    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10);
      if (isNaN(parsedLimit) || parsedLimit < 1) {
        return NextResponse.json(
          { error: "Invalid 'limit' parameter. Must be a positive number." },
          { status: 400 }
        );
      }
      limit = Math.min(parsedLimit, 20); // Cap at 20
    }

    // Fetch commits from GitHub
    const commits: GitHubCommit[] = await fetchRepoCommits(owner, name, limit);

    // Check if repository was not found (empty array returned from fetchRepoCommits)
    // fetchRepoCommits returns empty array on 404/403, so we need to check if request was successful
    // by attempting with limit=1 to differentiate 404 from actual 0 commits
    if (commits.length === 0 && limit > 0) {
      // Try fetching with limit 1 to check if repo exists
      const testFetch = await fetchRepoCommits(owner, name, 1);
      if (testFetch.length === 0) {
        // Could be 404 or truly no commits. Assuming 404 for safety since new repos typically have at least an initial commit
        return NextResponse.json(
          { error: `Repository '${repo}' not found or has no commits.` },
          { status: 404 }
        );
      }
    }

    // Return successful response with commits
    return NextResponse.json(commits, { status: 200 });
  } catch (error) {
    // Log errors in development only
    if (process.env.NODE_ENV === "development") {
      console.error("GitHub commits API error:", error);
    }

    // Return generic error response
    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
