import { Editor, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import type {
  ComponentRegistry,
  InsertComponentPayload,
} from "@tiptap-block-kit/core";
import type { AnyReactCustomComponentDefinition } from "./types";
import { ReactCustomComponentView } from "./ReactCustomComponentView";

export interface CustomComponentOptions {
  registry: ComponentRegistry<AnyReactCustomComponentDefinition>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customComponent: {
      insertComponent: (payload: InsertComponentPayload) => ReturnType;
    };
  }
}

export const CustomComponent = Node.create<CustomComponentOptions>({
  name: "customComponent",
  group: "block",
  atom: true,
  selectable: true,
  draggable: false,

  addOptions() {
    return {
      registry: {
        get: () => undefined,
        getAll: () => [],
      },
    };
  },

  addAttributes() {
    return {
      name: { default: "" },
      props: { default: {} },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-custom-component]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-custom-component": "true" }];
  },

  addCommands() {
    return {
      insertComponent:
        (payload: InsertComponentPayload) =>
        ({ chain }) => {
          return chain()
            .focus()
            .insertContent([
              {
                type: this.name,
                attrs: {
                  name: payload.name,
                  props: payload.props ?? {},
                },
              },
              { type: "paragraph" },
            ])
            .run();
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ReactCustomComponentView);
  },

  addStorage() {
    return {
      getCount: (editor: Editor) => {
        let count = 0;
        editor.state.doc.descendants((node) => {
          if (node.type.name === this.name) {
            count++;
          }
        });
        return count;
      },
    };
  },
});
