import { ComponentType } from "react";

export type AnyProps = Record<string, unknown>;

export type InsertComponentPayload = {
  name: string;
  props?: AnyProps;
};

export type CustomComponentDefinition<TRenderer = unknown> = {
  name: string;
  renderer: TRenderer;
};

export type ComponentRegistry<TDefinition extends { name: string }> = {
  get: (name: string) => TDefinition | undefined;
  getAll: () => TDefinition[];
};

export type ReactRenderer<TProps = AnyProps> = ComponentType<TProps>;

export type ReactCustomComponentDefinition<TProps = AnyProps> =
  CustomComponentDefinition<ReactRenderer<TProps>>;

export type AnyReactCustomComponentDefinition =
  ReactCustomComponentDefinition<any>;
