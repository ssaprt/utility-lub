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
  ScrollToFuture: () => ScrollToFuture
});
module.exports = __toCommonJS(index_exports);

// src/ScrollToFuture.tsx
var import_react6 = require("react");
var import_react_dom = require("react-dom");

// src/components/Axios/ScrollAxis.tsx
var import_react = require("react");

// src/utils/constants.ts
var MIN_THUMB_SIZE = 24;
var DEFAULT_TRACK_THICKNESS = 8;
var MAX_THUMB_RATIO = 0.8;
var EMPTY_AXIS_METRICS = {
  scrollSize: 0,
  clientSize: 0,
  scrollPos: 0,
  canScroll: false
};

// src/utils/helper.ts
var clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));
var parsePxValue = (value) => {
  if (!value) return null;
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value.trim());
  return match ? Number(match[1]) : null;
};
var parseBoundaryOffset = (value) => {
  if (!value) {
    return {
      start: 0,
      end: 0
    };
  }
  const parts = value.trim().split(/\s+/);
  const start = Math.max(0, parsePxValue(parts[0]) ?? 0);
  const end = parts.length > 1 ? Math.max(0, parsePxValue(parts[1]) ?? 0) : start;
  return {
    start,
    end
  };
};
var fitInsetsWithinSize = (start, end, size, minInnerSize = 1) => {
  const safeSize = Math.max(0, size);
  if (safeSize <= 0) {
    return {
      start: 0,
      end: 0,
      innerSize: 0
    };
  }
  const actualMinInnerSize = Math.min(Math.max(0, minInnerSize), safeSize);
  const safeStart = Math.max(0, start);
  const safeEnd = Math.max(0, end);
  const requestedInsetsSize = safeStart + safeEnd;
  const maximumInsetsSize = safeSize - actualMinInnerSize;
  if (requestedInsetsSize <= maximumInsetsSize) {
    return {
      start: safeStart,
      end: safeEnd,
      innerSize: safeSize - safeStart - safeEnd
    };
  }
  if (requestedInsetsSize <= 0) {
    return {
      start: 0,
      end: 0,
      innerSize: safeSize
    };
  }
  const scale = maximumInsetsSize / requestedInsetsSize;
  const fittedStart = safeStart * scale;
  const fittedEnd = safeEnd * scale;
  return {
    start: fittedStart,
    end: fittedEnd,
    innerSize: Math.max(
      actualMinInnerSize,
      safeSize - fittedStart - fittedEnd
    )
  };
};
var resolveTrackLength = (value, containerSize) => {
  if (!value) return containerSize;
  const px = parsePxValue(value);
  if (px !== null) return px;
  const percentMatch = /^(-?\d+(?:\.\d+)?)%$/.exec(value);
  if (percentMatch) return Number(percentMatch[1]) / 100 * containerSize;
  const vhMatch = /^(-?\d+(?:\.\d+)?)vh$/.exec(value);
  if (vhMatch) {
    const vh = typeof window !== "undefined" ? window.innerHeight : containerSize;
    return Number(vhMatch[1]) / 100 * vh;
  }
  const dvhMatch = /^(-?\d+(?:\.\d+)?)d(s)?vh$/.exec(value);
  if (dvhMatch) {
    const dvh = typeof window !== "undefined" ? window.visualViewport?.height ?? window.innerHeight : containerSize;
    return Number(dvhMatch[1]) / 100 * dvh;
  }
  return containerSize;
};
var computeThumbSize = (trackLength, metrics, thumbHeightTrack) => {
  if (trackLength <= 0) return 0;
  const minSize = Math.min(MIN_THUMB_SIZE, trackLength);
  const maxSize = Math.min(
    trackLength,
    Math.max(minSize, trackLength * MAX_THUMB_RATIO)
  );
  if (!thumbHeightTrack || thumbHeightTrack === "auto") {
    const ratio = metrics.scrollSize > 0 ? metrics.clientSize / metrics.scrollSize : 1;
    const autoSize = trackLength * clamp(ratio, 0, 1);
    return clamp(autoSize, minSize, maxSize);
  }
  const px = parsePxValue(thumbHeightTrack);
  if (px !== null) {
    return clamp(px, minSize, maxSize);
  }
  const percentMatch = /^(-?\d+(?:\.\d+)?)%$/.exec(thumbHeightTrack.trim());
  if (percentMatch) {
    const size = Number(percentMatch[1]) / 100 * trackLength;
    return clamp(size, minSize, maxSize);
  }
  return maxSize;
};
var computeThumbPosition = (trackLength, thumbSize, metrics) => {
  const maxScroll = metrics.scrollSize - metrics.clientSize;
  const maxThumbTravel = trackLength - thumbSize;
  if (maxScroll <= 0 || maxThumbTravel <= 0) return 0;
  const ratio = clamp(metrics.scrollPos / maxScroll, 0, 1);
  return ratio * maxThumbTravel;
};
var trackPositionToScroll = (trackPos, trackLength, thumbSize, metrics) => {
  const maxScroll = metrics.scrollSize - metrics.clientSize;
  const maxThumbTravel = trackLength - thumbSize;
  if (maxScroll <= 0 || maxThumbTravel <= 0) return 0;
  const ratio = clamp(trackPos / maxThumbTravel, 0, 1);
  return ratio * maxScroll;
};
var computeReservedSpace = (boundaryOffset, trackThicknessPx, superimposition) => {
  if (superimposition !== "after") {
    return 0;
  }
  const { start, end } = parseBoundaryOffset(boundaryOffset);
  return start + trackThicknessPx + end;
};
var isPageScrollTarget = (el) => typeof document !== "undefined" && (el === document.body || el === document.documentElement || el === document.scrollingElement);

