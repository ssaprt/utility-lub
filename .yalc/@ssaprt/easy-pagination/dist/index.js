"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Pagination: () => Pagination,
  useList: () => useList,
  useProgress: () => useProgress
});
module.exports = __toCommonJS(index_exports);

// src/components/Pagination/Pagination.tsx
var import_mobx_react_lite8 = require("mobx-react-lite");

// src/hooks/useInit.ts
var import_react = require("react");

// src/store/PaginationStore.ts
var import_mobx = require("mobx");

// src/utils/indexing-url.ts
var getUrlParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
};
var setUrlParameter = (name, value) => {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, "", url);
};

// src/utils/indexing-storage.ts
var setStoragePage = (name, value) => {
  localStorage.setItem(name, value);
};

// src/store/PaginationStore.ts
var PaginationStorage = class {
  constructor() {
    this.currentPage = "1";
    this.itemsPerPage = 5;
    this.mode = "horizontal";
    this.positionTrack = {};
    this.sizeTrack = {};
    this.startAnim = false;
    this.positionShadow = "to_right";
    this.differentPageForAnim = 600;
    this.pendingPage = null;
    //eslint-disable-next-line
    this.allItems = [];
    this.sortFn = null;
    this.itemRefs = /* @__PURE__ */ new Map();
    this.isReordering = false;
    this.navigationSize = 0;
    this.arrowStartWidth = 0;
    this.arrowEndWidth = 0;
    this.pageSize = 40;
    this.progress = 0;
    this.animationFrame = null;
    this.isReplaceReady = false;
    this.modePageIndexing = null;
    this.keyPageIndexing = null;
    this.animationBaseDistance = 100;
    this.transitionDuration = 1e3;
    this.minAnimationDuration = 0;
    this.maxAnimationDuration = 4500;
    this._previousTotalPages = 0;
    this._isConfigured = false;
    this.configurePageIndexing = (mode, key) => {
      (0, import_mobx.runInAction)(() => {
        this._isConfigured = false;
        this.modePageIndexing = mode;
        this.keyPageIndexing = key;
      });
      if (mode === "url" && key) {
        const pageFromUrl = getUrlParameter(key);
        (0, import_mobx.runInAction)(() => {
          if (pageFromUrl) {
            this.currentPage = pageFromUrl;
          }
        });
      }
      (0, import_mobx.runInAction)(() => {
        this._isConfigured = true;
      });
    };
    this._persistPage = (page) => {
      if (!this._isConfigured) return;
      if (!this.modePageIndexing || !this.keyPageIndexing) return;
      if (typeof window === "undefined") return;
      if (this.modePageIndexing === "url") {
        setUrlParameter(this.keyPageIndexing, page);
      } else {
        setStoragePage(this.keyPageIndexing, page);
      }
    };
    this.replaceList = () => {
      (0, import_mobx.runInAction)(() => {
        this.isReplaceReady = true;
        if (this.pendingPage !== null) {
          this.currentPage = this.pendingPage;
          this.pendingPage = null;
        }
        this.isReordering = true;
      });
    };
    this.getPageDistance = (from, to) => {
      const fromRect = this.getItemRect(from);
      const toRect = this.getItemRect(to);
      if (!fromRect || !toRect) {
        return 0;
      }
      if (this.mode === "horizontal") {
        return Math.abs(toRect.left - fromRect.left);
      }
      return Math.abs(toRect.top - fromRect.top);
    };
    this.setTransitionDuration = (ms) => {
      (0, import_mobx.runInAction)(() => {
        this.transitionDuration = ms;
      });
    };
    this.progressCheck = () => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      this.progress = 0;
      const duration = this.animationDuration;
      const startTime = performance.now();
      const animate = (time) => {
        const elapsed = time - startTime;
        (0, import_mobx.runInAction)(() => {
          this.progress = Math.min(elapsed / duration * 100, 100);
        });
        if (this.progress < 100) {
          this.animationFrame = requestAnimationFrame(animate);
        } else {
          (0, import_mobx.runInAction)(() => {
            this.progress = 100;
            this.commitPendingPage();
          });
          this.animationFrame = null;
        }
      };
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.setNavigationSize = (size) => {
      (0, import_mobx.runInAction)(() => {
        this.navigationSize = size;
      });
    };
    this.setVisibleArrow = (direction, value) => {
      (0, import_mobx.runInAction)(() => {
        this[`arrow${direction}Width`] = value;
      });
    };
    this.registerItemRef = (page, el) => {
      if (el) {
        this.itemRefs.set(page, el);
      } else {
        this.itemRefs.delete(page);
      }
    };
    this.getItemRect = (page) => {
      const el = this.itemRefs.get(page);
      if (!el) return null;
      return {
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight
      };
    };
    this.setReordering = (value) => {
      (0, import_mobx.runInAction)(() => {
        this.isReordering = value;
      });
    };
    this.startNavigateTo = (page) => {
      if (this.startAnim || page === this.currentPage) {
        return;
      }
      (0, import_mobx.runInAction)(() => {
        const distance = this.getPageDistance(this.currentPage, page);
        const ratio = distance / this.animationBaseDistance;
        const duration = this.transitionDuration * Math.sqrt(ratio);
        this.pendingPage = page;
        this.positionShadow = this._resolveDirection(
          this.currentPageNumber,
          Number(page)
        );
        this.differentPageForAnim = Math.min(
          Math.max(duration, this.minAnimationDuration),
          this.maxAnimationDuration
        );
        this.startAnim = true;
      });
    };
    this.commitPendingPage = () => {
      if (!this.startAnim) return;
      (0, import_mobx.runInAction)(() => {
        this.startAnim = false;
        this.isReplaceReady = false;
      });
    };
    this.navigateToPage = (page) => {
      const targetPage = page !== null ? page : "1";
      this.startNavigateTo(targetPage);
    };
    this.setPosition = (x, y) => {
      (0, import_mobx.runInAction)(() => {
        this.positionTrack = {
          left: `${x}px`,
          top: `${y}px`
        };
      });
    };
    this.setSize = (width, height) => {
      (0, import_mobx.runInAction)(() => {
        this.sizeTrack = {
          width: `${width}px`,
          height: `${height}px`
        };
      });
    };
    this.clear = () => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      (0, import_mobx.runInAction)(() => {
        this._isConfigured = false;
        this.positionTrack = {};
        this.sizeTrack = {};
        this.currentPage = "1";
        this.pendingPage = null;
        this.allItems = [];
        this.startAnim = false;
        this.isReordering = false;
        this._previousTotalPages = 0;
        this.progress = 0;
        this.modePageIndexing = null;
        this.keyPageIndexing = null;
      });
    };
    (0, import_mobx.makeAutoObservable)(this, {
      itemRefs: false,
      animationFrame: false,
      registerItemRef: false,
      getItemRect: false,
      configurePageIndexing: false
    });
    (0, import_mobx.reaction)(
      () => this.currentPage,
      (currentPage, previousPage) => {
        (0, import_mobx.runInAction)(() => {
          this.positionShadow = this._resolveDirection(
            Number(previousPage),
            Number(currentPage)
          );
        });
      }
    );
    (0, import_mobx.reaction)(
      () => this.currentPage,
      (currentPage) => {
        this._persistPage(currentPage);
      }
    );
    (0, import_mobx.reaction)(
      () => this.getTotalPages,
      (totalPages) => {
        if (this._previousTotalPages !== 0 && this._previousTotalPages !== totalPages) {
          (0, import_mobx.runInAction)(() => {
            if (Number(this.currentPage) > totalPages) {
              this.currentPage = String(totalPages || 1);
            }
          });
        }
        this._previousTotalPages = totalPages;
      }
    );
    (0, import_mobx.reaction)(
      () => this.startAnim,
      (start) => {
        if (start) {
          this.progressCheck();
        }
      }
    );
    (0, import_mobx.reaction)(
      () => this.progress,
      (progress) => {
        if (progress >= 100 && !this.isReplaceReady && this.startAnim) {
          this.replaceList();
        }
      }
    );
  }
  get animationDuration() {
    return this.differentPageForAnim;
  }
  get animationSpeed() {
    return this.animationBaseDistance / this.transitionDuration;
  }
  get animationDurationCss() {
    return `${this.differentPageForAnim}ms`;
  }
  get arrowsWidth() {
    return this.arrowStartWidth + this.arrowEndWidth;
  }
  get visiblePages() {
    const available = this.navigationSize - this.arrowsWidth;
    return Math.max(7, Math.floor(available / this.pageSize));
  }
  get maxDigits() {
    return String(Math.max(this.getTotalPages, 1)).length;
  }
  _resolveDirection(prev, curr) {
    const isForward = prev < curr;
    const isBackward = prev > curr;
    if (!isForward && !isBackward) {
      return this.positionShadow;
    }
    if (this.mode === "vertical") {
      return isForward ? "to_bottom" : "to_top";
    }
    return isForward ? "to_right" : "to_left";
  }
  set setItemsPerPage(itemsPerPage) {
    (0, import_mobx.runInAction)(() => {
      this.itemsPerPage = itemsPerPage;
    });
  }
  set setMode(mode) {
    (0, import_mobx.runInAction)(() => {
      this.mode = mode;
    });
  }
  get currentPageNumber() {
    return Number(this.currentPage) || 1;
  }
  //eslint-disable-next-line
  get currentItems() {
    const start = (this.currentPageNumber - 1) * this.itemsPerPage;
    return this.allItems.slice(start, start + this.itemsPerPage);
  }
  get getTotalPages() {
    return Math.ceil(this.allItems.length / this.itemsPerPage);
  }
  setItems(items) {
    (0, import_mobx.runInAction)(() => {
      let newItems = items;
      if (this.sortFn) {
        newItems = this.sortFn(items);
      }
      this.allItems = newItems;
      const newTotalPages = this.getTotalPages;
      if (Number(this.currentPage) > newTotalPages) {
        this.currentPage = String(newTotalPages || 1);
      }
    });
  }
  get hasNextPage() {
    return Number(this.currentPage) < this.getTotalPages;
  }
  get hasPrevPage() {
    return Number(this.currentPage) > 1;
  }
};

