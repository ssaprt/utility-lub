# Popup-from-future by @ssaprt

A flexible, animated, themeable popup component for React and Next.js.

`popup-from-future` provides controlled popup rendering, built-in visual presets, separate open and close animations, configurable overlay blur and background, custom sizing, headers, close controls, delayed close-button access, timer rendering, style overrides, React portals, and full TypeScript support.

[Web version](https://utility-lab.store/react/UI-Components/popup/)

The popup is rendered into `document.body` through a React portal and can be configured globally through built-in defaults, visually through presets, and locally through component props.

## Features

* Controlled popup state
* React portal rendering into `document.body`
* 30 built-in popup presets
* Fully customizable popup surface
* Fully customizable overlay layer
* Configurable overlay color
* Configurable backdrop blur
* Separate open and close animations
* 28 built-in animation pairs
* Configurable animation duration
* Configurable animation easing
* Per-phase animation overrides
* Numeric and CSS string durations
* Configurable popup width and height
* Multiple size formats
* Optional popup header
* Built-in close button
* Custom close icon
* Fully custom close component
* Delayed close-button availability
* Built-in visual countdown timer
* Fully custom timer renderer
* Custom styles and class names
* Separate container, header, and body styling
* Preset styles can be overridden locally
* Custom React content
* Scrollable popup body
* Ref forwarding to the popup container
* TypeScript support
* React support
* Next.js support
* CSS `prefers-reduced-motion` support
* Modern Chrome, Safari, Firefox, Edge, iOS Safari, and Chromium-based mobile browser support

## Installation

```bash
npm install popup-from-future
```

```bash
yarn add popup-from-future
```

```bash
pnpm add popup-from-future
```

Import the stylesheet once in your application:

```ts
import "popup-from-future/style.css";
```

## Basic usage

`Popup` is a controlled component.

You provide the current state through `isOpen` and update it through `open`.

```tsx
"use client";

import { useState } from "react";
import { Popup } from "popup-from-future";
import "popup-from-future/style.css";

export const Example = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Open popup
            </button>

            <Popup
                isOpen={isOpen}
                open={setIsOpen}
            >
                <h2>Hello</h2>
                <p>Popup content</p>
            </Popup>
        </>
    );
};
```

The popup is mounted only while it is visible or completing its close animation.

## Controlled state

The popup does not maintain the application-level open state itself.

```tsx
const [isOpen, setIsOpen] = useState(false);

<Popup
    isOpen={isOpen}
    open={setIsOpen}
>
    Content
</Popup>
```

Open it:

```tsx
setIsOpen(true);
```

The built-in close control eventually calls:

```ts
open(false);
```

after the configured closing animation has completed.

This keeps the component mounted while the close animation is running.

## Built-in presets

The package includes 30 ready-to-use visual presets.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="aurora"
>
    Aurora popup
</Popup>
```

Available presets:

```ts
type PopupPresetName =
    | "glass"
    | "frosted"
    | "midnight"
    | "graphite"
    | "obsidian"
    | "snow"
    | "ivory"
    | "ocean"
    | "aqua"
    | "emerald"
    | "forest"
    | "mint"
    | "amber"
    | "sunset"
    | "coral"
    | "rose"
    | "ruby"
    | "wine"
    | "violet"
    | "lavender"
    | "aurora"
    | "cosmic"
    | "neon"
    | "cyber"
    | "terminal"
    | "steel"
    | "chrome"
    | "paper"
    | "clay"
    | "minimal";
```

The presets cover different visual styles such as:

* Glassmorphism
* Frosted glass
* Light interfaces
* Dark interfaces
* Deep black surfaces
* Minimal UI
* Neon
* Cyber
* Terminal
* Metallic
* Paper
* Clay
* Pastel
* Gradient
* Ocean
* Forest
* Aurora
* Cosmic
* Warm
* Cold
* High-contrast designs

Each preset can define its own:

* Popup background
* Text color
* Border
* Border radius
* Shadow
* Layer color
* Layer blur
* Close control
* Timer style
* Open animation
* Close animation

## Preset examples

### Glass

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="glass"
>
    Glass popup
</Popup>
```

### Midnight

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="midnight"
>
    Midnight popup
</Popup>
```

### Aurora

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="aurora"
>
    Aurora popup
</Popup>
```

### Neon

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="neon"
>
    Neon popup
</Popup>
```

### Terminal

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="terminal"
>
    Terminal popup
</Popup>
```

### Minimal

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="minimal"
>
    Minimal popup
</Popup>
```

## Configuration priority

Popup configuration is merged in the following order:

1. Built-in `stylesConfig`
2. Selected preset
3. Props passed directly to `Popup`

Local component configuration therefore always has the highest priority.

For example:

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="glass"
    layer={{
        blur: 20,
    }}
    customStyle={{
        container: {
            style: {
                borderRadius: "40px",
            },
        },
    }}
>
    Content
</Popup>
```

The popup keeps the rest of the `glass` preset, while the local blur and border radius replace the preset values.

## Animations

Open and close animations can be configured independently.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    animation={{
        open: {
            animationName: "zoom-in",
        },
        close: {
            animationName: "zoom-out",
        },
    }}
>
    Animated popup
</Popup>
```

## Available open animations

```ts
type AnimationsPopupInType =
    | "fade-in"
    | "slide-up-in"
    | "slide-down-in"
    | "slide-left-in"
    | "slide-right-in"
    | "zoom-in"
    | "pop-in"
    | "drop-in"
    | "blur-in"
    | "rotate-in"
    | "flip-x-in"
    | "flip-y-in"
    | "tilt-in"
    | "bounce-in"
    | "pulse-in"
    | "heartbeat-in"
    | "shake-in"
    | "wobble-in"
    | "swing-in"
    | "rubber-band-in"
    | "jello-in"
    | "float-in"
    | "breathe-in"
    | "spin-in"
    | "glow-in"
    | "glitch-in"
    | "jump-in"
    | "press-in";
```

## Available close animations

```ts
type AnimationsPopupOutType =
    | "fade-out"
    | "slide-up-out"
    | "slide-down-out"
    | "slide-left-out"
    | "slide-right-out"
    | "zoom-out"
    | "pop-out"
    | "drop-out"
    | "blur-out"
    | "rotate-out"
    | "flip-x-out"
    | "flip-y-out"
    | "tilt-out"
    | "bounce-out"
    | "pulse-out"
    | "heartbeat-out"
    | "shake-out"
    | "wobble-out"
    | "swing-out"
    | "rubber-band-out"
    | "jello-out"
    | "float-out"
    | "breathe-out"
    | "spin-out"
    | "glow-out"
    | "glitch-out"
    | "jump-out"
    | "press-out";
```

## Shared animation configuration

Properties placed directly inside `animation` apply to both phases unless that phase overrides them.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    animation={{
        duration: 450,
        easing: "ease-in-out",
        open: {
            animationName: "zoom-in",
        },
        close: {
            animationName: "blur-out",
        },
    }}
>
    Content
</Popup>
```

In this example both animations use:

```ts
duration: 450
easing: "ease-in-out"
```

while their animation names remain independent.

## Per-phase animation configuration

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    animation={{
        open: {
            animationName: "bounce-in",
            duration: 700,
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        close: {
            animationName: "fade-out",
            duration: 300,
            easing: "ease-out",
        },
    }}
>
    Content
</Popup>
```

## Animation priority

Animation properties are resolved separately.

For the opening phase:

1. `animation.open`
2. `animation`
3. `preset.animation.open`
4. `preset.animation`
5. Built-in opening defaults

For the closing phase:

1. `animation.close`
2. `animation`
3. `preset.animation.close`
4. `preset.animation`
5. Built-in closing defaults

This means a preset can provide a complete animation pair while individual values can still be overridden locally.

## Animation duration

Duration accepts a number or CSS time value.

```ts
type AnimationDuration =
    | number
    | `${number}ms`
    | `${number}s`;
```

Numbers are interpreted as milliseconds.

These values are equivalent:

```tsx
animation={{
    duration: 500,
}}
```

```tsx
animation={{
    duration: "500ms",
}}
```

Seconds are also supported:

```tsx
animation={{
    duration: "0.5s",
}}
```

## Animation easing

Any valid React CSS animation timing function can be used.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    animation={{
        duration: 600,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    }}
>
    Content
</Popup>
```

## Layer

The full-screen layer behind the popup can be configured independently.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    layer={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        blur: 12,
    }}
>
    Content
</Popup>
```

## Layer background

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    layer={{
        backgroundColor: "rgba(15, 23, 42, 0.8)",
    }}
>
    Content
</Popup>
```

Any valid CSS `backgroundColor` value can be supplied.

## Layer blur

Blur accepts either a number or pixel value.

```ts
type PopupBlur =
    | number
    | `${number}px`;
```

A numeric value is automatically converted to pixels.

```tsx
layer={{
    blur: 16,
}}
```

is resolved to:

```css
blur(16px)
```

You can also use:

```tsx
layer={{
    blur: "16px",
}}
```

The component applies both:

```css
backdrop-filter
-webkit-backdrop-filter
```

for modern browser compatibility.

## Custom layer styles

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    layer={{
        backgroundColor: "rgba(3, 7, 18, 0.65)",
        blur: 10,
        style={{
            padding: "20px",
        },
        className: "my-popup-layer",
    }}
>
    Content
</Popup>
```

## Popup size

The `size` property controls the popup container width and height.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    size="600px 400px"
>
    Content
</Popup>
```

## Supported size values

```ts
type SizeValue =
    | number
    | `${number}px`
    | `${number}%`
    | `${number}vw`
    | `${number}vh`
    | `${number}dvw`
    | `${number}dvh`;
```

`SizeType` supports a single value:

```tsx
size="500px"
```

which produces:

```ts
width: "500px"
height: "500px"
```

Two values:

```tsx
size="600px 400px"
```

which produces:

```ts
width: "600px"
height: "400px"
```

Numbers:

```tsx
size={400}
```

Objects:

```tsx
size={{
    w: "600px",
    h: "400px",
}}
```

Viewport sizes:

```tsx
size="80vw 70dvh"
```

Percentage sizes:

```tsx
size="80% 60%"
```

## Size type

```ts
type SizeType =
    | SizeValue
    | `${number}px ${number}px`
    | `${number}% ${number}%`
    | `${number}vw ${number}vh`
    | `${number}vw ${number}dvh`
    | {
          w: SizeValue;
          h: SizeValue;
      };
```

## Header

An optional header can be rendered above the popup body.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    header={{
        content: <h2>Account settings</h2>,
    }}
>
    <p>Popup body</p>
</Popup>
```

`header.content` accepts any `ReactNode`.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    header={{
        content: (
            <div>
                <strong>Profile</strong>
                <span>Manage your account</span>
            </div>
        ),
    }}
>
    Content
</Popup>
```

## Built-in close button

A close button is included by default.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
>
    Content
</Popup>
```

When no custom icon or renderer is supplied, the built-in control displays:

```text
×
```

The default close button uses:

```html
aria-label="Close popup"
```

## Custom close icon

Any React content can replace the default icon.

```tsx
import { IconX } from "@tabler/icons-react";

<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        icon: <IconX />,
    }}
