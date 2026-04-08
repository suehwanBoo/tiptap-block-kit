export function defineComponent<TDefinition extends { componentName: string }>(
  definition: TDefinition,
) {
  return definition;
}
