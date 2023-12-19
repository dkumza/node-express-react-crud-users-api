/* eslint-disable react/prop-types */
import axios from "axios";
const USERS_URL = "http://localhost:3000/api/users";

export const Users = ({ users, setUsers }) => {
   if (users === null) return;

   const handleDelete = (id) => {
      axios.delete(`${USERS_URL}/${id}`).then((res) => {
         console.log(res.data);
         setUsers(res.data);
      });
   };
   return (
      <div className="flex gap-4 flex-wrap items-center justify-center">
         {users.length === 0 && (
            <div className="uppercase text-xs">
               No Users... Enter new user above
            </div>
         )}
         {users &&
            users.map((user) => (
               <div
                  className="flex  w-full px-4 py-2 text-center justify-between items-center bg-sky-100 border border-sky-500 rounded-lg gap-2"
                  key={user.id}
               >
                  <div className="user-wrap flex gap-2">
                     <div className="">NAME: {user.name}.</div>
                     <div>TOWN: {user.town}.</div>
                     {/* {console.log(user)} */}
                     <div className="">
                        DRIVER: {user.isDriver ? "YES" : "NO"}.
                     </div>
                  </div>
                  <div className="btn-wrap flex gap-2">
                     <button
                        className="btn-del"
                        onClick={() => {
                           handleDelete(user.id);
                        }}
                     >
                        Delete
                     </button>
                     <button className="btn-del btn-edit">Edit</button>
                  </div>
               </div>
            ))}
      </div>
   );
};
