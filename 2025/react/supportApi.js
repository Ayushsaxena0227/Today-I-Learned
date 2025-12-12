import { api } from "./api"; // Your configured axios instance
import toast from "react-hot-toast";

export const raiseSupportTicket = async ({ issueMsg, mobile, attachment }) => {
  const toastId = toast.loading("Submitting your ticket...");
  try {
    const formData = new FormData();
    formData.append("issueMsg", issueMsg);
    formData.append("mobile", mobile);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    // Axios will automatically set the 'Content-Type' to 'multipart/form-data'
    const { data } = await api.post("/support/raise-ticket", formData);

    if (data.success) {
      toast.success(data.message, { id: toastId });
    } else {
      toast.error(data.message || "Failed to raise ticket.", { id: toastId });
    }
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred.", {
      id: toastId,
    });
    throw error;
  }
};

export const getMyTickets = async (status = "all") => {
  try {
    // Build the URL with the status query parameter
    const url = `/support/my-tickets?status=${status}`;

    const { data } = await api.get(url);

    if (data.success) {
      return data; // Return the whole success object
    } else {
      toast.error(data.message || "Could not fetch your tickets.");
      return { success: false, data: [] };
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "An error occurred while fetching tickets."
    );
    throw error;
  }
};
