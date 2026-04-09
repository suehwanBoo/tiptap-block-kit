import type { UnknownComponentFallbackProps } from "@tiptap-block-kit/react";

export const UnknownFallback = ({
  componentName,
  props,
}: UnknownComponentFallbackProps) => {
  return (
    <div data-testid="unknown-fallback">
      <div>Unknown component: {componentName}</div>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  );
};
