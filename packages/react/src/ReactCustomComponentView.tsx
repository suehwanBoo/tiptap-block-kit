import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import type { AnyProps, ComponentRegistry } from "@tiptap-block-kit/core";
import type { AnyReactCustomComponentDefinition } from "./types";

type ReactCustomComponentExtensionOptions = {
  registry: ComponentRegistry<AnyReactCustomComponentDefinition>;
};

type ReactCustomComponentViewProps = NodeViewProps & {
  extension: NodeViewProps["extension"] & {
    options: ReactCustomComponentExtensionOptions;
  };
};

export function ReactCustomComponentView({
  node,
  extension,
}: ReactCustomComponentViewProps) {
  const componentName = node.attrs.name as string;
  const props = (node.attrs.props ?? {}) as AnyProps;

  const component = extension.options.registry.get(componentName);

  if (!component) {
    return (
      <NodeViewWrapper as="div" data-custom-component-root="true">
        Unknown component: {componentName}
      </NodeViewWrapper>
    );
  }

  const Component = component.renderer;

  return (
    <NodeViewWrapper as="div" data-custom-component-root="true">
      <Component {...props} />
    </NodeViewWrapper>
  );
}
