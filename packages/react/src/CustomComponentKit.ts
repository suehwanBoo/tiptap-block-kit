import { Extension } from "@tiptap/core";
import { createCustomComponentNode } from "./CustomComponentNode";
import { CustomComponentManager } from "./CustomComponentManager";
import type {
  CustomComponentKitOptions,
  CustomComponentProfile,
} from "./types";
import { profiles } from "./const";

export const CustomComponentKit = Extension.create<CustomComponentKitOptions>({
  name: "customComponentKit",

  addOptions() {
    return {
      registry: {
        get: () => undefined,
        getAll: () => [],
      },
      baseExtensionName: "customComponent",
      fallback: undefined,
    };
  },

  addExtensions() {
    const profileEntries = Object.entries(profiles) as Array<
      [CustomComponentProfile, (typeof profiles)[CustomComponentProfile]]
    >;

    const profileNodeNames = Object.fromEntries(
      profileEntries.map(([profile]) => [
        profile,
        `${this.options.baseExtensionName}_${profile}`,
      ]),
    ) as Record<CustomComponentProfile, string>;

    const nodes = profileEntries.map(([profile, spec]) =>
      createCustomComponentNode({
        extensionName: profileNodeNames[profile],
        inline: spec.inline,
        draggable: spec.draggable,
      }).configure({
        registry: this.options.registry,
        fallback: this.options.fallback,
      }),
    );

    return [
      ...nodes,
      CustomComponentManager.configure({
        registry: this.options.registry,
        profileNodeNames,
      }),
    ];
  },
});
