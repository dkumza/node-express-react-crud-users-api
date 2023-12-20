/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const MAIN_URL = "http://localhost:3000/api";

export const Input = ({
   handleUsersFromServer,
   editing,
   setEditing,
   editingUser,
   setEditingUser,
}) => {
   const [newName, setNewName] = useState("");
   const [newTown, setNewTown] = useState("");
   const [newDriver, setNewDriver] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      const newUser = {
         name: newName,
         town: newTown,
         isDriver: newDriver,
      };
      //   send newUser obj to server
      axios
         .post(`${MAIN_URL}/users`, newUser)
         .then((resp) => {
            if (resp.status === 201) handleUsersFromServer();
         })
         .catch((error) => {
            console.warn("Error:", error);
         });
   };

   const handleEdit = (e) => {
      e.preventDefault();
      console.log(editingUser);
      // axios method to edit on endpoint

      // disable edit
      setEditingUser(null);
      setEditing(false);
   };

   const defaultStyle =
      "focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center";
   const defaultColor = editing
      ? "text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-yellow-300"
      : "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300";

   return (
      <div className="mb-6">
         <h1 className="text-center mb-2 font-semibold text-2xl">
            Enter new User
         </h1>
         <form
            className="max-w-sm mx-auto text-gray-900"
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
                  value={
                     editing && editingUser !== null
                        ? editingUser.name
                        : newName
                  }
                  onChange={(e) => {
                     {
                        editing
                           ? setEditingUser({
                                ...editingUser,
                                name: e.target.value,
                             })
                           : setNewName(e.target.value);
                     }
                  }}
                  type="name"
                  id="name"
                  className="border  text-sm rounded-lg  block w-full p-2.5 bg-sky-100 border-sky-600  focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter user name"
                  required
               />
            </div>
            <div className="mb-2">
               <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  User Town
               </label>
               <input
                  value={editingUser ? editingUser.town : newTown}
                  onChange={(e) => setNewTown(e.target.value)}
                  type="address"
                  id="address"
                  className="border  text-sm rounded-lg  block w-full p-2.5 bg-sky-100 border-sky-600  focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter user town"
                  required
               />
            </div>
            <div className="flex items-start ">
               <div className="flex items-center h-5">
                  <input
                     checked={editingUser ? editingUser.isDriver : newDriver}
                     onChange={(e) => setNewDriver(e.target.checked)}
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
            <button
               onClick={handleEdit}
               className={`${defaultStyle} ${defaultColor}`}
            >
               {editingUser ? "Edit" : "Create"}
            </button>
         </form>
      </div>
   );
};
