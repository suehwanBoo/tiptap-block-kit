import { Node } from "@tiptap/core";
import {
  AnyProps,
  ComponentRegistry,
  InsertComponentPayload,
  VanillaCustomComponentDefinition,
} from "./types";

export interface CustomComponentOptions {
  registry: ComponentRegistry<VanillaCustomComponentDefinition>;
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
        tag: `div[data-custom-component]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-custom-component": "true" }];
  },

  addCommands() {
    return {
      insertComponent:
        (payload) =>
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
    return ({ node }) => {
      const $elem = document.createElement("div");
      $elem.setAttribute("data-custom-component-root", "true");
      $elem.contentEditable = "false";

      const componentName = node.attrs.name as string;
      const props = (node.attrs.props ?? {}) as AnyProps;

      const component = this.options.registry.get(componentName);

      if (!component) {
        $elem.textContent = `Unknown component: name issue occured, you must register in the registry before use ${componentName}`;
        return { dom: $elem };
      }

      const rendered = component.renderer(props);

      $elem.replaceChildren(rendered);

      return { dom: $elem };
    };
  },
});
