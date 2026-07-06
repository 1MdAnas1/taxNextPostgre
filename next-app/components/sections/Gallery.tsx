
'use client';

import { Content } from '@/types/content';

interface GalleryProps {
  content: Content;
}

export default function Gallery({ content }: GalleryProps) {
  const images = Array.isArray(content?.gallery) ? content.gallery : [];
  const title = content?.galleryTitle;
  const description = content?.galleryDescription;

  const downloadImage = async (url: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      // Call your own API route which proxies the download
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Download failed');

      // Create a blob from the response
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Trigger download
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `gallery-image-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open image in new tab
      window.open(url, '_blank');
    }
  };

  return (
    <section id="gallery" className="section section-light">
      <div className="container">
        <div className="section-title">
          <span className="badge">Gallery</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div className="item" key={idx}>
              <img src={img} alt={`Gallery ${idx + 1}`} />
              <div className="social-overlay">
                {/* Facebook */}
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(img)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-share-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(img)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-share-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Download button */}
                <button
                  className="social-share-btn download-btn"
                  onClick={(e) => downloadImage(img, idx, e)}
                  aria-label="Download image"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// import { Content } from '@/types/content';

// interface GalleryProps {
//   content: Content;
// }

// export default function Gallery({ content }: GalleryProps) {
//   const images = Array.isArray(content?.gallery) ? content.gallery : [];
//   const title = content?.galleryTitle;
//   const description = content?.galleryDescription ;

//   return (
//     <section id="gallery" className="section section-light">
//       <div className="container">
//         <div className="section-title">
//           <span className="badge">Gallery</span>
//           <h2>{title}</h2>
//           <p>{description}</p>
//         </div>
//         <div className="gallery-grid">
//           {images.map((img, idx) => (
//             <div className="item" key={idx}>
//               <img src={img} alt={`Gallery ${idx + 1}`} />
//               <div className="social-overlay">
//     {/* <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(img)}`} target="_blank">📘</a> */}
//     <a
//   href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(img)}`}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="social-share-btn"
// >
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//   </svg>
// </a>

//     {/* <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(img)}`} target="_blank">🐦</a> */}

//     <a
//   href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(img)}`}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="social-share-btn"
// >
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//   </svg>
// </a>
//     <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(img)}`} target="_blank">🔗</a>
//   </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }