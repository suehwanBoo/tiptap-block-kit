import { EditorContent, useEditor } from "@tiptap/react";
import {
  createRegistry,
  CustomComponentKit,
  defineComponent,
} from "@tiptap-block-kit/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

function CustomCard({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div
      style={{
        border: `1px solid #ddd`,
        borderRadius: 12,
        padding: 16,
        margin: "8px 0",
        background: "#fafafa",
      }}
      // data-drag-handle
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      {description && (
        <p style={{ marginTop: 8, marginBottom: 0 }}>{description}</p>
      )}
    </div>
  );
}

function AFD() {
  return <div>asdfasdf</div>;
}

function Fallback() {
  return <div>Custom Fallback</div>;
}

const registry = createRegistry([
  defineComponent({
    name: "card",
    component: CustomCard,
  }),
  defineComponent({
    name: "afd",
    component: AFD,
  }),
]);

export default function App() {
  const [count, setCount] = useState(0);
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomComponentKit.configure({
        registry,
        fallback: Fallback,
      }),
    ],
    content: `<p>Press the Button and insert the card in the Editor</p>`,
    autofocus: "end",
  });
  const insertCard = () => {
    editor?.commands.insertComponent({
      id: "" + count,
      componentName: "card",
      props: {
        title: "card" + count,
        description: "From @tiptap-block-kit/react",
      },
      profile: "inlineDraggable",
    });
    setCount((prev) => prev + 1);
  };

  const insertAFD = () => {
    editor?.commands.insertComponent({
      id: "123",
      componentName: "adf",
      profile: "block",
    });
  };
  const removeCard = () => {
    editor?.commands.removeComponentById("1");
  };
  const updateCard = () => {
    editor?.commands.updateComponentPropsById("1", {
      title: "updatetetete",
      description: "우아아아악",
    });
  };

  const checkFallback = () => {
    editor?.commands.setContent({
      type: "doc",
      content: [
        {
          type: "customComponent_block", // ✅ 존재하는 node type
          attrs: {
            id: "1",
            componentName: "not-exists", // ❌ registry에 없음
            props: {
              videoId: "abc123",
            },
          },
        },
      ],
    });
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>tiptap-block-kit/react playground</h2>

      <button
        onClick={insertCard}
        style={{
          padding: "8px 12px",
          marginBottom: 16,
          cursor: "pointer",
        }}
      >
        Inser Card
      </button>
      <button
        onClick={insertAFD}
        style={{
          padding: "8px 12px",
          marginBottom: 16,
          cursor: "pointer",
        }}
      >
        Insert AFD
      </button>
      <button
        onClick={checkFallback}
        style={{
          padding: "8px 12px",
          marginBottom: 16,
          cursor: "pointer",
        }}
      >
        Get JSON
      </button>
      <button
        onClick={removeCard}
        style={{
          padding: "8px 12px",
          marginBottom: 16,
          cursor: "pointer",
        }}
      >
        Remove
      </button>
      <button
        onClick={updateCard}
        style={{
          padding: "8px 12px",
          marginBottom: 16,
          cursor: "pointer",
        }}
      >
        Update
      </button>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 12,
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
