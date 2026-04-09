import { defineBaseComponent } from "./base";
import type { AnyProps, VanillaCustomComponentDefinition } from "./types";

export function defineComponent<TProps = AnyProps>(definition: {
  name: string;
  render: VanillaCustomComponentDefinition<TProps>["renderer"];
}) {
  return defineBaseComponent<VanillaCustomComponentDefinition<TProps>>({
    componentName: definition.name,
    renderer: definition.render,
  });
}
