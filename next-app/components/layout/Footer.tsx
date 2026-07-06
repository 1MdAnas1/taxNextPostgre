'use client';
import { Content } from '@/types/content';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import Link from 'next/link';

// interface FooterProps {
//   content?: Content;
// }

export default function Footer() {
  const { content } = useContent();

  return (
    <footer className="footer">
      <div className="container">
        <div className="brand">
          <div className="logo-icon">MTS</div>
          <div className="logo-text">
            <span className="brand text-white">MyTaxSite</span>
            <span className="tagline text-white/60">Accounting Solutions  </span>
          </div>
          <p>
            Delivering financial clarity and strategic growth with unparalleled expertise, empowering businesses with reliable tax, audit, compliance, and advisory solutions that drive sustainable success and long-term value.
          </p>
          <div className="social">
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Twitter">t</a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
              </li>
            <li>
              <Link href="/services">Services</Link>
              </li>
            <li>
              <Link href="/team">Our Team</Link>
              </li>
            <li>
              <Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            <li>
              {/* <a href="/services">Tax Consulting</a> */}
              <Link href="/services">Tax Consulting</Link>
              </li>
            <li>

              <Link href="/services">Audit & Assurance</Link>
            </li>
            <li><Link href="/services">GST Compliance</Link></li>
            <li><Link href="/services">Advisory</Link></li>
          </ul>
        </div>

        <div>
          <h4>Get In Touch</h4>
          <ul>
            <li>
               <a
            href={`tel:${content?.contactPhone}`}
            className="flex items-center gap-2"
          >
            <Phone size={14} />
            <span>{content?.contactPhone}</span>
          </a>
              </li>
            
            
            <li>
              {/* <Mail size={14} className="inline mr-2" /> {content?.contactEmail} */}
              <a
            href={`mailto:${content?.contactEmail}`}
            className="flex items-center gap-2"
          >
            <Mail size={14} />
            <span>{content?.contactEmail}</span>
          </a>
            </li>

            <li className="cursor-pointer">
              <a> 
              <MapPin size={14} className="inline mr-2" /> {content?.contactAddress}
              </a>
            </li>
          </ul>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} Tally My Tax. All rights reserved.
        </div>
      </div>
    </footer>
  );
}