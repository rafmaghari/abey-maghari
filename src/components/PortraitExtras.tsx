"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { ItemArt } from "./ItemArt";

export type PortraitMode = "normal" | "cartoon";
export const portraitLandmarks = {
  normal: { face: [335, 160, 350, 500], crown: [470, 55, 200, 100], glasses: [490, 65, 170, 85], bow: [475, 90, 100, 60], earLeft: [300, 555, 28, 60], earRight: [694, 543, 30, 65], tiara: [465, 0, 210, 145] },
  cartoon: { face: [330, 165, 355, 500], crown: [470, 55, 200, 100], glasses: [490, 65, 170, 85], bow: [475, 90, 100, 60], earLeft: [300, 570, 28, 60], earRight: [694, 565, 30, 65], tiara: [465, 0, 210, 145] },
} as const;

type Props = { equipped: boolean[]; mode: PortraitMode };
function FlowerCrown() {
  return <svg viewBox="0 0 440 140" fill="none" stroke="#4f5940" strokeWidth="3"><path d="M12 112Q220-4 428 112" stroke="#738451" strokeWidth="8"/>{[50,135,220,305,390].map((x,i)=><g key={x} transform={`translate(${x} ${[91,65,57,65,91][i]})`}>{[0,72,144,216,288].map(r=><ellipse key={r} cy="-16" rx="11" ry="18" fill={i%2?"#e6afb0":"#fff1d7"} stroke="#7e6950" strokeWidth="2" transform={`rotate(${r})`}/>)}<circle r="9" fill="#e0b66c" stroke="#826845" strokeWidth="2"/></g>)}</svg>;
}
function HairGlasses() {
  return <svg viewBox="0 0 265 100" fill="#e9a4ad" stroke="#684438" strokeWidth="5" strokeLinejoin="round"><path d="M60 87 15 45C-10 13 34-4 60 25 87-4 128 13 105 45Z"/><path d="m205 87-45-42C135 13 179-4 205 25c27-29 68-12 45 20Z"/><path d="M109 37q24-13 47 0M8 29 0 20m258 9 7-9" fill="none"/><path d="m28 25 14-5m132 5 14-5" fill="none" stroke="#ffecd9" strokeWidth="7" strokeLinecap="round"/></svg>;
}
function Placement({ box, children, float = false }: { box: readonly number[]; children: ReactNode; float?: boolean }) {
  const [x,y,w,h] = box;
  const style: CSSProperties = { left: `${x / 10}%`, top: `${y / 13}%`, width: `${w / 10}%`, height: `${h / 13}%` };
  return <div className="accessory-placement" data-face-avoid style={style}><div className={float ? "float-art" : "still-art"} data-float={float || undefined}>{children}</div></div>;
}

export default function PortraitExtras({ equipped, mode }: Props) {
  const reduced = useReducedMotion();
  const landmarks = portraitLandmarks[mode];
  return <div className="portrait-extras" aria-hidden="true">
    <AnimatePresence>
      {equipped.map((enabled, item) => enabled && <motion.div key={item} className="item-layer" data-testid={`item-${item}`} data-equipped="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? .08 : .18 }}>
        {item === 0 && <Placement box={landmarks.crown}><FlowerCrown/></Placement>}
        {item === 1 && <Placement box={landmarks.glasses}><HairGlasses/></Placement>}
        {item === 2 && <Placement box={landmarks.bow}><ItemArt item={2}/></Placement>}
        {item === 3 && <>{[landmarks.earLeft,landmarks.earRight].map((box,i)=><Placement key={i} box={box}><svg viewBox="0 0 40 75" fill="none" stroke="#4a3825" strokeWidth="1.6"><circle cx="20" cy="9" r="4" fill="#ebc887"/><path d="M20 13v13M20 23l5 15 12 6-12 6-5 15-5-15-12-6 12-6Z" fill="#ebc887"/></svg></Placement>)}</>}
        {item === 4 && <Placement box={landmarks.tiara}><ItemArt item={4}/></Placement>}
        {item === 5 && <>{[[115,170,135,135],[208,414,98,98],[30,610,115,115]].map((box,i)=><Placement box={box} key={i} float><ItemArt item={5}/></Placement>)}</>}
        {item === 6 && <>{[[60,220,72,72],[245,310,62,62],[235,560,62,62],[35,840,70,70],[935,430,60,60]].map((box,i)=><Placement box={box} key={i} float><ItemArt item={6}/></Placement>)}</>}
        {item === 7 && <>{[[235,90,83,83],[46,430,95,95],[290,700,65,65],[935,200,65,65]].map((box,i)=><Placement box={box} key={i} float><ItemArt item={7}/></Placement>)}</>}
      </motion.div>)}
    </AnimatePresence>
  </div>;
}
