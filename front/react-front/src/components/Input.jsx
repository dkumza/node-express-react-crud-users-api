/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const MAIN_URL = "http://localhost:3000/api";

export const Input = ({
   setUsers,
   editing,
   setEditing,
   editingUser,
   setEditingUser,
   originalName,
}) => {
   // new user states
   const [newName, setNewName] = useState("");
   const [newTown, setNewTown] = useState("");
   const [newDriver, setNewDriver] = useState(false);
   // error / validation message states
   const [errOne, setErrOne] = useState(null);
   const [errTwo, setErrTwo] = useState("");

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
         .then((res) => {
            if (res.status === 201) {
               setUsers(res.data.users);
               setNewName("");
               setNewTown("");
               setNewDriver(false);
               setErrOne(null);
               setErrTwo(null);
            }
         })
         .catch((error) => {
            console.warn("Error while creating new User:", error);
            const { status, data } = error.response;
            if (status === 400) {
               setErrOne(data.msg_1);
               setErrTwo(data.msg_2);
            }
         });
   };

   const handleEdit = (e, id) => {
      e.preventDefault();
      const editUser = {
         name: editingUser.name,
         town: editingUser.town,
         isDriver: editingUser.isDriver,
      };
      // axios method to edit on endpoint
      axios
         .put(`${MAIN_URL}/users/${id}`, editUser)
         .then((res) => {
            if (res.status === 200) {
               setUsers(res.data.users);
               console.log(editUser);
               setEditingUser(null);
               setEditing(false);
               setErrOne(null);
               setErrTwo(null);
            }
         })
         .catch((error) => {
            console.warn("Error while editing User:", error);
            const { status, data } = error.response;
            if (status === 400) {
               setErrOne(data.msg_1);
               setErrTwo(data.msg_2);
            }
         });
   };

   const handleCancel = (e) => {
      e.preventDefault();
      setEditingUser(null);
      setEditing(false);
   };

   const defaultStyle =
      "focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center";

   return (
      <div className="mb-6 w-full">
         <h1 className="text-center mb-2 font-semibold text-2xl">
            {/* shows original name as static editing user name value */}
            {editing ? `Editing - ${originalName}` : " Enter new User"}
         </h1>
         <form
            className="max-w-sm mx-auto text-gray-900"
            onSubmit={handleSubmit}
         >
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  User Name
               </label>
               <input
                  value={editing ? editingUser.name : newName}
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
                  value={editing ? editingUser.town : newTown}
                  onChange={(e) => {
                     {
                        editing
                           ? setEditingUser({
                                ...editingUser,
                                town: e.target.value,
                             })
                           : setNewTown(e.target.value);
                     }
                  }}
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
                     checked={editing ? editingUser.isDriver : newDriver}
                     onChange={(e) => {
                        {
                           editing
                              ? setEditingUser({
                                   ...editingUser,
                                   isDriver: e.target.checked,
                                })
                              : setNewDriver(e.target.checked);
                        }
                     }}
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
