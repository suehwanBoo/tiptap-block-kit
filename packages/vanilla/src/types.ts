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

export type AnyCustomComponentDefinition = CustomComponentDefinition<any>;

export type ComponentRegistry<TDefinition extends { componentName: string }> = {
  get: (name: string) => TDefinition | undefined;
  getAll: () => TDefinition[];
};

export type VanillaRenderer<TProps = AnyProps> = (props: TProps) => HTMLElement;

export type VanillaCustomComponentDefinition<TProps = AnyProps> =
  CustomComponentDefinition<VanillaRenderer<TProps>>;

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

export type UnknownComponentFallbackProps = {
  componentName: string;
  props: AnyProps;
};

export interface CustomComponentKitOptions {
  registry: ComponentRegistry<AnyCustomComponentDefinition>;
  baseExtensionName: string;
  fallback?: (payload: UnknownComponentFallbackProps) => HTMLElement;
}

export type CustomComponentInstance = {
  id: string;
  componentName: string;
  props: AnyProps;
  pos: number;
  nodeSize: number;
  nodeTypeName: string;
};
