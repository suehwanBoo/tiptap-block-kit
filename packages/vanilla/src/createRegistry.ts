import { createRegistry as createBaseRegistry } from "@tiptap-block-kit/core";
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