>
    Content
</Popup>
```

## Close button size

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        size: "40px",
    }}
>
    Content
</Popup>
```

You can also use separate width and height values:

```tsx
close={{
    size: "48px 36px",
}}
```

## Close button styling

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        size: "40px",
        style: {
            top: "16px",
            right: "16px",
            color: "#ffffff",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
        },
        className: "custom-close",
    }}
>
    Content
</Popup>
```

## Custom close component

Use `close.render` when the entire close control must be replaced.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        render: ({ close }) => (
            <button
                type="button"
                onClick={close}
            >
                Close
            </button>
        ),
    }}
>
    Content
</Popup>
```

The renderer receives:

```ts
interface PopupCloseComponentProps {
    close: () => void;
}
```

This allows the custom component to start the normal closing sequence.

## Delayed close button

`close.timeOutShow` delays access to the close button.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        timeOutShow: 5000,
    }}
>
    Content
</Popup>
```

The value uses `AnimationDuration`, so all of these are valid:

```tsx
timeOutShow: 5000
```

```tsx
timeOutShow: "5000ms"
```

```tsx
timeOutShow: "5s"
```

`timeOutShow` does not automatically close the popup.

It controls when the close button becomes available.

While the delay is active, the built-in countdown timer is rendered instead of the close button.

After the timer reaches zero, the close button becomes available.

## Built-in close timer

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        timeOutShow: "5s",
    }}
>
    Wait before closing
</Popup>
```

