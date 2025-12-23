"use server"
import Feedbacks from "./_components/Feedbacks";
import Filter from "./_components/Filter";
import Image from "next/image";
 import { Geist } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Page = async({searchParams}: {searchParams: Promise<{ type?: string, search?: string }>}) => {
  const params = await searchParams;
  const type =  params.type ?? ""
  const search = params.search ??""
  
  return (
    <div className=" px-4 lg:px-8 py-8">
      <div className="">
        <h2   className={`${geistSans.className} font-semibold text-black text-[32px]  font-geist-sans`}>
          Got a complain or feedback?
        </h2>
        <div className="flex items-center">
          <div className="px-2 flex items-center ">
            {team.map((item, index) => (
              <div
                key={index}
                className={`size-5 rounded-full inline-block -ml-1.5 border  border-white bg-gray-200 z-[${index}]`}
              >
                <Image 
                src={item}
                alt="avater"
                width={20}
                height={20}
                />
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            Our support team is ready to listen and resolve.
          </p>
        </div>
      </div>
      <Filter />
      <Feedbacks type={type} search={search}/>
    </div>
  );
};

const team =[
  "/team/user-1.png",
  "/team/user-2.png",
  "/team/user-3.png",
  "/team/user-4.png",
]

export default Page;
