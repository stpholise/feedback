"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
interface FeedbackType {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

const tailwindColors = [
  { text: "text-red-800", bg: "bg-red-200" },
  { text: "text-blue-800", bg: "bg-blue-200" },
  { text: "text-green-800", bg: "bg-green-200" },
  { text: "text-yellow-800", bg: "bg-yellow-200" },
  { text: "text-purple-800", bg: "bg-purple-200" },
  { text: "text-pink-800", bg: "bg-pink-200" },
];

const getRandomTailwindColors = () => {
  const current = Math.floor(Math.random() * tailwindColors.length);

  return `${tailwindColors[current].text} ${tailwindColors[current].bg}`;
};
const Pagination = ({ items }: { items: FeedbackType[] }) => {
  console.log("items", items)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const restetCurrentPage = () => {
      setCurrentPage(1);
    };
    restetCurrentPage();
  }, [items]);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="">
      {paginatedItems.length < 1 && (
        <div className="h-[40vh] text-black text-center flex items-center justify-center">
          <p className="text-lg">
            <span className="text-2xl">404:</span> NO Feedback found{" "}
          </p>
        </div>
      )}
      {paginatedItems.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {paginatedItems.map((feedback, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg px-4 py-4 text-[#555B64] bg-white text-sm"
            >
              <div className="flex items-center gap-2 mb-4  ">
                <div
                  className={clsx(
                    " size-8 flex items-center justify-center  p-1  text-center rounded-full  uppercase   text-sm",
                    getRandomTailwindColors()
                  )}
                >
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
                <p className="">02230193845</p>
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
                  <p className="text-black  font-mediom text-sm capitalize">{feedback.type}s</p>
                  <p className="">{feedback.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {totalPages > 0 && <footer className="h-20 mt-4 text-black text-sm flex justify-between items-center">
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
              src={
                currentPage == 1
                  ? "/icons/chevron-left-gray.svg"
                  : "/icons/chevron-left.svg"
              }
              alt={"prev-page"}
              height={18}
              width={16}
            />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage == totalPages}
            className="size-10 border border-[#EAECF0] bg-[#F9FAFB] rounded-full flex items-center justify-center p-1"
          >
            <Image
              src={
                currentPage == totalPages
                  ? "/icons/chevron-right-gray.svg"
                  : "/icons/chevron-right.svg"
              }
              alt={"next-page"}
              height={18}
              width={16}
            />
          </button>
        </div>
      </footer>}
    </div>
  );
};

export default Pagination;
