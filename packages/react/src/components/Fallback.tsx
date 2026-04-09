import { UnknownComponentFallbackProps } from "../types";

export default function DefaultFallback({
  componentName,
}: UnknownComponentFallbackProps) {
  return <>Unknown component: {componentName}</>;
}
