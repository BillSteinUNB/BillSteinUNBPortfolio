import Link from "next/link";
import { SOCIAL_LINKS, EMAIL } from "@/lib/constants";

export function ASCIIFooter() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container py-8 md:py-12">
        {/* ASCII Art */}
        <div className="mb-8 font-mono text-xs sm:text-sm text-muted-foreground leading-tight overflow-x-auto">
          <pre className="whitespace-pre text-center">
{`      |\\__/,|   (\`\\\\
    _.|o o  |_   ) )
-(((---(((--------`}
          </pre>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-dotted underline-offset-2"
              aria-label={link.name}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={`mailto:${EMAIL}`}
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-dotted underline-offset-2"
            aria-label="Email"
          >
            Email
          </Link>
        </div>

        {/* Git Commit Signature */}
        <div className="border-t pt-8 font-mono text-xs sm:text-sm text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-1">
            <span>➜</span>
            <span>~</span>
            <span className="text-foreground">git commit -m &quot;bye&quot;</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
