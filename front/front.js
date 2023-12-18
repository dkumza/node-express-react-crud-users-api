"use strict";

const usersWrap = document.querySelector(".users-wrap");
const townWrap = document.querySelector(".towns-wrap");
const townsBtn = document.querySelector(".btn-1");
let delUserBtn = "";

console.log("front.js file was loaded");

const USERS_URL = "http://localhost:3000/api/users";
const USERS_TOWNS = "http://localhost:3000/api/users/town";

// parsisiusti vartotojus ir iskonsolinti
// pakeiciau
async function getUsers(url) {
   try {
      const resp = await fetch(url);
      const usersData = await resp.json();
      usersData.map((user) => {
         usersWrap.innerHTML += `<div class="user">
         <p>${user.name}</p>
         <div id="${user.id}" class="btn-1 btn-del">del</div>
         </div>`;
      });
      delUserBtn = document.querySelectorAll(".btn-del");
      delUserBtn.forEach((btn) =>
         btn.addEventListener("click", (e) => {
            deleteUser(USERS_URL, e.target.id);
         })
      );
   } catch (error) {
      console.warn(error);
   }
}

getUsers(`${USERS_URL}`);

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

async function deleteUser(url, userId) {
   try {
      const resp = await fetch(`${url}/${userId}`, { method: "DELETE" });
      const usersData = await resp.json();
      usersWrap.innerHTML = ``;
      usersData.map((user) => {
         usersWrap.innerHTML += `<div class="user">
         <p>${user.name}</p>
         <div id="${user.id}" class="btn-1 btn-del">del</div>
         </div>`;
      });
      delUserBtn = document.querySelectorAll(".btn-del");
      delUserBtn.forEach((btn) =>
         btn.addEventListener("click", (e) => {
            deleteUser(USERS_URL, e.target.id);
         })
      );
   } catch (error) {
      console.warn(error);
   }
}
