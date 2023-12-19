export const Input = () => {
   return (
      <div className="mb-6">
         <h1 className="text-center mb-2 font-semibold text-2xl">
            Enter new User
         </h1>
         <form className="max-w-sm mx-auto text-gray-900">
            <div className="mb-2">
               <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  User Name
               </label>
               <input
                  type="name"
                  id="name"
                  className="border  text-sm rounded-lg  block w-full p-2.5 bg-sky-100 border-sky-600  focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter user name"
                  required
               />
            </div>
            <div className="mb-2">
               <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  User Town
               </label>
               <input
                  type="address"
                  id="address"
                  className="border  text-sm rounded-lg  block w-full p-2.5 bg-sky-100 border-sky-600  focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter user town"
                  required
               />
            </div>
            <div className="flex items-start ">
               <div className="flex items-center h-5">
                  <input
                     id="remember"
                     type="checkbox"
                     value=""
                     className="w-4 h-4 border border-sky-300 rounded focus:ring-3 focus:ring-blue-300 "
                     required
                  />
               </div>
               <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium mb-2"
               >
                  Driving?
               </label>
            </div>
            <button
               type="submit"
               className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
               Create
            </button>
         </form>
      </div>
   );
};