The default timer displays:

* Circular track
* Circular progress indicator
* Remaining seconds

The progress moves from `1` to `0`.

## Timer styling

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        timeOutShow: "5s",
        timer: {
            style: {
                color: "#ffffff",
                background: "rgba(0, 0, 0, 0.2)",
            },
            className: "my-popup-timer",
        },
    }}
>
    Content
</Popup>
```

## Custom timer renderer

The complete timer interface can be replaced.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    close={{
        timeOutShow: "10s",
        timer: {
            render: ({
                seconds,
                remainingMs,
                duration,
                progress,
                style,
                className,
            }) => (
                <div
                    style={style}
                    className={className}
                >
                    {seconds}
                </div>
            ),
        },
    }}
>
    Content
</Popup>
```

The timer renderer receives:

```ts
interface PopupCloseTimerComponentProps {
    seconds: number;
    remainingMs: number;
    duration: number;
    progress: number;
    style?: CSSProperties;
    className?: string;
}
```

### `seconds`

Whole seconds remaining, rounded upward.

### `remainingMs`

Exact remaining duration in milliseconds.

### `duration`

Original timer duration in milliseconds.

### `progress`

Normalized remaining progress.

```text
1 → timer started
0.5 → half remaining
0 → timer completed
```

### `style`

Merged timer styles.

