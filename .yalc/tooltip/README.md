# Tooltip

A customizable React tooltip library with delegated target detection, global and per-element positioning, global and local themes, SVG-based tooltip surfaces, built-in animations, viewport collision handling, and support for rendering both text and React content.

## Features

* Global tooltip provider
* Tooltips through `data-tooltip`
* Global default placement
* Per-tooltip placement overrides
* Global preset theme
* Per-tooltip preset theme overrides
* Custom global theme overrides
* Per-tooltip text and background colors
* React content rendering inside tooltips
* Automatic viewport collision handling
* Automatic opposite-side fallback
* Arrow position clamping near rounded corners
* Unified SVG body and arrow
* Rounded corners, borders, gradients, textures, and filters
* Built-in show and hide animations
* More than 50 built-in themes
* TypeScript support
* React and Next.js compatible

## Installation

```bash
npm install tooltip
```

```bash
yarn add tooltip
```

```bash
pnpm add tooltip
```

## Import styles

```tsx
import "tooltip/style.css";
```

## Basic usage

Render `TooltipProvider` once near the root of the application.

Any descendant element with a `data-tooltip` attribute can display a tooltip.

```tsx
"use client";

import { TooltipProvider } from "tooltip";
import "tooltip/style.css";

export const App = () => {
    return (
        <>
            <TooltipProvider />

            <button data-tooltip="Save changes">
                Save
            </button>
        </>
    );
};
```

The value of `data-tooltip` is used as the tooltip text.

```tsx
<span data-tooltip="Additional information">
    Hover me
</span>
```

## Provider placement

The provider can be rendered anywhere inside a Client Component. The visible tooltip is rendered into `document.body` through a React portal.

```tsx
"use client";

import { TooltipProvider } from "tooltip";
import "tooltip/style.css";

export const RootClient = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <TooltipProvider />
            {children}
        </>
    );
};
```

Only one provider is normally required for the application.

## Global position

Use `defaultRenderPosition` to define the default position for every tooltip.

```tsx
<TooltipProvider defaultRenderPosition="bottom" />
```

Available placements:

```ts
type TooltipPlacement =
    | "top"
    | "bottom"
    | "left"
    | "right";
```

Default:

```ts
"top"
```

Example:

```tsx
<TooltipProvider defaultRenderPosition="right" />

<button data-tooltip="Rendered on the right">
    Open
</button>
```

## Per-tooltip position

Use `data-tooltip-position` to override the provider position for one element.

```tsx
<TooltipProvider defaultRenderPosition="top" />

<button
    data-tooltip="Uses the global top position"
>
    Global position
</button>

<button
    data-tooltip="Uses a local bottom position"
    data-tooltip-position="bottom"
>
    Local position
</button>
```

Accepted values:

```ts
type TooltipPlacement =
    | "top"
    | "bottom"
    | "left"
    | "right";
```

The local attribute has priority over `defaultRenderPosition`.

## Automatic viewport fallback

The requested placement is used whenever enough viewport space is available.

When the preferred side does not have enough space, the tooltip can move to the opposite side.

Examples:

* `"top"` can fall back to `"bottom"`.
* `"bottom"` can fall back to `"top"`.
* `"left"` can fall back to `"right"`.
* `"right"` can fall back to `"left"`.

The tooltip is also clamped to the viewport so it does not render outside the visible screen area.

## Global theme

Use `selectTheme` to set the default preset for every tooltip.

```tsx
<TooltipProvider selectTheme="comic" />
```

```tsx
<TooltipProvider selectTheme="glass" />
```

```tsx
<TooltipProvider selectTheme="terminal" />
```

Default:

```ts
"primary"
```

## Per-tooltip theme

Use `data-tooltip-theme` to override the provider theme for one element.

```tsx
<TooltipProvider selectTheme="primary" />

<button
    data-tooltip="Primary tooltip"
>
    Primary
</button>

<button
    data-tooltip="Comic tooltip"
    data-tooltip-theme="comic"
>
    Comic
</button>

<button
    data-tooltip="Terminal tooltip"
    data-tooltip-theme="terminal"
>
    Terminal
</button>
```

