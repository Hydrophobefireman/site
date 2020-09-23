import { heading } from "../../styles";
import { css } from "catom";
const { oss } = window._projects;
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
      <div class={heading} capture>
        Open Source -{" "}
        <a href="https://github.com/Hydrophobefireman" target="_blank">
          <OctoCat />
        </a>
      </div>

      <div
        class={css({
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        })}
      >
        {oss.map(({ title, description, github, app }) => (
          <div class={ossCard}>
            <div class={projectTitle}>
              {app ? (
                <a
                  class={css({ color: "#fff", textDecoration: "underline" })}
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
                class={css({ color: "#fff", textDecoration: "underline" })}
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

function OctoCat() {
  return (
    <svg width="24" height="24">
      <path d="M0 0v24h24V0H0zm14.534 19.6c-.406.078-.534-.17-.534-.384V17.01c0-.747-.262-1.233-.55-1.48 1.782-.198 3.654-.875 3.654-3.947 0-.874-.31-1.588-.824-2.147.083-.202.357-1.016-.08-2.117 0 0-.67-.215-2.198.82a7.567 7.567 0 00-4.006 0c-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118a3.09 3.09 0 00-.824 2.147c0 3.064 1.867 3.75 3.645 3.954-.23.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.89 1.17 0 0 .463 1.428 2.688.944v1.49c0 .21-.13.46-.528.385A8 8 0 0112 4a8 8 0 018 8c0 3.533-2.29 6.53-5.466 7.6z" />
    </svg>
  );
}
