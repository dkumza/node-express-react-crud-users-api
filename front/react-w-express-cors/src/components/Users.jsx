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
               className="flex flex-col border w-56 py-2 px-4 text-center justify-center items-center bg-sky-100 border border-sky-500 rounded-md"
               key={user.id}
            >
               <div>Name: {user.name}</div>
               <div>Town: {user.town}</div>
               <button
                  className="px-4 my-1 border w-fit rounded-full bg-rose-400"
                  onClick={() => {
                     handleDelete(user.id);
                  }}
               >
                  delete
               </button>
            </div>
         ))}
      </div>
   );
};