### `className`

Merged timer class names.

## Custom popup styles

The popup exposes separate style configuration for:

* Container
* Header
* Body

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    customStyle={{
        container: {
            style: {
                background: "#ffffff",
                color: "#111827",
                borderRadius: "24px",
                padding: "20px",
            },
        },
        header: {
            style: {
                fontSize: "22px",
                fontWeight: 700,
            },
        },
        body: {
            style: {
                gap: "16px",
            },
        },
    }}
>
    Content
</Popup>
```

## Container styles

```tsx
customStyle={{
    container: {
        style: {
            width: "600px",
            minHeight: "300px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "30px",
            background: "#09090b",
            color: "#ffffff",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
        },
        className: "my-popup",
    },
}}
```

## Header styles

```tsx
customStyle={{
    header: {
        style: {
            width: "100%",
            paddingRight: "40px",
            fontSize: "20px",
            fontWeight: 700,
        },
        className: "my-popup-header",
    },
}}
```

## Body styles

```tsx
customStyle={{
    body: {
        style: {
            width: "100%",
            gap: "20px",
            padding: "12px",
        },
        className: "my-popup-body",
    },
}}
```

The default body supports both horizontal and vertical scrolling.

## Preset with custom styles

Presets and local styles can be combined.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="cosmic"
    size="640px 480px"
    customStyle={{
        container: {
            style: {
                borderRadius: "40px",
            },
        },
        header: {
            style: {
                fontSize: "24px",
                fontWeight: 700,
            },
        },
    }}
    header={{
        content: "Cosmic popup",
    }}
>
    Content
</Popup>
```

Only explicitly supplied properties override the selected preset.

## Complete configuration example

```tsx
"use client";

import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { Popup } from "popup-from-future";
import "popup-from-future/style.css";

export const CompleteExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Open popup
            </button>

            <Popup
                isOpen={isOpen}
                open={setIsOpen}
                preset="aurora"
                index={100000}
                size="620px 460px"
                animation={{
                    duration: 600,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    open: {
                        animationName: "zoom-in",
                    },
                    close: {
                        animationName: "blur-out",
                        duration: 400,
                    },
                }}
                layer={{
                    backgroundColor: "rgba(3, 7, 18, 0.68)",
                    blur: 12,
                }}
                close={{
                    icon: <IconX />,
                    size: "38px",
                    timeOutShow: "3s",
                    style: {
                        top: "12px",
                        right: "12px",
                    },
                    timer: {
                        style: {
                            fontWeight: 700,
                        },
                    },
                }}
                header={{
                    content: <strong>Complete popup</strong>,
                }}
                customStyle={{
                    container: {
                        style: {
                            padding: "20px",
                        },
                    },
                    header: {
                        style: {
                            width: "100%",
                            fontSize: "22px",
                        },
                    },
                    body: {
                        style: {
                            width: "100%",
                            gap: "16px",
                        },
                    },
                }}
            >
                <p>
                    This popup combines a preset, custom animations,
                    layer configuration, delayed close control, header,
                    sizing, and local style overrides.
                </p>
            </Popup>
        </>
    );
};
```

