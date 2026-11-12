"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { ItemArt } from "./ItemArt";

export type PortraitMode = "normal" | "cartoon";
export const portraitLandmarks = {
  normal: { face: [430, 220, 440, 650], crown: [420, 58, 440, 140], glasses: [530, 102, 265, 100], bow: [310, 194, 110, 105], earLeft: [386, 720, 35, 70], earRight: [882, 700, 32, 75], tiara: [530, 2, 270, 170] },
  cartoon: { face: [412, 220, 440, 650], crown: [405, 52, 440, 140], glasses: [510, 103, 265, 100], bow: [290, 193, 112, 105], earLeft: [369, 684, 35, 70], earRight: [864, 628, 32, 75], tiara: [510, 0, 270, 170] },
} as const;

type Props = { equipped: boolean[]; mode: PortraitMode };
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
        {item === 0 && <Placement box={landmarks.crown}><ItemArt item={0}/></Placement>}
        {item === 1 && <Placement box={landmarks.glasses}><ItemArt item={1}/></Placement>}
        {item === 2 && <Placement box={landmarks.bow}><ItemArt item={2}/></Placement>}
        {item === 3 && <>{[landmarks.earLeft,landmarks.earRight].map((box,i)=><Placement key={i} box={box}><svg viewBox="0 0 40 75" fill="none" stroke="#4a3825" strokeWidth="1.6"><circle cx="20" cy="9" r="4" fill="#ebc887"/><path d="M20 13v13M20 23l5 15 12 6-12 6-5 15-5-15-12-6 12-6Z" fill="#ebc887"/></svg></Placement>)}</>}
        {item === 4 && <Placement box={landmarks.tiara}><ItemArt item={4}/></Placement>}
        {item === 5 && <>{[[115,170,135,135],[208,414,98,98],[30,610,115,115]].map((box,i)=><Placement box={box} key={i} float><ItemArt item={5}/></Placement>)}</>}
        {item === 6 && <>{[[60,220,72,72],[245,310,62,62],[325,560,62,62],[35,840,70,70],[935,430,60,60]].map((box,i)=><Placement box={box} key={i} float><ItemArt item={6}/></Placement>)}</>}
        {item === 7 && <>{[[235,90,83,83],[46,430,95,95],[290,700,65,65],[935,200,65,65]].map((box,i)=><Placement box={box} key={i} float><ItemArt item={7}/></Placement>)}</>}
      </motion.div>)}
    </AnimatePresence>
  </div>;
}
