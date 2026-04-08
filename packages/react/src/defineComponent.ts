import { defineComponent as defineBaseComponent } from "@tiptap-block-kit/core";
import { AnyProps, ReactCustomComponentDefinition } from "./types";

export function defineComponent<TProps = AnyProps>(definition: {
  name: string;
  component: ReactCustomComponentDefinition<TProps>["renderer"];
}) {
  return defineBaseComponent<ReactCustomComponentDefinition<TProps>>({
    componentName: definition.name,
    renderer: definition.component,
  });
}