## Rich React content

`children` accepts any valid `ReactNode`.

The popup can contain complete React interfaces.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="glass"
    size="700px 500px"
>
    <article>
        <img
            src="/preview.jpg"
            alt="Preview"
        />

        <h2>Media preview</h2>

        <p>
            Popup content can contain media, controls,
            forms, navigation, or other React components.
        </p>

        <button type="button">
            Continue
        </button>
    </article>
</Popup>
```

## Forms

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="snow"
    size="500px"
    header={{
        content: <h2>Create account</h2>,
    }}
>
    <form>
        <input
            type="text"
            placeholder="Name"
        />

        <input
            type="email"
            placeholder="Email"
        />

        <button type="submit">
            Create
        </button>
    </form>
</Popup>
```

## Scrollable content

The default popup body uses:

```css
overflow-x: auto;
overflow-y: auto;
```

This allows larger content to remain accessible inside constrained popup dimensions.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    size="600px 70dvh"
>
    <div>
        Long content
    </div>
</Popup>
```

## Custom class names

Every major visual area can receive a custom class name.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    layer={{
        className: "app-popup-layer",
    }}
    close={{
        className: "app-popup-close",
        timer: {
            className: "app-popup-timer",
        },
    }}
    customStyle={{
        container: {
            className: "app-popup",
        },
        header: {
            className: "app-popup-header",
        },
        body: {
            className: "app-popup-body",
        },
    }}
>
    Content
</Popup>
```

Preset, default, and local class names are combined rather than replacing each other.

## Stacking index

The popup layer uses a configurable stacking index.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    index={120000}
>
    Content
</Popup>
```

The built-in default is:

```ts
99999
```

## Ref forwarding

`Popup` forwards its ref to the popup container.

```tsx
"use client";

import { useRef, useState } from "react";
import { Popup } from "popup-from-future";

