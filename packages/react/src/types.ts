import { ComponentType } from "react";

import type {
  AnyProps,
  ComponentRegistry,
  CustomComponentDefinition,
  InsertComponentPayload,
} from "@tiptap-block-kit/core";
import { Editor } from "@tiptap/core";

export type { AnyProps, ComponentRegistry, InsertComponentPayload };

export type ReactRenderer<TProps = AnyProps> = ComponentType<TProps>;

export type ReactCustomComponentDefinition<TProps = AnyProps> =
  CustomComponentDefinition<ReactRenderer<TProps>>;

export type AnyReactCustomComponentDefinition =
  ReactCustomComponentDefinition<any>;
