import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api";

export default function LeadDetails() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/leads/${id}`)
            .then(res => {
                setLead(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const getStatusColor = (status) => {
        const colors = {
            "Converted": "#10b981",
            "Contacted": "#3b82f6",
            "New": "#f59e0b"
        };
        return colors[status] || "#64748b";
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!lead) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Lead not found</h2>
                <a href="/leads" style={{ color: 'var(--primary-light)' }}>← Back to Dashboard</a>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{
            minHeight: '100vh',
            padding: '2rem 1rem',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            {/* Back Button */}
            <a
                href="/leads"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--primary-light)';
                    e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateX(0)';
                }}
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Dashboard
            </a>

            {/* Lead Details Card */}
            <div className="card" style={{
                padding: '3rem 2.5rem',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                {/* Header */}
                <div style={{
                    marginBottom: '2.5rem',
                    paddingBottom: '2rem',
                    borderBottom: '1px solid var(--border)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <h1 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            margin: 0
                        }}>
                            {lead.name}
                        </h1>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            background: `${getStatusColor(lead.status)}20`,
                            color: getStatusColor(lead.status),
                            border: `1.5px solid ${getStatusColor(lead.status)}60`
                        }}>
                            {lead.status}
                        </span>
                    </div>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        margin: 0
                    }}>
                        Lead ID: {lead._id}
                    </p>
                </div>

                {/* Contact Information */}
                <div style={{
                    display: 'grid',
                    gap: '2rem'
                }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '1rem'
                    }}>
                        Contact Information
                    </h2>

                    {/* Email */}
                    <div className="slide-in" style={{
                        padding: '1.5rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)40'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem'
                        }}>
                            <svg width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <label style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--text-muted)'
                            }}>
                                Email Address
                            </label>
                        </div>
                        <p style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                            margin: 0,
                            wordBreak: 'break-all'
                        }}>
                            {lead.email}
                        </p>
                    </div>

                    {/* Company */}
                    <div className="slide-in" style={{
                        padding: '1.5rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        transition: 'all 0.3s ease',
                        animationDelay: '0.1s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)40'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem'
                        }}>
                            <svg width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="3" y1="9" x2="21" y2="9" />
                                <line x1="9" y1="21" x2="9" y2="9" />
                            </svg>
                            <label style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--text-muted)'
                            }}>
                                Company
                            </label>
                        </div>
                        <p style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                            margin: 0
                        }}>
                            {lead.company}
                        </p>
                    </div>

                    {/* Created Date */}
                    <div className="slide-in" style={{
                        padding: '1.5rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        transition: 'all 0.3s ease',
                        animationDelay: '0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)40'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem'
                        }}>
                            <svg width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <label style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--text-muted)'
                            }}>
                                Created On
                            </label>
                        </div>
                        <p style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                            margin: 0
                        }}>
                            {new Date(lead.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}