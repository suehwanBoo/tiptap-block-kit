import { createRegistry as createBaseRegistry } from "@tiptap-block-kit/core";
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
