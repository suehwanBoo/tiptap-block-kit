# @tiptap-block-kit/vanilla

Vanilla bindings for **tiptap-block-kit**.

Build and manage custom Tiptap components without React, using a simple
registry-based API.

---

## Installation

```bash
npm install @tiptap-block-kit/vanilla
```

---

## Quick Start

```ts
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {
  createRegistry,
  defineComponent,
  CustomComponentKit,
} from "@tiptap-block-kit/vanilla";

const Badge = defineComponent({
  name: "badge",
  render: ({ label }: { label: string }) => {
    const element = document.createElement("span");
    element.textContent = label;
    return element;
  },
});

const registry = createRegistry([Badge]);

const editor = new Editor({
  element: document.querySelector("#editor"),
  extensions: [
    StarterKit,
    CustomComponentKit.configure({
      registry,
    }),
  ],
});
```

---

## Define a Component

```ts
const Badge = defineComponent({
  name: "badge",
  render: ({ label }: { label: string }) => {
    const element = document.createElement("span");
    element.textContent = label;
    return element;
  },
});
```

---

## Insert Component

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

## Update Component

```ts
editor.commands.updateComponentPropsById("badge-1", {
  label: "Updated",
});
```

---

## Remove Component

```ts
editor.commands.removeComponentById("badge-1");
```

---

## Get Components

```ts
// Returns all custom components currently in the editor
editor.getCustomComponents();
```

---

## Concepts

### Component

A unit of UI defined with `defineComponent`.

### Registry

A collection of components used by the editor.

### Props

Serializable data passed to the component.

---

## Advanced

### `CustomComponentKit.configure(options)`

Configure the behavior of the custom component system.

#### Options

---

Name Type Required Description

---

`registry` `ComponentRegistry` Yes Storage of registered
custom components

`fallback` `(info: { componentName: string; props: AnyProps }) => HTMLElement` No Fallback renderer
when an unknown
component is
encountered, such as
when content is
loaded with
`setContent`. Unknown
components during
insertion are
ignored.

`baseExtensionName` `string` No Base node type name.
Default is
`"customComponent"`

---

---

### `editor.commands.insertComponent(options)`

Insert a custom component into the editor.

#### Options

---

Name Type Required Description

---

`id` `string` Yes Unique identifier
for the component
instance

`componentName` `string` Yes Name of the
registered
component

`props` `Record<string, unknown>` No Props passed to
the component

`profile` `"block" \| "blockDraggable" \| "inline" \| "inlineDraggable"` No Rendering mode.
Default is
`"block"`

`ensureEditableSpace` `boolean` No Ensures enough
editable space to
prevent insertion
failure or
blocked typing.
Default is `true`

---

---

### Profiles

Defines how the component behaves inside the editor.

- `block`
- `blockDraggable`
- `inline`
- `inlineDraggable`

---

### Draggable Components

Draggable profiles only add attributes.\
To enable actual dragging, include a `data-drag-handle` attribute in
your rendered element.

```ts
const CustomCard = defineComponent({
  name: "customCard",
  render: ({ title, description }: { title: string; description?: string }) => {
    const root = document.createElement("div");
    root.setAttribute("data-drag-handle", "");

    const heading = document.createElement("h3");
    heading.textContent = title;
    heading.style.margin = "0";
    root.appendChild(heading);

    if (description) {
      const paragraph = document.createElement("p");
      paragraph.textContent = description;
      paragraph.style.marginTop = "8px";
      paragraph.style.marginBottom = "0";
      root.appendChild(paragraph);
    }

    return root;
  },
});
```

#### Why

The library does not automatically inject `data-drag-handle` to avoid
interfering with UI and interaction design.

Tiptap is a headless editor, so styling and interaction should remain
under user control.

## Compatibility

- `@tiptap/core` → **v2 & v3**

---

## License

MIT
