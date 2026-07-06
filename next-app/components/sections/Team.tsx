import { Content } from '@/types/content';

interface TeamProps {
  content: Content;
}

export default function Team({ content }: TeamProps) {
  const team = Array.isArray(content?.team) ? content.team : [];
  const title = content?.teamTitle;
  const description = content?.teamDescription;

  return (
    <section id="team" className="section section-white">
      <div className="container">
        <div className="section-title">
          <span className="badge">{title}</span>
          <h2>{description}</h2>
        </div>
        <div className="team-grid-full">
          {team.map((member, idx) => (
            <div className="team-card-full" key={idx}>
              <img src={member.img} alt={member.name} className="team-card-image" />
              <div className="team-card-overlay">
                <div className="team-card-content">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}