/* eslint-disable react/prop-types */
import axios from "axios";
const USERS_URL = "http://localhost:3000/api/users";

export const Users = ({ users, setUsers }) => {
   if (!users) return;

   const handleDelete = (id) => {
      axios.delete(`${USERS_URL}/${id}`).then((res) => {
         console.log(res.data);
         setUsers(res.data);
      });
   };
   return (
      <div className="flex gap-4 flex-wrap items-center justify-center">
         {users.map((user) => (
            <div
               className="flex flex-col w-56 py-4 px-6 text-center justify-center items-center bg-sky-100 border border-sky-500 rounded-lg gap-2"
               key={user.id}
            >
               <div>Name: {user.name}</div>
               <div>Town: {user.town}</div>
               {/* {console.log(user)} */}
               <div className="">Is Driver: {user.isDriver ? "YES" : "NO"}</div>
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
