import { useContext } from "react";
import { UsersContext } from "./UsersContext";

/* eslint-disable react/prop-types */
export const Users = () => {
   const { users, handleEditUser, setDel, setToDel } = useContext(UsersContext);

   if (users === null) return;

   return (
      <div className="flex gap-4 flex-wrap items-center justify-center md:w-3/6">
         <h1 className="text-center mb-2 font-semibold text-2xl">
            Users From Server
         </h1>
         {users.length === 0 && (
            <div className="uppercase text-xs text-gray-400">
               No Users found. Enter new user above
            </div>
         )}
         {users &&
            users.map((user) => (
               <div
                  className="flex  w-full px-4 py-2 text-center justify-between items-center bg-sky-100 border border-sky-300 rounded-lg gap-2"
                  key={user.id}
               >
                  <div className="user-wrap flex gap-2">
                     <div className="">NAME: {user.name}.</div>
                     <div>TOWN: {user.town}.</div>
                     <div className="">
                        DRIVER: {user.isDriver ? "YES" : "NO"}.
                     </div>
                  </div>
                  <div className="btn-wrap flex gap-2">
                     <button
                        className="btn-del"
                        onClick={() => {
                           setDel(true);
                           setToDel(user.id);
                        }}
                     >
                        Delete
                     </button>
                     <button
                        onClick={() => handleEditUser(user)}
                        className="btn-del btn-edit"
                     >
                        Edit
                     </button>
                  </div>
               </div>
            ))}
      </div>
   );
};
