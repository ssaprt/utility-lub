(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,78200,e=>{"use strict";var t=e.i(43476),i=e.i(65734),r=e.i(25375),n=e.i(4704),l=e.i(85648),o=e.i(49696),a=e.i(96499),s=e.i(71645),u=e.i(8472),c=e.i(41783);let d=()=>(0,t.jsx)(c.TransitionDropDown,{title:"EXAMPLE",style:{"--bgPrimaryContainer":"rgb(40, 44, 52)","--bgPrimaryContainerShow":"rgb(40, 44, 52)","--bgTitleBlock":"rgb(40, 44, 52)","--colorTitleBlock":"#fda5d6","--colorTitleBlockShow":"#ba749b","--BoxShadowTitleBlock":"none","--BoxShadowTitleBlockShow":"none","--fillTitleBlockIcon":"#fda5d6","--fillTitleBlockIconShow":"#ba749b"},className:"!rounded-[14px]",children:(0,t.jsx)(u.Documentation,{titleEnd:"App",code:`import { useImagePreview } from "use-image-preview";
import { useRef, useState, type DragEvent } from "react";

export const App = () => {
    const [isDragging, setIsDragging] = useState(false);
    const { file, preview, change, clear, type } = useImagePreview();

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";

        setIsDragging(true);
    };
    
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }    
        setIsDragging(false);
    };

    useEffect(() => {
      if (!file) return;
      // ...send to server or something
    }, [file])

    return (
        <input
            type="file"
            accept="image/*"
            onChange={change}
            className="hidden"
        />
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={change}
        >
            {preview && (
                type === "image" ? 
                   <img
                    src={preview}
                    alt="preview"
                   /> 
                : 
                   <video
                       src={preview}
                       controls
                   />
            )}
            <button
                onClick={clear}
            >
                Clear
            </button>
        </div>
    )
};`})});var m=e.i(57688);let p=()=>{let e=(0,s.useRef)(null),{file:i,preview:r,clear:n,change:l,type:o}=(({onImageSelect:e}={})=>{let t=(()=>{let[e,t]=(0,s.useState)(null),[i,r]=(0,s.useState)(null),[n,l]=(0,s.useState)(null);return{preview:e,setPreview:t,file:i,setFile:r,type:n,setType:l,objectUrlRef:(0,s.useRef)(null)}})(),{change:i,clear:r}=((e,t)=>{let{setPreview:i,setFile:r,setType:n,objectUrlRef:l}=e,o=(0,s.useCallback)(()=>{l.current&&(URL.revokeObjectURL(l.current),l.current=null),i(null),r(null),n(null),t?.(null)},[l,t,r,i,n]);return{change:(0,s.useCallback)(e=>{var a;let s=null;if(null===e)return void o();if("u">typeof File&&e instanceof File)s=e;else if(null!==e&&"object"==typeof e&&"dataTransfer"in e){if(e.preventDefault(),"drop"!==e.type)return;s=e.dataTransfer.files.item(0)}else null!==e&&"object"==typeof e&&"currentTarget"in e&&"u">typeof HTMLInputElement&&e.currentTarget instanceof HTMLInputElement&&(s=e.currentTarget.files?.item(0)??null);if(!s)return;let u=(a=s).type.startsWith("image/")?"image":a.type.startsWith("video/")?"video":null;if(!u)return;l.current&&URL.revokeObjectURL(l.current);let c=URL.createObjectURL(s);l.current=c,i(c),r(s),n(u),t?.(s)},[o,l,t,r,i,n]),clear:o}})(t,e);return{preview:t.preview,file:t.file,type:t.type,change:i,clear:r}})(),[a,u]=(0,s.useState)(!1);return(0,t.jsxs)("div",{className:"flex w-full flex-col gap-2",children:[(0,t.jsx)("input",{ref:e,type:"file",accept:"image/*, video/*",onChange:l,className:"hidden"}),(0,t.jsx)("div",{role:"button",tabIndex:0,onClick:()=>e.current?.click(),onKeyDown:t=>{("Enter"===t.key||" "===t.key)&&(t.preventDefault(),e.current?.click())},onDragEnter:e=>{e.preventDefault(),u(!0)},onDragOver:e=>{e.preventDefault(),e.dataTransfer.dropEffect="copy",u(!0)},onDragLeave:e=>{e.currentTarget.contains(e.relatedTarget)||u(!1)},onDrop:l,className:`
                    relative
                    flex
                    min-h-56
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    border-2
                    border-dashed
                    transition-colors

                    ${a?"border-pink-300 bg-pink-300/15":"border-pink-300/40 bg-pink-300/5"}
                `,children:r?"image"==o?(0,t.jsx)(m.default,{fill:!0,unoptimized:!0,src:r,alt:"Предпросмотр загруженного изображения",className:"   h-full   max-h-80   w-full   object-contain   "}):(0,t.jsx)("video",{src:r,controls:!0,className:"h-full max-h-80 w-full object-contain"}):(0,t.jsxs)("div",{className:"flex flex-col items-center gap-2 p-6 text-center",children:[(0,t.jsx)("span",{className:"text-sm",children:"Drag and drop your image/video"}),(0,t.jsx)("span",{className:"text-xs opacity-60",children:"or click to upload"})]})}),i&&(0,t.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,t.jsx)("span",{className:"min-w-0 truncate text-sm",children:i.name}),(0,t.jsx)("button",{type:"button",onClick:n,className:"   shrink-0   rounded-md   bg-pink-300/15   px-3   py-1   text-sm    cursor-pointer   hover:bg-pink-300/30   ",children:"Удалить"})]})]})};e.s(["UseImagePreview",0,()=>{let{header:e}=(0,a.useAppContextActions)(),{setIconHeader:u,setTitleHeader:c}=e||{};return(0,s.useEffect)(()=>{u((0,t.jsx)(l.TablerIcon,{name:"scan-eye"})),c("use Image Preview")},[u,c]),(0,t.jsxs)("div",{className:"flex flex-col gap-4 ",children:[(0,t.jsx)(o.TitlePost,{icon:"scan-eye",description:"Media file preview for React and Next.js. This hook allows for quick use of any type of media (photos/videos), as well as previews and quick clearing",date:"07/26/2026",children:"use Image Preview"}),(0,t.jsx)(n.Version,{recordings:[{version:"1.0.0",date:"07/08/2026",title:"Publish",description:"Created component"},{version:"1.0.1",date:"07/14/2026",title:"Restructuring",description:"reduction in the amount of code"},{version:"1.0.2",date:"07/26/2026",title:"Fixed bugs",description:"Fixed DragEvent error"},{version:"1.0.3",date:"07/26/2026",title:"Added type",description:'added return type "image" | "video" | null'}].reverse()}),(0,t.jsx)(r.Install,{packageName:"use-image-preview"}),(0,t.jsx)(i.HowUse,{children:(0,t.jsx)(d,{})}),(0,t.jsx)(p,{})]})}],78200)},3192,e=>{e.v({horizontal:"ScrollBar-module-scss-module__c9ozLW__horizontal",scrollBar:"ScrollBar-module-scss-module__c9ozLW__scrollBar",withoutBottomPadding:"ScrollBar-module-scss-module__c9ozLW__withoutBottomPadding",withoutRightPadding:"ScrollBar-module-scss-module__c9ozLW__withoutRightPadding"})},76836,e=>{"use strict";var t=e.i(43476),i=e.i(65734),r=e.i(25375),n=e.i(4704),l=e.i(85648),o=e.i(49696),a=e.i(96499),s=e.i(71645),u=e.i(8472),c=e.i(41783);let d=()=>(0,t.jsx)(c.TransitionDropDown,{title:"EXAMPLE",style:{"--bgPrimaryContainer":"rgb(40, 44, 52)","--bgPrimaryContainerShow":"rgb(40, 44, 52)","--bgTitleBlock":"rgb(40, 44, 52)","--colorTitleBlock":"#fda5d6","--colorTitleBlockShow":"#ba749b","--BoxShadowTitleBlock":"none","--BoxShadowTitleBlockShow":"none","--fillTitleBlockIcon":"#fda5d6","--fillTitleBlockIconShow":"#ba749b"},className:"!rounded-[14px]",children:(0,t.jsx)(u.Documentation,{titleEnd:"App",code:`import { ScrollToFuture } from "scroll-to-future";
import "scroll-to-future/style.css";

export const App = () => {
    return (
        <div {/* scroll block **/}>
            <ScrollToFuture />
        </div>
    )
};`})}),m=()=>(0,t.jsx)(c.TransitionDropDown,{title:"MIX THEME",style:{"--bgPrimaryContainer":"rgb(40, 44, 52)","--bgPrimaryContainerShow":"rgb(40, 44, 52)","--bgTitleBlock":"rgb(40, 44, 52)","--colorTitleBlock":"#fda5d6","--colorTitleBlockShow":"#ba749b","--BoxShadowTitleBlock":"none","--BoxShadowTitleBlockShow":"none","--fillTitleBlockIcon":"#fda5d6","--fillTitleBlockIconShow":"#ba749b"},className:"!rounded-[14px]",children:(0,t.jsx)(u.Documentation,{titleEnd:"App",code:`<ScrollToFuture
    selectTheme="primary"
    optionsTheme={{
        scrollBar: {
            inactive: {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "999px",
            },

            hover: {
                backgroundColor: "rgba(255, 255, 255, 0.16)",
            },

            active: {
                backgroundColor: "rgba(255, 255, 255, 0.24)",
            },
        },

        thumb: {
            inactive: {
                backgroundColor: "#8b5cf6",
                borderRadius: "999px",
            },

            hover: {
                backgroundColor: "#a78bfa",
                transform: "scale(1.05)",
            },

            active: {
                backgroundColor: "#ddd6fe",
                transform: "scale(1.12)",
            },
        },
    }}
/>`})}),p=({value:e,onChange:i,min:r,max:n,step:l})=>(0,t.jsx)("input",{className:"   block   h-5   w-full   cursor-pointer   appearance-none   bg-transparent      [&::-webkit-slider-runnable-track]:h-2   [&::-webkit-slider-runnable-track]:rounded-full   [&::-webkit-slider-runnable-track]:bg-foreground/15      [&::-webkit-slider-thumb]:-mt-1.5   [&::-webkit-slider-thumb]:size-5   [&::-webkit-slider-thumb]:appearance-none   [&::-webkit-slider-thumb]:rounded-full   [&::-webkit-slider-thumb]:bg-foreground   [&::-webkit-slider-thumb]:shadow-md   [&::-webkit-slider-thumb]:transition-transform   [&::-webkit-slider-thumb]:duration-150      hover:[&::-webkit-slider-thumb]:scale-110   active:[&::-webkit-slider-thumb]:scale-95      focus-visible:outline-none   focus-visible:[&::-webkit-slider-thumb]:ring-2   focus-visible:[&::-webkit-slider-thumb]:ring-foreground/30   focus-visible:[&::-webkit-slider-thumb]:ring-offset-2      [&::-moz-range-track]:h-2   [&::-moz-range-track]:rounded-full   [&::-moz-range-track]:bg-foreground/15      [&::-moz-range-progress]:h-2   [&::-moz-range-progress]:rounded-full   [&::-moz-range-progress]:bg-foreground      [&::-moz-range-thumb]:size-5   [&::-moz-range-thumb]:rounded-full   [&::-moz-range-thumb]:border-0   [&::-moz-range-thumb]:bg-foreground   [&::-moz-range-thumb]:shadow-md",type:"range",min:r||0,max:n||100,step:l||1,onChange:e=>i(Number(e.target.value)),value:e||0});var g=e.i(46932);let f="    ",h=(e,t=0)=>{if(null===e)return"null";if("string"==typeof e)return JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return String(e);if(Array.isArray(e)){let i=e.map(e=>h(e,t+1)).filter(e=>null!==e);if(0===i.length)return"[]";let r=f.repeat(t+1),n=f.repeat(t);return`[
${i.map(e=>`${r}${e},`).join("\n")}
${n}]`}if("object"==typeof e&&null!==e){if("current"in e)return null;let i=Object.entries(e).map(([e,i])=>{let r=h(i,t+1);return null===r?null:{key:e,value:r}}).filter(e=>null!==e);if(0===i.length)return"{}";let r=f.repeat(t+1),n=f.repeat(t);return`{
${i.map(({key:e,value:t})=>`${r}${e}: ${t},`).join("\n")}
${n}}`}return null},b=e=>{let i=Object.entries(e).filter(([e])=>"target"!==e).map(([e,t])=>{let i=h(t,3);return null===i?null:"string"==typeof t?`${f.repeat(3)}${e}=${i}`:`${f.repeat(3)}${e}={${i}}`}).filter(e=>null!==e).join("\n"),r=`import { ScrollToFuture } from "scroll-to-future";
import "scroll-to-future/style.css";

export const App = () => {
    return (
        <div className="scroll-block">
            <ScrollToFuture
${i}
            />

            {/* Scrollable content */}
        </div>
    );
};`;return(0,t.jsx)(c.TransitionDropDown,{title:"CODE OUTPUT",style:{"--bgPrimaryContainer":"rgb(40, 44, 52)","--bgPrimaryContainerShow":"rgb(40, 44, 52)","--bgTitleBlock":"rgb(40, 44, 52)","--colorTitleBlock":"#fda5d6","--colorTitleBlockShow":"#ba749b","--BoxShadowTitleBlock":"none","--BoxShadowTitleBlockShow":"none","--fillTitleBlockIcon":"#fda5d6","--fillTitleBlockIconShow":"#ba749b"},className:"!rounded-[14px]",children:(0,t.jsx)(u.Documentation,{titleEnd:"App",code:r})})};var v=e.i(11399),x=e.i(3192);Array.from({length:30},(e,t)=>{let i,r={"--pink-opacity":Number((.2+.8*(i=Math.imul((i=Math.imul((i=0|t+1)^i>>>16,0x21f0aaad))^i>>>15,0x735a2d97),((i^=i>>>15)>>>0)/0x100000000)).toFixed(2))};return{id:t,style:r}});let w=({scrollBar:e,thumb:i,selectTheme:r})=>{let n=(0,s.useRef)(null),l=e?.mode??"both",o=e?.superimposition??"after",a="horizontal"===l||"both"===l,u="vertical"===l||"both"===l,c="after"===o&&u,d="after"===o&&a,m=[x.default.scrollBar,c?x.default.withoutRightPadding:"",d?x.default.withoutBottomPadding:""].filter(Boolean).join(" ");return(0,s.useEffect)(()=>{let e=n.current;if(!e)return;let t=requestAnimationFrame(()=>{e.scrollTo({top:e.scrollHeight,left:e.scrollWidth,behavior:"auto"})});return()=>{cancelAnimationFrame(t)}},[l,o,e?.positionMode,e?.heightTrack,e?.widthTrack]),(0,t.jsxs)("div",{ref:n,className:m,children:[(0,t.jsx)(v.ScrollToFuture,{target:n,selectTheme:r,scrollBar:e,thumb:i}),(0,t.jsx)("div",{className:[x.default.blocks,a?x.default.horizontal:""].filter(Boolean).join(" "),children:(0,t.jsx)("span",{className:"text-sm",children:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc."})})]})},k=["primary","midnight","neonCyan","ocean","deepSea","forest","moss","lava","ember","gold","roseQuartz","violet","royal","arctic","glass","graphite","terminal","toxic","candy","sand","monoLight","monoDark"],j=["over","after"],y=["horizontal","vertical","both"],T=`
    cursor-pointer
    rounded-[4px]
    border-2
    border-pink-300/30
    bg-pink-300/10
    p-[var(--space-1)]
    text-xs
    transition-colors
    duration-100
    ease-in-out
    hover:bg-pink-300/30
`,S=()=>{let[e,i]=(0,s.useState)("violet"),[r,n]=(0,s.useState)(90),[l,o]=(0,s.useState)("after"),[a,u]=(0,s.useState)("vertical"),[c,d]=(0,s.useState)(4),[m,f]=(0,s.useState)(8),h={selectTheme:e,scrollBar:{widthTrack:`${m}px`,positionMode:"after",superimposition:l,mode:a,heightTrack:`${r}%`,boundaryOffset:`${c}px`}};return(0,t.jsxs)("div",{className:"   flex   w-full   min-w-0   flex-col   items-stretch   gap-4   ",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)("span",{children:"Superimposition"}),(0,t.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:j.map(e=>(0,t.jsx)(g.motion.button,{type:"button",className:`
                                ${T}
                                ${e===l?"bg-pink-300/30":""}
                            `,onClick:()=>{o(e)},initial:!1,animate:{scale:e===l?1.1:1},transition:{type:"spring",stiffness:700,damping:12},children:e},e))})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)("span",{children:"Mode"}),(0,t.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:y.map(e=>(0,t.jsx)(g.motion.button,{type:"button",className:`
                                ${T}
                                ${e===a?"bg-pink-300/30":""}
                            `,onClick:()=>{u(e)},initial:!1,animate:{scale:e===a?1.1:1},transition:{type:"spring",stiffness:700,damping:12},children:e},e))})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("span",{children:["Height ScrollBar: ",r,"%"]}),(0,t.jsx)(p,{value:r,onChange:n,min:0,max:100})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("span",{children:["Boundary Offset: ",c,"px"]}),(0,t.jsx)(p,{value:c,onChange:d,min:1,max:100})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("span",{children:["Width Track: ",m,"px"]}),(0,t.jsx)(p,{value:m,onChange:f,min:1,max:100})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)("span",{children:"Select Theme"}),(0,t.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:k.map(r=>(0,t.jsx)(g.motion.button,{type:"button",className:`
                                ${T}
                                ${r===e?"bg-pink-300/30":""}
                            `,onClick:()=>{i(r)},initial:!1,animate:{scale:r===e?1.1:1},transition:{type:"spring",stiffness:700,damping:12},children:r},r))})]}),(0,t.jsx)(w,{...h}),(0,t.jsx)(b,{...h})]})};e.s(["ScrollToFuture",0,()=>{let{header:e}=(0,a.useAppContextActions)(),{setIconHeader:u,setTitleHeader:c}=e||{};return(0,s.useEffect)(()=>{u((0,t.jsx)(l.TablerIcon,{className:"w-8 h-8 text-[rgba(251,132,255,1)]",name:"ufo"})),c("scroll-to-future")},[u,c]),(0,t.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,t.jsx)(o.TitlePost,{icon:"ufo",description:"Scrollbar supporting both X and Y axes. Position settings for the start and end of the block. Custom positioning options (above or after the element). 20+ built-in themes",date:"07/26/2026",children:"scroll-to-future"}),(0,t.jsx)(n.Version,{recordings:[{version:"1.0.0",date:"07/19/2026",title:"Publish",description:"Created component"},{version:"1.0.1",date:"07/19/2026",title:"Fixed bugs",description:"Fixed positioning for mode 'after'"},{version:"1.0.2",date:"07/19/2026",title:"Fixed bugs",description:"Fixed behavior when both axes are used simultaneously"},{version:"1.0.3",date:"07/19/2026",title:"Fixed bugs",description:"Joint behavior has been fixed when using both axes"},{version:"1.0.4",date:"07/20/2026",title:"Fixed bugs",description:"Fixed the thumb position; addressed cases where the thumb did not correctly reach the end of the scroll area"},{version:"1.0.5",date:"07/20/2026",title:"Fixed bugs",description:"Removed functions that are no longer used"},{version:"1.0.6",date:"07/21/2026",title:"Fixed bugs",description:"Fixed tracking of parent changes for the element to which the scrollbar overlay is attached"},{version:"1.0.7",date:"07/21/2026",title:"Fixed bugs",description:"Removed types that are no longer used"},{version:"1.0.8",date:"07/21/2026",title:"Fixed bugs",description:"Removed methods that are no longer used"},{version:"1.0.9",date:"07/25/2026",title:"Fixed bugs",description:"Fixed scrollbar behavior: the scrollbar now correctly hides when used in windows that extend beyond the viewport"},{version:"1.0.10",date:"07/26/2026",title:"Fixed bugs",description:"Fixed positioning for mode 'after': the scrollbar now correctly appears after the element"},{version:"1.0.11",date:"07/26/2026",title:"Fixed bugs",description:"Fixed positioning on viewport resize: the scrollbar now correctly appears when the viewport is resized"},{version:"1.0.12",date:"07/26/2026",title:"Fixed bugs",description:"Fixed animations: the scrollbar now correctly appears when the viewport is resized"}].reverse()}),(0,t.jsx)(r.Install,{packageName:"scroll-to-future"}),(0,t.jsxs)(i.HowUse,{children:[(0,t.jsx)(d,{}),(0,t.jsx)(m,{})]}),(0,t.jsx)(S,{})]})}],76836)}]);