// src/hooks/useInit.ts
var useInit = ({
  items: initData,
  itemsPerPage = 10,
  mode = "horizontal",
  animationSpeed = "600ms",
  indexing = void 0
}) => {
  const paginationRef = (0, import_react.useRef)(new PaginationStorage());
  (0, import_react.useEffect)(() => {
    const pagination = paginationRef.current;
    pagination.setItems(initData);
    pagination.setItemsPerPage = itemsPerPage;
    pagination.setTransitionDuration(parseInt(animationSpeed));
    pagination.setMode = mode;
    pagination.configurePageIndexing(
      indexing?.mode ?? null,
      indexing?.key ?? null
    );
  }, [initData, animationSpeed, indexing, mode]);
  return paginationRef.current;
};

// src/hooks/usePagination.actions.ts
var import_react2 = require("react");
var usePaginationActions = (store) => {
  const {
    startNavigateTo,
    getTotalPages,
    hasPrevPage,
    hasNextPage,
    currentPageNumber,
    startAnim,
    getItemRect,
    setPosition,
    setSize
  } = store;
  const navigationRef = (0, import_react2.useRef)(null);
  if (getTotalPages < 2) {
    return {
      navigationRef,
      handlePrevPage: () => {
      },
      handleNextPage: () => {
      },
      getPagesWithEllipsis: () => []
    };
  }
  const navigateWithAnimation = (page) => {
    if (startAnim || page === String(currentPageNumber)) return;
    const rect = getItemRect(page);
    if (rect) {
      setPosition(rect.left, rect.top);
      setSize(rect.width, rect.height);
    }
    startNavigateTo(page);
  };
  const handlePrevPage = () => {
    if (hasPrevPage && !startAnim) {
      navigateWithAnimation(String(currentPageNumber - 1));
    }
  };
  const handleNextPage = () => {
    if (hasNextPage && !startAnim) {
      navigateWithAnimation(String(currentPageNumber + 1));
    }
  };
  const range = (start, end) => {
    const length = end - start + 1;
    return length > 0 ? Array.from({ length }, (_, i) => start + i) : [];
  };
  const getPagesWithEllipsis = () => {
    const total = getTotalPages;
    const current = currentPageNumber;
    const visible = Math.min(store.visiblePages, total);
    if (total <= visible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const boundaryCount = 1;
    const siblingCount = Math.max(
      0,
      Math.floor((visible - boundaryCount * 2 - 2 - 1) / 2)
    );
    const startPages = range(1, Math.min(boundaryCount, total));
    const endPages = range(
      Math.max(total - boundaryCount + 1, boundaryCount + 1),
      total
    );
    const siblingsStart = Math.max(
      Math.min(
        current - siblingCount,
        total - boundaryCount - siblingCount * 2 - 1
      ),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(
        current + siblingCount,
        boundaryCount + siblingCount * 2 + 2
      ),
      endPages.length > 0 ? endPages[0] - 2 : total - 1
    );
    const pages = [
      ...startPages,
      ...siblingsStart > boundaryCount + 2 ? ["..."] : boundaryCount + 1 < total - boundaryCount ? [boundaryCount + 1] : [],
      ...range(siblingsStart, siblingsEnd),
      ...siblingsEnd < total - boundaryCount - 1 ? ["..."] : total - boundaryCount > boundaryCount ? [total - boundaryCount] : [],
      ...endPages
    ];
    return pages;
  };
  return {
    navigationRef,
    handlePrevPage,
    handleNextPage,
    getPagesWithEllipsis
  };
};

// src/hooks/usePaginationContext.tsx
var import_react3 = require("react");
var PaginationContext = (0, import_react3.createContext)(
  null
);
var usePaginationContext = () => {
  const context = (0, import_react3.useContext)(PaginationContext);
  if (!context) {
    throw new Error("Components must be inside <PaginationProvider>");
  }
  return context;
};

// src/components/Main/Main.tsx
var import_mobx_react_lite7 = require("mobx-react-lite");
var import_react10 = require("react");

// src/components/Navigation/Navigation.tsx
var import_mobx_react_lite6 = require("mobx-react-lite");
var import_react9 = require("react");

// src/components/Arrow/Arrow.tsx
var import_mobx_react_lite2 = require("mobx-react-lite");
var import_react5 = require("react");

// src/utils/variables.ts
var variables = (theme, type) => {
  const style = {};
  if (!theme) return style;
  theme.color && (style[`--${type}-color`] = theme.color);
  theme.fill && (style[`--${type}-fill`] = theme.fill);
  theme.stroke && (style[`--${type}-stroke`] = theme.stroke);
  theme.background && (style[`--${type}-background`] = theme.background);
  theme.transition && (style[`--${type}-transition`] = theme.transition);
  theme.borderRadius && (style[`--${type}-border-radius`] = theme.borderRadius);
  theme.hover?.color && (style[`--hover-${type}-color`] = theme.hover.color);
  theme.hover?.fill && (style[`--hover-${type}-fill`] = theme.hover.fill);
  theme.hover?.stroke && (style[`--hover-${type}-stroke`] = theme.hover.stroke);
  theme.hover?.background && (style[`--hover-${type}-background`] = theme.hover.background);
  theme.hover?.transform && (style[`--hover-${type}-transform`] = theme.hover.transform);
  theme.hover?.transition && (style[`--hover-${type}-transition`] = theme.hover.transition);
  theme.borderRadius && (style[`--hover-${type}-border-radius`] = theme.borderRadius);
  theme.active?.color && (style[`--active-${type}-color`] = theme.active.color);
  theme.active?.fill && (style[`--active-${type}-fill`] = theme.active.fill);
  theme.active?.stroke && (style[`--active-${type}-stroke`] = theme.active.stroke);
  theme.active?.background && (style[`--active-${type}-background`] = theme.active.background);
  theme.active?.transform && (style[`--active-${type}-transform`] = theme.active.transform);
  theme.active?.transition && (style[`--active-${type}-transition`] = theme.active.transition);
  theme.borderRadius && (style[`--active-${type}-border-radius`] = theme.borderRadius);
  theme.disabled?.color && (style[`--disabled-${type}-color`] = theme.disabled.color);
  theme.disabled?.fill && (style[`--disabled-${type}-fill`] = theme.disabled.fill);
  theme.disabled?.stroke && (style[`--disabled-${type}-stroke`] = theme.disabled.stroke);
  theme.disabled?.background && (style[`--disabled-${type}-background`] = theme.disabled.background);
  theme.disabled?.transform && (style[`--disabled-${type}-transform`] = theme.disabled.transform);
  theme.disabled?.transition && (style[`--disabled-${type}-transition`] = theme.disabled.transition);
  return style;
};
var sizeVariables = (icon, type) => {
  const style = {};
  if (!icon) return style;
  const size = icon;
  size?.w && (style[`--${type}-w`] = `${size.w}px`);
  size?.h && (style[`--${type}-h`] = `${size.h}px`);
  return style;
};
var shadowDirectionVariable = (positionShadow, sizeShadow) => {
  const size = sizeShadow ? typeof sizeShadow === "string" ? sizeShadow : `${sizeShadow}px` : "5px";
  if (positionShadow === "to_top" || positionShadow === "to_bottom") {
    return positionShadow === "to_top" ? `0px ${size}` : `0px -${size}`;
  }
  return positionShadow === "to_left" ? `${size} 0px` : `-${size} 0px`;
};
var shadowVariable = (shadow) => {
  const style = {};
  if (!shadow) return style;
  style["--shadow-color"] = `${shadow.shadowDirectionColor || "rgba(0, 0, 0, .5)"}`;
  style["--shadow-blur"] = `${shadow.shadowDirectionBlur || 10}px`;
  return style;
};
var partialVariables = (type, track, active = false) => {
  const style = {};
  if (!track) return style;
  const trackData = active ? track.active : track;
  const {
    background,
    border,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
    borderSize
  } = trackData || {};
  let variableBorder;
  if (border) {
    variableBorder = border;
  } else {
    let borderW = borderSize !== void 0 ? borderSize : borderWidth;
    borderW = typeof borderW === "string" ? borderW : borderW !== void 0 ? `${borderW}px` : "1px";
    variableBorder = `${borderW || "1px"} ${borderStyle || "solid"} ${borderColor || "rgba(0, 0, 0, 0.5)"}`;
  }
  const prefix = active ? "--active-" : "--";
  const borderKey = `${prefix}${type}-border`;
  const backgroundKey = `${prefix}${type}-background`;
  const radiusKey = `${prefix}${type}-border-radius`;
  style[backgroundKey] = `${background || "transparent"}`;
  style[borderKey] = `${variableBorder}`;
  style[radiusKey] = `${borderRadius || "0"}`;
  return style;
};

// src/components/Arrow/Icon.tsx
var import_mobx_react_lite = require("mobx-react-lite");
var import_react4 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var Icon = (0, import_mobx_react_lite.observer)(
  ({ direction }) => {
    const { props, store } = usePaginationContext();
    const { mode } = store;
    const { arrows, theme } = props;
    const { arrowStart, arrowEnd } = arrows || {};
    const arrow = direction === "prev" ? arrowStart : arrowEnd;
    const classNameIcon = `${theme?.arrows?.icon?.className || ""} easy-pagination-arrow__icon`.trim();
    const style = (0, import_react4.useMemo)(() => {
      return sizeVariables(theme?.arrows?.icon?.size || {}, "arrow");
    }, [theme?.arrows?.icon?.size]);
    const styleIcon = (0, import_react4.useMemo)(
      () => ({
        ...theme?.arrows?.icon?.style,
        ...style
      }),
      [theme?.arrows?.icon?.style, style]
    );
    return (0, import_react4.isValidElement)(arrow?.props?.iconElement) ? (0, import_react4.cloneElement)(arrow.props?.iconElement, {
      className: classNameIcon,
      style: styleIcon
    }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: {
          transform: direction === "prev" ? mode !== "vertical" ? "scaleX(1)" : "scaleX(1) rotate(90deg)" : mode !== "vertical" ? "scaleX(-1)" : "scaleX(-1) rotate(-90deg)",
          ...styleIcon
        },
        className: classNameIcon,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12l14 0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12l4 4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12l4 -4" })
        ]
      }
    );
  }
);

