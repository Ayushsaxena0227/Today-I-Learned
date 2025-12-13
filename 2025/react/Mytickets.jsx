import React, { useState, useEffect, useCallback } from "react";
import StudentLayout from "../../common/StudentLayout";
import { getMyTickets } from "../../../../services/api/supportApi";
import { Tag, Calendar, MessageSquare, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const TicketStatusBadge = ({ status }) => {
  const statusStyles = {
    Open: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Closed: "bg-green-100 text-green-800",
    Resolved: "bg-green-100 text-green-800",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchTickets = useCallback(async (currentFilter) => {
    setLoading(true);
    try {
      const response = await getMyTickets(currentFilter);
      if (response.success) {
        setTickets(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets(filter);
  }, [filter, fetchTickets]);

  const filterTabs = ["all", "Open", "Closed"];

  return (
    <StudentLayout>
      <div className="p-3 sm:p-6 w-full font-lexend bg-white min-h-screen">
        <div className="text-2xl font-semibold mb-2">My Support Tickets</div>
        <p className="text-gray-600 mb-6">
          Track the status of your submitted tickets.
        </p>

        <div className="flex justify-between items-center mb-6">
          <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <Link
            to="/student/help-support"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Raise a New Ticket
          </Link>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={32} className="animate-spin text-blue-600" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                You have no tickets in this category.
              </p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Tag size={16} className="text-blue-600" />
                      <span className="font-mono text-blue-700 font-semibold">
                        {ticket._id}
                      </span>
                      <TicketStatusBadge status={ticket.ticketStatus} />
                    </div>
                    <p className="text-gray-700 flex items-start gap-2">
                      <MessageSquare
                        size={16}
                        className="mt-0.5 text-gray-400 flex-shrink-0"
                      />
                      <span>{ticket.issueMsg}</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={14} />
                      <span>
                        {new Date(ticket.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default MyTickets;
