import React, { useState } from "react";
import StudentLayout from "../../common/StudentLayout";
import { raiseSupportTicket } from "../../../../services/api/supportApi"; // Import the new API function
import { Paperclip, Send } from "lucide-react";

const HelpAndSupport = () => {
  const [issueMsg, setIssueMsg] = useState("");
  const [mobile, setMobile] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issueMsg.trim()) {
      alert("Please describe your issue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await raiseSupportTicket({
        issueMsg,
        mobile,
        attachment,
      });
      if (response.success) {
        // Clear the form on success
        setIssueMsg("");
        setMobile("");
        setAttachment(null);
        setFileName("");
      }
    } catch (error) {
      // Toast is already handled in the API service
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StudentLayout>
      <div className="p-3 sm:p-6 w-full font-lexend bg-white min-h-screen">
        <div className="text-2xl font-semibold mb-2">Help & Support</div>
        <p className="text-gray-600 mb-6">
          Raise a ticket for any issues or queries you have.
        </p>

        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-2xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your contact number"
              />
            </div>

            <div>
              <label
                htmlFor="issueMsg"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Describe your Issue *
              </label>
              <textarea
                id="issueMsg"
                value={issueMsg}
                onChange={(e) => setIssueMsg(e.target.value)}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please provide as much detail as possible..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attach a file (Optional)
              </label>
              <label
                htmlFor="attachment"
                className="relative cursor-pointer bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50"
              >
                <Paperclip size={16} className="mr-2" />
                <span>
                  {fileName || "Click to upload a screenshot, PDF, etc."}
                </span>
                <input
                  id="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">Max file size: 5MB.</p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-all"
              >
                {isSubmitting ? "Submitting..." : "Raise Ticket"}
                {!isSubmitting && <Send size={16} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
};

export default HelpAndSupport;
