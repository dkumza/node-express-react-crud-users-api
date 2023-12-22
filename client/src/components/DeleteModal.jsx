import { useContext } from "react";
import { UsersContext } from "./UsersContext";

export const DeleteModal = () => {
   const { setDel, handelDeleteUser, handleCancelDel } =
      useContext(UsersContext);

   return (
      <div
         className="absolute z-10"
         aria-labelledby="modal-title"
         role="dialog"
         aria-modal="true"
      >
         <div
            className="fixed inset-0 bg-zinc-200 bg-opacity-75 transition-opacity"
            onClick={() => setDel(false)}
         ></div>
         <div className="relative top-7 p-4 w-full min-w-full min-h-full">
            <div className="relative bg-white rounded-lg border border-sky-200">
               <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  data-modal-hide="popup-modal"
                  onClick={handleCancelDel}
               >
                  <svg
                     className="w-3 h-3"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 14 14"
                  >
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                     />
                  </svg>
                  <span className="sr-only">Close modal</span>
               </button>
               <div className="p-4 md:p-5 text-center">
                  <svg
                     className="mx-auto mb-4 text-gray-400 w-12 h-12 "
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 20 20"
                  >
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                     />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                     Are you sure you want to remove this user?
                  </h3>
                  <div className="btn-w flex justify-center gap-4">
                     <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="btn-del"
                        onClick={handelDeleteUser}
                     >
                        Yes, I'm sure
                     </button>
                     <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="btn-del btn-edit "
                        onClick={handleCancelDel}
                     >
                        No, cancel
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
