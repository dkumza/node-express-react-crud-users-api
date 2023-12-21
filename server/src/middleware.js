// VALIDATE if input meets requirements
const validateUser = (req, res, next) => {
   const { name, town } = req.body; // spread req.body and take needed vars

   //   validate name && town
   if (name.trim().length < 3 && town.trim().length < 3)
      return res.status(400).json({
         field_1: "name",
         msg_1: "Name must be at least 3 letters ",
         field_2: "town",
         msg_2: "Town must be at least 3 letters ",
      });

   //   validate name
   if (name.trim().length < 3)
      return res.status(400).json({
         field_1: "name",
         msg_1: "Name must be at least 3 letters ",
      });
   //   validate town
   if (town.trim().length < 3)
      return res.status(400).json({
         field_2: "town",
         msg_2: "Town must be at least 3 letters ",
      });

   next();
};

module.exports = {
   validateUser,
};
