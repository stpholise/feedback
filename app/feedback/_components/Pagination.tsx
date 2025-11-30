"use client";

import { useState } from "react";
import Image from "next/image";
interface FeedbackType {
  name: string;
  email: string;
  phone: string;
  message: string;
  type?: string;
}

const Pagination = ({ items }: { items: FeedbackType[] }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {" "}
        {paginatedItems.map((feedback, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg px-4 py-4 text-[#555B64] bg-white text-sm"
          >
            <div className="flex items-center gap-2 mb-4  ">
              <div className=" size-8 flex items-center justify-center  p-1  text-center rounded-full bg-gray-100 uppercase text-black  text-sm">
                {feedback.name
                  .split(" ")
                  .map((word: string) => word[0])
                  .join("")}
              </div>
              <p className="text-black  font-medium text-base capitalize  h-fit  ">
                {feedback.name}
              </p>
            </div>
            <div className="flex items-start mt-2 w-full">
              <Image
                src={"/icons/email.svg"}
                alt="email icon"
                width={16}
                height={16}
                className="mr-2"
              />
              <p className="break-all">{feedback.email}</p>
            </div>
            <div className="flex items-center mt-2">
              <Image
                src={"/icons/phone.svg"}
                alt="email icon"
                width={16}
                height={16}
                className="mr-2"
              />
              <p className="text-black"></p>02230193845
            </div>
            <div className="flex items-start mt-2">
              <Image
                src={"/icons/bugs.svg"}
                alt="email icon"
                width={16}
                height={16}
                className="mr-2 "
              />
              <div className="">
                <p className="text-black  font-mediom text-sm">Bugs</p>
                <p className="">{feedback.message}</p>
              </div>
            </div> 
          </div>
        ))}
      </div>
      <footer className="h-20 mt-4 text-black text-sm flex justify-between items-center">
        <div className="font-semibold">
            Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
             className="size-10 border border-[#EAECF0] bg-[#F9FAFB] rounded-full flex items-center justify-center p-1"
          >
              <Image 
            src={currentPage == 1 ? "/icons/chevron-left-gray.svg":"/icons/chevron-left.svg"}
            alt={"prev-page"}
            height={14}
            width={12}
           />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage == totalPages}
            className="size-10 border border-[#EAECF0] bg-[#F9FAFB] rounded-full flex items-center justify-center p-1"
          >
           
           <Image 
            src={currentPage == totalPages ? "/icons/chevron-right-gray.svg":"/icons/chevron-right.svg"}
            alt={"next-page"}
            height={14}
            width={12}
           />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Pagination;
