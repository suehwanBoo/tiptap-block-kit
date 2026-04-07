import { EditorContent, useEditor } from "@tiptap/react";
import {
  createRegistry,
  CustomComponent,
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
  const [color, setColor] = useState("#ddd");
  const colorChange = () =>
    setColor((prev) => (prev === "#ddd" ? "red" : "#ddd"));
  return (
    <div
      style={{
        border: `1px solid ${color}`,
        borderRadius: 12,
        padding: 16,
        margin: "8px 0",
        background: "#fafafa",
      }}
      onClick={colorChange}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      {description && (
        <p style={{ marginTop: 8, marginBottom: 0 }}>{description}</p>
      )}
    </div>
  );
}

const registry = createRegistry([
  defineComponent({
    name: "card",
    component: CustomCard,
  }),
]);

export default function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomComponent.configure({
        registry,
      }),
    ],
    content: `<p>Press the Button and insert the card in the Editor</p>`,
  });

  const insertCard = () => {
    editor?.commands.insertComponent({
      name: "card",
      props: {
        title: "card",
        description: "From @tiptap-block-kit/react",
      },
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
        onClick={() => console.log(editor?.getJSON())}
        style={{
          padding: "8px 12px",
          marginBottom: 16,
          cursor: "pointer",
        }}
      >
        Get JSON
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
