import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ReactCustomComponentView } from "./ReactCustomComponentView";
import type {
  AnyReactCustomComponentDefinition,
  ComponentRegistry,
} from "./types";

export interface CustomComponentNodeOptions {
  registry: ComponentRegistry<AnyReactCustomComponentDefinition>;
}

export function createCustomComponentNode(config: {
  extensionName: string;
  inline: boolean;
  draggable: boolean;
}) {
  const { draggable, extensionName, inline } = config;
  const group = inline ? "inline" : "block";
  const tagName = inline ? "span" : "div";

  return Node.create<CustomComponentNodeOptions>({
    name: extensionName,
    group,
    inline,
    draggable,
    selectable: true,
    atom: true,

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
        id: { default: "" },
        componentName: { default: "" },
        props: { default: {} },
      };
    },

    parseHTML() {
      return [
        {
          tag: `${tagName}[data-custom-component]`,
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [tagName, { ...HTMLAttributes, "data-custom-component": true }];
    },

    addNodeView() {
      return ReactNodeViewRenderer(ReactCustomComponentView);
    },
  });
}
