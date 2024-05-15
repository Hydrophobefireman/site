import {css} from "catom";

import data from "@/data/projects.json";

import {heading, hoverable} from "../../styles";

const {projects} = data;

const card = css({
  background: "var(--default-accent)",
  borderRadius: "10px",
  padding: "1rem",
  margin: "1rem",
  color: "var(--default-background)",
  display: "flex",
  flexDirection: "column",
  boxShadow: "var(--box-shadow)",
  media: {"only screen and (min-width:700px)": {maxWidth: "35vw"}},
});
const viewBtn = [
  css({
    padding: "0.2rem",
    width: "100%",
    border: "2px solid var(--default-background)",
    borderRadius: "10px",
    background: "var(--default-background)",
    color: "var(--default-text)",
    fontWeight: "bold",
    outline: "none",
    fontSize: "1.1rem",
    marginTop: "5px",
  }),
  hoverable,
];
export default function Projects() {
  return (
    <section class={css({fontSize: "1.2rem"})}>
      <div class={[heading]}>Projects</div>

      <div>
        <a
          class={css({textDecoration: "underline"})}
          href={"https://github.com/hydrophobefireman"}
        >
          Github
        </a>
      </div>
      <section
        class={css({
          media: {
            "only screen and (min-width:700px)": {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            },
          },
        })}
      >
        {projects.map(({title, description, app, stack}) => (
          <div class={card}>
            <div class={css({fontWeight: "bold", fontSize: "1.4rem"})}>
              {title}
            </div>
            <div class={css({marginTop: "0.5rem"})}>
              <span class={css({fontWeight: "bold"})}>Stack:</span>
              <span class={css({fontWeight: "normal"})}>{stack}</span>
            </div>
            <div>{description}</div>
            <div
              class={css({flex: 1, display: "flex", alignItems: "flex-end"})}
            >
              <a
                target="_blank"
                href={app}
                class={css({
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                })}
              >
                <button class={viewBtn}>View</button>
              </a>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
