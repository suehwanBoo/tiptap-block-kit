import { createRegistry as createBaseRegistry } from "@tiptap-block-kit/core";
import type { AnyReactCustomComponentDefinition } from "./types";

export function createRegistry(
  components: AnyReactCustomComponentDefinition[],
) {
  return createBaseRegistry<AnyReactCustomComponentDefinition>(components);
}
