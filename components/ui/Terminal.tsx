"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from "lucide-react";
import { SITE_NAME, SKILLS, PROJECTS, EXPERIENCE, EMAIL, SOCIAL_LINKS } from "@/lib/constants";

interface TerminalLine {
  type: "command" | "output" | "error";
  content: string;
}

const COMMANDS = {
  help: "Display available commands",
  about: "Learn about me",
  skills: "View my technical skills",
  projects: "See my featured projects",
  experience: "View my work experience",
  contact: "Get my contact information",
  social: "View my social media links",
  clear: "Clear the terminal",
  theme: "Toggle dark/light mode",
  joke: "Tell a developer joke",
  matrix: "Enter the Matrix...",
  resume: "Download my resume",
};

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why did the developer go broke? Because he used up all his cache.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I JOIN you?'",
  "Why do Java developers wear glasses? Because they don't C#!",
];

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "output",
      content: `Welcome to ${SITE_NAME}'s Portfolio Terminal v1.0.0`,
    },
    {
      type: "output",
      content: "Type 'help' to see available commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const addLine = (type: TerminalLine["type"], content: string) => {
    setHistory((prev) => [...prev, { type, content }]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMinimized(true);
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    addLine("command", `$ ${cmd}`);

    switch (trimmedCmd) {
      case "help":
        addLine("output", "\nAvailable Commands:");
        Object.entries(COMMANDS).forEach(([cmd, desc]) => {
          addLine("output", `  ${cmd.padEnd(12)} - ${desc}`);
        });
        addLine("output", "");
        break;

      case "about":
        addLine("output", `\nHi! I'm ${SITE_NAME}, a Full-Stack Developer and Computer Science student.`);
        addLine("output", "I specialize in building exceptional digital experiences with modern web technologies.");
        addLine("output", "Currently studying at the University of New Brunswick.");
        addLine("output", "\nNavigating to About section...\n");
        scrollToSection("about");
        break;

      case "skills":
        addLine("output", "\nTechnical Skills:");
        SKILLS.forEach((category) => {
          addLine("output", `\n${category.category}:`);
          category.items.forEach((skill) => {
            addLine("output", `  • ${skill.name}`);
          });
        });
        addLine("output", "");
        break;

      case "projects":
        addLine("output", "\nFeatured Projects:");
        PROJECTS.forEach((project, i) => {
          addLine("output", `\n${i + 1}. ${project.title}`);
          addLine("output", `   ${project.description.substring(0, 80)}...`);
          addLine("output", `   Tech: ${project.technologies.join(", ")}`);
        });
        addLine("output", "\nNavigating to Projects section...\n");
        scrollToSection("projects");
        break;

      case "experience":
        addLine("output", "\nWork Experience:");
        EXPERIENCE.forEach((job, i) => {
          addLine("output", `\n${i + 1}. ${job.role} at ${job.company}`);
          addLine("output", `   ${job.dates}`);
          job.achievements.slice(0, 1).forEach((achievement) => {
            addLine("output", `   • ${achievement.substring(0, 70)}...`);
          });
        });
        addLine("output", "\nNavigating to Experience section...\n");
        scrollToSection("experience");
        break;

      case "contact":
        addLine("output", "\nContact Information:");
        addLine("output", `  Email: ${EMAIL}`);
        addLine("output", `  Location: New Brunswick, Canada`);
        addLine("output", "\nNavigating to Contact section...\n");
        scrollToSection("contact");
        break;

      case "social":
        addLine("output", "\nSocial Media:");
        SOCIAL_LINKS.forEach((link) => {
          if (link.url !== "/") {
            addLine("output", `  ${link.name}: ${link.url}`);
          }
        });
        addLine("output", "");
        break;

      case "clear":
        setHistory([]);
        break;

      case "theme":
        const html = document.documentElement;
        const currentTheme = html.classList.contains("dark") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.classList.toggle("dark");
        addLine("output", `Theme switched to ${newTheme} mode.\n`);
        break;

      case "joke":
        const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
        addLine("output", `\n${randomJoke}\n`);
        break;

      case "matrix":
        addLine("output", "\nEntering the Matrix...");
        addLine("output", "01001000 01100101 01101100 01101100 01101111");
        addLine("output", "Wake up, Neo...");
        addLine("output", "Follow the white rabbit 🐰\n");
        break;

      case "resume":
        addLine("output", "\nDownloading resume...\n");
        window.open("/resume/Bill_Stein_Resume.pdf", "_blank");
        break;

      case "":
        break;

      default:
        addLine("error", `Command not found: ${cmd}`);
        addLine("output", "Type 'help' to see available commands.\n");
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      executeCommand(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <>
      {/* Floating Terminal Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Open Terminal"
          >
            <TerminalIcon className="h-6 w-6 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isMinimized ? 0.3 : 1,
              height: isMinimized ? "auto" : undefined
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed z-50 bg-background border rounded-lg shadow-2xl overflow-hidden ${
              isMinimized
                ? "bottom-6 right-6 w-64"
                : "bottom-6 right-6 w-[90vw] max-w-3xl h-[600px] md:w-[700px]"
            }`}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4" />
                <span className="text-sm font-medium">terminal@portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-accent rounded"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-accent rounded"
                  aria-label="Close Terminal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            {!isMinimized && (
              <div className="flex flex-col h-[calc(600px-40px)]">
                <div
                  ref={terminalRef}
                  className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 bg-background"
                >
                  {history.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.type === "command"
                          ? "text-primary font-semibold"
                          : line.type === "error"
                          ? "text-red-500"
                          : "text-foreground/80"
                      }
                    >
                      {line.content}
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="border-t p-4 bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-mono text-sm">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none font-mono text-sm"
                      placeholder="Type a command..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>
                </form>
              </div>
            )}

            {isMinimized && (
              <div className="p-3 text-center text-sm text-muted-foreground">
                Terminal minimized
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
