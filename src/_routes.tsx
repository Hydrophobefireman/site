import Blog from "@/pages/Blog";
import {dynamic} from "@kit/router";

import Friends from "./pages/Friends";
const About = dynamic(() => import("@/pages/About"));

export default {
  "/": About,
  "/about": About,
  "/projects": dynamic(() => import("@/pages/Projects")),
  "/code": dynamic(() => import("@/pages/Code")),
  "/blog": <Blog />,
  "/friends": <Friends />,
};