The local theme only affects the tooltip connected to that element.

An unknown theme name is ignored and the provider theme is used instead.

## Built-in themes

The package includes the following presets:

```ts
type PresetsThemeType =
    | "primary"
    | "secondary"
    | "dark"
    | "light"
    | "comic"
    | "manga"
    | "newspaper"
    | "stickyNote"
    | "blueprint"
    | "terminal"
    | "crt"
    | "pixel"
    | "arcade"
    | "cyberpunk"
    | "synthwave"
    | "vaporwave"
    | "hologram"
    | "glass"
    | "frost"
    | "clay"
    | "bubblegum"
    | "candy"
    | "watermelon"
    | "lemon"
    | "lava"
    | "ember"
    | "toxic"
    | "radioactive"
    | "hazard"
    | "policeTape"
    | "construction"
    | "parchment"
    | "pirateMap"
    | "royal"
    | "noir"
    | "detective"
    | "dossier"
    | "medical"
    | "laboratory"
    | "circuit"
    | "galaxy"
    | "aurora"
    | "oceanDepths"
    | "coralReef"
    | "forest"
    | "moss"
    | "desert"
    | "snow"
    | "chrome"
    | "goldFoil"
    | "bronze"
    | "brutalist"
    | "chalkboard";
```

The theme names are also available as an array:

```ts
import {
    presetThemeNames,
    type PresetsThemeType,
} from "tooltip";

presetThemeNames.forEach((theme) => {
    const typedTheme: PresetsThemeType = theme;

    console.log(typedTheme);
});
```

## Custom global theme

Use `customTheme` to override part or all of the selected preset.

```tsx
<TooltipProvider
    selectTheme="dark"
    customTheme={{
        body: {
            background:
                "linear-gradient(135deg, #7c3aed, #db2777)",
            filter:
                "drop-shadow(0 10px 18px rgba(124, 58, 237, 0.4))",
            style: {
                color: "#ffffff",
                padding: "10px 16px",
                border: "2px solid #f0abfc",
                borderRadius: "18px",
                fontSize: "13px",
                fontWeight: 700,
            },
        },

        arrow: {
            size: "9px",
            width: "20px",
        },

        animation: {
            show: "bounce",
            hide: "scale",
            speed: "220ms",
            easing:
                "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
    }}
/>
```

Custom values are merged with the selected preset. Only the properties that need to change must be provided.

## Theme priority

Theme values are resolved in this order, from highest priority to lowest:

1. `data-color` and `data-bgcolor`
2. `customTheme`
3. `data-tooltip-theme`
4. `selectTheme`
5. The default `"primary"` theme

`customTheme` therefore continues to override the selected preset, including a preset selected through `data-tooltip-theme`.

## Per-tooltip colors

Use `data-color` to replace the text color for one tooltip.

Use `data-bgcolor` to replace the tooltip surface background for one tooltip.

```tsx
<button
    data-tooltip="Custom local colors"
    data-color="#ffffff"
    data-bgcolor="#dc2626"
>
    Delete
</button>
```

Both attributes can be combined with a preset theme:

```tsx
<button
    data-tooltip="Modified comic theme"
    data-tooltip-theme="comic"
    data-color="#ffffff"
    data-bgcolor="#7c3aed"
>
    Custom comic
</button>
```

`data-bgcolor` replaces the complete surface background, including gradients from the selected theme.

## Text content

The simplest content source is the `data-tooltip` value.

```tsx
<button data-tooltip="Simple text tooltip">
    Hover me
</button>
```

Line breaks can be included in the string:

```tsx
<button
    data-tooltip={`First line
Second line`}
>
    Multiple lines
</button>
```

The tooltip content uses `white-space: pre-line`, so line breaks are preserved.

## React content

