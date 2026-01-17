import { useEffect, useState } from "react";
import { API } from "../api";

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({ total: 0, converted: 0, new: 0, contacted: 0 });

    useEffect(() => {
        setLoading(true);
        API.get(`/leads?search=${search}&status=${statusFilter}&page=${page}&limit=10`)
            .then(res => {
                setLeads(res.data.leads);
                setTotal(res.data.total);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [search, statusFilter, page]);

    useEffect(() => {
        // Fetch analytics
        API.get(`/leads?limit=1000`).then(res => {
            const allLeads = res.data.leads;
            setAnalytics({
                total: res.data.total,
                converted: allLeads.filter(l => l.status === "Converted").length,
                new: allLeads.filter(l => l.status === "New").length,
                contacted: allLeads.filter(l => l.status === "Contacted").length
            });
        });
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            "Converted": "#10b981",
            "Contacted": "#3b82f6",
            "New": "#f59e0b"
        };
        return colors[status] || "#64748b";
    };

    return (
        <div className="fade-in" style={{
            minHeight: '100vh',
            padding: '2rem 1rem',
            maxWidth: '1400px',
            margin: '0 auto'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Lead Management Dashboard
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1rem'
                }}>
                    Track and manage your leads efficiently
                </p>
            </div>

            {/* Analytics Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {[
                    { label: 'Total Leads', value: analytics.total, color: '#6366f1', icon: '📊' },
                    { label: 'Converted', value: analytics.converted, color: '#10b981', icon: '✅' },
                    { label: 'New Leads', value: analytics.new, color: '#f59e0b', icon: '⭐' },
                    { label: 'Contacted', value: analytics.contacted, color: '#3b82f6', icon: '💬' }
                ].map((metric, idx) => (
                    <div
                        key={idx}
                        className="card slide-in"
                        style={{
                            padding: '1.75rem',
                            background: 'var(--bg-card)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            transition: 'all 0.3s ease',
                            animationDelay: `${idx * 0.1}s`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.borderColor = `${metric.color}40`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <h3 style={{
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                color: metric.color,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {metric.label}
                            </h3>
                            <span style={{ fontSize: '1.75rem' }}>{metric.icon}</span>
                        </div>
                        <p style={{
                            fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            margin: 0,
                            lineHeight: '1'
                        }}>
                            {metric.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Search & Filters Container */}
            <div className="card" style={{
                padding: '2rem',
                marginBottom: '2rem',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                borderRadius: '8px'
            }}>
                {/* Search Bar */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="search"
                            placeholder="Search leads by name..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            style={{
                                width: '100%',
                                paddingLeft: '3rem',
                                fontSize: '1rem'
                            }}
                        />
                        <svg
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '20px',
                                height: '20px',
                                opacity: 0.5
                            }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '0.5rem'
                    }}>
                        Filter by:
                    </span>
                    {['', 'New', 'Contacted', 'Converted'].map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setStatusFilter(status);
                                setPage(1);
                            }}
                            style={{
                                padding: '0.65rem 1.25rem',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                border: 'none',
                                borderRadius: '0.75rem',
                                background: statusFilter === status
                                    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
                                    : 'var(--bg-secondary)',
                                color: statusFilter === status ? 'white' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: statusFilter === status ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                            }}
                        >
                            {status || 'All'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Leads Table */}
            <div className="card" style={{
                padding: '0',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                borderRadius: '8px'
            }}>
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '4rem 2rem'
                    }}>
                        <div className="spinner"></div>
                    </div>
                ) : leads.length === 0 ? (
                    <div style={{
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        color: 'var(--text-muted)'
                    }}>
                        <p style={{ fontSize: '1.1rem' }}>No leads found</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div style={{
                            overflowX: 'auto',
                            display: window.innerWidth > 768 ? 'block' : 'none'
                        }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                    <tr style={{
                                        background: 'var(--bg-secondary)',
                                        borderBottom: '1px solid var(--border)'
                                    }}>
                                        {['Name', 'Email', 'Company', 'Status', 'Actions'].map((header) => (
                                            <th key={header} style={{
                                                padding: '1.25rem 1. 5rem',
                                                textAlign: 'left',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead, idx) => (
                                        <tr
                                            key={lead._id}
                                            style={{
                                                borderBottom: '1px solid var(--border)',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--bg-hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            <td style={{ padding: '1.25rem 1.5rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                                                {lead.name}
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                {lead.email}
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                {lead.company}
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '0.4rem 0.9rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    background: `${getStatusColor(lead.status)}20`,
                                                    color: getStatusColor(lead.status),
                                                    border: `1px solid ${getStatusColor(lead.status)}40`
                                                }}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <a
                                                    href={`/leads/${lead._id}`}
                                                    style={{
                                                        color: 'var(--primary-light)',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '500',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    View Details →
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div style={{
                            display: window.innerWidth <= 768 ? 'block' : 'none',
                            padding: '1rem'
                        }}>
                            {leads.map((lead) => (
                                <a
                                    key={lead._id}
                                    href={`/leads/${lead._id}`}
                                    style={{
                                        display: 'block',
                                        padding: '1.25rem',
                                        marginBottom: '1rem',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '0.75rem',
                                        border: '1px solid var(--border)',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)',
                                            marginBottom: '0.25rem'
                                        }}>
                                            {lead.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-muted)',
                                            margin: 0
                                        }}>
                                            {lead.email}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            {lead.company}
                                        </span>
                                        <span style={{
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background: `${getStatusColor(lead.status)}20`,
                                            color: getStatusColor(lead.status)
                                        }}>
                                            {lead.status}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Pagination */}
            {!loading && leads.length > 0 && (
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        margin: 0
                    }}>
                        Showing {((page - 1) * 10) + 1} - {Math.min(page * 10, total)} of {total} leads
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            style={{
                                padding: '0.65rem 1.25rem',
                                opacity: page === 1 ? 0.5 : 1
                            }}
                        >
                            ← Previous
                        </button>
                        <span style={{
                            padding: '0.65rem 1rem',
                            background: 'var(--bg-secondary)',
                            borderRadius: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            Page {page}
                        </span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page * 10 >= total}
                            style={{
                                padding: '0.65rem 1.25rem',
                                opacity: page * 10 >= total ? 0.5 : 1
                            }}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}