// src/components/Arrow/Arrow.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Arrow = (0, import_mobx_react_lite2.observer)(
  (0, import_react5.forwardRef)(({ direction }, ref) => {
    const refArrow = ref;
    const context = usePaginationContext();
    const { hasNextPage, hasPrevPage, startAnim } = context.store;
    const { handleNextPage, handlePrevPage } = context.actions;
    const { currentHoveredArrow, setCurrentHoveredArrow } = context;
    const actualActions = direction === "prev" ? { handle: handlePrevPage, has: hasPrevPage } : { handle: handleNextPage, has: hasNextPage };
    const { props } = context;
    const { theme } = props;
    const { arrows } = theme || {};
    const style = (0, import_react5.useMemo)(() => {
      return variables(arrows || {}, "arrow");
    }, [arrows]);
    const sizes = (0, import_react5.useMemo)(() => {
      return sizeVariables(arrows?.size || {}, "arrow");
    }, [arrows?.size]);
    (0, import_react5.useEffect)(() => {
      if (!refArrow.current) return;
      const handleHover = (e) => {
        const target = e.currentTarget;
        const type = e.type;
        const direction2 = target.dataset.direction;
        setCurrentHoveredArrow(
          type === "mouseenter" ? direction2 : null
        );
      };
      refArrow.current.addEventListener("mouseenter", handleHover);
      refArrow.current.addEventListener("mouseleave", handleHover);
      return () => {
        refArrow.current?.removeEventListener(
          "mouseenter",
          handleHover
        );
        refArrow.current?.removeEventListener(
          "mouseleave",
          handleHover
        );
      };
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        ref,
        className: `
                    easy-pagination-arrow ${(!actualActions.has || startAnim) && "easy-pagination-arrow--disabled"} 
                    ${currentHoveredArrow === direction && "easy-pagination-arrow--hovered"} 
                    ${arrows?.className || ""}   
                `.trim(),
        onClick: () => actualActions.handle(),
        style: { ...style, ...arrows?.style, ...sizes },
        "data-direction": direction,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { direction })
      }
    );
  })
);

