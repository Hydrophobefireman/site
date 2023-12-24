import {useEffect} from "@hydrophobefireman/ui-lib";

const BLOG_URL = "https://blog.hpfm.dev";
const BLOG_DOMAIN = new URL(BLOG_URL).host;
export default function Blog() {
  useEffect(() => {
    (window as any).umami.track("blog opened");
    location.href = BLOG_URL;
  }, []);
  return (
    <div>
      Taking you to <a href={BLOG_URL}>{BLOG_DOMAIN}...</a>
    </div>
  );
}