Use `TooltipComponent` when the tooltip must render React elements instead of a plain string.

The component must be rendered inside the element that owns `data-tooltip`.

```tsx
import {
    TooltipComponent,
    TooltipProvider,
} from "tooltip";

export const Example = () => {
    return (
        <>
            <TooltipProvider />

            <button data-tooltip="">
                <TooltipComponent>
                    <strong>Custom React content</strong>
                </TooltipComponent>

                Hover me
            </button>
        </>
    );
};
```

`data-tooltip` must still exist because it marks the element as a tooltip target.

Its value can be empty when all content is supplied through `TooltipComponent`.

## Rich React content

The custom content can contain normal React nodes, layouts, icons, images, and components.

```tsx
<button
    data-tooltip=""
    data-tooltip-position="right"
    data-tooltip-theme="glass"
>
    <TooltipComponent>
        <div
            style={{
                display: "grid",
                gap: "6px",
                minWidth: "180px",
                textAlign: "left",
            }}
        >
            <strong>Project status</strong>

            <span>
                Build completed successfully
            </span>

            <span
                style={{
                    opacity: 0.75,
                    fontSize: "11px",
                }}
            >
                Updated a few seconds ago
            </span>
        </div>
    </TooltipComponent>

    Status
</button>
```

When `TooltipComponent` is present, its React children replace the string from `data-tooltip`.

This allows a text fallback to remain in the markup:

```tsx
<button data-tooltip="Loading details">
    <TooltipComponent>
        <div>
            <strong>Loaded details</strong>
            <span>React content is active</span>
        </div>
    </TooltipComponent>

    Details
</button>
```

While the nested component is mounted, `Loading details` is not rendered inside the tooltip.

## Non-interactive content

The tooltip container uses `pointer-events: none` by default.

Custom React content is therefore intended for display content such as:

* Text
* Icons
* Images
* Status indicators
* Structured descriptions
* Keyboard shortcut hints

Buttons, inputs, links, and other controls inside the tooltip are not interactive unless the package styles are deliberately overridden.

## Combined global and local configuration

```tsx
<TooltipProvider
    defaultRenderPosition="top"
    selectTheme="dark"
    customTheme={{
        body: {
            style: {
                fontSize: "13px",
            },
        },
    }}
/>

<button data-tooltip="Uses all global defaults">
    Default
</button>

<button
    data-tooltip="Local position"
    data-tooltip-position="bottom"
>
    Bottom
</button>

<button
    data-tooltip="Local theme"
    data-tooltip-theme="comic"
>
    Comic
</button>

<button
    data-tooltip="Local theme and position"
    data-tooltip-theme="terminal"
    data-tooltip-position="right"
>
    Terminal right
</button>

<button
    data-tooltip="Local colors"
    data-color="#fef3c7"
    data-bgcolor="#7c2d12"
>
    Custom colors
</button>
```

## Animations

Animation settings can be supplied through the provider.

```tsx
<TooltipProvider
    animation={{
        show: "bounce",
        hide: "scale",
        speed: "240ms",
        easing:
            "cubic-bezier(0.34, 1.56, 0.64, 1)",
    }}
/>
```

Available animation types:

```ts
type TooltipAnimationType =
    | "fade"
    | "slide"
    | "scale"
    | "zoom"
    | "blur"
    | "flip"
    | "bounce"
    | "none";
```

Animation configuration:

```ts
type TooltipAnimationOptions = {
    show?: TooltipAnimationType;
    hide?: TooltipAnimationType;
    speed?: `${number}ms` | `${number}s`;
    easing?:
        CSSProperties["animationTimingFunction"];
};
```

Provider-level `animation` values override animation values from the selected theme.

## Disable animations

```tsx
<TooltipProvider
    animation={{
        show: "none",
        hide: "none",
        speed: "1ms",
        easing: "linear",
    }}
/>
```

The package also respects `prefers-reduced-motion` by reducing the animation duration.

## SVG body and arrow

The tooltip body and arrow are rendered as one SVG path.

