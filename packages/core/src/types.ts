export type AnyProps = Record<string, unknown>;

export type InsertComponentPayload = {
  componentName: string;
  props?: AnyProps;
};

export type CustomComponentDefinition<TRenderer = unknown> = {
  componentName: string;
  renderer: TRenderer;
};

export type ComponentRegistry<TDefinition extends { componentName: string }> = {
  get: (componentName: string) => TDefinition | undefined;
  getAll: () => TDefinition[];
};
