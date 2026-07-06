'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import { Content } from '@/types/content';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState<Content>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    try {
      const res = await api.get('/content');
      const data: Content = {};
      res.data.forEach((item: { sectionKey: string; value: any }) => {
        data[item.sectionKey as keyof Content] = item.value;
      });
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const saveSection = async (fields: Record<string, any>) => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(fields)) {
        await api.put(`/content/${key}`, { value });
        setContent(prev => ({ ...prev, [key]: value }));
      }
      alert('✅ Section saved successfully!');
    } catch (error) {
      alert('❌ Error saving section');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const safeArray = (key: keyof Content) => (Array.isArray(content[key]) ? content[key] : []) as any[];

  if (loading) return <div className="loader"><div className="spinner"></div></div>;

  return (
    <div className="admin-dashboard">
      <div className="container max-w-6xl">
        <div className="header">
          <h1>Admin Dashboard</h1>
          <span>Welcome, {user?.name}</span>
        </div>
        {saving && <div className="saving-indicator">Saving...</div>}

        {/* Hero */}
        <div className="editor-section">
          <h2>Hero Section</h2>
          <div className="field">
            <label>Hero Title</label>
            <input type="text" value={content.heroTitle || ''} onChange={(e) => setContent({ ...content, heroTitle: e.target.value })} />
          </div>
          <div className="field">
            <label>Hero Subtitle</label>
            <input type="text" value={content.heroSubtitle || ''} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })} />
          </div>
          <div className="field">
            <label>Hero Description</label>
            <textarea rows={3} value={content.heroDescription || ''} onChange={(e) => setContent({ ...content, heroDescription: e.target.value })} />
          </div>
          <div className="field">
            <label>Hero Image URL</label>
            <input type="text" value={content.heroImage || ''} onChange={(e) => setContent({ ...content, heroImage: e.target.value })} />
          </div>
          <button className="btn-premium btn-save" onClick={() => saveSection({
            heroTitle: content.heroTitle,
            heroSubtitle: content.heroSubtitle,
            heroDescription: content.heroDescription,
            heroImage: content.heroImage,
          })}>Save Hero</button>
        </div>

        {/* About */}
        <div className="editor-section">
          <h2>About Section</h2>
          <div className="field">
            <label>About Title</label>
            <input type="text" value={content.aboutTitle || ''} onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })} />
          </div>
          <div className="field">
            <label>About Description</label>
            <textarea rows={3} value={content.aboutDescription || ''} onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })} />
          </div>
          <div className="field">
            <label>About Image URL</label>
            <input type="text" value={content.aboutImage || ''} onChange={(e) => setContent({ ...content, aboutImage: e.target.value })} />
            {content.aboutImage && (
              <div className="mt-2">
                <img src={content.aboutImage} alt="About preview" className="w-[120px] h-auto rounded-lg border-2 border-gray-200" onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=No+Image'} />
              </div>
            )}
          </div>
          <div className="bullet-editor">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bullet Points</label>
            {safeArray('aboutBullets').map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-3 mb-2">
                <input value={bullet} onChange={(e) => {
                  const newBullets = [...safeArray('aboutBullets')];
                  newBullets[idx] = e.target.value;
                  setContent({ ...content, aboutBullets: newBullets });
                }} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg" />
                <button className="text-red-500 text-xl" onClick={() => {
                  const newBullets = safeArray('aboutBullets').filter((_, i) => i !== idx);
                  setContent({ ...content, aboutBullets: newBullets });
                }}>✕</button>
              </div>
            ))}
            <button className="text-blue-600 font-medium text-sm" onClick={() => {
              const newBullets = [...safeArray('aboutBullets'), ''];
              setContent({ ...content, aboutBullets: newBullets });
            }}>+ Add Bullet Point</button>
          </div>
          <div className="field"><label>Years of Experience</label><input type="number" value={content.yearsOfExperience || ''} onChange={(e) => setContent({ ...content, yearsOfExperience: parseInt(e.target.value) })} /></div>
          <div className="field"><label>Clients Served</label><input type="number" value={content.clientsServed || ''} onChange={(e) => setContent({ ...content, clientsServed: parseInt(e.target.value) })} /></div>
          <div className="field"><label>Projects Completed</label><input type="number" value={content.projectsCompleted || ''} onChange={(e) => setContent({ ...content, projectsCompleted: parseInt(e.target.value) })} /></div>
          <button className="btn-premium btn-save" onClick={() => saveSection({
            aboutTitle: content.aboutTitle,
            aboutDescription: content.aboutDescription,
            aboutImage: content.aboutImage,
            aboutBullets: content.aboutBullets,
            yearsOfExperience: content.yearsOfExperience,
            clientsServed: content.clientsServed,
            projectsCompleted: content.projectsCompleted,
          })}>Save About</button>
        </div>

        {/* Services */}
        <div className="editor-section">
          <h2>Services Section</h2>
          <div className="field"><label>Services Title</label><input type="text" value={content.servicesTitle || ''} onChange={(e) => setContent({ ...content, servicesTitle: e.target.value })} /></div>
          <div className="field"><label>Services Description</label><textarea rows={3} value={content.servicesDescription || ''} onChange={(e) => setContent({ ...content, servicesDescription: e.target.value })} /></div>
          <div className="service-editor">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Cards</label>
            {safeArray('services').map((service, idx) => (
              <div key={idx} className="flex flex-wrap gap-3 p-3 border border-gray-100 rounded-lg mb-3">
                <input value={service.icon || ''} onChange={(e) => {
                  const newServices = [...safeArray('services')];
                  newServices[idx].icon = e.target.value;
                  setContent({ ...content, services: newServices });
                }} placeholder="Icon" className="flex-[0_0_80px] px-3 py-2 border border-gray-200 rounded-lg" />
                <input value={service.title || ''} onChange={(e) => {
                  const newServices = [...safeArray('services')];
                  newServices[idx].title = e.target.value;
                  setContent({ ...content, services: newServices });
                }} placeholder="Title" className="flex-[1_1_150px] px-3 py-2 border border-gray-200 rounded-lg" />
                <input value={service.desc || ''} onChange={(e) => {
                  const newServices = [...safeArray('services')];
                  newServices[idx].desc = e.target.value;
                  setContent({ ...content, services: newServices });
                }} placeholder="Description" className="flex-[2_1_200px] px-3 py-2 border border-gray-200 rounded-lg" />
                <button className="text-red-500 text-xl" onClick={() => {
                  const newServices = safeArray('services').filter((_, i) => i !== idx);
                  setContent({ ...content, services: newServices });
                }}>✕</button>
              </div>
            ))}
            <button className="text-blue-600 font-medium text-sm" onClick={() => {
              const newServices = [...safeArray('services'), { icon: '📦', title: '', desc: '' }];
              setContent({ ...content, services: newServices });
            }}>+ Add Service</button>
          </div>
          <button className="btn-premium btn-save mt-4" onClick={() => saveSection({
            servicesTitle: content.servicesTitle,
            servicesDescription: content.servicesDescription,
            services: content.services,
          })}>Save Services</button>
        </div>

        {/* Team */}
        <div className="editor-section team-editor">
          <h2>Team Members</h2>
          <div className="field"><label>Team Title</label><input type="text" value={content.teamTitle || ''} onChange={(e) => setContent({ ...content, teamTitle: e.target.value })} /></div>
          <div className="field"><label>Team Description</label><textarea rows={3} value={content.teamDescription || ''} onChange={(e) => setContent({ ...content, teamDescription: e.target.value })} /></div>
          {safeArray('team').map((member, idx) => (
            <div className="member-row" key={idx}>
              <input value={member.name || ''} onChange={(e) => {
                const newTeam = [...safeArray('team')];
                newTeam[idx].name = e.target.value;
                setContent({ ...content, team: newTeam });
              }} placeholder="Name" />
              <input value={member.role || ''} onChange={(e) => {
                const newTeam = [...safeArray('team')];
                newTeam[idx].role = e.target.value;
                setContent({ ...content, team: newTeam });
              }} placeholder="Role" />
              <input value={member.img || ''} onChange={(e) => {
                const newTeam = [...safeArray('team')];
                newTeam[idx].img = e.target.value;
                setContent({ ...content, team: newTeam });
              }} placeholder="Image URL" />
              <button className="remove" onClick={() => {
                const newTeam = safeArray('team').filter((_, i) => i !== idx);
                setContent({ ...content, team: newTeam });
              }}>✕</button>
            </div>
          ))}
          <div className="actions">
            <button className="add-btn" onClick={() => {
              const newTeam = [...safeArray('team'), { name: '', role: '', img: '' }];
              setContent({ ...content, team: newTeam });
            }}>+ Add Team Member</button>
            <button className="btn-premium btn-save" onClick={() => saveSection({
              teamTitle: content.teamTitle,
              teamDescription: content.teamDescription,
              team: content.team,
            })}>Save Team</button>
          </div>
        </div>

        {/* Gallery */}
        <div className="editor-section gallery-editor">
          <h2>Gallery Section</h2>
          <div className="field"><label>Gallery Title</label><input type="text" value={content.galleryTitle || ''} onChange={(e) => setContent({ ...content, galleryTitle: e.target.value })} /></div>
          <div className="field"><label>Gallery Description</label><textarea rows={3} value={content.galleryDescription || ''} onChange={(e) => setContent({ ...content, galleryDescription: e.target.value })} /></div>
          {safeArray('gallery').map((img, idx) => (
            <div className="gallery-row" key={idx}>
              <img src={img} alt={`Gallery ${idx + 1}`} />
              <input value={img} onChange={(e) => {
                const newGallery = [...safeArray('gallery')];
                newGallery[idx] = e.target.value;
                setContent({ ...content, gallery: newGallery });
              }} placeholder="Image URL" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg" />
              <button className="text-red-500 text-xl" onClick={() => {
                const newGallery = safeArray('gallery').filter((_, i) => i !== idx);
                setContent({ ...content, gallery: newGallery });
              }}>✕</button>
            </div>
          ))}
          <div className="actions">
            <button className="add-btn" onClick={() => {
              const newGallery = [...safeArray('gallery'), ''];
              setContent({ ...content, gallery: newGallery });
            }}>+ Add Image</button>
            <button className="btn-premium btn-save" onClick={() => saveSection({
              galleryTitle: content.galleryTitle,
              galleryDescription: content.galleryDescription,
              gallery: content.gallery,
            })}>Save Gallery</button>
          </div>
        </div>

        {/* Contact */}
        <div className="editor-section">
          <h2>Contact Section</h2>
          <div className="field"><label>Contact Title</label><input type="text" value={content.contactTitle || ''} onChange={(e) => setContent({ ...content, contactTitle: e.target.value })} /></div>
          <div className="field"><label>Contact Description</label><textarea rows={3} value={content.contactDescription || ''} onChange={(e) => setContent({ ...content, contactDescription: e.target.value })} /></div>
          <div className="field"><label>Phone</label><input type="text" value={content.contactPhone || ''} onChange={(e) => setContent({ ...content, contactPhone: e.target.value })} /></div>
          <div className="field"><label>Email</label><input type="text" value={content.contactEmail || ''} onChange={(e) => setContent({ ...content, contactEmail: e.target.value })} /></div>
          <div className="field"><label>Address</label><input type="text" value={content.contactAddress || ''} onChange={(e) => setContent({ ...content, contactAddress: e.target.value })} /></div>
          <button className="btn-premium btn-save" onClick={() => saveSection({
            contactTitle: content.contactTitle,
            contactDescription: content.contactDescription,
            contactPhone: content.contactPhone,
            contactEmail: content.contactEmail,
            contactAddress: content.contactAddress,
          })}>Save Contact</button>
        </div>
      </div></div>
  );
}