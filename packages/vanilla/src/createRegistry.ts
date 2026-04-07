import { createRegistry as createBaseRegistry } from "@tiptap-block-kit/core";
import type {
  ComponentRegistry,
  VanillaCustomComponentDefinition,
} from "./types";

export function createRegistry(
  components: VanillaCustomComponentDefinition[],
): ComponentRegistry<VanillaCustomComponentDefinition> {
  return createBaseRegistry<VanillaCustomComponentDefinition>(components);
}
