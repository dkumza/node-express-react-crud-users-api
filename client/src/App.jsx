import "./App.css";
import { Users } from "./components/Users";
import { Input } from "./components/Input";
import { UsersProvider } from "./components/UsersContext";

function App() {
   return (
      <UsersProvider>
         <div className="main-wrap">
            <Input />
            <Users />
         </div>
      </UsersProvider>
   );
}

export default App;
