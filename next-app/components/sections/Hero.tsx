import { ShieldCheck, TrendingUp } from 'lucide-react';
import { Content } from '@/types/content';
import Link from 'next/link';
// import Typed from 'react-typed';
import { ReactTyped } from 'react-typed';
interface HeroProps {
  content: Content;
}

export default function Hero({ content }: HeroProps) {
  const title = content?.heroTitle;
  const subtitle = content?.heroSubtitle;
  const description = content?.heroDescription;
  const image = content?.heroImage;

  return (
    <section className="hero-premium">
      {/* Animated background shapes */}
      <div className="hero-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="hero-premium-container">
        <div className="hero-premium-content">
          <span className="hero-badge">Trusted Since 2015</span>
          <h1>
            {title}
            <br />
            {/* <span className="highlight">{subtitle}</span> */}
            <ReactTyped
    strings={[subtitle||"Your Trusted Tax Partner"]}
    typeSpeed={60}
    backSpeed={30}
    loop={true}
    className="highlight"
  />
          </h1>
          <p>{description}</p>
          <div className="hero-premium-buttons">
            <Link href="/contact">
              <button className="btn-premium">Get a Quote</button>
            </Link>
            {/* <button className="btn-outline">Learn More</button> */}
          </div>
        </div>
        <div className="hero-premium-image-wrapper">
          <div className="hero-premium-image-container">
            <div className="hero-premium-image-inner">
              <img src={image} alt="Hero" className="hero-premium-image" />
              <div className="hero-premium-overlay"></div>
            </div>
            <div className="hero-float-badge badge-1">
              <div className="badge-icon"><ShieldCheck size={18} /></div>
              <div className="badge-text">
                <div className="badge-title">100% Compliant</div>
                <div className="badge-sub">ICAI Certified</div>
              </div>
            </div>
            <div className="hero-float-badge badge-2">
              <div className="badge-icon"><TrendingUp size={18} /></div>
              <div className="badge-text">
                <div className="badge-title">+38% Avg Savings</div>
                <div className="badge-sub">via Tax Planning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}