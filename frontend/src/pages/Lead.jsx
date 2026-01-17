import { useEffect, useState } from "react";
import { API } from "../api";

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [analytics, setAnalytics] = useState({ total: 0, converted: 0, new: 0, contacted: 0 });

    useEffect(() => {
        API.get(`/leads?search=${search}&status=${statusFilter}&page=${page}&limit=10`)
            .then(res => {
                setLeads(res.data.leads);
                setTotal(res.data.total);
            });
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

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <h2>Lead Management Dashboard</h2>

            {/* Analytics Metrics */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
                <div style={{ padding: "20px", background: "#1a1a1a", borderRadius: "8px", flex: "1", minWidth: "200px" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#646cff" }}>Total Leads</h3>
                    <p style={{ fontSize: "2em", margin: 0 }}>{analytics.total}</p>
                </div>
                <div style={{ padding: "20px", background: "#1a1a1a", borderRadius: "8px", flex: "1", minWidth: "200px" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#4caf50" }}>Converted</h3>
                    <p style={{ fontSize: "2em", margin: 0 }}>{analytics.converted}</p>
                </div>
                <div style={{ padding: "20px", background: "#1a1a1a", borderRadius: "8px", flex: "1", minWidth: "200px" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#ff9800" }}>New Leads</h3>
                    <p style={{ fontSize: "2em", margin: 0 }}>{analytics.new}</p>
                </div>
                <div style={{ padding: "20px", background: "#1a1a1a", borderRadius: "8px", flex: "1", minWidth: "200px" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#2196f3" }}>Contacted</h3>
                    <p style={{ fontSize: "2em", margin: 0 }}>{analytics.contacted}</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Search by name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ padding: "10px", marginRight: "10px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "250px" }}
                />

                <button
                    onClick={() => setStatusFilter("")}
                    style={{ marginRight: "10px", background: statusFilter === "" ? "#646cff" : "#1a1a1a" }}
                >
                    All
                </button>
                <button
                    onClick={() => setStatusFilter("New")}
                    style={{ marginRight: "10px", background: statusFilter === "New" ? "#646cff" : "#1a1a1a" }}
                >
                    New
                </button>
                <button
                    onClick={() => setStatusFilter("Contacted")}
                    style={{ marginRight: "10px", background: statusFilter === "Contacted" ? "#646cff" : "#1a1a1a" }}
                >
                    Contacted
                </button>
                <button
                    onClick={() => setStatusFilter("Converted")}
                    style={{ background: statusFilter === "Converted" ? "#646cff" : "#1a1a1a" }}
                >
                    Converted
                </button>
            </div>

            {/* Leads Table */}
            <div style={{ background: "#1a1a1a", borderRadius: "8px", padding: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #333" }}>
                            <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
                            <th style={{ textAlign: "left", padding: "10px" }}>Email</th>
                            <th style={{ textAlign: "left", padding: "10px" }}>Company</th>
                            <th style={{ textAlign: "left", padding: "10px" }}>Status</th>
                            <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map(l => (
                            <tr key={l._id} style={{ borderBottom: "1px solid #333" }}>
                                <td style={{ padding: "10px" }}>{l.name}</td>
                                <td style={{ padding: "10px" }}>{l.email}</td>
                                <td style={{ padding: "10px" }}>{l.company}</td>
                                <td style={{ padding: "10px" }}>
                                    <span style={{
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        background: l.status === "Converted" ? "#4caf50" : l.status === "Contacted" ? "#2196f3" : "#ff9800",
                                        fontSize: "0.85em"
                                    }}>
                                        {l.status}
                                    </span>
                                </td>
                                <td style={{ padding: "10px" }}>
                                    <a href={`/leads/${l._id}`} style={{ color: "#646cff" }}>View Details</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p>Showing {leads.length} of {total} leads</p>
                <div>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        style={{ marginRight: "10px" }}
                    >
                        Previous
                    </button>
                    <span style={{ margin: "0 10px" }}>Page {page}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page * 10 >= total}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}