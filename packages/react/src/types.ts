import { ComponentType } from "react";
import { profiles } from "./const";

export type AnyProps = Record<string, unknown>;

export type CustomComponentProfile = keyof typeof profiles;

export type InsertComponentPayload = {
  id: string;
  componentName: string;
  props?: AnyProps;
  profile?: CustomComponentProfile;
  ensureEditableSpace?: boolean;
};

export type CustomComponentDefinition<TRenderer = unknown> = {
  componentName: string;
  renderer: TRenderer;
};

export type ComponentRegistry<TDefinition extends { componentName: string }> = {
  get: (componentName: string) => TDefinition | undefined;
  getAll: () => TDefinition[];
};

export type ReactRenderer<TProps = AnyProps> = ComponentType<TProps>;

export type ReactCustomComponentDefinition<TProps = AnyProps> =
  CustomComponentDefinition<ReactRenderer<TProps>>;

export type AnyReactCustomComponentDefinition =
  ReactCustomComponentDefinition<any>;

export type CustomComponentSchemaOptions = {
  extensionName?: string;
  inline?: boolean;
  selectable?: boolean;
  draggable?: boolean;
};

export type FoundCustomComponentNode = {
  node: {
    attrs: Record<string, unknown>;
    nodeSize: number;
  };
  pos: number;
};

export type CustomComponentInstance = {
  id: string;
  componentName: string;
  props: AnyProps;
  pos: number;
  nodeSize: number;
  nodeTypeName: string;
};
