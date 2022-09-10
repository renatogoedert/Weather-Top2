"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    logger.info("Accounts rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Accounts details",
      user: loggedInUser,
    };
    response.render("account", viewData);
  },


  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && user.password == request.body.password) {
      response.cookie("station", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/");
    }
  },
  
  updateUser(request, response) {
    const user = accounts.getCurrentUser(request);
    const updatedUser = request.body
    userstore.updateUser(user, updatedUser)
      response.redirect("/account");
    
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  }
};

module.exports = accounts;