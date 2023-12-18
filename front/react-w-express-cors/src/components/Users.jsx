export const Users = ({ users }) => {
   if (!users) return;
   return (
      <div className="flex gap-4 flex-wrap items-center justify-center">
         {users.map((user) => (
            <div
               className="flex flex-col border w-56 py-2 px-4 text-center justify-center items-center bg-sky-100 border border-sky-500 rounded-md"
               key={user.id}
            >
               <div>Name: {user.name}</div>
               <div>Town: {user.town}</div>
               <button className="px-4 my-1 border w-fit rounded-full bg-rose-400">
                  delete
               </button>
            </div>
         ))}
      </div>
   );
};
