import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { Users } from "./components/Users";
import { Input } from "./components/Input";
import { DeleteModal } from "./components/DeleteModal";

const USERS_URL = "http://localhost:3000/api/users";

function App() {
   const [users, setUsers] = useState(null);
   const [editing, setEditing] = useState(false);
   const [editingUser, setEditingUser] = useState(null);
   const [del, setDel] = useState(false);
   const [toDel, setToDel] = useState(null);
   // show name of editing user
   const [originalName, setOriginalName] = useState("");

   useEffect(() => {
      axios
         .get(USERS_URL)
         .then((res) => {
            setUsers(res.data);
         })
         .catch((error) => {
            console.warn("Error:", error);
         });
   }, []);

   const handleEditUser = (user) => {
      setEditingUser(user);
      setOriginalName(user.name); // create static name to show on edit screen
      setEditing(true);
   };

   const handleDelete = (toDel) => {
      axios
         .delete(`${USERS_URL}/${toDel}`)
         .then((res) => {
            setUsers(res.data);
         })
         .catch((error) => {
            console.warn("Error:", error);
         });
   };

   const inputProps = {
      setUsers,
      editing,
      setEditing,
      editingUser,
      setEditingUser,
      originalName,
   };

   const userProps = {
      users,
      handleEditUser,
      setDel,
      setToDel,
   };

   const delModalProps = {
      setDel,
      toDel,
      setToDel,
      handleDelete,
   };

   return (
      <div className="container mx-auto md:w-4/6 min-h-screen min-w-full p-12 relative flex flex-col items-center">
         {del ? <DeleteModal {...delModalProps} /> : null}
         <Input {...inputProps} />
         <h1 className="text-center mb-4 font-semibold text-2xl">
            Users From Server
         </h1>
         <Users {...userProps} />
      </div>
   );
}

export default App;

// const USERS_TOWNS = "http://localhost:3000/api/users/town";
{
   /* <UsersTowns
            handleTowns={handleTowns}
            showTowns={showTowns}
            towns={towns}
         /> */
}

// shows users towns on click
// const [showTowns, setShowTowns] = useState(false);
// const [towns, setTowns] = useState(null);
// const handleTowns = () => {
//    setShowTowns((prevState) => !prevState);
//    axios.get(USERS_TOWNS).then((res) => {
//       setTowns(res.data);
//    });
// };
