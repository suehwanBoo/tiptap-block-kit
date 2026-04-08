import { Extension } from "@tiptap/core";
import { profiles } from "./const";
import {
  AnyCustomComponentDefinition,
  ComponentRegistry,
  CustomComponentProfile,
} from "./types";
import { createCustomComponentNode } from "./CustomComponentNode";
import { CustomComponentManager } from "./CustomComponentManager";

export interface CustomComponentKitOptions {
  registry: ComponentRegistry<AnyCustomComponentDefinition>;
  profiles: Partial<typeof profiles>;
  baseExtensionName: string;
}

export const CustomComponentKit = Extension.create<CustomComponentKitOptions>({
  name: "customComponentKit",

  addOptions() {
    return {
      registry: {
        get: () => undefined,
        getAll: () => [],
      },
      baseExtensionName: "customComponent",
      profiles,
    };
  },

  addExtensions() {
    const profileEntries = Object.entries(this.options.profiles) as Array<
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
