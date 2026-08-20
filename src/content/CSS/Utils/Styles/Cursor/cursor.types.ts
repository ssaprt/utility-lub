export const cssCursorTypes = [
    {
        name: "auto",
        category: "general",
        description:
            "Lets the browser automatically determine the most appropriate cursor based on the element, its state, and the current interaction context.",
    },
    {
        name: "default",
        category: "general",
        description:
            "Displays the platform's default cursor. It is usually rendered as a standard arrow and does not adapt automatically to the semantic meaning of the element.",
    },
    {
        name: "none",
        category: "general",
        description:
            "Hides the visual cursor while the pointer remains active and can still interact with elements.",
    },

    {
        name: "context-menu",
        category: "links-status",
        description:
            "Indicates that a context menu is available for the element. The exact appearance depends on the operating system and browser.",
    },
    {
        name: "help",
        category: "links-status",
        description:
            "Indicates that additional help, documentation, or explanatory information is available for the current element or area.",
    },
    {
        name: "pointer",
        category: "links-status",
        description:
            "Indicates that the element can be activated by clicking or tapping. It is commonly displayed as a hand with an extended index finger and is traditionally used for links and other clickable controls.",
    },
    {
        name: "progress",
        category: "links-status",
        description:
            "Indicates that an operation is currently running, but the user can still interact with the interface. Unlike wait, it does not imply that the application is completely blocked.",
    },
    {
        name: "wait",
        category: "links-status",
        description:
            "Indicates that the application or current operation is busy and the user should wait before continuing interaction.",
    },

    {
        name: "cell",
        category: "selection",
        description:
            "Indicates that a table cell, spreadsheet cell, or similar grid-based item can be selected.",
    },
    {
        name: "crosshair",
        category: "selection",
        description:
            "Displays a crosshair cursor intended for precise positioning, coordinate selection, drawing, region selection, graphics editors, canvases, and similar precision-oriented interactions.",
    },
    {
        name: "text",
        category: "selection",
        description:
            "Indicates that horizontal text can be selected. It is typically displayed as a vertical I-beam cursor.",
    },
    {
        name: "vertical-text",
        category: "selection",
        description:
            "Indicates that vertically oriented text can be selected. It is typically displayed as a horizontal I-beam cursor.",
    },

    {
        name: "alias",
        category: "drag-drop",
        description:
            "Indicates that a drag-and-drop operation will create an alias, shortcut, link, or reference to the dragged object rather than moving or copying the original object directly.",
    },
    {
        name: "copy",
        category: "drag-drop",
        description:
            "Indicates that the dragged object will be copied to the destination while the original object remains in its current location.",
    },
    {
        name: "move",
        category: "drag-drop",
        description:
            "Indicates that an element or object can be moved, typically through drag-and-drop interaction.",
    },
    {
        name: "no-drop",
        category: "drag-drop",
        description:
            "Indicates that the currently dragged object cannot be dropped at the current location.",
    },
    {
        name: "not-allowed",
        category: "drag-drop",
        description:
            "Indicates that the requested action is prohibited or unavailable in the current context or state.",
    },
    {
        name: "grab",
        category: "drag-drop",
        description:
            "Indicates that an object can be grabbed and dragged. It is commonly represented as an open hand.",
    },
    {
        name: "grabbing",
        category: "drag-drop",
        description:
            "Indicates that an object is currently being grabbed or dragged. It is commonly represented as a closed hand.",
    },

    {
        name: "all-scroll",
        category: "resize-scroll",
        description:
            "Indicates that the content or object can be moved or scrolled in multiple directions, commonly used for panning maps, canvases, editors, and large workspaces.",
    },
    {
        name: "col-resize",
        category: "resize-scroll",
        description:
            "Indicates that the width of a column or similar element can be resized horizontally.",
    },
    {
        name: "row-resize",
        category: "resize-scroll",
        description:
            "Indicates that the height of a row or similar element can be resized vertically.",
    },

    {
        name: "n-resize",
        category: "resize-scroll",
        description:
            "Indicates that an element can be resized by moving its top or north edge.",
    },
    {
        name: "e-resize",
        category: "resize-scroll",
        description:
            "Indicates that an element can be resized by moving its right or east edge.",
    },
    {
        name: "s-resize",
        category: "resize-scroll",
        description:
            "Indicates that an element can be resized by moving its bottom or south edge.",
    },
    {
        name: "w-resize",
        category: "resize-scroll",
        description:
            "Indicates that an element can be resized by moving its left or west edge.",
    },

    {
        name: "ne-resize",
        category: "resize-scroll",
        description:
            "Indicates diagonal resizing from the top-right or north-east corner of an element, affecting both width and height.",
    },
    {
        name: "nw-resize",
        category: "resize-scroll",
        description:
            "Indicates diagonal resizing from the top-left or north-west corner of an element, affecting both width and height.",
    },
    {
        name: "se-resize",
        category: "resize-scroll",
        description:
            "Indicates diagonal resizing from the bottom-right or south-east corner of an element, affecting both width and height.",
    },
    {
        name: "sw-resize",
        category: "resize-scroll",
        description:
            "Indicates diagonal resizing from the bottom-left or south-west corner of an element, affecting both width and height.",
    },

    {
        name: "ew-resize",
        category: "resize-scroll",
        description:
            "Indicates bidirectional horizontal resizing along the east-west axis, allowing an edge or divider to move left or right.",
    },
    {
        name: "ns-resize",
        category: "resize-scroll",
        description:
            "Indicates bidirectional vertical resizing along the north-south axis, allowing an edge or divider to move upward or downward.",
    },
    {
        name: "nesw-resize",
        category: "resize-scroll",
        description:
            "Indicates bidirectional diagonal resizing along the north-east to south-west axis.",
    },
    {
        name: "nwse-resize",
        category: "resize-scroll",
        description:
            "Indicates bidirectional diagonal resizing along the north-west to south-east axis.",
    },

    {
        name: "zoom-in",
        category: "zoom",
        description:
            "Indicates that the user can increase the zoom level or magnify the current content. It is commonly displayed as a magnifying glass with a plus symbol.",
    },
    {
        name: "zoom-out",
        category: "zoom",
        description:
            "Indicates that the user can decrease the zoom level or reduce the magnification of the current content. It is commonly displayed as a magnifying glass with a minus symbol.",
    },
] as const;

export type CSSCursor = (typeof cssCursorTypes)[number];

export type CSSCursorName = CSSCursor["name"];

export type CSSCursorCategory = CSSCursor["category"];

export const cssCursorCategories = cssCursorTypes.reduce(
    (acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }

        acc[item.category].push(item);

        return acc;
    },
    {} as Record<string, CSSCursor[]>,
);
