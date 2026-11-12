import { career } from "@/content/abey";

function DisclosureMark() {
  return <svg className="disclosure-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>;
}

export default function CareerSections() {
  return <div data-testid="professional-content">
    <section className="career-section highlights-section" id="highlights" aria-labelledby="highlights-title">
      <h2 className="section-title" id="highlights-title">Highlights</h2>
      <ul className="highlights-strip">{career.highlights.map(highlight=><li key={highlight} data-testid="highlight" data-source-copy>{highlight}</li>)}</ul>
    </section>
    <section className="career-section specialties-section" id="skills" aria-labelledby="skills-title">
      <h2 className="section-title" id="skills-title">Specialties</h2>
      <ul className="specialties-list">{career.specialties.map(specialty=><li key={specialty} data-testid="specialty" data-source-copy>{specialty}</li>)}</ul>
    </section>
    <section className="career-section experience-section" id="experience" aria-labelledby="experience-title">
      <h2 className="section-title" id="experience-title">Experience</h2>
      <ol className="experience-timeline">{career.entries.map((entry,index)=><li key={entry.company}>
        <details name="career" className="career-entry" data-testid="career-entry">
          <summary>
            <span className="timeline-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
            <span className="timeline-copy">
              <span className="employer" data-testid="employer" data-source-copy>{entry.company}</span>
              <span className="employment-context" data-testid="employment-context" data-source-copy>{entry.context}</span>
              {entry.titles.map(title=><span className="position-title" key={title} data-source-copy>{title}</span>)}
            </span>
            <span className="disclosure-control"><DisclosureMark/><span className="disclosure-label">Details</span></span>
          </summary>
          <div className="career-details">
            <ul>{entry.details.map(detail=><li key={detail} data-source-copy>{detail}</li>)}</ul>
            {entry.namedSkills && <p className="named-skills" data-source-copy>{entry.namedSkills}</p>}
          </div>
        </details>
      </li>)}</ol>
      <details className="source-notes" data-testid="source-notes">
        <summary>Source notes <DisclosureMark/></summary>
        <div>{career.notes.map(note=><p key={note} data-source-copy>{note}</p>)}</div>
      </details>
    </section>
  </div>;
}
