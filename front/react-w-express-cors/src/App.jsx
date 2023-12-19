import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { Users } from "./components/Users";

const USERS_URL = "http://localhost:3000/api/users";
function App() {
   const [users, setUsers] = useState(null);

   useEffect(() => {
      axios.get(USERS_URL).then((res) => {
         console.log(res.data);
         setUsers(res.data);
      });
   }, []);

   return (
      <div className="container mx-auto md:w-4/6 border min-h-screen p-12">
         <h1 className="text-center mb-4 font-semibold text-2xl">
            Users From Server
         </h1>
         <Users users={users} setUsers={setUsers} />
      </div>
   );
}

export default App;