This prevents the arrow from visually overlapping rounded corners when it is moved close to an edge.

The unified surface supports:

* Rounded corners
* Individual corner radii
* Borders
* Dashed and dotted borders
* Solid colors
* Gradients
* Repeating gradients
* Pattern-like CSS backgrounds
* SVG-wide `drop-shadow()` filters

Example:

```tsx
<TooltipProvider
    customTheme={{
        body: {
            background:
                "linear-gradient(135deg, #fde047, #f97316)",
            filter:
                "drop-shadow(5px 5px 0 #18181b)",
            style: {
                color: "#18181b",
                border: "3px solid #18181b",
                borderRadius:
                    "20px 5px 20px 5px",
                padding: "10px 16px",
            },
        },

        arrow: {
            size: "10px",
            width: "22px",
        },
    }}
/>
```

The arrow position is clamped to the straight part of the tooltip edge. It cannot move into a rounded corner.

## Filter and shadow

Use `body.filter` when the filter must be applied to the complete SVG surface.

```tsx
<TooltipProvider
    customTheme={{
        body: {
            filter:
                "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.35))",
        },
    }}
/>
```

Multiple filters are supported:

```tsx
<TooltipProvider
    customTheme={{
        body: {
            filter:
                "drop-shadow(4px 4px 0 #ec4899) drop-shadow(-2px -2px 0 #22d3ee)",
        },
    }}
/>
```

A regular `boxShadow` inside `body.style` can also be converted to `drop-shadow()` by the provider:

```tsx
<TooltipProvider
    customTheme={{
        body: {
            style: {
                boxShadow:
                    "0 10px 18px rgba(0, 0, 0, 0.35)",
            },
        },
    }}
/>
```

CSS `drop-shadow()` does not support spread radius. When a `box-shadow` value contains spread radius, that part cannot be preserved during conversion.

Inset shadows cannot be represented by `drop-shadow()` and are ignored during conversion.

## Component properties

| Property                | Type                      |         Default | Description                                    |
| ----------------------- | ------------------------- | --------------: | ---------------------------------------------- |
| `defaultRenderPosition` | `TooltipPlacement`        |         `"top"` | Global default tooltip placement               |
| `selectTheme`           | `PresetsThemeType`        |     `"primary"` | Global preset theme                            |
| `customTheme`           | `ThemeType`               |     `undefined` | Global overrides merged with the active preset |
| `animation`             | `TooltipAnimationOptions` | Theme animation | Global show and hide animation overrides       |

## Data attributes

| Attribute               | Type                                     | Description                                                    |
| ----------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| `data-tooltip`          | `string`                                 | Marks an element as a tooltip target and supplies text content |
| `data-tooltip-position` | `"top" \| "bottom" \| "left" \| "right"` | Overrides the global placement                                 |
| `data-tooltip-theme`    | `PresetsThemeType`                       | Overrides the global preset theme                              |
| `data-color`            | `string`                                 | Overrides the tooltip text color                               |
| `data-bgcolor`          | `string`                                 | Overrides the complete tooltip background                      |

## Theme types

```ts
import { CSSProperties } from "react";

type TooltipSize =
    | `${number}px`
    | `${number}rem`
    | `${number}em`
    | `calc(${string})`;

type ThemeType = {
    body?: {
        background?:
            CSSProperties["background"];
        filter?: CSSProperties["filter"];
        style?: CSSProperties;
        className?: string;
    };

    arrow?: {
        size?: TooltipSize;
        width?: TooltipSize;
    };

    animation?: TooltipAnimationOptions;
};
```

## Arrow configuration

`arrow.size` controls how far the arrow extends from the tooltip body.

`arrow.width` controls the width of the arrow base.

```tsx
<TooltipProvider
    customTheme={{
        arrow: {
            size: "10px",
            width: "24px",
        },
    }}
/>
```

A narrow arrow:

