const express = require('express')
const { registerAccount, loginAccount, logoutAccount, forgotPassword, resetPassword, getAccountdetails, updatePassword, updateAccountDetails, getAllAccounts, getSingleAccount, updateAccountRole, deleteAccount } = require('../controllers/accountController')
const {isUserAuth,authorizarionRole} = require("../middleware/auth")

const router = express.Router()

router.route('/register').post(registerAccount)
router.route('/login').post(loginAccount)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword);
router.route('/password/update').put(isUserAuth,updatePassword)
router.route('/me').get(isUserAuth,getAccountdetails)
router.route('/me/update').put(isUserAuth,updateAccountDetails)
router.route('/logout').get(isUserAuth,logoutAccount)
router.route('/admin/users').get(isUserAuth,authorizarionRole("admin"),getAllAccounts)
router.route('/admin/user/:id').get(isUserAuth,authorizarionRole("admin"),getSingleAccount).put(isUserAuth,authorizarionRole("admin"),updateAccountRole).delete(isUserAuth,authorizarionRole("admin"),deleteAccount)
module.exports =router

