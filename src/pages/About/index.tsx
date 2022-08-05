import {css} from "catom";

import {heading} from "../../styles";

export default function Landing() {
  return (
    <section class={css({fontSize: "1.2rem", fontWeight: "bold"})}>
      <div class={heading}>
        Hi, I'm{" "}
        <a
          target="_blank"
          class={css({color: "inherit", textDecoration: "underline"})}
          href="https://github.com/hydrophobefireman"
        >
          Bhavesh
        </a>
      </div>
      <div style={{"font-size": "1.5rem"}} class={heading}>
        About Me
      </div>
      <div class={css({maxWidth: "500px"})}>
        Writes Python, JavaScript, Rust and the occasional framework. Loves open
        source, compilers, clean code, and a fast web.
      </div>
    </section>
  );
}