export const Example = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    return (
        <Popup
            ref={popupRef}
            isOpen={isOpen}
            open={setIsOpen}
        >
            Content
        </Popup>
    );
};
```

The ref points to the element with:

```css
.ssaprt-popup__container
```

## Rendering through a portal

The popup is rendered using a React portal into:

```html
document.body
```

The popup layer therefore does not depend on the position of the component in the React layout.

This is especially useful when the trigger or component is inside containers using:

```css
overflow: hidden;
overflow: auto;
position: relative;
transform;
```

The popup layer itself uses fixed viewport positioning.

## Default styles

The default popup layer uses:

```css
position: fixed;
inset: 0;
width: 100vw;
height: 100dvh;
```

The default popup container is centered in the viewport.

The built-in default configuration includes:

```ts
const defaults = {
    index: 99999,
    animation: {
        open: {
            animationName: "fade-in",
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
        close: {
            animationName: "fade-out",
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
    },
    layer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        blur: "0px",
    },
    close: {
        size: "32px",
    },
};
```

## Popup API

| Property      | Type                        | Default                   | Description                                |
| ------------- | --------------------------- | ------------------------- | ------------------------------------------ |
| `children`    | `ReactNode`                 | Required                  | Popup body content                         |
| `isOpen`      | `boolean`                   | Required                  | Controls whether the popup should be open  |
| `open`        | `(status: boolean) => void` | Required                  | Updates the external popup state           |
| `preset`      | `PopupPresetName`           | `undefined`               | Selects one of the built-in visual presets |
| `index`       | `number`                    | `99999`                   | Layer `z-index`                            |
| `animation`   | `PopupAnimationProps`       | Built-in or preset values | Open and close animation configuration     |
| `layer`       | `PopupLayerProps`           | Built-in or preset values | Background layer configuration             |
| `close`       | `PopupCloseProps`           | Built-in values           | Close button and timer configuration       |
| `size`        | `SizeType`                  | `"auto"`                  | Popup container width and height           |
| `header`      | `{ content: ReactNode }`    | `undefined`               | Optional popup header                      |
| `customStyle` | `PopupCustomStyles`         | Built-in or preset values | Container, header, and body styles         |

## `animation` API

```ts
type GeneralAnimationProps = {
    animationName?: AnimationsPopupType;
    duration?: AnimationDuration;
    easing?: CSSProperties["animationTimingFunction"];
};

type PopupAnimationProps = GeneralAnimationProps & {
    open?: GeneralAnimationProps;
    close?: GeneralAnimationProps;
};
```

Example:

```tsx
animation={{
    duration: 500,
    easing: "ease-in-out",
    open: {
        animationName: "zoom-in",
    },
    close: {
        animationName: "zoom-out",
    },
}}
```

## `layer` API

| Property          | Type                               | Default                | Description              |
| ----------------- | ---------------------------------- | ---------------------- | ------------------------ |
| `backgroundColor` | `CSSProperties["backgroundColor"]` | `"rgba(0, 0, 0, 0.5)"` | Overlay color            |
| `blur`            | `number \| \`${number}px``         | `"0px"`                | Backdrop blur            |
| `style`           | `CSSProperties`                    | `{}`                   | Additional inline styles |
| `className`       | `string`                           | `""`                   | Additional layer class   |

Example:

```tsx
layer={{
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    blur: 8,
    style: {
        padding: "20px",
    },
    className: "custom-layer",
}}
```

## `close` API

| Property          | Type                    | Default         | Description                                     |
| ----------------- | ----------------------- | --------------- | ----------------------------------------------- |
| `icon`            | `ReactNode`             | `×`             | Built-in close button content                   |
| `render`          | `PopupCloseRender`      | `undefined`     | Replaces the built-in close button              |
| `size`            | `SizeType`              | `"32px"`        | Close control size                              |
| `style`           | `CSSProperties`         | Built-in styles | Close control style overrides                   |
| `className`       | `string`                | `""`            | Additional close control class                  |
| `timeOutShow`     | `AnimationDuration`     | `undefined`     | Delay before the close button becomes available |
| `timer.render`    | `PopupCloseTimerRender` | Built-in timer  | Replaces the built-in timer                     |
| `timer.style`     | `CSSProperties`         | `{}`            | Timer style overrides                           |
| `timer.className` | `string`                | `""`            | Additional timer class                          |

## `customStyle` API

```ts
interface PopupCustomStyle {
    style?: CSSProperties;
    className?: string;
}

type PopupCustomStyles = {
    container?: PopupCustomStyle;
    header?: PopupCustomStyle;
    body?: PopupCustomStyle;
};
```

## Public interface

```ts
import type {
    CSSProperties,
    ReactElement,
    ReactNode,
} from "react";

export type PopupBlur =
    | number
    | `${number}px`;

export interface PopupCustomStyle {
    style?: CSSProperties;
    className?: string;
}

export interface PopupCloseComponentProps {
    close: () => void;
}

export interface PopupCloseTimerComponentProps {
    seconds: number;
    remainingMs: number;
    duration: number;
    progress: number;
    style?: CSSProperties;
    className?: string;
}

export type PopupCloseRender = (
    props: PopupCloseComponentProps,
) => ReactElement | null;

export type PopupCloseTimerRender = (
    props: PopupCloseTimerComponentProps,
) => ReactElement | null;

export interface PopupInterface {
    children: ReactNode;
    isOpen: boolean;
    open: (status: boolean) => void;

    preset?: PopupPresetName;
    index?: number;
    animation?: PopupAnimationProps;

    layer?: {
        backgroundColor?: CSSProperties["backgroundColor"];
        blur?: PopupBlur;
        style?: CSSProperties;
        className?: string;
    };

    close?: {
        icon?: ReactNode;
        render?: PopupCloseRender;
        size?: SizeType;
        style?: CSSProperties;
        className?: string;
        timeOutShow?: AnimationDuration;

        timer?: {
            render?: PopupCloseTimerRender;
            style?: CSSProperties;
            className?: string;
        };
    };

    size?: SizeType;

    header?: {
        content: ReactNode;
    };

    customStyle?: {
        container?: PopupCustomStyle;
        header?: PopupCustomStyle;
        body?: PopupCustomStyle;
    };
}
```

## TypeScript exports

The package can expose the component and its public types from the root entry point.

```ts
import {
    Popup,
} from "popup-from-future";

import type {
    AnimationDuration,
    AnimationsPopupInType,
    AnimationsPopupOutType,
    AnimationsPopupType,
    GeneralAnimationProps,
    PopupAnimationProps,
    PopupBlur,
    PopupCloseComponentProps,
    PopupCloseRender,
    PopupCloseTimerComponentProps,
    PopupCloseTimerRender,
    PopupCustomStyle,
    PopupInterface,
    PopupPreset,
    PopupPresetName,
    SizeType,
    SizeValue,
} from "popup-from-future";
```

## React and Next.js

`Popup` uses:

* React state
* React effects
* React portals
* `document.body`
* `requestAnimationFrame`
* Browser animation events

It must therefore be rendered from a Client Component in Next.js.

```tsx
"use client";

import { useState } from "react";
import { Popup } from "popup-from-future";
import "popup-from-future/style.css";

export const PopupExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Open
            </button>

            <Popup
                isOpen={isOpen}
                open={setIsOpen}
                preset="glass"
            >
                Next.js popup
            </Popup>
        </>
    );
};
```

## Usage from a Next.js layout

A popup does not require a provider.

It can be used from any Client Component in the application.

```tsx
"use client";

