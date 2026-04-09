import { createRegistry as createBaseRegistry } from "@tiptap-block-kit/core";
import type {
  ComponentRegistry,
  VanillaCustomComponentDefinition,
} from "./types";
import { checkDuplicateDefinition } from "./utils";

export function createRegistry(
  components: VanillaCustomComponentDefinition[],
): ComponentRegistry<VanillaCustomComponentDefinition> {
  checkDuplicateDefinition(components);
  return createBaseRegistry<VanillaCustomComponentDefinition>(components);
}
