const sections = [
  ["About", "about"], ["Highlights", "highlights"], ["Skills", "skills"],
  ["Experience", "experience"], ["Favourites", "favourites"],
] as const;

export default function PageNavigation() {
  return <nav className="page-navigation" aria-label="On this page">
    {sections.map(([label,id])=><a href={`#${id}`} key={id}>{label}</a>)}
  </nav>;
}
