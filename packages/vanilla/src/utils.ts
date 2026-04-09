import { Editor } from "@tiptap/core";
import {
  AnyCustomComponentDefinition,
  AnyProps,
  CustomComponentInstance,
} from "./types";

export function getCustomComponentInstances(args: {
  editor: Editor;
  nodeNames: string[];
}): CustomComponentInstance[] {
  const { editor, nodeNames } = args;
  const results: CustomComponentInstance[] = [];

  editor.state.doc.descendants((node, pos) => {
    if (!nodeNames.includes(node.type.name)) return true;

    results.push({
      id: String(node.attrs.id ?? ""),
      componentName: String(node.attrs.componentName ?? ""),
      props: (node.attrs.props ?? {}) as AnyProps,
      pos,
      nodeSize: node.nodeSize,
      nodeTypeName: node.type.name,
    });

    return true;
  });

  return results;
}

export function checkDuplicateDefinition(
  components: AnyCustomComponentDefinition[],
) {
  const checkDuplicate = new Map<string, boolean>();
  for (const { componentName } of components) {
    if (checkDuplicate.has(componentName))
      throw new Error(
        `[tiptap-block-kit] Duplicate componentName "${componentName}" detected. componentName must be unique.`,
      );
    checkDuplicate.set(componentName, true);
  }
}
