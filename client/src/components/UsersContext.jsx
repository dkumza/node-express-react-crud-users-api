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
   const [name, setName] = useState(""); //
   const [town, setTown] = useState("");
   const [driver, setDriver] = useState(false);
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

   const handleSubmit = (e) => {
      e.preventDefault();
      const newUser = {
         name: name,
         town: town,
         isDriver: driver,
      };
      //   send newUser obj to server
      axios
         .post(`${MAIN_URL}`, newUser)
         .then((res) => {
            if (res.status === 201) {
               setUsers(res.data.users);
               setName("");
               setTown("");
               setDriver(false);
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

   const handleFormFill = (id) => {
      const found = users.find((user) => user.id === id); // if user exists fill input fields
      setName(found.name);
      setTown(found.town);
      setDriver(found.isDriver);
   };

   const handleEditUser = (user) => {
      handleFormFill(user.id);
      setEditingUser(user);
      setEditing(true);
      setOriginalName(user.name); // create static name to show on edit screen
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
         .put(`${MAIN_URL}/${id}`, editUser)
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

   const handelDeleteUser = () => {
      // send to server to delete user by ID = toDel
      handleDelete(toDel);
      // reset modal / user ID
      setToDel(null);
      setDel(false);
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

   const handleCancel = (e) => {
      e.preventDefault();
      setEditingUser(null);
      setEditing(false);
   };

   const handleCancelDel = () => {
      setToDel(null);
      setDel(false);
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
            name,
            setName,
            town,
            setTown,
            driver,
            setDriver,
            errOne,
            setErrOne,
            errTwo,
            setErrTwo,
            handleEdit,
            handleSubmit,
            handleCancel,
            handelDeleteUser,
            handleCancelDel,
            handleFormFill,
         }}
      >
         {children}
      </UsersContext.Provider>
   );
};
