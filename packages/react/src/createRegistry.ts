import type {
  AnyReactCustomComponentDefinition,
  ComponentRegistry,
} from "./types";
import { checkDuplicateDefinition } from "./utils";

export function createRegistry(
  components: AnyReactCustomComponentDefinition[],
): ComponentRegistry<AnyReactCustomComponentDefinition> {
  checkDuplicateDefinition(components);
  return createBaseRegistry<AnyReactCustomComponentDefinition>(components);
}

function createBaseRegistry<TDefinition extends { componentName: string }>(
  components: TDefinition[],
): ComponentRegistry<TDefinition> {
  const map = new Map(
    components.map((component) => [component.componentName, component]),
  );

  return {
    get(name: string) {
      return map.get(name);
    },
    getAll() {
      return Array.from(map.values());
    },
  };
}
