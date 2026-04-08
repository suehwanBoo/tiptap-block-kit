import { Content, Editor, Extension } from "@tiptap/core";
import type {
  AnyProps,
  AnyReactCustomComponentDefinition,
  ComponentRegistry,
  CustomComponentInstance,
  CustomComponentProfile,
  FoundCustomComponentNode,
  InsertComponentPayload,
} from "./types";
import { getCustomComponentInstances } from "./utils";

export interface CustomComponentManagerOptions {
  registry: ComponentRegistry<AnyReactCustomComponentDefinition>;
  profileNodeNames: Record<CustomComponentProfile, string>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customComponent: {
      insertComponent: (payload: InsertComponentPayload) => ReturnType;
      removeComponentById: (id: string) => ReturnType;
      updateComponentPropsById: (
        id: string,
        partialProps: AnyProps,
      ) => ReturnType;
    };
  }
  interface Editor {
    getCustomComponents: () => Array<CustomComponentInstance>;
  }
}

const findCustomComponentNodeById = (
  editor: Editor,
  nodeNames: string[],
  id: string,
): FoundCustomComponentNode | null => {
  let found: FoundCustomComponentNode | null = null;

  editor.state.doc.descendants((node, pos) => {
    if (!nodeNames.includes(node.type.name)) return true;
    if (node.attrs.id !== id) return true;

    found = { node, pos };
    return false;
  });

  return found;
};

export const CustomComponentManager =
  Extension.create<CustomComponentManagerOptions>({
    name: "customComponentManager",

    onCreate() {
      this.editor.getCustomComponents = () => {
        const nodeNames = Object.values(this.options.profileNodeNames);
        return getCustomComponentInstances({ editor: this.editor, nodeNames });
      };
    },

    addOptions() {
      return {
        registry: {
          get: () => undefined,
          getAll: () => [],
        },
        profileNodeNames: {
          block: "customComponent_block",
          blockDraggable: "customComponent_blockDraggable",
          inline: "customComponent_inline",
          inlineDraggable: "customComponent_inlineDraggable",
        },
      };
    },

    addCommands() {
      return {
        insertComponent:
          (payload: InsertComponentPayload) =>
          ({ chain }) => {
            const definition = this.options.registry.get(payload.componentName);
            if (!definition) return false;

            const resolvedProfile = payload.profile ?? "block";

            const nodeType = this.options.profileNodeNames[resolvedProfile];
            if (!nodeType) return false;

            const content: Content[] = [
              {
                type: nodeType,
                attrs: {
                  id: payload.id,
                  componentName: payload.componentName,
                  props: payload.props ?? {},
                },
              },
            ];

            const command = chain().focus();

            if (
              !resolvedProfile.startsWith("inline") &&
              payload.ensureEditableSpace !== false
            ) {
              command
                .createParagraphNear()
                .insertContent(content)
                .createParagraphNear();
            } else {
              command.insertContent(content);
            }

            return command.run();
          },

        removeComponentById:
          (id: string) =>
          ({ editor, tr, dispatch }) => {
            const found = findCustomComponentNodeById(
              editor,
              Object.values(this.options.profileNodeNames),
              id,
            );

            if (!found) return false;

            tr.delete(found.pos, found.pos + found.node.nodeSize);

            if (dispatch) dispatch(tr);
            return true;
          },

        updateComponentPropsById:
          (id: string, partialProps: AnyProps) =>
          ({ editor, tr, dispatch }) => {
            const found = findCustomComponentNodeById(
              editor,
              Object.values(this.options.profileNodeNames),
              id,
            );

            if (!found) return false;

            tr.setNodeMarkup(found.pos, undefined, {
              ...found.node.attrs,
              props: {
                ...(found.node.attrs.props ?? {}),
                ...partialProps,
              },
            });

            if (dispatch) dispatch(tr);
            return true;
          },
      };
    },
    addStorage() {
      return {
        getAll: () => [],
      };
    },
  });