// src/components/Axios/ScrollAxis.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ScrollAxis = ({
  axis,
  target,
  metrics,
  scrollBar,
  thumb,
  positionMode,
  superimposition,
  hasCrossAxis,
  vars
}) => {
  const trackRef = (0, import_react.useRef)(null);
  const dragState = (0, import_react.useRef)(null);
  const [isDragging, setIsDragging] = (0, import_react.useState)(false);
  const requestedTrackThickness = parsePxValue(scrollBar.widthTrack) ?? DEFAULT_TRACK_THICKNESS;
  const trackThickness = Math.max(1, requestedTrackThickness);
  const trackBoundary = parseBoundaryOffset(scrollBar.boundaryOffset);
  const thumbBoundary = parseBoundaryOffset(thumb.boundaryOffset);
  const reserveCrossAxisCorner = hasCrossAxis;
  const crossAxisCornerSize = reserveCrossAxisCorner ? trackThickness + (positionMode === "before" ? trackBoundary.start : trackBoundary.end) : 0;
  const trackCenter = metrics.clientSize / 2;
  const requestedTrackLength = resolveTrackLength(
    scrollBar.heightTrack,
    metrics.clientSize
  );
  const maximumTrackLength = Math.max(
    0,
    metrics.clientSize - crossAxisCornerSize * 2
  );
  const trackLength = maximumTrackLength > 0 ? clamp(requestedTrackLength, 1, maximumTrackLength) : 0;
  const fittedThumbMainInsets = fitInsetsWithinSize(
    thumbBoundary.start,
    thumbBoundary.end,
    trackLength,
    1
  );
  const thumbMainStart = fittedThumbMainInsets.start;
  const innerTrackLength = fittedThumbMainInsets.innerSize;
  const requestedThumbCrossSize = trackThickness - thumbBoundary.start - thumbBoundary.end;
  const thumbCrossSize = clamp(requestedThumbCrossSize, 1, trackThickness);
  const thumbSize = computeThumbSize(
    innerTrackLength,
    metrics,
    thumb.heightTrack
  );
  const thumbPositionInsideTrack = computeThumbPosition(
    innerTrackLength,
    thumbSize,
    metrics
  );
  const thumbPosition = thumbMainStart + thumbPositionInsideTrack;
  const maxScroll = Math.max(0, metrics.scrollSize - metrics.clientSize);
  const maxThumbTravel = Math.max(0, innerTrackLength - thumbSize);
  const setScrollPosition = (value) => {
    const targetElement = target;
    if (!targetElement) {
      return;
    }
    const nextValue = clamp(value, 0, maxScroll);
    if (!isPageScrollTarget(targetElement)) {
      if (axis === "x") {
        targetElement.scrollLeft = nextValue;
      } else {
        targetElement.scrollTop = nextValue;
      }
      return;
    }
    const targetStyle = window.getComputedStyle(targetElement);
    const overflowValue = axis === "x" ? targetStyle.overflowX : targetStyle.overflowY;
    const targetCanScroll = axis === "x" ? targetElement.scrollWidth - targetElement.clientWidth > 1 : targetElement.scrollHeight - targetElement.clientHeight > 1;
    const targetOwnsScroll = targetCanScroll && /^(auto|scroll|overlay)$/.test(overflowValue);
    if (targetOwnsScroll) {
      if (axis === "x") {
        targetElement.scrollLeft = nextValue;
      } else {
        targetElement.scrollTop = nextValue;
      }
      return;
    }
    window.scrollTo({
      left: axis === "x" ? nextValue : window.scrollX,
      top: axis === "y" ? nextValue : window.scrollY,
      behavior: "auto"
    });
  };
  const handleThumbPointerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dragState.current = {
      startPointer: axis === "x" ? event.clientX : event.clientY,
      startScroll: metrics.scrollPos
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handleThumbPointerMove = (event) => {
    const currentDragState = dragState.current;
    if (!currentDragState) {
      return;
    }
    if (maxScroll <= 0 || maxThumbTravel <= 0) {
      return;
    }
    const pointerPosition = axis === "x" ? event.clientX : event.clientY;
    const pointerDelta = pointerPosition - currentDragState.startPointer;
    const scrollDelta = pointerDelta / maxThumbTravel * maxScroll;
    setScrollPosition(currentDragState.startScroll + scrollDelta);
  };
  const stopDrag = (event) => {
    if (!dragState.current) {
      return;
    }
    dragState.current = null;
    setIsDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
    }
  };
  const handleTrackPointerDown = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    const trackElement = trackRef.current;
    if (!trackElement) {
      return;
    }
    if (maxThumbTravel <= 0) {
      return;
    }
    const rect = trackElement.getBoundingClientRect();
    const clickPosition = axis === "x" ? event.clientX - rect.left : event.clientY - rect.top;
    const clickInsideInnerTrack = clickPosition - thumbMainStart;
    const targetThumbStart = clamp(
      clickInsideInnerTrack - thumbSize / 2,
      0,
      maxThumbTravel
    );
    const nextScroll = trackPositionToScroll(
      targetThumbStart,
      innerTrackLength,
      thumbSize,
      metrics
    );
    setScrollPosition(nextScroll);
  };
  if (!metrics.canScroll || metrics.clientSize <= 0 || trackLength < 1 || innerTrackLength < 1 || thumbSize < 1) {
    return null;
  }
  const trackStyle = axis === "y" ? {
    position: "absolute",
    top: trackCenter,
    transform: "translateY(-50%)",
    width: trackThickness,
    height: trackLength,
    ...positionMode === "before" ? {
      left: trackBoundary.start
    } : {
      right: trackBoundary.end
    },
    pointerEvents: "auto"
  } : {
    position: "absolute",
    left: trackCenter,
    transform: "translateX(-50%)",
    width: trackLength,
    height: trackThickness,
    ...positionMode === "before" ? {
      top: trackBoundary.start
    } : {
      bottom: trackBoundary.end
    },
    pointerEvents: "auto"
  };
  const thumbStyle = axis === "y" ? {
    top: 0,
    left: "50%",
    width: thumbCrossSize,
    height: thumbSize,
    transform: `translate3d(-50%, ${thumbPosition}px, 0)`,
    willChange: "transform"
  } : {
    top: "50%",
    left: 0,
    width: thumbSize,
    height: thumbCrossSize,
    transform: `translate3d(${thumbPosition}px, -50%, 0)`,
    willChange: "transform"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: trackRef,
      className: "scroll-to-future__track",
      style: {
        ...trackStyle,
        ...vars
      },
      onPointerDown: handleTrackPointerDown,
      "data-axis": axis,
      "data-superimposition": superimposition,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: `scroll-to-future__thumb ${isDragging ? "scroll-to-future__thumb--dragging" : ""}`.trim(),
          style: thumbStyle,
          onPointerDown: handleThumbPointerDown,
          onPointerMove: handleThumbPointerMove,
          onPointerUp: stopDrag,
          onPointerCancel: stopDrag
        }
      )
    }
  );
};

