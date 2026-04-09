import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import type {
  AnyProps,
  AnyReactCustomComponentDefinition,
  ComponentRegistry,
  UnknownComponentFallbackProps,
} from "../types";
import DefaultFallback from "./Fallback";
import { ComponentType } from "react";

type ReactCustomComponentExtensionOptions = {
  registry: ComponentRegistry<AnyReactCustomComponentDefinition>;
  fallback?: ComponentType<UnknownComponentFallbackProps>;
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
  const Fallback = extension.options
    .fallback as ComponentType<UnknownComponentFallbackProps>;

  if (!component) {
    return (
      <NodeViewWrapper as={as} data-custom-component-root="true">
        {Fallback ? (
          <Fallback componentName={componentName} props={props} />
        ) : (
          <DefaultFallback componentName={componentName} props={props} />
        )}
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
