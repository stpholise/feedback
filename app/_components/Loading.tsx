export const  TrippleSpiner = () => {
  return (
   
      
      <div className="loader z-80 min-h-max absolute top-[calc(50%-40px)] left-[calc(50%-40px)] h-20 w-20">
        <div className={"inner one left-0 top-0 animate-rotate-one border-t-2 border-blue-500 h-full w-full absolute rounded-full"}></div> 
        <div className={"inner two right-0 top-0 animate-rotate-two border-r-2 border-blue-500 h-full w-full rounded-full absolute"}></div>
        <div className={"inner two right-0 bottom-0 animate-rotate-three border-r-2 border-blue-500 h-full w-full absolute rounded-full "}></div>
      </div>

  );
};
 