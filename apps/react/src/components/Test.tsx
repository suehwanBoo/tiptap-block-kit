import { defineComponent } from "@tiptap-block-kit/react";

export const Youtube = defineComponent({
  name: "youtube",
  component: ({ videoId, title }: { videoId: string; title?: string }) => {
    return (
      <div data-testid="youtube">
        <div>videoId: {videoId}</div>
        <div>title: {title ?? "untitled"}</div>
      </div>
    );
  },
});

export const Badge = defineComponent({
  name: "badge",
  component: ({ label }: { label: string }) => {
    return <span data-testid="badge">badge: {label}</span>;
  },
});
