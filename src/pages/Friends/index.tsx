import {css} from "catom";

import {heading} from "../../styles";

export default function Friends() {
  return (
    <section class={css({fontSize: "1.2rem", fontWeight: "bold"})}>
      <div class={heading}>Friends</div>
      <div class={css({maxWidth: "500px"})}>
        People I know, working on cool stuff
      </div>
      <ul>
        <li>
          <a href="https://arefmalek.com/" target="_blank">
            Aref Malek
          </a>
        </li>
        <li>
          <a href="https://coleroberts.dev" target="_blank">
            Cole Roberts
          </a>
        </li>
        <li>
          <a href="https://harmya.me/" target="_blank">
            Harmya Bhatt
          </a>
        </li>
        <li>
          <a href="https://www.zietek.dev/" target="_blank">
            Jacob Zietek
          </a>
        </li>
        <li>
          <a href="http://jinen.setpal.net/" target="_blank">
            Jinen Setpal
          </a>
        </li>
        <li>
          <a href="https://mikail-khan.com/" target="_blank">
            Mikail Khan
          </a>
        </li>
        <li>
          <a href="https://wade.dev/" target="_blank">
            Nicholas Wade
          </a>
        </li>
        <li>
          <a href="https://sagarpatil.me/" target="_blank">
            Sagar Patil
          </a>
        </li>
      </ul>
    </section>
  );
}
