import { ComponentRegistry } from "./types";

export function defineBaseComponent<
  TDefinition extends { componentName: string },
>(definition: TDefinition) {
  return definition;
}

export function createBaseRegistry<
  TDefinition extends { componentName: string },
>(components: TDefinition[]): ComponentRegistry<TDefinition> {
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