import { useState } from "react";
import { Popup } from "popup-from-future";

export const PopupController = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Show
            </button>

            <Popup
                isOpen={isOpen}
                open={setIsOpen}
                preset="minimal"
            >
                Content
            </Popup>
        </>
    );
};
```

## Browser support

The package is designed for modern desktop and mobile browsers:

* Google Chrome
* Apple Safari
* Mozilla Firefox
* Microsoft Edge
* iOS Safari
* Chromium-based Android browsers

The implementation uses modern browser technologies including:

* React portals
* CSS animations
* CSS custom properties
* `backdrop-filter`
* `-webkit-backdrop-filter`
* Dynamic viewport units
* `requestAnimationFrame`
* `performance.now()`
* SVG
* CSS transforms
* CSS 3D transforms
* CSS gradients
* CSS filters
* CSS shadows

Legacy Internet Explorer is not supported.

## Safari support

The popup layer includes both:

```css
backdrop-filter
```

and:

```css
-webkit-backdrop-filter
```

for Safari compatibility.

The layer also uses:

```css
height: 100dvh;
```

which improves viewport handling on modern mobile browsers where the browser interface changes the visible viewport height.

## Reduced motion

The stylesheet respects:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is requested, layer animation easing is simplified and close-control transition duration is reduced.

## CSS classes

The package uses the following primary CSS classes:

```text
.ssaprt-popup__layer
.ssaprt-popup__layer--opening
.ssaprt-popup__layer--closing

.ssaprt-popup__container

.ssaprt-popup__header
.ssaprt-popup__body

.ssaprt-popup__close
.ssaprt-popup__close--visible
.ssaprt-popup__close--timer

.ssaprt-popup__close-button
.ssaprt-popup__close-icon

.ssaprt-popup__close-timer
.ssaprt-popup__close-timer-svg
.ssaprt-popup__close-timer-track
.ssaprt-popup__close-timer-progress
.ssaprt-popup__close-timer-value
```

Animation classes follow this pattern:

```text
.ssaprt-popup--animate-{animationName}
```

Examples:

```text
.ssaprt-popup--animate-fade-in
.ssaprt-popup--animate-zoom-in
.ssaprt-popup--animate-bounce-in
.ssaprt-popup--animate-glow-in
.ssaprt-popup--animate-glitch-out
.ssaprt-popup--animate-flip-y-out
```

## CSS custom properties

The component internally uses CSS variables for dynamic animation and layer configuration.

```css
--animation-duration
--animation-easing

