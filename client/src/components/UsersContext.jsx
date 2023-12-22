import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

const USERS_URL = "http://localhost:3000/api/users";

export const UsersProvider = ({ children }) => {
   const [users, setUsers] = useState(null); // users from DB
   const [editing, setEditing] = useState(false); // state for editing
   const [editingUser, setEditingUser] = useState(null); // state for editing user
   const [del, setDel] = useState(false); // state to show modal to delete
   const [toDel, setToDel] = useState(null); // state for delete user
   const [originalName, setOriginalName] = useState(""); // show name of editing user as static value

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

   return (
      <UsersContext.Provider
         value={{
            users,
            setUsers,
            editing,
            setEditing,
            editingUser,
            setEditingUser,
            del,
            setDel,
            toDel,
            setToDel,
            originalName,
            setOriginalName,
            handleDelete,
            handleEditUser,
         }}
      >
         {children}
      </UsersContext.Provider>
   );
};
