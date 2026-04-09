export function unknownFallback({
  componentName,
  props,
}: {
  componentName: string;
  props: Record<string, unknown>;
}) {
  const root = document.createElement("div");
  root.dataset.testid = "unknown-fallback";
  root.textContent = `Unknown component: ${componentName}`;

  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(props, null, 2);

  root.appendChild(pre);
  return root;
}
