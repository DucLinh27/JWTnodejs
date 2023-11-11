import db from "../models/index";

const getRole = async (email) => {
  let roles = await db.User.findOne({
    where: { id: User.roleId },
    include: [{ model: db.User }],
  });
  console.log("check roles" + roles);
};
module.exports = {
  getRole,
};
