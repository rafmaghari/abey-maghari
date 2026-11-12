"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { abey } from "@/content/abey";
import PortraitExtras, { portraitLandmarks, type PortraitMode } from "./PortraitExtras";
import Inventory from "./Inventory";

function Wordmark() {
  const letters = [
    ["P",70,286,-7,285],["O",210,310,-17,235],["R",342,261,-10,280],
    ["T",478,244,3,310],["F",606,256,-6,280],["O",744,275,13,255],
    ["L",874,272,7,270],["I",993,261,7,260],["O",1114,242,13,245],
  ] as const;
  return <h1 className="wordmark" aria-label="PORTFOLIO"><svg viewBox="0 0 1200 350" aria-hidden="true" focusable="false">
    {letters.map(([letter,x,y,rotate,size],i)=><text key={i} x={x} y={y} textAnchor="middle" fontSize={size} textLength={letter==="I"?75:132} lengthAdjust="spacingAndGlyphs" transform={`rotate(${rotate} ${x} ${y})`}>{letter}</text>)}
  </svg></h1>;
}

export default function Profile() {
  const [mode,setMode] = useState<PortraitMode>("normal");
  const [equipped,setEquipped] = useState<boolean[]>(Array(8).fill(false));
  const reduced = useReducedMotion();
  const [x,y,w,h] = portraitLandmarks[mode].face;
  return <section className="profile-hero" aria-label="Abey’s portrait playground">
    <Wordmark/>
    <p className="hero-name">{abey.name.split(" ").map(name=><span key={name}>{name}</span>)}</p>
    <div className="portrait-stage" data-testid="portrait-stage" aria-label={`Abey Maghari, ${mode} portrait`}>
      <div className="portrait-canvas">
        {(["normal","cartoon"] as const).map(style=><motion.div key={style} className="portrait-image" data-testid={`portrait-${style}`} data-active={mode===style} aria-hidden={mode!==style} initial={false} animate={{opacity:mode===style?1:0}} transition={{duration:reduced?.08:.2,ease:[.23,1,.32,1]}}><Image src={`/profile/${style}.webp`} alt={style==="normal"?"Abey Maghari smiling in her approved edited photo, wearing a black top":"A flat illustrated likeness of Abey Maghari"} width={1000} height={1300} priority unoptimized sizes="(max-width: 600px) 300px, 520px"/></motion.div>)}
        <div data-testid="face-safe-zone" className="face-safe-zone" aria-hidden="true" style={{left:`${x/10}%`,top:`${y/13}%`,width:`${w/10}%`,height:`${h/13}%`}}/>
        <PortraitExtras equipped={equipped} mode={mode}/>
      </div>
    </div>
    <div className="hero-controls">
      <div className="mode-toggle" role="group" aria-label="Portrait style">{(["normal","cartoon"] as const).map(style=><button key={style} type="button" aria-pressed={mode===style} onClick={()=>setMode(style)}>{mode===style && <motion.span className="toggle-active" layoutId="portrait-mode" transition={{duration:reduced?.08:.2,ease:[.23,1,.32,1]}}/>}<span>{style==="normal"?"Normal":"Cartoon"}</span></button>)}</div>
      <Inventory equipped={equipped} toggle={index=>setEquipped(current=>current.map((value,i)=>i===index?!value:value))} clear={()=>setEquipped(Array(8).fill(false))}/>
    </div>
  </section>;
}
