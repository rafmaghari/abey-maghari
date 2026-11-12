import Profile from "@/components/Profile";
import CareerSections from "@/components/CareerSections";
import PageNavigation from "@/components/PageNavigation";
import { CardArt } from "@/components/ItemArt";
import { abey } from "@/content/abey";

export default function Home() {
  return <main className="page-shell" id="top">
    <PageNavigation/>
    <Profile/>
    <section className="introduction" id="about" aria-labelledby="intro-title">
      <h2 id="intro-title" data-testid="intro" data-source-copy>{abey.intro}</h2>
    </section>
    <CareerSections/>
    <section className="info-grid" data-testid="personal-notes" aria-label="A little more about Abey">
      <div className="details"><h2>{abey.infoTitle}</h2><dl>{abey.details.map(detail=><div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl></div>
      <div className="notes"><h2>{abey.notesTitle}</h2><dl>{abey.notes.map(note=><div key={note.label}><dt>{note.label}</dt><dd>{note.value}</dd></div>)}</dl></div>
    </section>
    <section className="favourites" id="favourites" aria-labelledby="favourites-title">
      <h2 id="favourites-title">{abey.favouritesTitle}</h2>
      <ol className="favourite-grid">{abey.favourites.map((favourite,index)=><li key={favourite.title} data-testid="favourite-card">
        <div className={`favourite-art ${favourite.color}`}><CardArt art={favourite.art}/><span className="card-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span></div>
        <h3>{favourite.title}</h3><p>{favourite.prompt}</p>
      </li>)}</ol>
    </section>
    <footer><p>{abey.footer}</p><a href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>
  </main>;
}
