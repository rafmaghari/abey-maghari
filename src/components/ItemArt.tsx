import type { CSSProperties } from "react";

export const inventoryItems = [
  "Flower crown", "Heart sunglasses", "Hair bow", "Sparkle earrings",
  "Tiara", "Butterflies", "Cherry-blossom petals", "Hearts float",
] as const;

export function ItemArt({ item, className, style }: { item: number; className?: string; style?: CSSProperties }) {
  return <svg viewBox="0 0 100 100" className={className} style={style} fill="none" stroke="#302820" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {item === 0 && <><path d="M10 68Q50 22 90 68" stroke="#788558" strokeWidth="7"/>{[25,50,75].map((x,i)=><g key={x} transform={`translate(${x} ${i===1?38:52})`}>{[0,72,144,216,288].map(r=><ellipse key={r} cy="-9" rx="7" ry="11" fill={i===1?"#f1c1b5":"#fff3db"} strokeWidth="1.8" transform={`rotate(${r})`}/>)}<circle r="5" fill="#d4a35f" strokeWidth="1.5"/></g>)}</>}
    {item === 1 && <><path d="M8 41C-4 16 27 15 29 32C34 13 63 22 48 46L28 66Z" fill="#eda3a6"/><path d="M54 41C42 16 73 15 75 32C80 13 109 22 94 46L74 66Z" fill="#eda3a6"/><path d="M49 39h6M7 37 1 29m94 8 4-8"/><path d="m17 33 5-3m41 3 5-3" stroke="#fff8e8"/></>}
    {item === 2 && <><path d="M44 43C25 10 7 18 10 45S23 71 44 55M56 43C75 10 93 18 90 45S77 71 56 55" fill="#d28b91"/><path d="m43 54-12 32 19-8 15 8-9-32" fill="#d28b91"/><rect x="40" y="38" width="20" height="22" rx="6" fill="#efb9b5"/><path d="m23 39 15 8m39-8-15 8"/></>}
    {item === 3 && <><path d="m28 20 5 14 14 5-14 5-5 14-5-14-14-5 14-5Z" fill="#eac786"/><path d="m72 41 5 14 14 5-14 5-5 14-5-14-14-5 14-5Z" fill="#eac786"/><circle cx="28" cy="12" r="4" fill="#eac786"/><circle cx="72" cy="33" r="4" fill="#eac786"/></>}
    {item === 4 && <><path d="m12 72-5-38 22 15L50 15l21 34 22-15-5 38Z" fill="#e4be73"/><path d="M12 72h76v10H12Z" fill="#d7a451"/><path d="m50 35 7 12-7 12-7-12Z" fill="#e5a7b5"/><circle cx="7" cy="30" r="5" fill="#f4dc9e"/><circle cx="50" cy="12" r="5" fill="#f4dc9e"/><circle cx="93" cy="30" r="5" fill="#f4dc9e"/></>}
    {item === 5 && <><path d="M48 49C9 0-3 39 30 52C0 64 23 98 49 60M52 49C91 0 103 39 70 52C100 64 77 98 51 60" fill="#b2b4ce"/><path d="M50 40v27m0-28-8-11m8 11 8-11" strokeWidth="4"/><path d="m25 35 12 10m38-10L63 45" stroke="#f8e9cf"/></>}
    {item === 6 && <>{[[30,30,-20],[67,38,30],[42,74,-15]].map(([x,y,r])=><path key={x} d="M0-15C20-12 24 7 0 17C-24 7-20-12 0-15Z" transform={`translate(${x} ${y}) rotate(${r})`} fill="#eab3ba" strokeWidth="2"/>)}</>}
    {item === 7 && <><path d="M50 79 17 47C-8 17 33 4 50 30C67 4 108 17 83 47Z" fill="#db9a9d"/><path d="m27 32 7-3" stroke="#fff1db" strokeWidth="5"/></>}
    {item === 8 && <><path d="M24 34v-9a26 26 0 0 1 52 0v9" strokeWidth="5"/><path d="M18 30h64l7 59H11Z" fill="#d0b38e"/><path d="M35 45v7m30-7v7"/><path d="M34 64h32v15H34Z" fill="#fcf7ec"/><path d="m47 67 3 8 3-8"/></>}
  </svg>;
}

export function CardArt({ art }: { art: string }) {
  if (art === "heart") return <ItemArt item={7}/>;
  if (art === "flower") return <ItemArt item={0}/>;
  return <svg viewBox="0 0 160 180" fill="none" stroke="#292620" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {art === "record" && <g transform="rotate(-9 80 90)"><rect x="18" y="32" width="124" height="119" rx="9" fill="#f9f0df"/><circle cx="74" cy="91" r="43" fill="#2b2b29"/><circle cx="74" cy="91" r="17" fill="#d3ae88"/><circle cx="74" cy="91" r="3" fill="#fcf6eb"/><path d="M119 54v47l-12 15" strokeWidth="6"/><circle cx="119" cy="51" r="5" fill="#d3ae88"/><path d="M29 161h103"/></g>}
    {art === "book" && <g transform="rotate(7 80 90)"><path d="M12 37q34-10 68 6 34-16 68-6v113q-34-10-68 6-34-16-68-6Z" fill="#fcf5e6"/><path d="M80 43v113M29 61l33 5M29 80l33 5M29 99l33 5m37-38 32-5m-32 24 32-5m-32 24 32-5" strokeWidth="3"/><path d="M113 37v36l9-7 9 7V35" fill="#d69c91"/></g>}
    {art === "camera" && <g transform="rotate(-8 80 90)"><path d="m48 50 9-15h43l10 15" fill="#e4d1ae"/><rect x="14" y="50" width="132" height="95" rx="12" fill="#31352f"/><path d="M14 73h132v45H14" fill="#e9ddc7"/><circle cx="80" cy="96" r="33" fill="#45514b"/><circle cx="80" cy="96" r="21" fill="#92a79d"/><path d="m70 86 8-6" stroke="#eaf0df" strokeWidth="6"/><rect x="112" y="61" width="20" height="10" rx="3" fill="#f2e6cc"/></g>}
  </svg>;
}
