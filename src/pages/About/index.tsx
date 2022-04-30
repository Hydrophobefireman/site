import {css} from "catom";
import {heading} from "../../styles";

export default function Landing() {
  return (
    <section class={css({fontSize: "1.2rem", fontWeight: "bold"})}>
      <div class={heading}>About Me</div>
      <div>18,</div>
      <div class={css({maxWidth: "500px"})}>
        Writes Python, JavaScript and the occasional framework. Loves open
        source, compilers, clean code, tiny modules, and a fast web.
      </div>
    </section>
  );
}
