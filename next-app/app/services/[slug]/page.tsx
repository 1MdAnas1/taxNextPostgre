import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Content } from '@/types/content';
import { 
  ArrowLeft, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Fetch all content from API (server-side)
async function getContent(): Promise<Content> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch content');
  }
  
  const data = await res.json();
  const content: Content = {};
  data.forEach((item: { sectionKey: string; value: any }) => {
    content[item.sectionKey as keyof Content] = item.value;
  });
  return content;
}

// Generate all possible slugs at build time (SSG)
export async function generateStaticParams() {
  const content = await getContent();
  const services = content.services || [];
  return services.map((service) => ({
    slug: generateSlug(service.title),
  }));
}

// Service detail page
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const services = content.services || [];

  // Find the service that matches the slug
  const service = services.find((s) => generateSlug(s.title) === slug);

  if (!service) {
    notFound();
  }

  // Features for this service (dynamic based on service)
  const features = [
    { icon: Users, text: 'Expert Professionals' },
    { icon: Shield, text: '100% Compliant' },
    { icon: Clock, text: 'Timely Delivery' },
    { icon: TrendingUp, text: 'Guaranteed Results' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-300/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group mb-8"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Services</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl md:text-7xl mb-4 bg-white/20 backdrop-blur-sm inline-block p-4 rounded-2xl">
                {service.icon}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-4">
                {service.title}
              </h1>
              <p className="text-xl text-blue-50/90 mt-2 font-light">
                Expert {service.title} Solutions
              </p>
              <p className="text-blue-50/80 mt-4 max-w-lg text-lg leading-relaxed">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact">
                  <button className="group bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    Get a Quote
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white/50 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:border-white">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                    <feature.icon className="w-8 h-8 mx-auto mb-2 text-cyan-300" />
                    <p className="text-sm font-medium text-white/90">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* ====== CONTENT BODY ====== */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-dark">
                Why Choose Our {service.title}?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our {service.title.toLowerCase()} service is designed to help you
                navigate complex financial landscapes with confidence. We provide
                tailored solutions that align with your unique business needs and
                goals.
              </p>

              <h3 className="text-xl font-semibold text-dark mt-8">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={22} className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-dark">Expert Guidance</span>
                    <p className="text-gray-500 text-sm mt-0.5">From certified professionals with years of experience</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={22} className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-dark">Customized Strategies</span>
                    <p className="text-gray-500 text-sm mt-0.5">Tailored specifically for your business situation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={22} className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-dark">Proactive Approach</span>
                    <p className="text-gray-500 text-sm mt-0.5">Identify opportunities before they arise</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={22} className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-dark">Transparent Pricing</span>
                    <p className="text-gray-500 text-sm mt-0.5">Clear communication with no hidden fees</p>
                  </div>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-dark mt-8">How It Works</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {[
                  { step: '01', title: 'Consultation', desc: 'Initial meeting to understand your needs and goals' },
                  { step: '02', title: 'Analysis', desc: 'Detailed review of your financial situation' },
                  { step: '03', title: 'Strategy', desc: 'Development of a customized action plan' },
                  { step: '04', title: 'Implementation', desc: 'Execution with ongoing support and reviews' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
                    <span className="text-3xl font-bold text-blue-600/20 block">{item.step}</span>
                    <h4 className="font-semibold text-dark">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-dark">Ready to get started?</h3>
                  <p className="text-gray-600 mt-1">
                    Contact us today and let's discuss your {service.title.toLowerCase()} needs.
                  </p>
                </div>
                <Link href="/contact">
                  <button className="btn-premium whitespace-nowrap">
                    Schedule a Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="font-bold text-lg text-dark mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <a href="tel:+919177552375" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <Phone size={18} className="text-blue-600" />
                    <span>+91 9177552375</span>
                  </a>
                  <a href="mailto:mail@tax.com" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail size={18} className="text-blue-600" />
                    <span>mail@tax.com</span>
                  </a>
                  <Link href="/contact" className="block mt-4">
                    <button className="w-full border-2 border-blue-600 text-blue-600 px-4 py-2.5 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300">
                      Send Message
                    </button>
                  </Link>
                </div>
              </div>

              {/* Other Services */}
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="font-bold text-lg text-dark mb-4">Other Services</h3>
                <div className="space-y-3">
                  {services
                    .filter((s) => s.title !== service.title)
                    .slice(0, 4)
                    .map((s) => {
                      const slug = generateSlug(s.title);
                      return (
                        <Link
                          key={s.title}
                          href={`/services/${slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-300 group"
                        >
                          <span className="text-2xl">{s.icon}</span>
                          <div>
                            <p className="font-medium text-dark group-hover:text-blue-600 transition-colors">
                              {s.title}
                            </p>
                          </div>
                          <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}