// src/components/Track/Track.tsx
var import_mobx_react_lite5 = require("mobx-react-lite");
var import_react8 = require("react");

// src/components/TrackButton/TrackButton.tsx
var import_mobx_react_lite3 = require("mobx-react-lite");
var import_react6 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var TrackButton = (0, import_mobx_react_lite3.observer)(() => {
  const { store, props } = usePaginationContext();
  const {
    positionTrack,
    sizeTrack,
    startAnim,
    positionShadow,
    isReordering
  } = store;
  const { theme } = props;
  const { button } = theme || {};
  const {
    style,
    className,
    shadowDirectionSize,
    shadowDirectionColor,
    shadowDirectionBlur
  } = button || {};
  const styleShadow = (0, import_react6.useMemo)(() => {
    return shadowDirectionVariable(positionShadow, shadowDirectionSize);
  }, [positionShadow, shadowDirectionSize]);
  const shadowVariables = (0, import_react6.useMemo)(() => {
    return shadowVariable({
      shadowDirectionColor,
      shadowDirectionBlur
    });
  }, [shadowDirectionColor, shadowDirectionBlur]);
  const defaultVariables = (0, import_react6.useMemo)(() => {
    return partialVariables("button", button);
  }, [
    button?.background,
    button?.border,
    button?.borderRadius,
    button?.borderStyle,
    button?.borderWidth,
    button?.borderColor
  ]);
  const activeVariables = (0, import_react6.useMemo)(() => {
    return partialVariables("button", button, true);
  }, [
    button?.active?.background,
    button?.active?.border,
    button?.active?.borderRadius,
    button?.active?.borderStyle,
    button?.active?.borderWidth,
    button?.active?.borderColor
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      className: `easy-pagination-track-button ${startAnim && "easy-pagination-track-button--next"} ${className || ""}`.trim(),
      style: {
        ...style,
        ...positionTrack,
        ...sizeTrack,
        transition: isReordering ? "none" : void 0,
        pointerEvents: startAnim ? "none" : "auto",
        "--shadow": styleShadow,
        "--track-animation-time": store.animationDurationCss,
        "--active-shadow-color": button?.active?.shadowDirectionColor,
        display: Object.keys(positionTrack).length ? "block" : "none",
        ...shadowVariables,
        ...defaultVariables,
        ...activeVariables
      }
    }
  );
});

// src/components/TrackItem/TrackItem.tsx
var import_mobx_react_lite4 = require("mobx-react-lite");
var import_react7 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var TrackItem = (0, import_mobx_react_lite4.observer)(
  ({ children }) => {
    const button = (0, import_react7.useRef)(null);
    const pageNumber = String(children);
    const { store, props, setCurrentHoveredItem, currentHoveredItem } = usePaginationContext();
    const { theme } = props || {};
    const { items } = theme || {};
    const {
      navigateToPage,
      setPosition,
      setSize,
      startAnim,
      currentPage,
      mode,
      isReordering
    } = store;
    const isActive = currentPage === pageNumber;
    const isVertical = mode === "vertical";
    const sizes = (0, import_react7.useMemo)(() => {
      return sizeVariables(items?.size || {}, "item");
    }, [items?.size]);
    const defaultPartialVariables = (0, import_react7.useMemo)(() => {
      return partialVariables("item", items);
    }, [
      items?.background,
      items?.border,
      items?.borderRadius,
      items?.borderStyle,
      items?.borderWidth,
      items?.borderColor
    ]);
    const activePartialVariables = (0, import_react7.useMemo)(() => {
      return partialVariables("item", items, true);
    }, [
      items?.active?.background,
      items?.active?.border,
      items?.active?.borderRadius,
      items?.active?.borderStyle,
      items?.active?.borderWidth,
      items?.active?.borderColor
    ]);
    const defaultVariables = (0, import_react7.useMemo)(() => {
      return variables(items, "item");
    }, [items]);
    const handleClick = () => {
      if (isActive || startAnim) return;
      const rect = store.getItemRect(pageNumber);
      if (rect) {
        setPosition(rect.left, rect.top);
        setSize(rect.width, rect.height);
      }
      navigateToPage(pageNumber);
    };
    const setButtonRef = (0, import_react7.useCallback)(
      (el) => {
        button.current = el;
        store.registerItemRef(pageNumber, el);
      },
      [pageNumber, store]
    );
    (0, import_react7.useLayoutEffect)(() => {
      const element = button.current;
      if (!element || !isActive) {
        return;
      }
      setPosition(element.offsetLeft, element.offsetTop);
      setSize(element.offsetWidth, element.offsetHeight);
      if (!isReordering) {
        return;
      }
      const frameId = requestAnimationFrame(() => {
        store.setReordering(false);
      });
      return () => {
        cancelAnimationFrame(frameId);
      };
    }, [
      currentPage,
      isActive,
      isReordering,
      mode,
      pageNumber,
      setPosition,
      setSize,
      store
    ]);
    (0, import_react7.useEffect)(() => {
      if (!button.current) return;
      const handleHover = (e) => {
        e.type === "mouseenter" ? setCurrentHoveredItem(
          Number(
            e.currentTarget.textContent
          )
        ) : setCurrentHoveredItem(null);
      };
      button.current?.addEventListener("mouseenter", handleHover);
      button.current?.addEventListener("mouseleave", handleHover);
      return () => {
        button.current?.removeEventListener("mouseenter", handleHover);
        button.current?.removeEventListener("mouseleave", handleHover);
      };
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        onClick: handleClick,
        ref: setButtonRef,
        disabled: isActive || startAnim,
        style: {
          ...sizes,
          ...items?.style,
          ...defaultVariables,
          ...defaultPartialVariables,
          ...activePartialVariables
        },
        className: `easy-pagination-item ${isActive ? "easy-pagination-item--active" : ""} ${isVertical ? "easy-pagination-item--vertical" : "easy-pagination-item--horizontal"} ${currentHoveredItem === Number(children) && "easy-pagination-item--hovered"} ${items?.className || ""}`.trim(),
        children
      }
    );
  }
);