--ssaprt-popup-layer-background
--ssaprt-popup-layer-blur
--ssaprt-popup-layer-duration
--ssaprt-popup-layer-easing
```

These values are generated from the resolved popup configuration.

## Presets and custom configuration

A preset is only a starting point.

```tsx
<Popup
    isOpen={isOpen}
    open={setIsOpen}
    preset="neon"
    size="700px 450px"
    layer={{
        blur: 4,
    }}
    animation={{
        open: {
            animationName: "glitch-in",
            duration: 800,
        },
        close: {
            animationName: "fade-out",
            duration: 300,
        },
    }}
    close={{
        size: "42px",
    }}
    customStyle={{
        container: {
            style: {
                borderRadius: "20px",
            },
        },
    }}
>
    Custom neon popup
</Popup>
```

The resulting configuration keeps every `neon` property that was not explicitly overridden.

## Styling strategy

The final popup appearance is created from three layers of configuration:

```text
stylesConfig
    ↓
preset
    ↓
Popup props
```

This makes presets reusable without limiting local customization.

For style objects:

```ts
{
    ...defaultStyle,
    ...presetStyle,
    ...localStyle,
}
```

For class names, values are combined:

```text
defaultClass presetClass localClass
```

For scalar properties such as layer blur:

```text
local value
→ preset value
→ default value
```

## Example gallery

```tsx
const presets = [
    "glass",
    "frosted",
    "midnight",
    "graphite",
    "obsidian",
    "snow",
    "ivory",
    "ocean",
    "aqua",
    "emerald",
    "forest",
    "mint",
    "amber",
    "sunset",
    "coral",
    "rose",
    "ruby",
    "wine",
    "violet",
    "lavender",
    "aurora",
    "cosmic",
    "neon",
    "cyber",
    "terminal",
    "steel",
    "chrome",
    "paper",
    "clay",
    "minimal",
] as const;
```

They can be used to build a preset preview page:

```tsx
"use client";

import { useState } from "react";
import {
    Popup,
    type PopupPresetName,
} from "popup-from-future";

const presets: PopupPresetName[] = [
    "glass",
    "frosted",
    "midnight",
    "graphite",
    "obsidian",
    "snow",
    "ivory",
    "ocean",
    "aqua",
    "emerald",
    "forest",
    "mint",
    "amber",
    "sunset",
    "coral",
    "rose",
    "ruby",
    "wine",
    "violet",
    "lavender",
    "aurora",
    "cosmic",
    "neon",
    "cyber",
    "terminal",
    "steel",
    "chrome",
    "paper",
    "clay",
    "minimal",
];

export const PopupGallery = () => {
    const [selected, setSelected] =
        useState<PopupPresetName | null>(null);

    return (
        <>
            <div>
                {presets.map((preset) => (
                    <button
                        key={preset}
                        type="button"
                        onClick={() => setSelected(preset)}
                    >
                        {preset}
                    </button>
                ))}
            </div>

            <Popup
                isOpen={selected !== null}
                open={(status) => {
                    if (!status) {
                        setSelected(null);
                    }
                }}
                preset={selected ?? "minimal"}
                header={{
                    content: selected,
                }}
            >
                <p>
                    Preview of the {selected} popup preset.
                </p>
            </Popup>
        </>
    );
};
```

## Recommended package exports

The public package entry point can export:

```ts
export { Popup } from "./Popup";

export type {
    PopupInterface,
    PopupBlur,
    PopupCustomStyle,
    PopupCloseComponentProps,
    PopupCloseRender,
    PopupCloseTimerComponentProps,
    PopupCloseTimerRender,
} from "./popup.interface";

export type {
    AnimationDuration,
    AnimationsPopupInType,
    AnimationsPopupOutType,
    AnimationsPopupType,
    GeneralAnimationProps,
    PopupAnimationProps,
    MergedAnimationProps,
} from "./animations.type";

export type {
    SizeType,
    SizeValue,
} from "./general.type";

export {
    popupPresets,
} from "./presets";

export type {
    PopupPreset,
    PopupPresetName,
} from "./presets";
```

## License

MIT
