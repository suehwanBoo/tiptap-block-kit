import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CustomComponentKit } from "@tiptap-block-kit/react";
import { UnknownFallback } from "./Fallback";
import { registry } from "../registry";

export function TestEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      CustomComponentKit.configure({
        registry,
        fallback: UnknownFallback,
      }),
    ],
    content: {
      type: "doc",
      content: [],
    },
  });

  if (!editor) return null;

  return (
    <div>
      <button
        onClick={() =>
          editor.commands.insertComponent({
            id: "yt-1",
            componentName: "youtube",
            props: {
              videoId: "abc123",
              title: "first video",
            },
            profile: "block",
          })
        }
      >
        insert youtube
      </button>

      <button
        onClick={() =>
          editor.commands.updateComponentPropsById("yt-1", {
            title: "updated title",
          })
        }
      >
        update youtube props
      </button>

      <button
        onClick={() => {
          editor.commands.setContent({
            type: "doc",
            content: [
              {
                type: "customComponent_block",
                attrs: {
                  id: "unknown-1",
                  componentName: "not-registered",
                  props: {
                    foo: "bar",
                  },
                },
              },
            ],
          });
        }}
      >
        set unknown json
      </button>

      <button
        onClick={() => {
          console.log("JSON", editor.getJSON());
        }}
      >
        log json
      </button>

      <EditorContent editor={editor} />
    </div>
  );
}
