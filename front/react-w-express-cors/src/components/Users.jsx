export const Users = ({ users }) => {
   if (!users) return;
   return (
      <div className="flex gap-4 flex-wrap">
         {users.map((user) => (
            <div
               className="flex flex-col border w-56 py-2 px-4 text-center"
               key={user.id}
            >
               <div>Name: {user.name}</div>
               <div>Town: {user.town}</div>
            </div>
         ))}
      </div>
   );
};
