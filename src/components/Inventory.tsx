"use client";

import { Popover, PopoverButton, PopoverPanel, CloseButton } from "@headlessui/react";
import { ItemArt, inventoryItems } from "./ItemArt";

type Props = { equipped: boolean[]; toggle: (index: number) => void; clear: () => void };
export default function Inventory({ equipped, toggle, clear }: Props) {
  const count = equipped.filter(Boolean).length;
  return <Popover className="inventory">
    <PopoverButton className="bag-button" aria-label="Open inventory">
      <ItemArt item={8}/><span><strong>Open inventory</strong><small>{count ? `${count} equipped` : "A little dress-up?"}</small></span><span className="bag-arrow" aria-hidden="true">↗</span>
    </PopoverButton>
    <PopoverPanel transition focus className="inventory-panel">
      <div className="inventory-heading"><h2>Inventory<span>.</span></h2><CloseButton className="close-button" aria-label="Close inventory">×</CloseButton></div>
      <p className="inventory-help">Tap to equip. Tap again to put away.</p>
      <div className="inventory-grid" role="group" aria-label="Portrait accessories">
        {inventoryItems.map((label,index)=><button key={label} type="button" className={`inventory-slot rarity-${index % 4}`} aria-label={label} aria-pressed={equipped[index]} onClick={()=>toggle(index)} data-autofocus={index===0 || undefined}><ItemArt item={index}/><span>{label}</span><small>{equipped[index] ? "Equipped" : "Equip"}</small></button>)}
      </div>
      <div className="inventory-footer"><span aria-live="polite">{count} / 8 equipped</span><button type="button" onClick={clear} disabled={!count}>Clear items</button></div>
    </PopoverPanel>
  </Popover>;
}
