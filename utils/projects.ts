export type Project = {
  title: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Expense Tracking App",
    description:
      "AI expense tracker that reads bank SMS, records transactions, and shows spending insights.",
    image: "/projects/expense-tracking.svg",
    github: "https://github.com/RushabhBhosale/memory",
  },
  {
    title: "Travel Memory Archive",
    description:
      "Visual travel archive featuring stories and photo galleries from five journeys across India.",
    image: "/projects/travel-archive.svg",
    github: "https://github.com/RushabhBhosale/trip-new",
    live: "https://trip-new.vercel.app/",
  },
  {
    title: "AnimeSparks",
    description:
      "Anime and pop-culture editorial platform featuring SEO-focused reviews, analysis, and long-form storytelling.",
    image: "/projects/animesparks.png",
    github: "https://github.com/RushabhBhosale/blog",
    live: "https://www.animesparks.blog/",
  },
  {
    title: "Movie Watchlist App",
    description:
      "Track your favorite movies, manage watch status, and get smart recommendations.",
    image: "/projects/watchlist.png",
    github: "https://github.com/RushabhBhosale/Movies",
    live: "https://movies-neon-eight-38.vercel.app/",
  },
  {
    title: "AI Travel Planner",
    description:
      "Explore destinations, generate itineraries, and visualize trips using AI & maps.",
    image: "/bg.avif",
    github: "https://github.com/RushabhBhosale/travel-app",
  },
  {
    title: "Ecommerce Sofa Website",
    description:
      "Modern furniture store with smooth UI, cart system, and Firebase-powered checkout. Type anything to login",
    image: "/projects/sofa.png",
    github: "https://github.com/RushabhBhosale/Firebase-react-ecommerce",
    live: "https://bejewelled-yeot-744c49.netlify.app/",
  },
  {
    title: "Ecommerce Clothing Website",
    description:
      "Stylish apparel shop built with React. Features filtering, cart, and responsive design.",
    image: "/projects/clothing.png",
    github: "https://github.com/RushabhBhosale/ecommerce",
    live: "https://best-ecommerce.netlify.app/",
  },
  {
    title: "N8N Blog Automation",
    description:
      "Type a topic in the n8n workflow it create a blog and post it within 10-15 minutes",
    image: "/projects/blog.png",
    github: "https://github.com/RushabhBhosale/ecommerce",
    live: "https://blog.rushabh.in/",
  },
];
