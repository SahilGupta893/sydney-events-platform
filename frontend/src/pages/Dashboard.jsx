import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [filters, setFilters] = useState({
    city: "Sydney",
    keyword: "",
    startDate: "",
    endDate: "",
  });

  const [importNotes, setImportNotes] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5002/api/events");
    setEvents(res.data);
    setFilteredEvents(res.data);
  };

  // FILTER LOGIC
  useEffect(() => {
    let temp = [...events];

    if (filters.city) {
      temp = temp.filter((e) => e.city === filters.city);
    }

    if (filters.keyword) {
      temp = temp.filter(
        (e) =>
          e.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          e.description
            ?.toLowerCase()
            .includes(filters.keyword.toLowerCase()) ||
          e.venueName?.toLowerCase().includes(filters.keyword.toLowerCase()),
      );
    }

    if (filters.startDate && filters.endDate) {
      temp = temp.filter((e) => {
        const date = new Date(e.dateTime);
        return (
          date >= new Date(filters.startDate) &&
          date <= new Date(filters.endDate)
        );
      });
    }

    setFilteredEvents(temp);
    setCurrentPage(1);
  }, [filters, events]);

  // IMPORT FUNCTION
  const handleImport = async (eventId) => {
    await axios.put(
      `http://localhost:5002/api/events/import/${eventId}`,
      { notes: importNotes },
      { withCredentials: true },
    );

    setImportNotes("");
    fetchEvents();
  };

  const statusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-600";
      case "updated":
        return "bg-yellow-100 text-yellow-600";
      case "inactive":
        return "bg-red-100 text-red-600";
      case "imported":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // PAGINATION CALCULATION
  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentRows = filteredEvents.slice(indexOfFirst, indexOfLast);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* LEFT SIDE (TABLE) */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-4 gap-4">
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Sydney">Sydney</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Title
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Source
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((event) => (
                <tr
                  key={event._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <td className="px-6 py-4">{event.title}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">{event.sourceWebsite}</td>

                  <td className="px-6 py-4">
                    {event.status !== "imported" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImport(event._id);
                        }}
                        className="bg-black text-white px-3 py-1 rounded text-sm"
                      >
                        Import
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE PREVIEW */}
      <div className="w-96 bg-white border-l p-6">
        {selectedEvent ? (
          <>
            <h2 className="text-lg font-semibold mb-2">
              {selectedEvent.title}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              {selectedEvent.dateTime
                ? new Date(selectedEvent.dateTime).toLocaleString()
                : "Date TBA"}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              {selectedEvent.venueName || "Sydney"}
            </p>

            <p className="text-sm text-gray-600 mb-6">
              {selectedEvent.description}
            </p>

            <textarea
              placeholder="Import notes..."
              className="w-full border p-2 rounded mb-4"
              value={importNotes}
              onChange={(e) => setImportNotes(e.target.value)}
            />

            <button
              onClick={() => handleImport(selectedEvent._id)}
              className="w-full bg-black text-white py-2 rounded"
            >
              Import to Platform
            </button>
          </>
        ) : (
          <p className="text-gray-400 text-sm">
            Select an event to preview details
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