```tsx
<TooltipProvider
    customTheme={{
        arrow: {
            size: "9px",
            width: "12px",
        },
    }}
/>
```

A wide arrow:

```tsx
<TooltipProvider
    customTheme={{
        arrow: {
            size: "8px",
            width: "28px",
        },
    }}
/>
```

## Complete customization example

```tsx
"use client";

import {
    TooltipComponent,
    TooltipProvider,
} from "tooltip";
import "tooltip/style.css";

export const TooltipExample = () => {
    return (
        <>
            <TooltipProvider
                defaultRenderPosition="top"
                selectTheme="glass"
                customTheme={{
                    body: {
                        filter:
                            "drop-shadow(0 12px 22px rgba(15, 23, 42, 0.45))",
                        style: {
                            fontSize: "13px",
                            lineHeight: 1.5,
                        },
                    },
                }}
                animation={{
                    show: "blur",
                    hide: "fade",
                    speed: "180ms",
                    easing: "ease-out",
                }}
            />

            <div
                style={{
                    display: "flex",
                    gap: "24px",
                    padding: "80px",
                }}
            >
                <button
                    data-tooltip="Simple text"
                >
                    Text
                </button>

                <button
                    data-tooltip="Comic fallback"
                    data-tooltip-theme="comic"
                    data-tooltip-position="bottom"
                >
                    Comic
                </button>

                <button
                    data-tooltip=""
                    data-tooltip-theme="terminal"
                    data-tooltip-position="right"
                >
                    <TooltipComponent>
                        <div
                            style={{
                                display: "grid",
                                gap: "4px",
                                textAlign: "left",
                            }}
                        >
                            <strong>
                                npm run build
                            </strong>

                            <span>
                                Build completed
                            </span>
                        </div>
                    </TooltipComponent>

                    React content
                </button>
            </div>
        </>
    );
};
```

## Next.js

The provider uses browser APIs and React portals. It must be rendered inside a Client Component.

```tsx
"use client";

import { TooltipProvider } from "tooltip";
import "tooltip/style.css";

export const TooltipClientProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <TooltipProvider
                defaultRenderPosition="top"
                selectTheme="primary"
            />

            {children}
        </>
    );
};
```

The Client Component can then be used from a layout:

```tsx
import { TooltipClientProvider } from "./TooltipClientProvider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <TooltipClientProvider>
                    {children}
                </TooltipClientProvider>
            </body>
        </html>
    );
}
```

## Dynamic elements

Tooltip targets are discovered through delegated document events.

Elements can therefore be added after the provider has mounted.

```tsx
{items.map((item) => (
    <button
        key={item.id}
        data-tooltip={item.description}
        data-tooltip-theme={
            item.important
                ? "hazard"
                : "primary"
        }
    >
        {item.title}
    </button>
))}
```

No separate tooltip instance is required for every target.

## How it works

The provider listens for tooltip targets in the document and renders one shared tooltip through a portal.

For the active target it calculates:

* Target position
* Tooltip dimensions
* Preferred placement
* Opposite-side fallback
* Viewport boundaries
* Arrow position
* Arrow offset near viewport edges
* Active preset theme
* Local color overrides
* Active animation phase

The SVG surface is recalculated when:

* Tooltip content changes
* React content changes size
* The tooltip theme changes
* The placement changes
* The viewport changes size
* The target or tooltip geometry changes

## Troubleshooting

### The tooltip does not appear

Check that:

1. `TooltipProvider` is rendered.
2. The stylesheet is imported.
3. The target has a `data-tooltip` attribute.
4. The component is rendered in a Client Component.
5. The target is connected to the document.
6. The tooltip text is not empty unless `TooltipComponent` is present.

### React content does not appear

The nested component must be inside the element with `data-tooltip`.

Correct:

```tsx
<button data-tooltip="">
    <TooltipComponent>
        React content
    </TooltipComponent>

    Hover me
</button>
```

Incorrect:

```tsx
<>
    <button data-tooltip="">
        Hover me
    </button>

    <TooltipComponent>
        React content
    </TooltipComponent>
</>
```

