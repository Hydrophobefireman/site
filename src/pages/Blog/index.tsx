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
    if (location.href.includes("localhost")) return;
    (window as any).umami.track("blog opened").finally(() => {
      location.replace(BLOG_URL);
    });
  }, []);
  return (
    <div>
      Taking you to <a href={BLOG_URL}>{BLOG_DOMAIN}...</a>
    </div>
  );
}
