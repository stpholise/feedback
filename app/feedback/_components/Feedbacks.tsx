"use server"
import Pagination from "./Pagination";
import { toast } from "react-toastify";

interface FeedbackType {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

const Feedbacks = async ({
  type,
  search = "",
}: {
  type?: string;
  search?: string;
}) => {
  const params = new URLSearchParams({
    type: type || "",
  });

  const url = `https://rise-frontend-test-api.developer-a6a.workers.dev/?${params.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    toast.error("error fetching product", {
      theme: "light",
      hideProgressBar: true,
    });
  }

  const data = (await res.json()) as FeedbackType[];

 
  return <div>{<Pagination items={data} search={search} type={type}/>}</div>;
};

export default Feedbacks;
