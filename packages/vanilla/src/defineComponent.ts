import { defineComponent as defineBaseComponent } from "@tiptap-block-kit/core";
import type { VanillaCustomComponentDefinition } from "./types";

export function defineComponent(definition: {
  name: string;
  render: VanillaCustomComponentDefinition["renderer"];
}) {
  return defineBaseComponent<VanillaCustomComponentDefinition>({
    componentName: definition.name,
    renderer: definition.render,
  });
}
