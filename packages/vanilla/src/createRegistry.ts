import { createRegistry as createBaseRegistry } from "@tiptap-block-kit/core";
import type { VanillaCustomComponentDefinition } from "./types";

export function createRegistry(components: VanillaCustomComponentDefinition[]) {
  return createBaseRegistry<VanillaCustomComponentDefinition>(components);
}
