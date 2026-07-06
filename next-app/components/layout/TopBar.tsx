import { Phone, Mail } from 'lucide-react';
import { Content } from '@/types/content';
  import { useContent } from '@/context/ContentContext';

interface TopBarProps {
  content?: Content;
}

export default function TopBar() {
  const { content } = useContent();

  return (
    <div className="topbar">
      <div className="container">
        <div className="flex items-center gap-4">
          <a
            href={`tel:${content?.contactPhone}`}
            className="flex items-center gap-2"
          >
            <Phone size={14} />
            <span>{content?.contactPhone}</span>
          </a>

          <a
            href={`mailto:${content?.contactEmail}`}
            className="flex items-center gap-2"
          >
            <Mail size={14} />
            <span>{content?.contactEmail}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white/60 text-xs hidden sm:inline">
            Follow us
          </span>

          <div className="social-icons flex gap-1">
            <a href="#" title="LinkedIn">
              in
            </a>
            <a href="#" title="Facebook">
              f
            </a>
            <a href="#" title="Twitter">
              t
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}