// src/components/Track/Track.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var Track = (0, import_mobx_react_lite5.observer)(() => {
  const { props, actions } = usePaginationContext();
  const { mode, theme } = props;
  const { items } = theme || {};
  const { style, className } = theme?.track || {};
  const { getPagesWithEllipsis } = actions;
  const sizes = (0, import_react8.useMemo)(() => {
    return sizeVariables(items?.size || {}, "item");
  }, [items?.size]);
  const defaultPartialVariables = (0, import_react8.useMemo)(() => {
    return variables({ color: items?.color }, "spread");
  }, [items?.color]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      className: `easy-pagination-track easy-pagination-track--${mode || "horizontal"} ${className || ""}`.trim(),
      style,
      children: [
        getPagesWithEllipsis().map(
          (page, index) => page === "..." ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              style: { ...sizes, ...defaultPartialVariables },
              className: "easy-pagination-track__ellipsis",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" })
              ]
            },
            `ellipsis-${index}`
          ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TrackItem, { children: page }, page)
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TrackButton, {})
      ]
    }
  );
});

// src/components/Navigation/Navigation.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var Navigation = (0, import_mobx_react_lite6.observer)(() => {
  const { props, actions, store } = usePaginationContext();
  const { navigationRef } = actions;
  const { mode, arrows, theme } = props;
  const { arrowStart, arrowEnd } = arrows || {};
  const { style, className } = theme?.navigation || {};
  const arrowStartRef = (0, import_react9.useRef)(null);
  const arrowEndRef = (0, import_react9.useRef)(null);
  const hasLeft = arrowStart === void 0 || arrowStart?.use === void 0 || arrowStart.use !== false;
  const hasRight = arrowEnd === void 0 || arrowEnd?.use === void 0 || arrowEnd.use !== false;
  (0, import_react9.useLayoutEffect)(() => {
    if (!hasLeft) {
      store.setVisibleArrow("Start", 0);
      return;
    }
    const el = arrowStartRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const size = mode === "vertical" ? entry.contentRect.height : entry.contentRect.width;
      store.setVisibleArrow("Start", size);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [store, hasLeft, mode]);
  (0, import_react9.useLayoutEffect)(() => {
    if (!hasRight) {
      store.setVisibleArrow("End", 0);
      return;
    }
    const el = arrowEndRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const size = mode === "vertical" ? entry.contentRect.height : entry.contentRect.width;
      store.setVisibleArrow("End", size);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [store, hasRight, mode]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      ref: navigationRef,
      style,
      className: `easy-pagination-navigation easy-pagination-navigation--${mode || "horizontal"} ${className || ""}`.trim(),
      children: [
        hasLeft && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Arrow, { ref: arrowStartRef, direction: "prev" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Track, {}),
        hasRight && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Arrow, { ref: arrowEndRef, direction: "next" })
      ]
    }
  );
});

// src/components/Main/Main.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Main = (0, import_mobx_react_lite7.observer)(({ children }) => {
  const { props, store, actions } = usePaginationContext();
  const { mode, navigation, theme } = props;
  const { style, className } = theme?.main || {};
  const { navigationRef } = actions;
  (0, import_react10.useLayoutEffect)(() => {
    if (!navigationRef.current) return;
    const observer9 = new ResizeObserver(([entry]) => {
      store.setNavigationSize(
        store.mode === "horizontal" ? entry.contentRect.width : entry.contentRect.height
      );
    });
    observer9.observe(navigationRef.current);
    return () => observer9.disconnect();
  }, [store.allItems.length]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      className: `easy-pagination-main easy-pagination-main--${mode || "horizontal"} ${className || ""}`.trim(),
      style,
      children: [
        ["start", "full"].includes(navigation || "full") && store.allItems.length > store.itemsPerPage && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Navigation, {}),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "easy-pagination-main__content", children }),
        ["end", "full"].includes(navigation || "full") && store.allItems.length > store.itemsPerPage && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Navigation, {})
      ]
    }
  );
});

// src/components/Pagination/Pagination.tsx
var import_react11 = require("react");

