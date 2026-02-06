import { getCollection } from "astro:content";

export const IS_WORK = true;
export const DOMAIN = "https://jaenudin.vercel.app";
export const IMAGE = "https://jaenudin.vercel.app";
export const NAME = "Jaenudin";
export const TITLE = "Software Developer | Jaenudin";
export const DESC =
  "focused on fast, performance-conscious code and thoughtful interaction design.";

const now = new Date();

export const BLOG = (await getCollection("blog"))
  .filter((post) => {
    if (post.data.status === "PUBLISH") return true;

    if (post.data.status === "SCHEDULE" && post.data.date <= now) {
      return true;
    }

    return false;
  })
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const CONNECT = [
  {
    label: "github/jee-vim",
    value: "https://github.com/jee-vim"
  },
  {
    label: "in/jaenudin",
    value: "http://www.linkedin.com/in/jaenudin-jee-650482199",
  },
  {
    label: "email",
    value: "mailto:jee.nvim@gmail.com",
  }
]

export const PROJECT = [
  {
    tag: "Neovim",
    title: "Znvim",
    description: "Neovim configuration optimized for performance",
    website: "https://github.com/Jee-vim/Znvim",
    year: 2023,
  },
  {
    tag: "Web",
    title: "Orderia",
    description: "Ordering reservation platform.",
    website: "https://orderia.id",
    year: 2024,
  },
  {
    tag: "Web",
    title: "AMPM.creativelab",
    description: "Company website of AMPM.creativelab",
    website: "https://ampm.oxinos.io",
    year: 2024,
  },
  {
    tag: "Web",
    title: "Play Bobobox",
    description: "Microservice for ordering additional activity at Bobobox",
    website: "https://play.bobobox.com",
    year: 2025,
  },
  {
    tag: "Linux",
    title: "Dotfiles Nix",
    description: "Nixos Configuration with hyprland and more",
    website: "https://github.com/Jee-vim/dotfiles-nix",
    year: 2025,
  },
  {
    tag: "CLI",
    title: "Jmf",
    description: "Simple tool for mass manipulation file at once using Zig",
    website: "https://github.com/Jee-vim/jmf",
    year: 2025,
  },
  {
    tag: "Web",
    title: "Blog Bobobox",
    description: "Microservice blog replace the legacy blog",
    website: "https://bobobox.com/blog",
    year: 2026,
  },
  {
    tag: "CLI",
    title: "Syncro",
    description: "The Human-Centric Discord Scheduler.",
    website: "https://github.com/Jee-vim/syncro",
    year: 2026,
  },
  {
    tag: "CLI",
    title: "Clip Pipe",
    description: "Automated pipeline for clipping long videos into shorts and publishing them across platforms.",
    website: "https://github.com/Jee-vim/clip-pipe",
    year: 2026,
  },
  {
    tag: "Web",
    title: "Admin Ojekfood",
    description: "Managing order, customer and driver at same platofrm",
    website: null,
    year: 2026,
  },
  {
    tag: "CLI",
    title: "Cryptic",
    description: "Simple AES-256-GCM File Encrypt/Decrypt with password",
    website: "https://github.com/Jee-vim/cryptic",
    year: 2026,
  },
];

