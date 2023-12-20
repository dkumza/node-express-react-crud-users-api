import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { Users } from "./components/Users";
// import { UsersTowns } from "./components/UsersTowns";
import { Input } from "./components/Input";

const USERS_URL = "http://localhost:3000/api/users";
// const USERS_TOWNS = "http://localhost:3000/api/users/town";

function App() {
   const [users, setUsers] = useState(null);
   const [editing, setEditing] = useState(false);
   const [editingUser, setEditingUser] = useState(null);

   useEffect(() => {
      handleUsersFromServer();
   }, []);

   const handleUsersFromServer = () => {
      axios
         .get(USERS_URL)
         .then((res) => {
            setUsers(res.data);
         })
         .catch((error) => {
            console.warn("Error:", error);
         });
   };

   const handleEditUser = (user) => {
      setEditingUser(user);
      setEditing(true);
   };

   return (
      <div className="container mx-auto md:w-4/6 min-h-screen p-12">
         <Input
            users={users}
            handleUsersFromServer={handleUsersFromServer}
            editing={editing}
            setEditing={setEditing}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
         />
         <h1 className="text-center mb-4 font-semibold text-2xl">
            Users From Server
         </h1>
         <Users
            users={users}
            setUsers={setUsers}
            handleEditUser={handleEditUser}
         />
         {/* <UsersTowns
            handleTowns={handleTowns}
            showTowns={showTowns}
            towns={towns}
         /> */}
      </div>
   );
}

export default App;

// shows users towns on click
// const [showTowns, setShowTowns] = useState(false);
// const [towns, setTowns] = useState(null);
// const handleTowns = () => {
//    setShowTowns((prevState) => !prevState);
//    axios.get(USERS_TOWNS).then((res) => {
//       setTowns(res.data);
//    });
// };
