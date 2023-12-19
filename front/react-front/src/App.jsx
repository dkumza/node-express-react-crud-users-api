import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { Users } from "./components/Users";
import { UsersTowns } from "./components/UsersTowns";
import { Input } from "./components/Input";

const USERS_URL = "http://localhost:3000/api/users";
const USERS_TOWNS = "http://localhost:3000/api/users/town";

function App() {
   const [users, setUsers] = useState(null);
   // const [showTowns, setShowTowns] = useState(false);
   // const [towns, setTowns] = useState(null);

   useEffect(() => {
      handleUsers();
   }, []);

   const handleUsers = () => {
      axios.get(USERS_URL).then((res) => {
         setUsers(res.data);
      });
   };

   // shows users towns on click
   // const handleTowns = () => {
   //    setShowTowns((prevState) => !prevState);
   //    axios.get(USERS_TOWNS).then((res) => {
   //       // console.log(res.data);
   //       setTowns(res.data);
   //    });
   // };

   return (
      <div className="container mx-auto md:w-4/6 min-h-screen p-12">
         <Input handleUsers={handleUsers} />
         <h1 className="text-center mb-4 font-semibold text-2xl">
            Users From Server
         </h1>
         <Users users={users} setUsers={setUsers} />
         {/* <UsersTowns
            handleTowns={handleTowns}
            showTowns={showTowns}
            towns={towns}
         /> */}
      </div>
   );
}

export default App;
