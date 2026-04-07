import {
  createRegistry,
  CustomComponent,
  defineComponent,
} from "@tiptap-block-kit/vanilla";
import "./style.css";

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

const notice = defineComponent({
  name: "notice",
  render: (props) => {
    const el = document.createElement("div");
    el.style.padding = "12px";
    el.style.border = "1px solid #d1d5db";
    el.style.borderRadius = "8px";
    el.style.background = "#f9fafb";
    el.style.fontSize = "14px";
    el.textContent = `Notice: ${props.text}`;
    return el;
  },
});

const registry = createRegistry([notice]);

app.innerHTML = `
  <div class="app">
    <div class="toolbar">
      <button id="insert-notice">Insert Notice</button>
      <button id="print-json">Print JSON</button>
    </div>

    <div id="editor"></div>
  </div>
`;

const editorElement = document.querySelector<HTMLDivElement>("#editor");
const insertNoticeButton =
  document.querySelector<HTMLButtonElement>("#insert-notice");
const printJsonButton =
  document.querySelector<HTMLButtonElement>("#print-json");

if (!editorElement || !insertNoticeButton || !printJsonButton) {
  throw new Error("Required DOM elements not found");
}

const editor = new Editor({
  element: editorElement,
  extensions: [
    StarterKit,
    CustomComponent.configure({
      registry,
    }),
  ],
  content: `
    <p>Hello Tiptap</p>
  `,
});

insertNoticeButton.addEventListener("click", () => {
  editor.commands.insertComponent({
    name: "notice",
    props: {
      text: "This is a custom notice block.",
    },
  });
});

printJsonButton.addEventListener("click", () => {
  console.log(editor.getJSON());
});