// src/hooks/useElementScrollObserver.ts
var import_react2 = require("react");
var isSameAxisMetrics = (previous, next) => previous.scrollSize === next.scrollSize && previous.clientSize === next.clientSize && previous.scrollPos === next.scrollPos && previous.canScroll === next.canScroll;
var getActualScrollPosition = (...values) => values.reduce(
  (current, value) => Math.abs(value) > Math.abs(current) ? value : current,
  0
);
var getEmptyMetrics = () => ({
  x: {
    ...EMPTY_AXIS_METRICS
  },
  y: {
    ...EMPTY_AXIS_METRICS
  }
});
var isInternalElement = (element) => element.matches("[data-scroll-to-future-overlay]") || element.closest("[data-scroll-to-future-overlay]") !== null;
var useElementScrollObserver = (target) => {
  const [metrics, setMetrics] = (0, import_react2.useState)(getEmptyMetrics);
  const rafRef = (0, import_react2.useRef)(null);
  (0, import_react2.useLayoutEffect)(() => {
    const targetElement = target;
    if (!targetElement) {
      setMetrics(getEmptyMetrics());
      return;
    }
    const pageScroll = isPageScrollTarget(targetElement);
    let initialFrameId = null;
    let secondInitialFrameId = null;
    const measure = () => {
      let nextX;
      let nextY;
      if (pageScroll) {
        const root = document.documentElement;
        const body = document.body;
        const scrollingElement = document.scrollingElement instanceof HTMLElement ? document.scrollingElement : root;
        const scrollWidth = Math.max(
          root.scrollWidth,
          body.scrollWidth,
          scrollingElement.scrollWidth,
          targetElement.scrollWidth
        );
        const scrollHeight = Math.max(
          root.scrollHeight,
          body.scrollHeight,
          scrollingElement.scrollHeight,
          targetElement.scrollHeight
        );
        const clientWidth = window.visualViewport?.width ?? window.innerWidth;
        const clientHeight = window.visualViewport?.height ?? window.innerHeight;
        const scrollLeft = getActualScrollPosition(
          window.scrollX,
          root.scrollLeft,
          body.scrollLeft,
          scrollingElement.scrollLeft,
          targetElement.scrollLeft
        );
        const scrollTop = getActualScrollPosition(
          window.scrollY,
          root.scrollTop,
          body.scrollTop,
          scrollingElement.scrollTop,
          targetElement.scrollTop
        );
        nextX = {
          scrollSize: scrollWidth,
          clientSize: clientWidth,
          scrollPos: scrollLeft,
          canScroll: scrollWidth - clientWidth > 1
        };
        nextY = {
          scrollSize: scrollHeight,
          clientSize: clientHeight,
          scrollPos: scrollTop,
          canScroll: scrollHeight - clientHeight > 1
        };
      } else {
        const scrollWidth = targetElement.scrollWidth;
        const scrollHeight = targetElement.scrollHeight;
        const clientWidth = targetElement.clientWidth;
        const clientHeight = targetElement.clientHeight;
        nextX = {
          scrollSize: scrollWidth,
          clientSize: clientWidth,
          scrollPos: targetElement.scrollLeft,
          canScroll: scrollWidth - clientWidth > 1
        };
        nextY = {
          scrollSize: scrollHeight,
          clientSize: clientHeight,
          scrollPos: targetElement.scrollTop,
          canScroll: scrollHeight - clientHeight > 1
        };
      }
      setMetrics((previous) => {
        const sameX = isSameAxisMetrics(previous.x, nextX);
        const sameY = isSameAxisMetrics(previous.y, nextY);
        if (sameX && sameY) {
          return previous;
        }
        return {
          x: nextX,
          y: nextY
        };
      });
    };
    const scheduleMeasure = () => {
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        measure();
      });
    };
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    const observeElement = (element) => {
      if (isInternalElement(element)) {
        return;
      }
      try {
        resizeObserver.observe(element);
      } catch {
      }
    };
    const observeTree = (root) => {
      observeElement(root);
      root.querySelectorAll("*").forEach((element) => {
        observeElement(element);
      });
    };
    if (pageScroll) {
      observeTree(document.documentElement);
      if (document.body !== document.documentElement) {
        observeTree(document.body);
      }
    } else {
      observeTree(targetElement);
    }
    const mutationRoot = pageScroll ? document.documentElement : targetElement;
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldMeasure = false;
      mutations.forEach((mutation) => {
        if (mutation.target instanceof Element && isInternalElement(mutation.target)) {
          return;
        }
        if (mutation.type === "attributes") {
          shouldMeasure = true;
          return;
        }
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }
          if (isInternalElement(node)) {
            return;
          }
          observeTree(node);
          shouldMeasure = true;
        });
        if (mutation.removedNodes.length > 0) {
          shouldMeasure = true;
        }
      });
      if (shouldMeasure) {
        scheduleMeasure();
      }
    });
    mutationObserver.observe(mutationRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "hidden"]
    });
    const handleTransitionEnd = (event) => {
      if (event.target instanceof Element && isInternalElement(event.target)) {
        return;
      }
      scheduleMeasure();
    };
    const handleAnimationEnd = (event) => {
      if (event.target instanceof Element && isInternalElement(event.target)) {
        return;
      }
      scheduleMeasure();
    };
    window.addEventListener("scroll", scheduleMeasure, {
      capture: true,
      passive: true
    });
    targetElement.addEventListener("scroll", scheduleMeasure, {
      passive: true
    });
    window.addEventListener("resize", scheduleMeasure, {
      passive: true
    });
    targetElement.addEventListener(
      "transitionend",
      handleTransitionEnd,
      true
    );
    targetElement.addEventListener(
      "animationend",
      handleAnimationEnd,
      true
    );
    window.visualViewport?.addEventListener("resize", scheduleMeasure, {
      passive: true
    });
    window.visualViewport?.addEventListener("scroll", scheduleMeasure, {
      passive: true
    });
    measure();
    initialFrameId = requestAnimationFrame(() => {
      measure();
      secondInitialFrameId = requestAnimationFrame(measure);
    });
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleMeasure, true);
      targetElement.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      targetElement.removeEventListener(
        "transitionend",
        handleTransitionEnd,
        true
      );
      targetElement.removeEventListener(
        "animationend",
        handleAnimationEnd,
        true
      );
      window.visualViewport?.removeEventListener(
        "resize",
        scheduleMeasure
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        scheduleMeasure
      );
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (initialFrameId !== null) {
        cancelAnimationFrame(initialFrameId);
      }
      if (secondInitialFrameId !== null) {
        cancelAnimationFrame(secondInitialFrameId);
      }
    };
  }, [target]);
  return metrics;
};

