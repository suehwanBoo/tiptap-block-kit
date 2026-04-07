import type { ComponentRegistry } from "./types";

export function createRegistry<TDefinition extends { name: string }>(
  components: TDefinition[],
): ComponentRegistry<TDefinition> {
  const map = new Map(
    components.map((component) => [component.name, component]),
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
