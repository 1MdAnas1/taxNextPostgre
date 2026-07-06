'use client';

import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '@/context/ContentContext';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const { content, setContent } = useContent();
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Protect route
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== 'admin') {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  // Save a single field
  const handleSave = async (sectionKey: string, value: any) => {
    setSaving(true);
    try {
      await api.put(`/content/${sectionKey}`, { value });
      setContent((prev: any) => ({ ...prev, [sectionKey]: value }));
    } catch (error) {
      alert('❌ Error saving content');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Save an entire section (multiple fields)
  const saveSection = async (fields: Record<string, any>) => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(fields)) {
        await api.put(`/content/${key}`, { value });
        setContent((prev: any) => ({ ...prev, [key]: value }));
      }
      alert('✅ Section saved successfully!');
    } catch (error) {
      alert('❌ Error saving section');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Helper to safely access arrays
  const safeArray = (key: string): any[] =>
    Array.isArray(content[key]) ? content[key] : [];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="header">
          <h1>Admin Dashboard</h1>
          <div>
            <span>Welcome, {user?.name}</span>
          </div>
        </div>

        {saving && <div className="saving-indicator">Saving...</div>}

        {/* ====== HERO SECTION ====== */}
        <div className="editor-section">
          <h2 className="text-2xl font-bold text-center mb-6">Hero Section</h2>
          <div className="field">
            <label>Hero Title</label>
            <input
              type="text"
              value={content.heroTitle || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, heroTitle: e.target.value }))
              }
              placeholder="e.g. Smart Tax."
            />
          </div>
          <div className="field">
            <label>Hero Subtitle</label>
            <input
              type="text"
              value={content.heroSubtitle || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, heroSubtitle: e.target.value }))
              }
              placeholder="e.g. Simple Life."
            />
          </div>
          <div className="field">
            <label>Hero Description</label>
            <textarea
              rows={3}
              value={content.heroDescription || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, heroDescription: e.target.value }))
              }
              placeholder="Enter hero description..."
            />
          </div>
          <button
            className="btn-premium btn-save"
            onClick={() =>
              saveSection({
                heroTitle: content.heroTitle,
                heroSubtitle: content.heroSubtitle,
                heroDescription: content.heroDescription,
                heroImage: content.heroImage,
              })
            }
          >
            Save Hero
          </button>
        </div>

        {/* ====== ABOUT SECTION ====== */}
        <div className="editor-section">
          <h2 className="text-2xl font-bold text-center mb-6">About Section</h2>
          <div className="field">
            <label>About Title</label>
            <input
              type="text"
              value={content.aboutTitle || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, aboutTitle: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>About Description</label>
            <textarea
              rows={3}
              value={content.aboutDescription || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, aboutDescription: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>About Image URL</label>
            <input
              type="text"
              value={content.aboutImage || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, aboutImage: e.target.value }))
              }
              placeholder="https://example.com/about-image.jpg"
            />
            {content.aboutImage && (
              <div style={{ marginTop: '0.5rem' }}>
                <img
                  src={content.aboutImage}
                  alt="About preview"
                  style={{
                    width: '120px',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                  }}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/120?text=No+Image')
                  }
                />
              </div>
            )}
          </div>

          {/* Bullet points editor */}
          <div className="bullet-editor">
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.25rem',
              }}
            >
              Bullet Points
            </label>
            {safeArray('aboutBullets').map((bullet: string, idx: number) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <input
                  value={bullet}
                  onChange={(e) => {
                    const newBullets = [...safeArray('aboutBullets')];
                    newBullets[idx] = e.target.value;
                    setContent((prev: any) => ({ ...prev, aboutBullets: newBullets }));
                  }}
                  placeholder="Bullet point"
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
                <button
                  className="remove"
                  onClick={() => {
                    const newBullets = safeArray('aboutBullets').filter(
                      (_: string, i: number) => i !== idx
                    );
                    setContent((prev: any) => ({ ...prev, aboutBullets: newBullets }));
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <div style={{ marginTop: '0.5rem' }}>
              <button
                className="add-btn"
                onClick={() => {
                  const newBullets = [...safeArray('aboutBullets'), ''];
                  setContent((prev: any) => ({ ...prev, aboutBullets: newBullets }));
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                + Add Bullet Point
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="field">
            <label>Years of Experience</label>
            <input
              type="number"
              value={content.yearsOfExperience || ''}
              onChange={(e) =>
                setContent((prev: any) => ({
                  ...prev,
                  yearsOfExperience: e.target.value,
                }))
              }
              placeholder="e.g. 11"
            />
          </div>
          <div className="field">
            <label>Clients Served</label>
            <input
              type="number"
              value={content.clientsServed || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, clientsServed: e.target.value }))
              }
              placeholder="e.g. 1500"
            />
          </div>
          <div className="field">
            <label>Projects Completed</label>
            <input
              type="number"
              value={content.projectsCompleted || ''}
              onChange={(e) =>
                setContent((prev: any) => ({
                  ...prev,
                  projectsCompleted: e.target.value,
                }))
              }
              placeholder="e.g. 700"
            />
          </div>

          <button
            className="btn-premium btn-save"
            onClick={() =>
              saveSection({
                aboutTitle: content.aboutTitle,
                aboutDescription: content.aboutDescription,
                aboutImage: content.aboutImage,
                aboutBullets: content.aboutBullets,
                yearsOfExperience: content.yearsOfExperience,
                clientsServed: content.clientsServed,
                projectsCompleted: content.projectsCompleted,
              })
            }
            style={{ marginTop: '1rem' }}
          >
            Save About
          </button>
        </div>

        {/* ====== SERVICES SECTION ====== */}
        <div className="editor-section services-editor">
          <h2 className="text-2xl font-bold text-center mb-6">Services Section</h2>
          <div className="field">
            <label>Services Title</label>
            <input
              type="text"
              value={content.servicesTitle || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, servicesTitle: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>Services Description</label>
            <textarea
              rows={3}
              value={content.servicesDescription || ''}
              onChange={(e) =>
                setContent((prev: any) => ({
                  ...prev,
                  servicesDescription: e.target.value,
                }))
              }
            />
          </div>

          <div className="service-editor">
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              Service Cards
            </label>
            {safeArray('services').map(
              (
                service: { icon: string; title: string; desc: string },
                idx: number
              ) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    border: '1px solid #f3f4f6',
                    borderRadius: '0.5rem',
                  }}
                >
                  <input
                    value={service.icon || ''}
                    onChange={(e) => {
                      const newServices = [...safeArray('services')];
                      newServices[idx].icon = e.target.value;
                      setContent((prev: any) => ({ ...prev, services: newServices }));
                    }}
                    placeholder="Icon (emoji or text)"
                    style={{
                      flex: '0 0 80px',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <input
                    value={service.title || ''}
                    onChange={(e) => {
                      const newServices = [...safeArray('services')];
                      newServices[idx].title = e.target.value;
                      setContent((prev: any) => ({ ...prev, services: newServices }));
                    }}
                    placeholder="Title"
                    style={{
                      flex: '1 1 150px',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <input
                    value={service.desc || ''}
                    onChange={(e) => {
                      const newServices = [...safeArray('services')];
                      newServices[idx].desc = e.target.value;
                      setContent((prev: any) => ({ ...prev, services: newServices }));
                    }}
                    placeholder="Description"
                    style={{
                      flex: '2 1 200px',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <button
                    className="remove"
                    onClick={() => {
                      const newServices = safeArray('services').filter(
                        (_: any, i: number) => i !== idx
                      );
                      setContent((prev: any) => ({ ...prev, services: newServices }));
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              )
            )}
            <div style={{ marginTop: '0.5rem' }}>
              <button
                className="add-btn hover:underline"
                onClick={() => {
                  const newServices = [
                    ...safeArray('services'),
                    { icon: '📦', title: '', desc: '' },
                  ];
                  setContent((prev: any) => ({ ...prev, services: newServices }));
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                + Add Service
              </button>
            </div>
          </div>

          <button
            className="btn-premium btn-save"
            onClick={() =>
              saveSection({
                servicesTitle: content.servicesTitle,
                servicesDescription: content.servicesDescription,
                services: content.services,
              })
            }
            style={{ marginTop: '1rem' }}
          >
            Save Services
          </button>
        </div>

        {/* ====== TEAM SECTION ====== */}
        <div className="editor-section team-editor">
          <h2 className="text-2xl font-bold text-center mb-6">Team Members</h2>
          <div className="field">
            <label>Team Title</label>
            <input
              type="text"
              value={content.teamTitle || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, teamTitle: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>Team Description</label>
            <textarea
              rows={3}
              value={content.teamDescription || ''}
              onChange={(e) =>
                setContent((prev: any) => ({
                  ...prev,
                  teamDescription: e.target.value,
                }))
              }
            />
          </div>
          {safeArray('team').map(
            (
              member: { name: string; role: string; img: string },
              idx: number
            ) => (
              <div className="member-row" key={idx}>
                <input
                  value={member.name || ''}
                  onChange={(e) => {
                    const newTeam = [...safeArray('team')];
                    newTeam[idx].name = e.target.value;
                    setContent((prev: any) => ({ ...prev, team: newTeam }));
                  }}
                  placeholder="Name"
                />
                <input
                  value={member.role || ''}
                  onChange={(e) => {
                    const newTeam = [...safeArray('team')];
                    newTeam[idx].role = e.target.value;
                    setContent((prev: any) => ({ ...prev, team: newTeam }));
                  }}
                  placeholder="Role"
                />
                <input
                  value={member.img || ''}
                  onChange={(e) => {
                    const newTeam = [...safeArray('team')];
                    newTeam[idx].img = e.target.value;
                    setContent((prev: any) => ({ ...prev, team: newTeam }));
                  }}
                  placeholder="Image URL"
                />
                <button
                  className="remove"
                  onClick={() => {
                    const newTeam = safeArray('team').filter(
                      (_: any, i: number) => i !== idx
                    );
                    setContent((prev: any) => ({ ...prev, team: newTeam }));
                  }}
                >
                  ✕
                </button>
              </div>
            )
          )}
          <div className="actions">
            <button
              className="add-btn"
              onClick={() => {
                const newTeam = [
                  ...safeArray('team'),
                  { name: '', role: '', img: '' },
                ];
                setContent((prev: any) => ({ ...prev, team: newTeam }));
              }}
            >
              + Add Team Member
            </button>
            <button
              className="btn-premium btn-save"
              onClick={() =>
                saveSection({
                  teamTitle: content.teamTitle,
                  teamDescription: content.teamDescription,
                  team: content.team,
                })
              }
            >
              Save Team
            </button>
          </div>
        </div>

        {/* ====== GALLERY SECTION ====== */}
        <div className="editor-section gallery-editor">
          <h2 className="text-2xl font-bold text-center mb-6">Gallery Section</h2>
          <div className="field">
            <label>Gallery Title</label>
            <input
              type="text"
              value={content.galleryTitle || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, galleryTitle: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>Gallery Description</label>
            <textarea
              rows={3}
              value={content.galleryDescription || ''}
              onChange={(e) =>
                setContent((prev: any) => ({
                  ...prev,
                  galleryDescription: e.target.value,
                }))
              }
            />
          </div>

          {safeArray('gallery').map((img: string, idx: number) => (
            <div
              className="gallery-row"
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '0.75rem',
              }}
            >
              <img
                src={img || ''}
                alt={`Gallery ${idx + 1}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  background: '#f3f4f6',
                }}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/80?text=No+Image')
                }
              />
              <input
                value={img}
                onChange={(e) => {
                  const newGallery = [...safeArray('gallery')];
                  newGallery[idx] = e.target.value;
                  setContent((prev: any) => ({ ...prev, gallery: newGallery }));
                }}
                placeholder="Image URL"
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <button
                className="remove"
                onClick={() => {
                  const newGallery = safeArray('gallery').filter(
                    (_: string, i: number) => i !== idx
                  );
                  setContent((prev: any) => ({ ...prev, gallery: newGallery }));
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <div className="actions">
            <button
              className="add-btn cursor-pointer text-blue-600 hover:underline transition-colors"
              onClick={() => {
                const newGallery = [...safeArray('gallery'), ''];
                setContent((prev: any) => ({ ...prev, gallery: newGallery }));
              }}
            >
              + Add Image
            </button>
            <button
              className="btn-premium btn-save"
              onClick={() =>
                saveSection({
                  galleryTitle: content.galleryTitle,
                  galleryDescription: content.galleryDescription,
                  gallery: content.gallery,
                })
              }
            >
              Save Gallery
            </button>
          </div>
        </div>

        {/* ====== CONTACT SECTION ====== */}
        <div className="editor-section">
          <h2 className="text-2xl font-bold text-center mb-6">Contact Section</h2>
          <div className="field">
            <label>Contact Title</label>
            <input
              type="text"
              value={content.contactTitle || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, contactTitle: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>Contact Description</label>
            <textarea
              rows={3}
              value={content.contactDescription || ''}
              onChange={(e) =>
                setContent((prev: any) => ({
                  ...prev,
                  contactDescription: e.target.value,
                }))
              }
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              type="text"
              value={content.contactPhone || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, contactPhone: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={content.contactEmail || ''}
              onChange={(e) =>
                setContent((prev: any) => ({ ...prev, contactEmail: e.target.value }))
              }
            />
          </div>
          <div className="field">
            <label>Address</label>
            <input
              type="text"
              value={content.contactAddress || ''}
              onChange={(e) =>
                setContent((prev: any) => ({
                  ...prev,
                  contactAddress: e.target.value,
                }))
              }
            />
          </div>
          <button
            className="btn-premium btn-save"
            onClick={() =>
              saveSection({
                contactTitle: content.contactTitle,
                contactDescription: content.contactDescription,
                contactPhone: content.contactPhone,
                contactEmail: content.contactEmail,
                contactAddress: content.contactAddress,
              })
            }
          >
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}