# ✨ tiptap-block-kit

> A toolkit for building and managing custom Tiptap components with a
> simple registry-based API.

**tiptap-block-kit** lets you define, register, and control custom
components in Tiptap ---\
with a consistent developer experience across **React** and **Vanilla**.

---

## 🚀 Why tiptap-block-kit?

### 1. Less boilerplate, more focus

Stop writing repetitive `Node`, `NodeView`, and command logic every
time.
Define your component once and plug it into the editor.

### 2. Unified API for React & Vanilla

Use the same mental model whether you're working with React or plain
DOM.

### 3. Built-in component management

Easily insert, update, and remove components with a clean editor API.

---

## 🧠 How it works

```ts
import {
  createRegistry,
  defineComponent,
  CustomComponentKit,
} from "@tiptap-block-kit/react";
import { Editor } from "@tiptap/core";

const Youtube = defineComponent({
  name: "youtube",
  render: ({ videoId }: { videoId: string }) => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    return iframe;
  },
});

const registry = createRegistry([Youtube]);

const editor = new Editor({
  extensions: [CustomComponentKit.configure({ registry })],
});
```

---

## 📦 Packages

Choose the package that fits your environment:

- ⚛️ React → `@tiptap-block-kit/react`
- 🧱 Vanilla → `@tiptap-block-kit/vanilla`

---

## ⚡ Quick Example

```ts
editor.commands.insertComponent({
  id: "youtube-1",
  componentName: "youtube",
  props: {
    videoId: "dQw4w9WgXcQ",
  },
});
```

---

## 🔄 Before / After

### ❌ Without tiptap-block-kit

```ts
Node.create({
  addAttributes() { ... },
  parseHTML() { ... },
  renderHTML() { ... },
  addNodeView() { ... },
});
```

### ✅ With tiptap-block-kit

```ts
defineComponent({
  name: "youtube",
  render: (props) => { ... },
});
```

---

## ✅ Compatibility

- @tiptap/core → v2 & v3
- @tiptap/react → v2 & v3
- react → v18 & v19

---

## 📚 Documentation

- React guide → ./packages/react/README.md
- Vanilla guide → ./packages/vanilla/README.md

---

## 🎯 Use Cases

- Custom embeds (YouTube, maps, cards)
- Interactive blocks (badges, widgets)
- Inline components (mentions, tags)
- Cross-framework editor systems

---

## 🛠 Status

Early stage --- API may evolve based on feedback.

---

## 📄 License

MIT
