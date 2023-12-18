"use strict";

const usersWrap = document.querySelector(".users-wrap");
const townWrap = document.querySelector(".towns-wrap");
const townsBtn = document.querySelector(".btn-1");

console.log("front.js file was loaded");

const usersUrl = "http://localhost:3000/api/users";
const USERS_TOWNS = "http://localhost:3000/api/users/town";

// parsisiusti vartotojus ir iskonsolinti
// pakeiciau
async function getUsers(url) {
   try {
      const resp = await fetch(url);
      // console.log('resp ===', resp);
      const usersData = await resp.json();
      usersData.map((user) => {
         // console.log(user);
         usersWrap.innerHTML += `<p class="user">${user.name}</p>`;
      });
      // console.log("usersData ===", usersData);
   } catch (error) {
      console.warn(error);
   }
}
// getUsers(`${usersUrl}/1`);
// getUsers(`${usersUrl}/2`);
getUsers(`${usersUrl}`);

async function getDrivers(url) {
   try {
      const resp = await fetch(url);
      // console.log('resp ===', resp);
      const usersData = await resp.json();
      usersData.map((town) => {
         // console.log(town);
         townWrap.innerHTML += `<p class="user">${town}</p>`;
      });
      // console.log("usersData ===", usersData);
   } catch (error) {
      console.warn(error);
   }
}

townsBtn.addEventListener("click", () => {
   getDrivers(USERS_TOWNS);
});
