# @ssaprt/easy-pagination

A flexible, animated React pagination library built with TypeScript and MobX. Handles list pagination with smooth slide animations, customizable themes, arbitrary child content, and optional synchronization with the URL or `localStorage` — so multiple independent paginators can coexist on the same page.

Web version: <a href="https://utility-lub.vercel.app/react/UI-Components/pagination/">Easy Pagination</a>

## Features

- 🎬 **Smooth animated transitions** between pages (horizontal or vertical)
- 🎨 **10+ built-in themes**, plus a fully typed API for custom themes
- 🔗 **Optional URL / localStorage indexing** — persist and restore the current page per-instance, with your own key
- 🧩 **Render-agnostic** — you control how items are rendered via `useList`
- 📦 Ships as dual **CJS/ESM** build, fully typed
- ⚡ Powered by MobX for fine-grained reactivity, no unnecessary re-renders

## Installation

```bash
npm install @ssaprt/easy-pagination
# or
yarn add @ssaprt/easy-pagination
# or
pnpm install @ssaprt/easy-pagination
```

## Quick start

```tsx
import "@ssaprt/easy-pagination/style.css";
import { Pagination } from "@ssaprt/easy-pagination";
import { useList, useProgress } from "@ssaprt/easy-pagination";

export const App = () => {
    return (
        <Pagination items={[1, 2, 3]}>
            <YourComponent />
        </Pagination>
    );
};

export const YourComponent = () => {
    const list = useList();
    const { start, end, progress } = useProgress();

    return (
        <div className="flex flex-wrap gap-2">
            {list.map((item, i) => (
                <span key={i}>{item}</span>
            ))}
        </div>
    );
};
```

`Pagination` provides the paginated slice of `items` and navigation controls to its children through context. `useList` gives you the current page's items; `useProgress` gives you the state of the page-transition animation, useful for building loading overlays, blur effects, or progress bars during navigation.

## Props

`Pagination` accepts a generic list of items plus the following optional props:

