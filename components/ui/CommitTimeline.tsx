"use client";

import { useEffect, useState } from "react";
import { GitHubCommit } from "@/lib/github";
import { cn } from "@/lib/utils";

export interface CommitTimelineProps {
  repo: {
    owner: string;
    name: string;
  };
}

export function CommitTimeline({ repo }: CommitTimelineProps) {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams({
          repo: `${repo.owner}/${repo.name}`,
          limit: "10",
        });

        const response = await fetch(`/api/github/commits?${query}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch commits: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setCommits(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load commits"
        );
        setCommits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [repo.owner, repo.name]);

  if (loading) {
    return (
      <div className="space-y-2 font-mono text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse bg-primary"></span>
          <span>Loading commits...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 font-mono text-sm text-destructive">
        <p>⚠ {error}</p>
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <div className="font-mono text-sm text-muted-foreground">
        <p>— No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 font-mono text-sm">
      {commits.map((commit, index) => {
        const hash = commit.sha.substring(0, 7);
        const truncatedMessage =
          commit.message.length > 50
            ? commit.message.substring(0, 47) + "..."
            : commit.message;

        return (
          <div
            key={commit.sha}
            className={cn(
              "group flex items-start gap-3 rounded px-2 py-1 transition-colors hover:bg-accent",
              index % 2 === 0
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {/* Timeline indicator */}
            <div className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 items-center justify-center rounded-full bg-primary/70" />

            {/* Commit content */}
            <div className="flex flex-1 items-baseline gap-2">
              {/* Commit hash (clickable) */}
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary transition-colors hover:text-primary/80 group-hover:underline"
              >
                {hash}
              </a>

              {/* Separator */}
              <span className="text-muted-foreground/50">•</span>

              {/* Commit message */}
              <span className="break-words text-foreground group-hover:text-foreground/90">
                {truncatedMessage}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
