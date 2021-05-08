export default function Button({ text, onclick, styleClass }) {
  return (
    <button onclick={onclick} class={styleClass}>
      {text}
    </button>
  );
}