// src/pressets/blue-theme.ts
var blueTheme = {
  items: {
    color: "#000000",
    border: "none",
    borderRadius: "2px",
    transition: "all .4s ease",
    hover: {
      color: "#ffffff",
      border: "none",
      borderRadius: "2px",
      background: "#3b82f6",
      transition: "0s all ease"
    },
    active: {
      color: "#ffffff",
      border: "none",
      borderRadius: "2px",
      background: "#3b82f6"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#3b82f6",
    borderWidth: "1px",
    borderRadius: "2px",
    shadowDirectionSize: 4,
    shadowDirectionColor: "transparent",
    shadowDirectionBlur: 6,
    active: {
      background: "#3b82f6",
      borderStyle: "solid",
      borderColor: "#3b82f6",
      borderRadius: "2px",
      shadowDirectionColor: "#3b82f6"
    }
  },
  arrows: {
    color: "#000000",
    fill: "none",
    stroke: "#000000",
    background: "transparent",
    borderRadius: "2px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: {
      size: { w: 14, h: 14 }
    },
    hover: {
      background: "#3b82f6",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    active: {
      background: "#2563eb",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    disabled: {
      fill: "none",
      stroke: "#555555",
      background: "transparent"
    }
  }
};

// src/pressets/collection-themes.ts
var roundedAuroraNebulaTheme = {
  items: {
    color: "#c9b8ff",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#7ef0ff",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#7ef0ff",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#9b6bff",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 6,
    shadowDirectionColor: "#9b6bff",
    shadowDirectionBlur: 8,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#4dd8e6",
      borderRadius: "50%",
      shadowDirectionColor: "#4dd8e6"
    }
  },
  arrows: {
    color: "#c9b8ff",
    fill: "none",
    stroke: "#c9b8ff",
    background: "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#7ef0ff",
      color: "#7ef0ff"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#4dd8e6",
      color: "#4dd8e6"
    },
    disabled: {
      fill: "none",
      stroke: "#4b4568",
      background: "transparent"
    }
  }
};
var roundedDeepSpaceVoidTheme = {
  items: {
    color: "#d7e3ff",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#8ea2ff",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#8ea2ff",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#5b6ee1",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 5,
    shadowDirectionColor: "#5b6ee1",
    shadowDirectionBlur: 6,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#d7e3ff",
      borderRadius: "50%",
      shadowDirectionColor: "#d7e3ff"
    }
  },
  arrows: {
    color: "#d7e3ff",
    fill: "none",
    stroke: "#d7e3ff",
    background: "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#8ea2ff",
      color: "#8ea2ff"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#5b6ee1",
      color: "#5b6ee1"
    },
    disabled: {
      fill: "none",
      stroke: "#38395a",
      background: "transparent"
    }
  }
};
var roundedSolarFlareTheme = {
  main: {
    style: {
      background: "radial-gradient(circle at 30% 20%, rgba(255,140,0,.4), transparent 40%), radial-gradient(circle at 75% 70%, rgba(255,60,0,.25), transparent 45%), radial-gradient(circle at 50% 100%, rgba(120,20,0,.3), transparent 55%), #1a0600"
    }
  },
  items: {
    color: "#ffcf8b",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#ffffff",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#ffffff",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#ff8c00",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 6,
    shadowDirectionColor: "#ff5e3a",
    shadowDirectionBlur: 10,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#ffe08b",
      borderRadius: "50%",
      shadowDirectionColor: "#ffe08b"
    }
  },
  arrows: {
    color: "#ffcf8b",
    fill: "none",
    stroke: "#ffcf8b",
    background: "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#ff8c00",
      color: "#ff8c00"
    },
    disabled: {
      fill: "none",
      stroke: "#6b4a2e",
      background: "transparent"
    }
  }
};
var roundedBlackHoleTheme = {
  main: {
    style: {
      background: "radial-gradient(circle at 50% 50%, rgba(122,63,242,.4), transparent 22%), radial-gradient(circle at 50% 50%, rgba(0,0,0,.95) 35%, transparent 55%), radial-gradient(circle at 30% 70%, rgba(43,10,77,.4), transparent 45%), #000000"
    }
  },
  items: {
    color: "#f2eaff",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#a86bff",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#a86bff",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#7a3ff2",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 8,
    shadowDirectionColor: "#7a3ff2",
    shadowDirectionBlur: 12,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#f2eaff",
      borderRadius: "50%",
      shadowDirectionColor: "#f2eaff"
    }
  },
  arrows: {
    color: "#f2eaff",
    fill: "none",
    stroke: "#f2eaff",
    background: "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#a86bff",
      color: "#a86bff"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#7a3ff2",
      color: "#7a3ff2"
    },
    disabled: {
      fill: "none",
      stroke: "#2c2735",
      background: "transparent"
    }
  }
};
var roundedInfernoTheme = {
  main: {
    style: {
      background: "radial-gradient(circle at 20% 80%, rgba(255,87,34,.4), transparent 40%), radial-gradient(circle at 80% 20%, rgba(178,20,20,.3), transparent 45%), radial-gradient(circle at 50% 100%, rgba(255,180,0,.15), transparent 50%), #1a0300"
    }
  },
  items: {
    color: "#ffb08a",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#ffe08b",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#ffe08b",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#ff5722",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 7,
    shadowDirectionColor: "#ff5722",
    shadowDirectionBlur: 10,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#ffb300",
      borderRadius: "50%",
      shadowDirectionColor: "#ffb300"
    }
  },
  arrows: {
    color: "#ffb08a",
    fill: "none",
    stroke: "#ffb08a",
    background: "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#ffe08b",
      color: "#ffe08b"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#ff5722",
      color: "#ff5722"
    },
    disabled: {
      fill: "none",
      stroke: "#5a3226",
      background: "transparent"
    }
  }
};
var roundedTrimstoneTheme = {
  main: {
    style: {
      background: "radial-gradient(circle at 25% 15%, rgba(182,217,76,.2), transparent 35%), radial-gradient(circle at 75% 85%, rgba(140,28,19,.35), transparent 45%), radial-gradient(circle at 50% 50%, rgba(40,10,0,.4), transparent 60%), #120800"
    }
  },
  items: {
    color: "#c9d97a",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#e2452f",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#e2452f",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#b6d94c",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 5,
    shadowDirectionColor: "#8c1c13",
    shadowDirectionBlur: 8,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#8c1c13",
      borderRadius: "50%",
      shadowDirectionColor: "#b6d94c"
    }
  },
  arrows: {
    color: "#c9d97a",
    fill: "none",
    stroke: "#c9d97a",
    background: "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#e2452f",
      color: "#e2452f"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#8c1c13",
      color: "#8c1c13"
    },
    disabled: {
      fill: "none",
      stroke: "#4a4a2e",
      background: "transparent"
    }
  }
};
var roundedAbyssalTheme = {
  items: {
    color: "#e0788a",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#ff6b35",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#ff6b35",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#d1263f",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 6,
    shadowDirectionColor: "#d1263f",
    shadowDirectionBlur: 9,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#ff6b35",
      borderRadius: "50%",
      shadowDirectionColor: "#ff6b35"
    }
  },
  arrows: {
    color: "#e0788a",
    fill: "none",
    stroke: "#e0788a",
    background: "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#ff6b35",
      color: "#ff6b35"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#d1263f",
      color: "#d1263f"
    },
    disabled: {
      fill: "none",
      stroke: "#4a2229",
      background: "transparent"
    }
  }
};
var roundedOceanDepthsTheme = {
  items: {
    color: "#9be7de",
    border: "none",
    borderRadius: "16px",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#ffffff",
      border: "none",
      borderRadius: "16px",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#ffffff",
      border: "none",
      borderRadius: "16px",
      background: "transparent"
    }
  },
  button: {
    background: "rgba(79,209,197,.12)",
    borderStyle: "solid",
    borderColor: "#4fd1c5",
    borderWidth: "2px",
    borderRadius: "16px",
    shadowDirectionSize: 5,
    shadowDirectionColor: "#4fd1c5",
    shadowDirectionBlur: 8,
    active: {
      background: "rgba(79,209,197,.18)",
      borderStyle: "solid",
      borderColor: "#ffffff",
      borderRadius: "16px",
      shadowDirectionColor: "#ffffff"
    }
  },
  arrows: {
    color: "#9be7de",
    fill: "none",
    stroke: "#9be7de",
    background: "transparent",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#4fd1c5",
      color: "#4fd1c5"
    },
    disabled: {
      fill: "none",
      stroke: "#2c4a52",
      background: "transparent"
    }
  }
};
var squaredForestMossTheme = {
  items: {
    color: "#cfe3b6",
    border: "none",
    borderRadius: "10px",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#e8d9a0",
      border: "none",
      borderRadius: "10px",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#e8d9a0",
      border: "none",
      borderRadius: "10px",
      background: "transparent"
    }
  },
  button: {
    background: "rgba(123,160,91,.15)",
    borderStyle: "solid",
    borderColor: "#7ba05b",
    borderWidth: "2px",
    borderRadius: "10px",
    shadowDirectionSize: 4,
    shadowDirectionColor: "#7ba05b",
    shadowDirectionBlur: 6,
    active: {
      background: "rgba(107,68,35,.2)",
      borderStyle: "solid",
      borderColor: "#6b4423",
      borderRadius: "10px",
      shadowDirectionColor: "#6b4423"
    }
  },
  arrows: {
    color: "#cfe3b6",
    fill: "none",
    stroke: "#cfe3b6",
    background: "transparent",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#e8d9a0",
      color: "#e8d9a0"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#7ba05b",
      color: "#7ba05b"
    },
    disabled: {
      fill: "none",
      stroke: "#3c4433",
      background: "transparent"
    }
  }
};
var squaredCyberpunkNeonTheme = {
  items: {
    color: "#00f6ff",
    border: "none",
    borderRadius: "4px",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#ff2e88",
      border: "none",
      borderRadius: "4px",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "#ff2e88",
      border: "none",
      borderRadius: "4px",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#00f6ff",
    borderWidth: "2px",
    borderRadius: "4px",
    shadowDirectionSize: 8,
    shadowDirectionColor: "#00f6ff",
    shadowDirectionBlur: 14,
    active: {
      background: "transparent",
      borderStyle: "solid",
      borderColor: "#ff2e88",
      borderRadius: "4px",
      shadowDirectionColor: "#ff2e88"
    }
  },
  arrows: {
    color: "#00f6ff",
    fill: "none",
    stroke: "#00f6ff",
    background: "transparent",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: { size: { w: 14, h: 14 } },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#ff2e88",
      color: "#ff2e88"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#7b00ff",
      color: "#7b00ff"
    },
    disabled: {
      fill: "none",
      stroke: "#2a2a3a",
      background: "transparent"
    }
  }
};

