
const router = require('express').Router();
const userController = require("./controllers/user.controller");

// USER ROUTES

// create user
router.post("/user/register", userController.createUser);
// Verify User
// router.get("/validate", userController.confirmEmail);
// login user
router.post("/user/login", userController.loginUser);
// Update User 
// router.put("/user/update/:id", userController.updateUser);
// Delete user
// router.delete("/user/delete/:id", userController.deleteUser);
// Delete Spam Users
// router.delete("/user/all/delete", userController.deleteSpamUsers)
// Get one User
// router.get("/user/get/:id",  userController.getOneUser);
// Get All Bscs
// router.get("/user/bscs/:id", userController.getAllBSCs)

// Get All Emails
// router.get("/user/emails/:id", userController.getAllEmails);
// Search For Users
router.get("/user/search", userController.searchUser);
// Search For Number of Users
router.get("/user/number", userController.getNoUsers);
// Get All Users
router.get("/user/all/",  userController.getAllUsers);
// // Forgot Passowrd
// router.post("/user/forgotpass", userController.forgotPassword);
// // Reset Passowrd
// router.put("/user/resetpassword", userController.resetPassword);
// // Get all Referrals
// router.get("/user/referrals", userController.getReferredUsers);
// // Send Amc
// router.put("/user/sendamc", userController.sendAMC);
// // Get History
// router.get("/history/get/:id", userController.getHistory);
router.post('/admin/login', userController.adminLogin);
// GET USER EMAILS
router.get("/user/emails/", userController.getAllEmails);

module.exports = router;