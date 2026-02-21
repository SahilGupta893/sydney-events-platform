import React, { useState } from "react";
import axios from "axios";

const ImportModal = ({ event, onClose, refresh }) => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    try {
      setLoading(true);

      await axios.put(`/api/events/import/${event._id}`, {
        notes,
      });

      refresh();   // refresh dashboard data
      onClose();   // close modal
    } catch (error) {
      console.error(error);
      alert("Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-[400px] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">
          Import Event
        </h2>

        <p className="text-sm text-gray-500">
          {event.title}
        </p>

        <textarea
          placeholder="Optional import notes..."
          className="w-full border p-2 rounded"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {loading ? "Importing..." : "Confirm Import"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;