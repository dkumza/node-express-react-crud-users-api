/* eslint-disable react/prop-types */
export const UsersTowns = ({ handleTowns, showTowns, towns }) => {
   return (
      <div className="flex flex-col justify-center items-center">
         <h1 className="text-center m-4 font-semibold text-2xl">Users Towns</h1>
         <button
            onClick={handleTowns}
            className="mb-2 py-2 px-5 border w-fit rounded-full bg-lime-100 hover:bg-lime-300"
         >
            Show Towns
         </button>
         <div className="towns-wrap flex gap-4 flex-wrap items-center justify-center">
            {showTowns &&
               towns &&
               towns.map((town, index) => (
                  <div
                     className="flex flex-col border w-56 py-2 px-4 text-center justify-center items-center bg-sky-100 border border-sky-500 rounded-md"
                     key={index}
                  >
                     {town}
                  </div>
               ))}
         </div>
      </div>
   );
};
