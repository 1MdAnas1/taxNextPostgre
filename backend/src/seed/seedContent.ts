import prisma from '../config/prisma';

const defaultContent = {
  heroTitle: 'Smart Tax.',
  heroSubtitle: 'Simple Life.',
  heroDescription: 'Delivering financial clarity and strategic growth with unparalleled expertise in tax, audit, compliance, and advisory solutions.',
  heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920',
  aboutTitle: 'Your Trusted Tax & Financial Partner',
  aboutDescription: 'With years of experience in tax consulting, audit, and compliance, we provide tailored solutions that help businesses navigate complex financial landscapes with confidence.',
  aboutImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  aboutBullets: [
    'Expert tax advisory services',
    'Comprehensive audit & assurance',
    'GST compliance made simple',
  ],
  yearsOfExperience: 11,
  clientsServed: 1500,
  projectsCompleted: 700,
  servicesTitle: 'What We Offer',
  servicesDescription: 'Comprehensive financial solutions designed to help your business thrive.',
  services: [
    { icon: '📊', title: 'Tax Consulting', desc: 'Strategic tax planning and compliance solutions tailored to your business needs.' },
    { icon: '🔍', title: 'Audit & Assurance', desc: 'Comprehensive audit services ensuring transparency and regulatory compliance.' },
    { icon: '📋', title: 'GST Compliance', desc: 'End-to-end GST registration, filing, and advisory services.' },
    { icon: '💼', title: 'Business Advisory', desc: 'Strategic financial advice to drive growth and maximize profitability.' },
  ],
  teamTitle: 'OUR TEAM',
  teamDescription: 'Meet the experts behind your numbers',
  team: [
    { name: 'Rajesh Sharma, FCA', role: 'Managing Partner', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
    { name: 'Priya Verma, ACA', role: 'Tax & Advisory Head', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Aman Khanna, CA', role: 'Audit Partner', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Neha Gupta, CA', role: 'GST & Compliance Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' },
  ],
  galleryTitle: 'Our Work',
  galleryDescription: 'A glimpse into our professional journey and client engagements.',
  gallery: [
    'https://picsum.photos/id/1/400/400',
    'https://picsum.photos/id/6/400/400',
    'https://picsum.photos/id/7/400/400',
    'https://picsum.photos/id/8/400/400',
  ],
  contactTitle: 'Get In Touch',
  contactDescription: "Have questions? We're here to help.",
  contactPhone: '+91 9122456789',
  contactEmail: 'mail@tax.com',
  contactAddress: 'India',
};

export const seedContent = async () => {
  for (const [key, value] of Object.entries(defaultContent)) {
    await prisma.content.upsert({
      where: { sectionKey: key },
      update: { value },
      create: { sectionKey: key, value },
    });
  }
  console.log('✅ Content seeded');
};