import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      {/* Hide header/footer on this page */}
      <style>{`
        .topbar, .navbar, .footer { display: none !important; }
        body { background: #f8fafc; }
      `}</style>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl font-extrabold text-blue-600 tracking-widest">404</h1>
          <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-1 w-24 mx-auto rounded-full my-4"></div>
          <h2 className="text-3xl font-bold text-dark mt-4">Page Not Found</h2>
          <p className="text-gray-500 mt-2">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <br></br>
          <Link
            href="/"
            className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 padding-x-6 display-inline-block"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}