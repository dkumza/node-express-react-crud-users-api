/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UsersContext } from "./UsersContext";
import { DeleteModal } from "./DeleteModal";

export const Input = () => {
   const {
      name,
      setName,
      town,
      setTown,
      driver,
      setDriver,
      editing,
      editingUser,
      originalName,
      errOne,
      errTwo,
      handleEdit,
      handleSubmit,
      handleCancel,
      del,
   } = useContext(UsersContext);

   const defaultStyle =
      "focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center";

   return (
      <div className="mb-6 relative flex flex-col items-center w-full">
         {del ? <DeleteModal /> : null}
         <h1 className="text-center mb-2 font-semibold text-2xl">
            {/* shows original name as static editing user name value */}
            {editing ? `Editing - ${originalName}` : " Enter new User"}
         </h1>
         <form
            className="max-w-sm mx-auto text-gray-900 w-full"
            onSubmit={handleSubmit}
         >
            <div className="mb-2">
               <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  User Name
               </label>
               <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="name"
                  id="name"
                  className="border  text-sm rounded-lg outline-sky-500  block w-full p-2.5 bg-sky-100 border-sky-300  focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter user name"
                  // required
               />
               {errOne && (
                  <div className="err-wrap text-xs text-rose-500">{errOne}</div>
               )}
            </div>
            <div className="mb-2">
               <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  User Town
               </label>
               <input
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  type="address"
                  id="address"
                  className="border  text-sm rounded-lg outline-sky-500  block w-full p-2.5 bg-sky-100 border-sky-300  focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter user town"
                  // required
               />
               {errTwo && (
                  <div className="err-wrap text-xs text-rose-500">{errTwo}</div>
               )}
            </div>
            <div className="flex items-start ">
               <div className="flex items-center h-5">
                  <input
                     checked={driver}
                     onChange={(e) => setDriver(e.target.checked)}
                     id="remember"
                     type="checkbox"
                     className="w-4 h-4 border border-sky-300 rounded focus:ring-3 focus:ring-blue-300 "
                  />
               </div>
               <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium mb-2"
               >
                  Driving?
               </label>
            </div>
            {editing ? (
               <div className="edit-btns flex gap-4">
                  <button
                     onClick={(e) => handleEdit(e, editingUser.id)}
                     className={`${defaultStyle}text-black bg-green-400 hover:bg-green-400 focus:ring-lime-400`}
                  >
                     Save
                  </button>
                  <button
                     onClick={(e) => handleCancel(e)}
                     className={`${defaultStyle}text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-yellow-400`}
                  >
                     Cancel
                  </button>
               </div>
            ) : (
               <button
                  className={`${defaultStyle} text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300`}
               >
                  Create
               </button>
            )}
         </form>
      </div>
   );
};
