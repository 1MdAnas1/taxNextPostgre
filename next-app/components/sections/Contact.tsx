
'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Content } from '@/types/content';


interface ContactProps {
  content: Content;
}

export default function Contact({ content }: ContactProps) {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section section-white">
      <div className="container">
        <div className="section-title">
          <span className="badge">Contact</span>
          <h2>{content?.contactTitle}</h2>
          <p>{content?.contactDescription}</p>
        </div>
        <div className="contact-grid">
          <div className="info">
            <div className="item">
              <Phone className="icon" size={24} />
              <div>
                <div className="label">Phone</div>
                <div className="value">{content?.contactPhone}</div>
              </div>
            </div>
            <div className="item">
              <Mail className="icon" size={24} />
              <div>
                <div className="label">Email</div>
                <div className="value">{content?.contactEmail}</div>
              </div>
            </div>
            <div className="item">
              <MapPin className="icon" size={24} />
              <div>
                <div className="label">Address</div>
                <div className="value">{content?.contactAddress}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </div>

            <button type="submit" className="btn-premium" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 className="inline animate-spin mr-2" size={18} />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mt-2">
                <CheckCircle size={20} />
                <span>Your message was sent successfully!</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mt-2">
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
















// import { Phone, Mail, MapPin } from 'lucide-react';
// import { Content } from '@/types/content';

// interface ContactProps {
//   content: Content;
// }

// export default function Contact({ content }: ContactProps) {
//   return (
//     <section id="contact" className="section section-white">
//       <div className="container">
//         <div className="section-title">
//           <span className="badge">Contact</span>
//           <h2>{content?.contactTitle || 'Get In Touch'}</h2>
//           <p>{content?.contactDescription || "Have questions? We're here to help."}</p>
//         </div>
//         <div className="contact-grid">
//           <div className="info">
//             <div className="item">
//               <Phone className="icon" size={24} />
//               <div>
//                 <div className="label">Phone</div>
//                 <div className="value">{content?.contactPhone}</div>
//               </div>
//             </div>
//             <div className="item">
//               <Mail className="icon" size={24} />
//               <div>
//                 <div className="label">Email</div>
//                 <div className="value">{content?.contactEmail}</div>
//               </div>
//             </div>
//             <div className="item">
//               <MapPin className="icon" size={24} />
//               <div>
//                 <div className="label">Address</div>
//                 <div className="value">{content?.contactAddress}</div>
//               </div>
//             </div>
//           </div>
//           <form method="POST" action="/api/send-email" className="contact-form">
//             <label htmlFor="name">Name</label>
//             <input type="text" placeholder="John Doe" />

//             <label htmlFor="email">Email</label>
//             <input type="email" placeholder="johndoe@gmail.com" />

//             <label htmlFor="message">Message</label>
//             <textarea rows={4} placeholder="Your Message"></textarea>

//             <button className="btn-premium">Send Message</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }