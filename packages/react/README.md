# ⚛️ @tiptap-block-kit/react

React bindings for **tiptap-block-kit**.

Build and manage custom Tiptap components using React with a simple,
registry-based API.

---

## 📦 Installation

```bash
npm install @tiptap-block-kit/react
```

---

## 🚀 Quick Start

```tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  createRegistry,
  defineComponent,
  CustomComponentKit,
} from "@tiptap-block-kit/react";

const Badge = defineComponent({
  name: "badge",
  component: CustomComponent,
});

const registry = createRegistry([Badge]);

export default function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomComponentKit.configure({
        registry,
      }),
    ],
  });
  return <EditorContent editor={editor} />;
}
```

---

## 🧱 Define a Component

```tsx
const Badge = ({ label }: { label: string }) => {
  return <span>{label}</span>;
};

const Badge = defineComponent({
  name: "badge",
  component: Badge,
});
```

---

## ⚡ Insert Component

```ts
editor.commands.insertComponent({
  id: "badge-1",
  componentName: "badge",
  props: {
    label: "Hello",
  },
});
```

---

## 🔄 Update Component

```ts
editor.commands.updateComponentPropsById("badge-1", {
  label: "Updated",
});
```

---

## ❌ Remove Component

```ts
editor.commands.removeComponentById("badge-1");
```

---

---

## 🔍 Get Components

```ts
// Returns all custom components currently in the editor
editor.getCustomComponents();
```

---

## 🧠 Concepts

### Component

A unit of UI defined with `defineComponent`.

### Registry

A collection of components used by the editor.

### Props

Serializable data passed to the component.

---

## ✅ Compatibility

- @tiptap/core → v2 & v3
- @tiptap/react → v2 & v3
- react → v18 & v19

---

## ⚙️ Advanced

### CustomComponentKit.configure(options)

Configure the behavior of the custom component system.

#### Options

---

Name Type Required Description

---

registry ComponentRegistry Yes Storage of registered custom
components

fallback (info: { componentName: No Fallback renderer when an unknown
string; props: AnyProps component is encountered
}) =\> HTMLElement \| (e.g. setContent). Insert-time
ReactNode unknowns are ignored

baseExtensionName string No Base node type name. Default is
"customComponent"

---

---

### editor.commands.insertComponent(options)

Insert a custom component into the editor.

#### Options

---

Name Type Required Description

---

id string Yes Unique identifier for the component
instance

componentName string Yes Name of the registered component

props Record\<string, No Props passed to the component
unknown\>

profile "block" \| No Rendering mode. Default is "block"
"blockDraggable" \|  
 "inline" \|  
 "inlineDraggable"

ensureEditableSpace boolean No Ensures enough editable space to
prevent insertion failure or blocked
typing (default: true)

---

---

### Profiles

Defines how the component behaves inside the editor.

- block
- blockDraggable
- inline
- inlineDraggable

---

### Draggable Components

Draggable profiles only add attributes.\
To enable actual dragging, include a data-drag-handle attribute in your
component.

```tsx
function CustomCard({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div data-drag-handle>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {description && (
        <p style={{ marginTop: 8, marginBottom: 0 }}>{description}</p>
      )}
    </div>
  );
}
```

#### Why

The library does not automatically inject data-drag-handle to avoid
interfering with UI/UX.

Tiptap is a headless editor, so interaction and styling should remain
under user control.

## 📄 License

MIT
