import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import type {
  AnyProps,
  AnyReactCustomComponentDefinition,
  ComponentRegistry,
} from "./types";

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
  const componentName = node.attrs.componentName as string;
  const props = (node.attrs.props ?? {}) as AnyProps;

  const component = extension.options.registry.get(componentName);
  const as = extension.config.inline ? "span" : "div";

  if (!component) {
    return (
      <NodeViewWrapper as={as} data-custom-component-root="true">
        Unknown component: {componentName}
      </NodeViewWrapper>
    );
  }

  const Component = component.renderer;

  return (
    <NodeViewWrapper as={as} data-custom-component-root="true">
      <Component {...props} />
    </NodeViewWrapper>
  );
}
