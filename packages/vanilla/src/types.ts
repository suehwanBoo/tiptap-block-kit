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

export type VanillaRenderer = (attrs: AnyProps) => HTMLElement;

export type VanillaCustomComponentDefinition =
  CustomComponentDefinition<VanillaRenderer>;
