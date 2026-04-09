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

function defineBaseComponent<TDefinition extends { componentName: string }>(
  definition: TDefinition,
) {
  return definition;
}