// src/pressets/dark-theme.ts
var darkTheme = {
  items: {
    color: "#000000",
    border: "none",
    borderRadius: "2px",
    transition: "all .4s ease",
    background: "transparent",
    hover: {
      color: "#ffffff",
      border: "none",
      borderRadius: "2px",
      background: "#000000",
      transition: "0s all ease"
    },
    active: {
      color: "#ffffff",
      border: "none",
      borderRadius: "2px",
      background: "#000000"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: "1px",
    borderRadius: "2px",
    shadowDirectionSize: 4,
    shadowDirectionColor: "transparent",
    shadowDirectionBlur: 6,
    active: {
      background: "#000000",
      borderStyle: "solid",
      borderColor: "#000000",
      borderRadius: "2px",
      shadowDirectionColor: "#000000"
    }
  },
  arrows: {
    color: "#000000",
    fill: "none",
    stroke: "#000000",
    background: "transparent",
    borderRadius: "2px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: {
      size: { w: 14, h: 14 }
    },
    hover: {
      background: "#1d1d1d",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    active: {
      background: "#000000",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    disabled: {
      fill: "none",
      stroke: "#323232",
      background: "transparent"
    }
  }
};

// src/pressets/light-blue-theme.ts
var lightBlueTheme = {
  items: {
    color: "#2563eb",
    border: "none",
    borderRadius: "2px",
    transition: "all .4s ease",
    active: {
      color: "#ffffff",
      border: "none",
      borderRadius: "2px",
      background: "#2563eb"
    },
    hover: {
      color: "#ffffff",
      border: "none",
      borderRadius: "2px",
      background: "#2563eb",
      transition: "0s all ease"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#2563eb",
    borderWidth: "1px",
    borderRadius: "2px",
    shadowDirectionSize: 4,
    shadowDirectionColor: "transparent",
    shadowDirectionBlur: 6,
    active: {
      background: "#2563eb",
      borderStyle: "solid",
      borderColor: "#2563eb",
      borderRadius: "2px",
      shadowDirectionColor: "#2563eb"
    }
  },
  arrows: {
    color: "#2563eb",
    fill: "none",
    stroke: "#2563eb",
    background: "transparent",
    borderRadius: "2px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: {
      size: { w: 14, h: 14 }
    },
    hover: {
      background: "#2563eb",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    active: {
      background: "#1b46a4",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    disabled: {
      fill: "none",
      stroke: "#bcbcbc",
      background: "transparent"
    }
  }
};

// src/pressets/rounded-rich-theme.ts
var roundedRichTheme = {
  items: {
    color: "#ccbf7f",
    border: "none",
    borderRadius: "50%",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "silver",
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      transition: "color 0.13s ease-in-out"
    },
    active: {
      color: "silver",
      border: "none",
      borderRadius: "50%",
      background: "transparent"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "outset",
    borderColor: "silver",
    borderWidth: "2px",
    borderRadius: "50%",
    shadowDirectionSize: 5,
    shadowDirectionColor: "silver",
    shadowDirectionBlur: 5,
    active: {
      background: "transparent",
      borderStyle: "outset",
      borderColor: "#ccbf7f",
      borderRadius: "50%",
      shadowDirectionColor: "#ccbf7f"
    }
  },
  arrows: {
    color: "#ccbf7f",
    fill: "none",
    stroke: "#ccbf7f",
    background: "transparent",
    borderRadius: "2px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: {
      size: { w: 14, h: 14 }
    },
    hover: {
      background: "transparent",
      fill: "none",
      stroke: "#b3a76b",
      color: "#b3a76b"
    },
    active: {
      background: "transparent",
      fill: "none",
      stroke: "#ccbf7f",
      color: "#ccbf7f"
    },
    disabled: {
      fill: "none",
      stroke: "#a7a7a7",
      background: "transparent"
    }
  }
};

// src/pressets/rounded-space-theme.ts
var RoundedSpaceTheme = {
  items: {
    color: "#80d8ff",
    border: "1px solid rgba(128,216,255,.25)",
    borderRadius: "50%",
    background: "rgba(16,22,40,.55)",
    transition: "all .3s ease",
    hover: {
      color: "#ffffff",
      border: "1px solid #6be8ff",
      borderRadius: "50%",
      background: "rgba(40,70,130,.35)",
      transition: "all .18s ease"
    },
    active: {
      color: "#ffffff",
      border: "1px solid #6be8ff",
      borderRadius: "50%",
      background: "linear-gradient(135deg,#243b73,#3d1c71)"
    }
  },
  button: {
    background: "rgba(18,24,42,.15)",
    borderStyle: "solid",
    borderColor: "#64d8ff",
    borderWidth: "1px",
    borderRadius: "50%",
    shadowDirectionSize: 8,
    shadowDirectionColor: "#38bdf8",
    shadowDirectionBlur: 18,
    active: {
      background: "rgba(35,45,80,.95)",
      borderStyle: "solid",
      borderColor: "#8b5cf6",
      borderRadius: "50%",
      shadowDirectionColor: "#8b5cf6"
    }
  },
  arrows: {
    color: "#7dd3fc",
    fill: "none",
    stroke: "#7dd3fc",
    background: "rgba(15,23,42,.65)",
    borderRadius: "50%",
    transition: "all .2s ease",
    size: { w: 36, h: 36 },
    icon: {
      size: { w: 14, h: 14 }
    },
    hover: {
      background: "rgba(35,55,110,.45)",
      fill: "none",
      stroke: "#c4b5fd",
      color: "#c4b5fd"
    },
    active: {
      background: "rgba(55,85,170,.35)",
      fill: "none",
      stroke: "#ffffff",
      color: "#ffffff"
    },
    disabled: {
      fill: "none",
      stroke: "rgba(120,140,180,.35)",
      background: "rgba(20,20,30,.25)"
    }
  }
};

// src/pressets/white-theme.ts
var whiteTheme = {
  items: {
    color: "#ffffff",
    border: "none",
    borderRadius: "2px",
    background: "transparent",
    transition: "all .4s ease",
    hover: {
      color: "#000000",
      border: "none",
      borderRadius: "2px",
      background: "#ffffff",
      transition: "0s all ease"
    },
    active: {
      color: "#000000",
      border: "none",
      borderRadius: "2px",
      background: "#ffffff"
    }
  },
  button: {
    background: "transparent",
    borderStyle: "solid",
    borderColor: "#ffffff",
    borderWidth: "1px",
    borderRadius: "2px",
    shadowDirectionSize: 4,
    shadowDirectionColor: "transparent",
    shadowDirectionBlur: 6,
    active: {
      background: "#ffffff",
      borderStyle: "solid",
      borderColor: "#ffffff",
      borderRadius: "2px",
      shadowDirectionColor: "#ffffff"
    }
  },
  arrows: {
    color: "#ffffff",
    fill: "none",
    stroke: "#ffffff",
    background: "transparent",
    borderRadius: "2px",
    transition: "all 0.2s ease",
    size: { w: 34, h: 34 },
    icon: {
      size: { w: 14, h: 14 }
    },
    hover: {
      background: "#ffffff",
      fill: "none",
      stroke: "#000000",
      color: "#000000"
    },
    active: {
      background: "#eeeeee",
      fill: "none",
      stroke: "#000000",
      color: "#000000"
    },
    disabled: {
      fill: "none",
      stroke: "#a7a7a7",
      background: "transparent"
    }
  }
};

// src/pressets/config.ts
var themes = {
  blueTheme,
  lightBlueTheme,
  whiteTheme,
  darkTheme,
  roundedRichTheme,
  RoundedSpaceTheme,
  roundedAuroraNebulaTheme,
  roundedDeepSpaceVoidTheme,
  roundedSolarFlareTheme,
  roundedBlackHoleTheme,
  roundedInfernoTheme,
  roundedTrimstoneTheme,
  roundedAbyssalTheme,
  roundedOceanDepthsTheme,
  squaredForestMossTheme,
  squaredCyberpunkNeonTheme
};
var selectTheme = (theme) => {
  switch (theme) {
    case "blue":
      return themes.blueTheme;
    case "lightBlue":
      return themes.lightBlueTheme;
    case "white":
      return themes.whiteTheme;
    case "dark":
      return themes.darkTheme;
    case "roundedRich":
      return themes.roundedRichTheme;
    case "roundedSpace":
      return themes.RoundedSpaceTheme;
    case "roundedAuroraNebula":
      return themes.roundedAuroraNebulaTheme;
    case "roundedDeepSpaceVoid":
      return themes.roundedDeepSpaceVoidTheme;
    case "roundedSolarFlare":
      return themes.roundedSolarFlareTheme;
    case "roundedBlackHole":
      return themes.roundedBlackHoleTheme;
    case "roundedInferno":
      return themes.roundedInfernoTheme;
    case "roundedTrimstone":
      return themes.roundedTrimstoneTheme;
    case "roundedAbyssal":
      return themes.roundedAbyssalTheme;
    case "roundedOceanDepths":
      return themes.roundedOceanDepthsTheme;
    case "squaredForestMoss":
      return themes.squaredForestMossTheme;
    case "squaredCyberpunkNeon":
      return themes.squaredCyberpunkNeonTheme;
    default:
      return themes.blueTheme;
  }
};

// src/utils/themeMerge.ts
var isPlainObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var themeMerge = (base, override) => {
  if (!override) return base;
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const overrideValue = override[key];
    const baseValue = base[key];
    if (overrideValue === void 0) continue;
    if (isPlainObject(overrideValue) && isPlainObject(baseValue)) {
      result[key] = themeMerge(
        baseValue,
        overrideValue
      );
    } else {
      result[key] = overrideValue;
    }
  }
  return result;
};

// src/components/Pagination/Pagination.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var Pagination = (0, import_mobx_react_lite8.observer)(
  ({ children, ...props }) => {
    const store = useInit({
      items: props.items,
      itemsPerPage: props.itemsPerPage,
      mode: props.mode,
      animationSpeed: props.animationSpeed,
      indexing: props.indexing
    });
    const [currentHoveredItem, setCurrentHoveredItem] = (0, import_react11.useState)(null);
    const [currentHoveredArrow, setCurrentHoveredArrow] = (0, import_react11.useState)(null);
    const actions = usePaginationActions(store);
    const theme = props.selectTheme;
    const propsPart = props;
    const other = propsPart;
    const selectedTheme = selectTheme(theme);
    const finalTheme = themeMerge(selectedTheme, props.theme);
    const finalProps = {
      ...other,
      items: props.items,
      theme: finalTheme
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      PaginationContext.Provider,
      {
        value: {
          store,
          actions,
          props: finalProps,
          currentHoveredItem,
          setCurrentHoveredItem,
          currentHoveredArrow,
          setCurrentHoveredArrow
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Main, { children })
      }
    );
  }
);

// src/hooks/useList.ts
var useList = () => {
  const { store } = usePaginationContext();
  return store.currentItems;
};

// src/hooks/useProgress.tsx
var import_mobx2 = require("mobx");
var import_react12 = require("react");
var useProgress = () => {
  const { store } = usePaginationContext();
  const [state, setState] = (0, import_react12.useState)({
    start: store.startAnim,
    progress: store.progress,
    end: !store.startAnim
  });
  (0, import_react12.useEffect)(() => {
    const disposer = (0, import_mobx2.reaction)(
      () => [store.startAnim, store.progress],
      () => {
        setState({
          start: store.startAnim,
          progress: store.progress,
          end: !store.startAnim
        });
      }
    );
    return disposer;
  }, [store]);
  return state;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pagination,
  useList,
  useProgress
});
//# sourceMappingURL=index.js.map