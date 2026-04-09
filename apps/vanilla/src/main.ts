import { CustomComponentKit } from "@tiptap-block-kit/vanilla";
import "./style.css";

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { unknownFallback } from "./components/Fallback";
import { registry } from "./registry";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

app.innerHTML = `
  <div class="app">
    <div class="toolbar">
      <button id="insert-youtube">Insert Youtube</button>
      <button id="update-youtube">Update Youtube</button>
      <button id="set-unknown-json">Set Unknown JSON</button>
      <button id="log-json">Log JSON</button>
    </div>
    <div id="editor"></div>
  </div>
`;

const editorElement = document.querySelector<HTMLDivElement>("#editor");

if (!editorElement) {
  throw new Error("Required DOM elements not found");
}

export const editor = new Editor({
  element: document.querySelector("#editor")!,
  extensions: [
    StarterKit,
    CustomComponentKit.configure({
      registry,
      fallback: unknownFallback,
    }),
  ],
  content: {
    type: "doc",
    content: [],
  },
});

(document.querySelector("#insert-youtube") as HTMLButtonElement).onclick =
  () => {
    editor.commands.insertComponent({
      id: "yt-1",
      componentName: "youtube",
      props: {
        videoId: "abc123",
        title: "first video",
      },
      profile: "block",
    });
  };

(document.querySelector("#update-youtube") as HTMLButtonElement).onclick =
  () => {
    editor.commands.updateComponentPropsById("yt-1", {
      title: "updated title",
    });
  };

(document.querySelector("#set-unknown-json") as HTMLButtonElement).onclick =
  () => {
    editor.commands.setContent({
      type: "doc",
      content: [
        {
          type: "customComponent_block",
          attrs: {
            id: "unknown-1",
            componentName: "not-registered",
            props: {
              foo: "bar",
            },
          },
        },
      ],
    });
  };

(document.querySelector("#log-json") as HTMLButtonElement).onclick = () => {
  console.log(editor.getJSON());
};