The component finds its owner through the closest ancestor matching `[data-tooltip]`.

### The text from `data-tooltip` is shown instead of React content

Check that `TooltipComponent` is mounted inside the same tooltip target.

```tsx
<span data-tooltip="Fallback text">
    <TooltipComponent>
        <strong>React content</strong>
    </TooltipComponent>

    Target
</span>
```

React content has priority over the attribute string.

### A local theme does not work

Check that the value exists in `PresetsThemeType`.

```tsx
<button
    data-tooltip="Valid"
    data-tooltip-theme="comic"
>
    Valid theme
</button>
```

Invalid values are ignored:

```tsx
<button
    data-tooltip="Fallback theme"
    data-tooltip-theme="unknown"
>
    Invalid theme
</button>
```

### Rounded corners do not appear

Set `borderRadius` inside `body.style`.

```tsx
<TooltipProvider
    customTheme={{
        body: {
            style: {
                borderRadius: "20px",
            },
        },
    }}
/>
```

The radius is read by the SVG surface generator and converted into path geometry.

### The arrow reaches a rounded corner

The arrow position is automatically clamped to the straight section of the tooltip edge.

When the tooltip is too narrow for both the requested radius and arrow width, the radius and arrow placement are constrained to preserve valid geometry.

### The border looks different on the arrow

The border is rendered as one SVG stroke around the complete path.

Use one consistent border definition:

```tsx
<TooltipProvider
    customTheme={{
        body: {
            style: {
                border:
                    "2px solid #18181b",
            },
        },
    }}
/>
```

The provider converts shorthand border values into individual side properties before passing them to the SVG surface.

### The shadow does not include the arrow

Use `body.filter` instead of applying a shadow to the inner content.

```tsx
<TooltipProvider
    customTheme={{
        body: {
            filter:
                "drop-shadow(0 8px 14px rgba(0, 0, 0, 0.35))",
        },
    }}
/>
```

The filter is applied to the complete SVG surface.

### Interactive content cannot be clicked

The tooltip uses `pointer-events: none` by default.

This prevents the tooltip from interrupting hover behavior, but also makes nested buttons, links, and inputs non-interactive.

Override the package styles only when interactive popover behavior is deliberately required.

### The tooltip is behind another element

The default tooltip container uses a very high `z-index`.

Check whether a parent or application layer creates an unusual top-layer context, uses the browser Popover API, or renders inside native dialog top layers.

Because the tooltip portal is attached to `document.body`, ordinary ancestor overflow does not clip it.

## Browser requirements

The package relies on modern browser APIs:

* React portals
* `ResizeObserver`
* Pointer and mouse events
* `requestAnimationFrame`
* SVG paths
* SVG `clipPath`
* SVG `foreignObject`
* CSS custom properties
* CSS filters
* CSS gradients

Modern versions of Chrome, Edge, Firefox, and Safari are recommended.

## TypeScript

The package exports its public component and configuration types:

```ts
export {
    TooltipComponent,
    TooltipProvider,
    presetThemeNames,
} from "tooltip";

export type {
    PresetsThemeType,
    ThemeType,
    TooltipAnimationOptions,
    TooltipAnimationType,
    TooltipPlacement,
} from "tooltip";
```

Example:

```tsx
import type {
    PresetsThemeType,
    ThemeType,
    TooltipAnimationOptions,
} from "tooltip";

const theme: PresetsThemeType =
    "cyberpunk";

const customTheme: ThemeType = {
    body: {
        background: "#18181b",
        filter:
            "drop-shadow(4px 4px 0 #ec4899)",
        style: {
            color: "#ffffff",
            border: "2px solid #22d3ee",
            borderRadius: "2px 14px",
        },
    },
};

const animation: TooltipAnimationOptions = {
    show: "flip",
    hide: "zoom",
    speed: "190ms",
    easing: "ease-out",
};
```

## License
MIT
