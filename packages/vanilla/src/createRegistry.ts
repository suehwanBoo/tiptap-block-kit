import type {
  ComponentRegistry,
  VanillaCustomComponentDefinition,
} from "./types";
import { checkDuplicateDefinition } from "./utils";

export function createRegistry<T extends VanillaCustomComponentDefinition<any>>(
  components: T[],
): ComponentRegistry<T> {
  checkDuplicateDefinition(components);
  return createBaseRegistry<T>(components);
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
