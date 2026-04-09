import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/core";
import { CustomComponentKit } from "@tiptap-block-kit/vanilla";
import { registry } from "../registry";
import { unknownFallback } from "./Fallback";

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
