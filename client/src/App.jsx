import "./App.css";
import { Users } from "./components/Users";
import { Input } from "./components/Input";
import { DeleteModal } from "./components/DeleteModal";
import { UsersProvider } from "./components/UsersContext";

function App() {
   return (
      <UsersProvider>
         <div className="container mx-auto md:w-4/6 min-h-screen min-w-full p-12 relative flex flex-col items-center">
            {/* {del ? <DeleteModal {...delModalProps} /> : null} */}
            <Input />
            <Users />
         </div>
      </UsersProvider>
   );
}

export default App;
