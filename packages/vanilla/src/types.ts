import type {
  AnyProps,
  CustomComponentDefinition,
  InsertComponentPayload,
  ComponentRegistry,
} from "@tiptap-block-kit/core";

export type { AnyProps, InsertComponentPayload, ComponentRegistry };

export type VanillaRenderer = (attrs: AnyProps) => HTMLElement;

export type VanillaCustomComponentDefinition =
  CustomComponentDefinition<VanillaRenderer>;
