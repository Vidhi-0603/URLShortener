import { useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import axiosInstance from "../utils/axiosInstance";

const RedirectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/$id" });

  useEffect(() => {
    const fetchRedirect = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/resolve/${id}`);
        if (data.full_url) {
          window.location.href = data.full_url;
        } else {
          alert("Short URL not found");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to resolve URL");
        navigate({ to: "/" });
      }
    };

    fetchRedirect();
  }, [id, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
