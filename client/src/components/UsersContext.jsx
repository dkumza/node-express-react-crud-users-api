import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

const MAIN_URL = "http://localhost:3000/api/users";

export const UsersProvider = ({ children }) => {
   const [users, setUsers] = useState(null); // users from DB
   const [editing, setEditing] = useState(false); // state for editing
   const [editingUser, setEditingUser] = useState(null); // state for editing user
   const [del, setDel] = useState(false); // state to show modal to delete
   const [toDel, setToDel] = useState(null); // state for delete user
   const [originalName, setOriginalName] = useState(""); // show name of editing user as static value
   // new user states
   const [newName, setNewName] = useState("");
   const [newTown, setNewTown] = useState("");
   const [newDriver, setNewDriver] = useState(false);
   // error / validation message states
   const [errOne, setErrOne] = useState(null);
   const [errTwo, setErrTwo] = useState("");

   useEffect(() => {
      axios
         .get(MAIN_URL)
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
         .delete(`${MAIN_URL}/${toDel}`)
         .then((res) => {
            setUsers(res.data);
         })
         .catch((error) => {
            console.warn("Error:", error);
         });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const newUser = {
         name: newName,
         town: newTown,
         isDriver: newDriver,
      };
      //   send newUser obj to server
      axios
         .post(`${MAIN_URL}`, newUser)
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
            newName,
            setNewName,
            newTown,
            setNewTown,
            newDriver,
            setNewDriver,
            errOne,
            setErrOne,
            errTwo,
            setErrTwo,
            handleEdit,
            handleSubmit,
            handleCancel,
         }}
      >
         {children}
      </UsersContext.Provider>
   );
};