// src/hooks/useFuture.ts
var import_react3 = require("react");

// src/utils/native-scrollbar.ts
var STYLE_ID = "scroll-to-future-native-scrollbar-styles";
var ALWAYS_CLASS = "scroll-to-future-hide-native-scrollbar";
var FINE_POINTER_CLASS = "scroll-to-future-hide-native-scrollbar-fine";
var classCounters = /* @__PURE__ */ new WeakMap();
var installStyles = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) {
    return;
  }
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
        .${ALWAYS_CLASS} {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
        }

        .${ALWAYS_CLASS}::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            background: transparent !important;
        }

        @media (any-pointer: fine) {
            .${FINE_POINTER_CLASS} {
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
            }

            .${FINE_POINTER_CLASS}::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                background: transparent !important;
            }
        }
    `;
  document.head.appendChild(style);
};
var retainClass = (element, className) => {
  let elementCounters = classCounters.get(element);
  if (!elementCounters) {
    elementCounters = /* @__PURE__ */ new Map();
    classCounters.set(element, elementCounters);
  }
  const currentCount = elementCounters.get(className) ?? 0;
  elementCounters.set(className, currentCount + 1);
  if (currentCount === 0) {
    element.classList.add(className);
  }
  return () => {
    const counters = classCounters.get(element);
    if (!counters) return;
    const count = counters.get(className) ?? 0;
    if (count <= 1) {
      counters.delete(className);
      element.classList.remove(className);
    } else {
      counters.set(className, count - 1);
    }
    if (counters.size === 0) {
      classCounters.delete(element);
    }
  };
};
var isDocumentScrollTarget = (target) => {
  if (typeof document === "undefined") {
    return false;
  }
  return target === document.body || target === document.documentElement || target === document.scrollingElement;
};
var resolveStyleTargets = (target) => {
  if (!isDocumentScrollTarget(target)) {
    return [target];
  }
  const targets = /* @__PURE__ */ new Set();
  targets.add(document.documentElement);
  if (document.body) {
    targets.add(document.body);
  }
  const scrollingElement = document.scrollingElement;
  if (scrollingElement instanceof HTMLElement) {
    targets.add(scrollingElement);
  }
  return Array.from(targets);
};
var isMobileInputDevice = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cannotHover = window.matchMedia("(hover: none)").matches;
  const hasTouch = navigator.maxTouchPoints > 0;
  return hasTouch && coarsePointer && cannotHover;
};
var hideNativeScrollbar = (target, mode, nativeOnMobile) => {
  if (typeof window === "undefined" || typeof document === "undefined" || mode === false) {
    return () => {
    };
  }
  if (nativeOnMobile && isMobileInputDevice()) {
    return () => {
    };
  }
  installStyles();
  const className = mode === "always" ? ALWAYS_CLASS : FINE_POINTER_CLASS;
  const targets = resolveStyleTargets(target);
  const cleanups = targets.map((element) => retainClass(element, className));
  return () => {
    cleanups.forEach((cleanup) => {
      cleanup();
    });
  };
};

// src/hooks/useFuture.ts
var useFuture = ({
  target,
  anchorRef,
  targetRef,
  setFindedTarget,
  mounted,
  config,
  showY,
  showX,
  superimposition,
  findedTarget,
  positionMode,
  coversAllScrollableAxes,
  nativeOnMobile
}) => {
  (0, import_react3.useLayoutEffect)(() => {
    if (!mounted) {
      return;
    }
    let rafId = null;
    let stopped = false;
    const resolveTarget = () => {
      if (stopped) {
        return;
      }
      const nextTarget = target ? target.current : anchorRef.current?.parentElement ?? null;
      if (!nextTarget) {
        rafId = requestAnimationFrame(resolveTarget);
        return;
      }
      targetRef.current = nextTarget;
      setFindedTarget(
        (previousTarget) => previousTarget === nextTarget ? previousTarget : nextTarget
      );
    };
    resolveTarget();
    return () => {
      stopped = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [anchorRef, mounted, setFindedTarget, target, targetRef]);
  (0, import_react3.useEffect)(() => {
    const element = findedTarget;
    if (!element) {
      return;
    }
    const trackThickness = parsePxValue(config.scrollBar.widthTrack) ?? DEFAULT_TRACK_THICKNESS;
    const reservedY = showY ? computeReservedSpace(
      config.scrollBar.boundaryOffset,
      trackThickness,
      superimposition
    ) : 0;
    const reservedX = showX ? computeReservedSpace(
      config.scrollBar.boundaryOffset,
      trackThickness,
      superimposition
    ) : 0;
    const previousInlinePadding = {
      left: element.style.paddingLeft,
      right: element.style.paddingRight,
      top: element.style.paddingTop,
      bottom: element.style.paddingBottom
    };
    const computedStyle = window.getComputedStyle(element);
    const basePaddingLeft = Number.parseFloat(computedStyle.paddingLeft) || 0;
    const basePaddingRight = Number.parseFloat(computedStyle.paddingRight) || 0;
    const basePaddingTop = Number.parseFloat(computedStyle.paddingTop) || 0;
    const basePaddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0;
    if (reservedY > 0) {
      if (positionMode === "before") {
        element.style.paddingLeft = `${basePaddingLeft + reservedY}px`;
      } else {
        element.style.paddingRight = `${basePaddingRight + reservedY}px`;
      }
    }
    if (reservedX > 0) {
      if (positionMode === "before") {
        element.style.paddingTop = `${basePaddingTop + reservedX}px`;
      } else {
        element.style.paddingBottom = `${basePaddingBottom + reservedX}px`;
      }
    }
    return () => {
      element.style.paddingLeft = previousInlinePadding.left;
      element.style.paddingRight = previousInlinePadding.right;
      element.style.paddingTop = previousInlinePadding.top;
      element.style.paddingBottom = previousInlinePadding.bottom;
    };
  }, [
    config.scrollBar.boundaryOffset,
    config.scrollBar.widthTrack,
    findedTarget,
    positionMode,
    showX,
    showY,
    superimposition
  ]);
  (0, import_react3.useEffect)(() => {
    if (!findedTarget) {
      return;
    }
    const mode = config.scrollBar.hideNativeScrollbar ?? false;
    if (mode === false || !coversAllScrollableAxes) {
      return;
    }
    return hideNativeScrollbar(findedTarget, mode, nativeOnMobile);
  }, [
    config.scrollBar.hideNativeScrollbar,
    coversAllScrollableAxes,
    findedTarget,
    nativeOnMobile
  ]);
};

// src/hooks/useMounted.tsx
var import_react4 = require("react");
function useMounted() {
  const [mounted, setMounted] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
    if (mounted) return;
    setMounted(true);
  }, []);
  return mounted;
}

// src/hooks/useTargetRect.ts
var import_react5 = require("react");
var hostPositionRecords = /* @__PURE__ */ new WeakMap();
var parseColor = (value) => {
  const match = value.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/
  );
  if (!match) {
    return null;
  }
  return {
    red: Number(match[1]),
    green: Number(match[2]),
    blue: Number(match[3]),
    alpha: match[4] === void 0 ? 1 : Number(match[4])
  };
};
var compositeColors = (foreground, background) => {
  const alpha = foreground.alpha + background.alpha * (1 - foreground.alpha);
  if (alpha <= 0) {
    return {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0
    };
  }
  return {
    red: (foreground.red * foreground.alpha + background.red * background.alpha * (1 - foreground.alpha)) / alpha,
    green: (foreground.green * foreground.alpha + background.green * background.alpha * (1 - foreground.alpha)) / alpha,
    blue: (foreground.blue * foreground.alpha + background.blue * background.alpha * (1 - foreground.alpha)) / alpha,
    alpha
  };
};
var resolveSurfaceColor = (target) => {
  const layers = [];
  let current = target;
  while (current) {
    const style = window.getComputedStyle(current);
    const color = parseColor(style.backgroundColor);
    if (color && color.alpha > 0) {
      layers.push(color);
    }
    if (color?.alpha === 1) {
      break;
    }
    current = current.parentElement;
  }
  let result = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1
  };
  for (let index = layers.length - 1; index >= 0; index -= 1) {
    result = compositeColors(layers[index], result);
  }
  return `rgb(${Math.round(result.red)} ${Math.round(
    result.green
  )} ${Math.round(result.blue)})`;
};
var retainPositionedHost = (host) => {
  const currentRecord = hostPositionRecords.get(host);
  if (currentRecord) {
    currentRecord.count += 1;
    return () => {
      currentRecord.count -= 1;
      if (currentRecord.count > 0) {
        return;
      }
      if (currentRecord.changed && host.style.position === "relative") {
        host.style.position = currentRecord.originalInlinePosition;
      }
      hostPositionRecords.delete(host);
    };
  }
  const originalInlinePosition = host.style.position;
  const computedPosition = window.getComputedStyle(host).position;
  const changed = computedPosition === "static";
  if (changed) {
    host.style.position = "relative";
  }
  const record = {
    count: 1,
    changed,
    originalInlinePosition
  };
  hostPositionRecords.set(host, record);
  return () => {
    record.count -= 1;
    if (record.count > 0) {
      return;
    }
    if (record.changed && host.style.position === "relative") {
      host.style.position = record.originalInlinePosition;
    }
    hostPositionRecords.delete(host);
  };
};
var useTargetRect = (target, portalHost, overlayRef, placement, enabled) => {
  (0, import_react5.useLayoutEffect)(() => {
    if (!enabled || !target) {
      return;
    }
    if (placement === "local" && !portalHost) {
      return;
    }
    const releaseHostPosition = placement === "local" && portalHost ? retainPositionedHost(portalHost) : () => {
    };
    let rafId = null;
    const updatePosition = () => {
      const overlay = overlayRef.current;
      if (!overlay) {
        return;
      }
      const targetStyle = window.getComputedStyle(target);
      overlay.style.setProperty(
        "--scroll-to-future-surface-color",
        resolveSurfaceColor(target)
      );
      overlay.style.borderRadius = targetStyle.borderRadius;
      if (placement === "local") {
        const host = portalHost;
        if (!host) {
          return;
        }
        const targetRect = target.getBoundingClientRect();
        const hostRect = host.getBoundingClientRect();
        const left2 = targetRect.left - hostRect.left - host.clientLeft + host.scrollLeft + target.clientLeft;
        const top2 = targetRect.top - hostRect.top - host.clientTop + host.scrollTop + target.clientTop;
        const width2 = target.clientWidth;
        const height2 = target.clientHeight;
        overlay.style.transform = `translate3d(${left2}px, ${top2}px, 0)`;
        overlay.style.width = `${width2}px`;
        overlay.style.height = `${height2}px`;
        overlay.style.visibility = width2 > 0 && height2 > 0 ? "visible" : "hidden";
        return;
      }
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const left = viewport?.offsetLeft ?? 0;
      const top = viewport?.offsetTop ?? 0;
      overlay.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      overlay.style.width = `${width}px`;
      overlay.style.height = `${height}px`;
      overlay.style.visibility = width > 0 && height > 0 ? "visible" : "hidden";
    };
    const scheduleUpdate = () => {
      if (rafId !== null) {
        return;
      }
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updatePosition();
      });
    };
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const mutationObserver = new MutationObserver((mutations) => {
      const overlay = overlayRef.current;
      const shouldUpdate = mutations.some((mutation) => {
        if (!overlay) {
          return true;
        }
        if (mutation.target === overlay) {
          return false;
        }
        if (mutation.target instanceof Node && overlay.contains(mutation.target)) {
          return false;
        }
        return true;
      });
      if (shouldUpdate) {
        scheduleUpdate();
      }
    });
    resizeObserver.observe(target);
    if (portalHost) {
      resizeObserver.observe(portalHost);
      mutationObserver.observe(portalHost, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["class", "style", "hidden"]
      });
    }
    window.addEventListener("resize", scheduleUpdate, {
      passive: true
    });
    window.visualViewport?.addEventListener("resize", scheduleUpdate, {
      passive: true
    });
    scheduleUpdate();
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      releaseHostPosition();
      window.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener(
        "resize",
        scheduleUpdate
      );
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [enabled, overlayRef, placement, portalHost, target]);
};

// src/themes/collection.theme.ts
var primary = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.25)"
    },
    active: {
      backgroundColor: "rgba(0, 0, 0, 0.35)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.35)",
      borderRadius: "8px"
    },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.55)",
      transform: "scale(1)",
      transition: "background-color 0s ease, transform 0s ease"
    },
    active: {
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      transform: "scale(1.1)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    }
  }
};
var midnight = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(15, 23, 42, 0.55)",
      borderRadius: "8px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(30, 41, 59, 0.72)"
    },
    active: {
      backgroundColor: "rgba(51, 65, 85, 0.88)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(148, 163, 184, 0.55)",
      borderRadius: "8px"
    },
    hover: {
      backgroundColor: "rgba(203, 213, 225, 0.78)",
      transform: "scale(1)",
      transition: "background-color 0s ease, transform 0s ease"
    },
    active: {
      backgroundColor: "rgba(241, 245, 249, 0.96)",
      transform: "scale(1.1)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    }
  }
};
var neonCyan = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(6, 78, 89, 0.35)",
      borderRadius: "4px",
      transition: "background-color 0.25s ease"
    },
    hover: {
      backgroundColor: "rgba(8, 145, 178, 0.48)"
    },
    active: {
      backgroundColor: "rgba(14, 116, 144, 0.68)",
      transition: "background-color 0.12s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(34, 211, 238, 0.58)",
      borderRadius: "3px"
    },
    hover: {
      backgroundColor: "rgba(103, 232, 249, 0.85)",
      transform: "scale(1.02)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    },
    active: {
      backgroundColor: "rgba(207, 250, 254, 1)",
      transform: "scale(1.12)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};
var ocean = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(7, 89, 133, 0.22)",
      borderRadius: "999px",
      transition: "background-color 0.35s ease"
    },
    hover: {
      backgroundColor: "rgba(3, 105, 161, 0.35)"
    },
    active: {
      backgroundColor: "rgba(2, 132, 199, 0.5)",
      transition: "background-color 0.18s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(14, 165, 233, 0.58)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(56, 189, 248, 0.82)",
      transform: "scale(1)",
      transition: "background-color 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(186, 230, 253, 0.98)",
      transform: "scale(1.08)",
      transition: "background-color 0.14s ease, transform 0.14s ease"
    }
  }
};
var deepSea = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(2, 44, 55, 0.62)",
      borderRadius: "999px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(6, 78, 89, 0.78)"
    },
    active: {
      backgroundColor: "rgba(14, 116, 144, 0.9)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(8, 145, 178, 0.62)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(34, 211, 238, 0.82)",
      transform: "scale(1.03)",
      transition: "background-color 0.18s ease, transform 0.18s ease"
    },
    active: {
      backgroundColor: "rgba(165, 243, 252, 0.98)",
      transform: "scale(1.12)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};
var forest = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(20, 83, 45, 0.25)",
      borderRadius: "999px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(21, 128, 61, 0.38)"
    },
    active: {
      backgroundColor: "rgba(22, 163, 74, 0.52)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(34, 197, 94, 0.55)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(74, 222, 128, 0.8)",
      transform: "scale(1)",
      transition: "background-color 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(187, 247, 208, 0.98)",
      transform: "scale(1.1)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    }
  }
};
var moss = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(54, 83, 20, 0.28)",
      borderRadius: "6px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(63, 98, 18, 0.42)"
    },
    active: {
      backgroundColor: "rgba(77, 124, 15, 0.58)",
      transition: "background-color 0.14s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(132, 204, 22, 0.55)",
      borderRadius: "5px"
    },
    hover: {
      backgroundColor: "rgba(163, 230, 53, 0.8)",
      transform: "scale(1.02)",
      transition: "background-color 0.18s ease, transform 0.18s ease"
    },
    active: {
      backgroundColor: "rgba(217, 249, 157, 0.98)",
      transform: "scale(1.1)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};
var lava = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(69, 10, 10, 0.45)",
      borderRadius: "999px",
      transition: "background-color 0.22s ease"
    },
    hover: {
      backgroundColor: "rgba(127, 29, 29, 0.62)"
    },
    active: {
      backgroundColor: "rgba(153, 27, 27, 0.78)",
      transition: "background-color 0.1s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(239, 68, 68, 0.62)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(249, 115, 22, 0.88)",
      transform: "scale(1.03)",
      transition: "background-color 0.16s ease, transform 0.16s ease"
    },
    active: {
      backgroundColor: "rgba(253, 186, 116, 1)",
      transform: "scale(1.14)",
      transition: "background-color 0.1s ease, transform 0.1s ease"
    }
  }
};
var ember = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(67, 20, 7, 0.32)",
      borderRadius: "5px",
      transition: "background-color 0.25s ease"
    },
    hover: {
      backgroundColor: "rgba(124, 45, 18, 0.48)"
    },
    active: {
      backgroundColor: "rgba(154, 52, 18, 0.65)",
      transition: "background-color 0.12s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(234, 88, 12, 0.6)",
      borderRadius: "4px"
    },
    hover: {
      backgroundColor: "rgba(251, 146, 60, 0.86)",
      transform: "scale(1)",
      transition: "background-color 0.18s ease"
    },
    active: {
      backgroundColor: "rgba(254, 215, 170, 0.98)",
      transform: "scale(1.1)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};
var gold = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(113, 63, 18, 0.25)",
      borderRadius: "999px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(161, 98, 7, 0.4)"
    },
    active: {
      backgroundColor: "rgba(202, 138, 4, 0.55)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(234, 179, 8, 0.62)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(250, 204, 21, 0.85)",
      transform: "scale(1.02)",
      transition: "background-color 0.2s ease, transform 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(254, 240, 138, 1)",
      transform: "scale(1.1)",
      transition: "background-color 0.14s ease, transform 0.14s ease"
    }
  }
};
var roseQuartz = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(136, 19, 55, 0.18)",
      borderRadius: "999px",
      transition: "background-color 0.32s ease"
    },
    hover: {
      backgroundColor: "rgba(190, 24, 93, 0.28)"
    },
    active: {
      backgroundColor: "rgba(219, 39, 119, 0.4)",
      transition: "background-color 0.16s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(251, 113, 133, 0.58)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(244, 114, 182, 0.8)",
      transform: "scale(1)",
      transition: "background-color 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(253, 164, 175, 0.98)",
      transform: "scale(1.1)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    }
  }
};
var violet = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(76, 29, 149, 0.3)",
      borderRadius: "999px",
      transition: "background-color 0.28s ease"
    },
    hover: {
      backgroundColor: "rgba(91, 33, 182, 0.45)"
    },
    active: {
      backgroundColor: "rgba(109, 40, 217, 0.62)",
      transition: "background-color 0.14s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(139, 92, 246, 0.62)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(167, 139, 250, 0.86)",
      transform: "scale(1.03)",
      transition: "background-color 0.18s ease, transform 0.18s ease"
    },
    active: {
      backgroundColor: "rgba(221, 214, 254, 1)",
      transform: "scale(1.12)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};
var royal = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(30, 27, 75, 0.48)",
      borderRadius: "999px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(49, 46, 129, 0.65)"
    },
    active: {
      backgroundColor: "rgba(67, 56, 202, 0.82)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(99, 102, 241, 0.65)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(165, 180, 252, 0.86)",
      transform: "scale(1.02)",
      transition: "background-color 0.2s ease, transform 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(224, 231, 255, 1)",
      transform: "scale(1.12)",
      transition: "background-color 0.14s ease, transform 0.14s ease"
    }
  }
};
var arctic = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(186, 230, 253, 0.22)",
      borderRadius: "999px",
      transition: "background-color 0.35s ease"
    },
    hover: {
      backgroundColor: "rgba(125, 211, 252, 0.36)"
    },
    active: {
      backgroundColor: "rgba(56, 189, 248, 0.5)",
      transition: "background-color 0.18s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(224, 242, 254, 0.65)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(240, 249, 255, 0.88)",
      transform: "scale(1)",
      transition: "background-color 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      transform: "scale(1.08)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    }
  }
};
var glass = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderRadius: "999px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.14)"
    },
    active: {
      backgroundColor: "rgba(255, 255, 255, 0.22)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.28)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.46)",
      transform: "scale(1)",
      transition: "background-color 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      transform: "scale(1.08)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    }
  }
};
var graphite = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(17, 24, 39, 0.52)",
      borderRadius: "3px",
      transition: "background-color 0.22s ease"
    },
    hover: {
      backgroundColor: "rgba(31, 41, 55, 0.7)"
    },
    active: {
      backgroundColor: "rgba(55, 65, 81, 0.88)",
      transition: "background-color 0.1s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(107, 114, 128, 0.65)",
      borderRadius: "2px"
    },
    hover: {
      backgroundColor: "rgba(156, 163, 175, 0.82)",
      transform: "scale(1)",
      transition: "background-color 0.15s ease"
    },
    active: {
      backgroundColor: "rgba(229, 231, 235, 0.98)",
      transform: "scale(1.06)",
      transition: "background-color 0.1s ease, transform 0.1s ease"
    }
  }
};
var terminal = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(0, 20, 5, 0.72)",
      borderRadius: "0px",
      transition: "background-color 0.15s linear"
    },
    hover: {
      backgroundColor: "rgba(0, 40, 10, 0.82)"
    },
    active: {
      backgroundColor: "rgba(0, 65, 18, 0.92)",
      transition: "background-color 0.08s linear"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(34, 197, 94, 0.62)",
      borderRadius: "0px"
    },
    hover: {
      backgroundColor: "rgba(74, 222, 128, 0.85)",
      transform: "scale(1)",
      transition: "background-color 0.1s linear"
    },
    active: {
      backgroundColor: "rgba(187, 247, 208, 1)",
      transform: "scale(1.06)",
      transition: "background-color 0.08s linear, transform 0.08s linear"
    }
  }
};
var toxic = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(54, 83, 20, 0.48)",
      borderRadius: "2px",
      transition: "background-color 0.2s ease"
    },
    hover: {
      backgroundColor: "rgba(77, 124, 15, 0.65)"
    },
    active: {
      backgroundColor: "rgba(101, 163, 13, 0.82)",
      transition: "background-color 0.1s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(163, 230, 53, 0.68)",
      borderRadius: "1px"
    },
    hover: {
      backgroundColor: "rgba(190, 242, 100, 0.9)",
      transform: "scale(1.04)",
      transition: "background-color 0.14s ease, transform 0.14s ease"
    },
    active: {
      backgroundColor: "rgba(236, 252, 203, 1)",
      transform: "scale(1.15)",
      transition: "background-color 0.08s ease, transform 0.08s ease"
    }
  }
};
var candy = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(244, 114, 182, 0.18)",
      borderRadius: "999px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(192, 132, 252, 0.28)"
    },
    active: {
      backgroundColor: "rgba(129, 140, 248, 0.42)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(251, 113, 133, 0.62)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(244, 114, 182, 0.84)",
      transform: "scale(1.03)",
      transition: "background-color 0.18s ease, transform 0.18s ease"
    },
    active: {
      backgroundColor: "rgba(224, 231, 255, 1)",
      transform: "scale(1.12)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};
var sand = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(120, 53, 15, 0.16)",
      borderRadius: "999px",
      transition: "background-color 0.32s ease"
    },
    hover: {
      backgroundColor: "rgba(180, 83, 9, 0.25)"
    },
    active: {
      backgroundColor: "rgba(217, 119, 6, 0.38)",
      transition: "background-color 0.16s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(217, 119, 6, 0.52)",
      borderRadius: "999px"
    },
    hover: {
      backgroundColor: "rgba(245, 158, 11, 0.75)",
      transform: "scale(1)",
      transition: "background-color 0.2s ease"
    },
    active: {
      backgroundColor: "rgba(253, 230, 138, 0.98)",
      transform: "scale(1.08)",
      transition: "background-color 0.15s ease, transform 0.15s ease"
    }
  }
};
var monoLight = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.14)"
    },
    active: {
      backgroundColor: "rgba(0, 0, 0, 0.22)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(0, 0, 0, 0.32)",
      borderRadius: "6px"
    },
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.52)",
      transform: "scale(1)",
      transition: "background-color 0.18s ease"
    },
    active: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      transform: "scale(1.08)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};
var monoDark = {
  scrollBar: {
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderRadius: "6px",
      transition: "background-color 0.3s ease"
    },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.14)"
    },
    active: {
      backgroundColor: "rgba(255, 255, 255, 0.22)",
      transition: "background-color 0.15s ease"
    }
  },
  thumb: {
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.32)",
      borderRadius: "6px"
    },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.55)",
      transform: "scale(1)",
      transition: "background-color 0.18s ease"
    },
    active: {
      backgroundColor: "rgba(255, 255, 255, 0.82)",
      transform: "scale(1.08)",
      transition: "background-color 0.12s ease, transform 0.12s ease"
    }
  }
};

// src/themes/preset.ts
var presets = {
  primary,
  midnight,
  neonCyan,
  ocean,
  deepSea,
  forest,
  moss,
  lava,
  ember,
  gold,
  roseQuartz,
  violet,
  royal,
  arctic,
  glass,
  graphite,
  terminal,
  toxic,
  candy,
  sand,
  monoLight,
  monoDark
};

// src/utils/config.ts
var defaultConfig = {
  scrollBar: {
    mode: "both",
    positionMode: "after",
    superimposition: "after",
    boundaryOffset: "4px",
    heightTrack: "98%",
    hideNativeScrollbar: "always"
  },
  thumb: {
    boundaryOffset: "1px 1px",
    heightTrack: "auto"
  },
  nativeOnMobile: true,
  selectTheme: "primary",
  optionsTheme: {}
};

// src/utils/merge.ts
var merge = (config) => {
  const selectedTheme = presets[config.selectTheme ?? defaultConfig.selectTheme];
  return {
    scrollBar: {
      ...defaultConfig.scrollBar,
      ...config.scrollBar
    },
    thumb: {
      ...defaultConfig.thumb,
      ...config.thumb
    },
    optionsTheme: themeMerge(selectedTheme, config.optionsTheme)
  };
};
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

// src/utils/mobile-detect.ts
var shouldUseNativeScrollbar = () => {
  if (typeof window === "undefined") {
    return true;
  }
  const primaryPointerIsCoarse = window.matchMedia("(pointer: coarse)").matches;
  const hasAnyFinePointer = window.matchMedia("(any-pointer: fine)").matches;
  return primaryPointerIsCoarse && !hasAnyFinePointer;
};

// src/utils/variables-css.ts
var variables = (theme) => {
  const styles = {};
  for (const key in theme) {
    const k = key;
    const statusTheme = theme[k];
    if (!statusTheme) continue;
    const type = k === "scrollBar" ? "scrollbar" : "thumb";
    for (const status in statusTheme) {
      const properties = statusTheme[status];
      if (!properties) continue;
      const statusPrefix = status === "inactive" ? "" : `-${status}`;
      for (const prop in properties) {
        const value = properties[prop];
        if (value === void 0) continue;
        styles[`--${type}${statusPrefix}-${prop}`] = value;
      }
    }
  }
  return styles;
};

// src/ScrollToFuture.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ScrollToFuture = ({
  target,
  scrollBar = {},
  thumb = {},
  selectTheme = "primary",
  optionsTheme = {},
  nativeOnMobile = true
}) => {
  const anchorRef = (0, import_react6.useRef)(null);
  const targetRef = (0, import_react6.useRef)(null);
  const overlayRef = (0, import_react6.useRef)(null);
  const mounted = useMounted();
  const [findedTarget, setFindedTarget] = (0, import_react6.useState)(null);
  const config = merge({
    scrollBar,
    thumb,
    selectTheme,
    optionsTheme
  });
  const vars = variables(config.optionsTheme);
  const mode = config.scrollBar.mode ?? "both";
  const positionMode = config.scrollBar.positionMode ?? "after";
  const superimposition = config.scrollBar.superimposition ?? "over";
  const nativeScrollOnMobile = shouldUseNativeScrollbar() && nativeOnMobile;
  const metrics = useElementScrollObserver(findedTarget);
  const wantsY = mode === "vertical" || mode === "both";
  const wantsX = mode === "horizontal" || mode === "both";
  const showY = wantsY && metrics.y.canScroll;
  const showX = wantsX && metrics.x.canScroll;
  const coversAllScrollableAxes = (!metrics.x.canScroll || showX) && (!metrics.y.canScroll || showY);
  const customScrollbarEnabled = mounted && !nativeScrollOnMobile;
  const pageTarget = findedTarget !== null && isPageScrollTarget(findedTarget);
  const portalTarget = !mounted || !findedTarget ? null : pageTarget ? document.body : findedTarget.parentElement;
  const placement = pageTarget ? "fixed" : "local";
  const overlayEnabled = customScrollbarEnabled && findedTarget !== null && portalTarget !== null;
  const trackThickness = parsePxValue(config.scrollBar.widthTrack) ?? DEFAULT_TRACK_THICKNESS;
  const horizontalReservedSpace = showX && superimposition === "after" ? computeReservedSpace(
    config.scrollBar.boundaryOffset,
    trackThickness,
    superimposition
  ) : 0;
  const overlayStyle = {
    "--scroll-to-future-horizontal-space": `${horizontalReservedSpace}px`
  };
  useFuture({
    target,
    anchorRef,
    targetRef,
    setFindedTarget,
    mounted,
    config,
    showY,
    showX,
    superimposition,
    findedTarget,
    positionMode,
    coversAllScrollableAxes,
    nativeOnMobile
  });
  useTargetRect(
    findedTarget,
    portalTarget,
    overlayRef,
    placement,
    overlayEnabled
  );
  const overlay = overlayEnabled && findedTarget ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      ref: overlayRef,
      className: `scroll-to-future__overlay ${pageTarget ? "scroll-to-future__overlay--fixed" : "scroll-to-future__overlay--local"}`,
      style: overlayStyle,
      "data-scroll-to-future-overlay": "",
      children: [
        horizontalReservedSpace > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: "scroll-to-future__horizontal-space",
            "data-position": positionMode
          }
        ),
        showY && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ScrollAxis,
          {
            vars,
            axis: "y",
            target: findedTarget,
            metrics: metrics.y,
            scrollBar: config.scrollBar,
            thumb: config.thumb,
            positionMode,
            superimposition,
            hasCrossAxis: showX
          }
        ),
        showX && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ScrollAxis,
          {
            vars,
            axis: "x",
            target: findedTarget,
            metrics: metrics.x,
            scrollBar: config.scrollBar,
            thumb: config.thumb,
            positionMode,
            superimposition,
            hasCrossAxis: showY
          }
        )
      ]
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    !target && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "span",
      {
        ref: anchorRef,
        "aria-hidden": "true",
        style: {
          display: "none"
        }
      }
    ),
    overlay && portalTarget && (0, import_react_dom.createPortal)(overlay, portalTarget)
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScrollToFuture
});
//# sourceMappingURL=index.js.map