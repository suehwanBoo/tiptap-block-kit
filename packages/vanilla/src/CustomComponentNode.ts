import { Node } from "@tiptap/core";
import {
  AnyCustomComponentDefinition,
  AnyProps,
  ComponentRegistry,
  UnknownComponentFallbackProps,
} from "./types";

export interface CustomComponentNodeOptions {
  registry: ComponentRegistry<AnyCustomComponentDefinition>;
  fallback?: (payload: UnknownComponentFallbackProps) => HTMLElement;
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
        fallback: undefined,
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
      return ({ node }) => {
        const $elem = document.createElement(tagName);
        $elem.setAttribute("data-custom-component", "true");
        $elem.setAttribute("data-custom-component-root", "true");
        $elem.contentEditable = "false";
        const componentName = node.attrs.componentName as string;
        const props = (node.attrs.props ?? {}) as AnyProps;
        const component = this.options.registry.get(componentName);
        if (!component) {
          if (this.options.fallback) {
            const $fallback = this.options.fallback({ componentName, props });
            $elem.replaceChildren($fallback);
          } else $elem.textContent = `Unknown component: ${componentName}`;
          return { dom: $elem };
        }
        const rendered = component.renderer(props);
        $elem.replaceChildren(rendered);
        return { dom: $elem };
      };
    },
  });
}
