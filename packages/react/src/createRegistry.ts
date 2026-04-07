import { createRegistry as createBaseRegistry } from "@tiptap-block-kit/core";
import type {
  AnyReactCustomComponentDefinition,
  ComponentRegistry,
} from "./types";

export function createRegistry(
  components: AnyReactCustomComponentDefinition[],
): ComponentRegistry<AnyReactCustomComponentDefinition> {
  return createBaseRegistry<AnyReactCustomComponentDefinition>(components);
}
