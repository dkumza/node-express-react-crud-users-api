// VALIDATE if input meets requirements
const validateUser = (req, res, next) => {
   const { name, town } = req.body; // spread req.body and take needed vars

   //   validate name
   if (name.trim().length < 3)
      return res.status(400).json({
         field: "name",
         msg: "Name must be at least 3 letters ",
      });
   //   validate town
   if (town.trim().length < 3)
      return res.status(400).json({
         field: "town",
         msg: "Town must be at least 3 letters ",
      });

   next();
};

module.exports = {
   validateUser,
};
