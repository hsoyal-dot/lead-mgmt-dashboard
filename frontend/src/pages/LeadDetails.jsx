import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api";

export default function LeadDetails() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);

    useEffect(() => {
        API.get(`/leads/${id}`).then(res => setLead(res.data));
    }, [id]);

    if (!lead) return "Loading...";

    return (
        <div>
            <h3>{lead.name}</h3>
            <p>{lead.email}</p>
            <p>{lead.company}</p>
            <p>Status: {lead.status}</p>
        </div>
    );
}