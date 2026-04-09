import { defineComponent } from "@tiptap-block-kit/vanilla";

export const Youtube = defineComponent({
  name: "youtube",
  render: (props: { videoId: string; title?: string }) => {
    const root = document.createElement("div");
    root.dataset.testid = "youtube";

    const video = document.createElement("div");
    video.textContent = `videoId: ${props.videoId}`;

    const title = document.createElement("div");
    title.textContent = `title: ${props.title ?? "untitled"}`;

    root.append(video, title);
    return root;
  },
});

export const Badge = defineComponent({
  name: "badge",
  render: (props: { label: string }) => {
    const root = document.createElement("span");
    root.dataset.testid = "badge";
    root.textContent = `badge: ${props.label}`;
    return root;
  },
});
