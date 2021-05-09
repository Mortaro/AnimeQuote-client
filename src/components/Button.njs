export default function Button({ text, onclick, class: styleClass }) {
  return (
    <button onclick={onclick} class={styleClass}>
      {text}
    </button>
  );
}
