import { Content } from '@/types/content';
import Link from 'next/link';

interface ServicesProps {
  content: Content;
}

export default function Services({ content }: ServicesProps) {
  const title = content?.servicesTitle;
  const description = content?.servicesDescription;
  const services = Array.isArray(content?.services) ? content.services : [];

  return (
    <section id="services" className="section section-light">
      <div className="container">
        <div className="section-title">
          <span className="badge">Our Services</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div className="card" key={idx}>
              <div className="card-inner">
                <div className="card-front">
                  <div className="icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  
                  <p>{service.desc}</p>
                </div>
                
                <div className="card-back">
                  <h3>{service.title}</h3>
                  <p>Click below to discover more details </p>
                  <Link href="/services">
                    <button className="btn-premium mt-4 mynewbutton">Read More</button>
                  </Link>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </section>
  );
}

// import { Content } from '@/types/content';
// import Link from 'next/link';

// // Helper to generate slug from title (must match the one in the page)
// function generateSlug(title: string): string {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// }

// interface ServicesProps {
//   content: Content;
// }

// export default function Services({ content }: ServicesProps) {
//   const title = content?.servicesTitle;
//   const description = content?.servicesDescription;
//   const services = Array.isArray(content?.services) ? content.services : [];

//   return (
//     <section id="services" className="section section-light">
//       <div className="container">
//         <div className="section-title">
//           <span className="badge">Our Services</span>
//           <h2>{title}</h2>
//           <p>{description}</p>
//         </div>
//         <div className="services-grid">
//           {services.map((service, idx) => {
//             const slug = generateSlug(service.title);
//             return (
//               <div className="card" key={idx}>
//                 <div className="card-inner">
//                   <div className="card-front">
//                     <div className="icon">{service.icon}</div>
//                     <h3>{service.title}</h3>
//                     <p>{service.desc}</p>
//                   </div>
//                   <div className="card-back">
//                     <h3>{service.title}</h3>
//                     <p>Click below to discover more details</p>
//                     <Link href={`/services/${slug}`}>
//                       <button className="btn-premium mt-4 mynewbutton">Read More</button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }