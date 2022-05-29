import {css} from "catom";

import json from "@/data/projects.json";

import {heading} from "../../styles";

const {oss} = json;
const ossCard = css({
  width: "200px",
  margin: "10px",
  background: "var(--default-accent)",
  boxShadow: "var(--box-shadow)",
  borderRadius: "10px",
  padding: "1rem",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
});
const projectTitle = css({
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "5px",
  textTransform: "capitalize",
});
export default function Code() {
  return (
    <section>
      <div class={heading}>
        <a
          href="https://github.com/Hydrophobefireman"
          target="_blank"
          class={css({
            textDecoration: "underline",
            pseudo: {
              ":active": {color: "inherit"},
              ":visited": {color: "inherit"},
            },
          })}
        >
          Open Source
        </a>
      </div>
      <div
        class={css({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gridAutoRows: "1fr",
        })}
      >
        {oss.map(({title, description, github, app}) => (
          <div class={ossCard}>
            <div class={projectTitle}>
              {app ? (
                <a
                  class={css({color: "#fff", textDecoration: "underline"})}
                  target="_blank"
                  href={app}
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </div>
            <div>{description}</div>
            <div
              class={css({
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                marginTop: "5px",
              })}
            >
              <a
                class={css({color: "#fff", textDecoration: "underline"})}
                href={github}
                target="_blank"
              >
                Github
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