| Prop             | Type                         | Default           | Description                                                                                                          |
| ---------------- | ---------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `items`          | `T[]`                        | —                 | **Required.** The full list of items to paginate.                                                                    |
| `children`       | `React.ReactNode`            | —                 | **Required.** Your rendering component(s); consume items via `useList`.                                              |
| `mode`           | `"vertical" \| "horizontal"` | `"horizontal"`    | Direction of the pagination layout and transition animation.                                                         |
| `navigation`     | `"start" \| "end" \| "full"` | `"full"`          | Which navigation controls are rendered.                                                                              |
| `itemsPerPage`   | `number`                     | `10`              | Number of items shown per page.                                                                                      |
| `theme`          | `ThemePagination`            | —                 | Fully custom theme object (see [Custom themes](#custom-themes)).                                                     |
| `selectTheme`    | `PresetsType`                | `white` (default) | Pick one of the 17 built-in preset names, or pass a full `ThemePagination` object for a custom theme.                |
| `animationSpeed` | `` `${number}ms` ``          | `"600ms"`         | Duration of the page-transition animation.                                                                           |
| `arrowStart`     | —                            | —                 | Configuration for the "previous" arrow.                                                                              |
| `arrowEnd`       | —                            | —                 | Configuration for the "next" arrow.                                                                                  |
| `indexing`       | `URLType`                    | —                 | Sync current page with the URL query string or `localStorage`. See [URL / storage indexing](#url--storage-indexing). |

```tsx
import "@ssaprt/easy-pagination/style.css";
import { Pagination } from "@ssaprt/easy-pagination";
// import type { PresetsType } from "@ssaprt/easy-pagination";

export const App = () => {
    /**
     * const yourTheme: PresetsType = { ... }
     */

    return (
        <Pagination
            items={[1, 2, 3]} // required
            // selectTheme={yourTheme} // optional, preset or custom. Default: white
            // navigation="full" // optional ("start" | "end" | "full"). Default: full
            // mode="horizontal" // optional ("vertical" | "horizontal"). Default: horizontal
            // arrowStart={} // optional
            // arrowEnd={} // optional
            // itemsPerPage={10} // optional. Default: 10
            // animationSpeed="300ms" // optional (`${number}ms`). Default: 600ms

            /* optional
            theme={{
                // see Custom themes below
            }}
            */
        >
            <YourComponent />
        </Pagination>
    );
};
```

## Hooks

### `useList()`

Returns the array of items belonging to the current page, already sliced from the full `items` array according to `itemsPerPage` and the active page.

```tsx
const list = useList();
```

### `useProgress()`

Returns the state of the current page-transition animation:

```tsx
const { start, end, progress } = useProgress();
```

- `start` — `true` while a page transition animation is in progress
- `end` — `true` once the transition has completed
- `progress` — a `0–100` number representing animation progress, useful for blur/opacity effects synced to the transition

Example — fading a page-level overlay during navigation:

```tsx
export const YourComponent = () => {
    const list = useList();
    const { start, progress } = useProgress();
    const blur = start ? 12 : 0;

    useEffect(() => {
        const overlay = document.querySelector("#root") as HTMLDivElement;
        if (!overlay) return;

        overlay.style.transition = "0s";
        overlay.style.opacity = "0.7";
        overlay.style.width = `${progress}%`;

        if (progress === 100) {
            requestAnimationFrame(() => {
                overlay.style.transition = "opacity 1s linear";
                overlay.style.opacity = "0";
            });
        }
    }, [start, progress]);

    return (
        <div className="relative flex flex-wrap gap-1">
            <div
                className="absolute inset-0 transition-[backdrop-filter] duration-300 ease-in-out"
                style={{ backdropFilter: `blur(${blur}px)` }}
            />
            {list.map((item, i) => (
                <span key={i}>{item}</span>
            ))}
        </div>
    );
};
```

## URL / storage indexing

By default, `Pagination` keeps the current page only in internal state — nothing is written to the URL or `localStorage`. If you want the current page to survive a refresh, be shareable via link, or be bookmarkable, opt in with the `indexing` prop.

```tsx
import "@ssaprt/easy-pagination/style.css";
import { Pagination } from "@ssaprt/easy-pagination";

export const App = () => {
    return (
        <Pagination
            items={[1, 2, 3]}
            indexing={{ mode: "url", key: "yourKeyName" }} // optional. No indexing by default.
        >
            <YourComponent />
        </Pagination>
    );
};
```

This will keep the current page in sync with `project.com/items?yourKeyName=<currentPage>`.

`indexing` accepts:

| Field  | Type                 | Description                                                                    |
| ------ | -------------------- | ------------------------------------------------------------------------------ |
| `mode` | `"url" \| "storage"` | Where to persist the current page — the URL query string or `localStorage`.    |
| `key`  | `string`             | The key used in the query string or storage. Choose a unique key per instance. |

**Behavior:**

- If `indexing` is omitted, pagination state is purely internal — the previous behavior is unchanged.
- If `indexing` is set and `key` already has a value in the URL/storage, `Pagination` restores that page immediately on mount (no transition animation — this is a restore, not a navigation).
- If `indexing` is set but `key` has no value yet, `Pagination` writes page `1` to the URL/storage on mount.
- Every subsequent page change is written back to the same location automatically.

**Multiple paginators on one page:** since each `Pagination` instance manages its own `key`, you can safely run several independent paginators (e.g. a product list and a review list) on the same page without them colliding — just give each a distinct `key`.

```tsx
<Pagination items={products} indexing={{ mode: "url", key: "products_page" }}>
    <ProductList />
</Pagination>

<Pagination items={reviews} indexing={{ mode: "url", key: "reviews_page" }}>
    <ReviewList />
</Pagination>
```

## Themes

The library ships with **17 built-in presets**, selectable by name via `selectTheme`. Alternatively, `selectTheme` also accepts a full custom `ThemePagination` object directly — so you're not limited to the presets.

```ts
export type PresetsType =
    | "white"
    | "lightBlue"
    | "blue"
    | "dark"
    | "roundedRich"
    | "roundedSpace"
    | "roundedAuroraNebula"
    | "roundedDeepSpaceVoid"
    | "roundedVoid"
    | "roundedBlackHole"
    | "roundedSolarFlare"
    | "roundedInferno"
    | "roundedTrimstone"
    | "roundedAbyssal"
    | "roundedOceanDepths"
    | "squaredForestMoss"
    | "squaredCyberpunkNeon"
    | ThemePagination;
```

| Preset                 | Style family                         |
| ---------------------- | ------------------------------------ |
| `white`                | Default, minimal light theme         |
| `lightBlue`            | Light, blue accent                   |
| `blue`                 | Blue accent                          |
| `dark`                 | Dark base                            |
| `roundedRich`          | Rounded, rich color palette          |
| `roundedSpace`         | Rounded, space-themed                |
| `roundedAuroraNebula`  | Rounded, aurora/nebula gradient      |
| `roundedDeepSpaceVoid` | Rounded, deep space gradient         |
| `roundedVoid`          | Rounded, void/black gradient         |
| `roundedBlackHole`     | Rounded, black hole gradient         |
| `roundedSolarFlare`    | Rounded, solar flare gradient        |
| `roundedInferno`       | Rounded, inferno/fire gradient       |
| `roundedTrimstone`     | Rounded, brimstone palette           |
| `roundedAbyssal`       | Rounded, deep-sea/abyssal gradient   |
| `roundedOceanDepths`   | Rounded, ocean gradient              |
| `squaredForestMoss`    | Squared corners, forest/moss palette |
| `squaredCyberpunkNeon` | Squared corners, cyberpunk neon      |

```tsx
import "@ssaprt/easy-pagination/style.css";
import { Pagination } from "@ssaprt/easy-pagination";

<Pagination items={items} selectTheme="roundedAuroraNebula">
    <YourComponent />
</Pagination>;
```

### Custom themes

To build your own theme instead of using a preset, pass a `ThemePagination` object — either through `theme` (as a partial override layered on top of the active preset) or directly as the value of `selectTheme` (as a complete standalone theme):

```tsx
import type { PresetsType } from "@ssaprt/easy-pagination";

const yourTheme: PresetsType = {
    style: {},
    className: "",

    main: {
        style: {},
        className: "",
    },

    navigation: {
        style: {},
        className: "",
    },

    track: {
        style: {},
        className: "",
    },

    items: {
        w: 0,
        h: 0,

        style: {},
        className: "",

        background: "",
        color: "",

        border: "",
        // or
        borderWidth: 0,
        borderColor: "",
        borderStyle: "",

        borderRadius: "",
        transition: "",

        hover: {
            background: "",
            color: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "",

            borderRadius: "",
            transition: "",
        },

        active: {
            background: "",
            color: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "",

            borderRadius: "",
            transition: "",
        },
    },

    button: {
        style: {},
        className: "",

        background: "",
        color: "",

        border: "",
        // or
        borderWidth: 0,
        borderColor: "",
        borderStyle: "",

        borderRadius: "",

        shadowDirectionSize: 0,
        shadowDirectionColor: "",
        shadowDirectionBlur: 0,

        active: {
            background: "",
            color: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "",

            borderRadius: "",

            shadowDirectionColor: "",
        },
    },

    arrows: {
        style: {},
        className: "",

        w: 0,
        h: 0,

        background: "",
        color: "",
        fill: "",
        stroke: "",

        borderRadius: "",

        transform: "",
        transition: "",

        icon: {
            style: {},
            className: "",

            w: 0,
            h: 0,
        },

        hover: {
            background: "",
            color: "",
            fill: "",
            stroke: "",

            borderRadius: "",

            transform: "",
            transition: "",
        },

        active: {
            background: "",
            color: "",
            fill: "",
            stroke: "",

            borderRadius: "",

            transform: "",
            transition: "",
        },

        disabled: {
            background: "",
            color: "",
            fill: "",
            stroke: "",

            borderRadius: "",

            transform: "",
            transition: "",
        },
    },
};
```

Pass it to `Pagination` via `selectTheme={yourTheme}` (or `theme={{ ... }}` for a partial theme override on top of a preset).

**Theme sections:**

- `main` / `navigation` / `track` — layout-level containers
- `items` — the individual page buttons, with `hover` and `active` sub-states
- `button` — general button styling shared across the component (with `active` state)
- `arrows` — the prev/next navigation arrows, including their `icon`, and `hover` / `active` / `disabled` states

Every section accepts a raw `style` object and/or a `className`, so you can style with inline styles, Tailwind, CSS modules, or any approach you prefer — the two are not mutually exclusive.

## TypeScript

The package is fully typed and ships its own declaration files — no `@types` package needed. Key exported types:

```ts
import type {
    PresetsType, // theme preset shape
    ThemePagination, // custom theme override shape
    URLType, // { mode: "url" | "storage"; key: string }
} from "@ssaprt/easy-pagination";
```

## License

MIT
