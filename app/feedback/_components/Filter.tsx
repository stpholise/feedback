"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import FeedbackForm from "./FeedbackForm";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const params = useSearchParams();
  const defaultFilter = params.get("type") || ""
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>(defaultFilter);
  const [openFilterForm, setOpenFilterForm] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const updateFilter = (filter: string) => {
    setSelectedFilter(filter);
    router.replace(`/feedback?type=${filter}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between w-full border py-2">
      <div className="text-black py-4 flex gap-3 ">
        {filterOptions.map((item, index) => (
          <button
            onClick={() => updateFilter(item.value)}
            key={index}
            className={clsx(
              "font-medium px-3 py-1 text-sm rounded-md border border-[#EAECF0] h-8",
              selectedFilter == item.value
                ? "bg-[#EDFFFF] border-[#9FDCE1] text-[#006D79] rounded-md"
                : "bg-[#F9FAFB]"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="w-60 rounded-2xl h-8 bg-white flex items-center px-3 py-1 text-black text-sm gap-2">
        <Image src={"/icons/search.svg"} alt="search" width={16} height={16} />
        <input
          type="text"
          value={search}
          className="outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearch(value);
          }}
        />
      </div>
      <button
        onClick={() => setOpenFilterForm((prev) => !prev)}
        className="rounded-4xl flex items-center gap-2 bg-[#006D79] py-2 px-4 h-13 "
      >
        <Image src={"/icons/add.png"} alt="plus sign" width={16} height={16} />{" "}
        Submit new feedback
      </button>
      {openFilterForm && (
        <>
          <FeedbackForm setOpenFilterForm={setOpenFilterForm} />

          <div
            role="button"
            onClick={() => setOpenFilterForm(false)}
            className="fixed z-10 top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-xs "
          ></div>
        </>
      )}
    </div>
  );
};
const filterOptions: { value: string; label: string }[] = [
  { value: "", label: "All Feedbacks " },
  { value: "bug", label: "Only bugs " },
  { value: "feature", label: "Only feature requests " },
  { value: "other", label: "Only other" },
];
export default Filter;
