import {useEffect} from "@hydrophobefireman/ui-lib";

const BLOG_URL = "https://blog.hpfm.dev";
const BLOG_DOMAIN = new URL(BLOG_URL).host;
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    if (typeof callback !== "function") {
      return this.then(callback, callback);
    }
    const P = this.constructor || Promise;
    return this.then(
      (value) => P.resolve(callback()).then(() => value),
      (err) =>
        P.resolve(callback()).then(() => {
          throw err;
        }),
    );
  };
}
export default function Blog() {
  useEffect(() => {
    if (location.host.includes("localhost")) return;
    const t = (window as any).umami.track("blog opened");
    const redir = () => location.replace(BLOG_URL);
    t ? t.finally(redir) : redir();
  }, []);
  return (
    <div>
      Taking you to <a href={BLOG_URL}>{BLOG_DOMAIN}...</a>
    </div>
  );
}
