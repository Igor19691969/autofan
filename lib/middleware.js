'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  },


  requiresLogin : function (req, res, next) {
      //console.log(req.user);
      if (req.isAuthenticated() && req.user.role=='admin') return next()
      /*if (req.user.role!='admin'){
          res.redirect('/')
      }*/

    if (req.method == 'GET')
        req.session.returnTo = req.originalUrl
    res.redirect('/ru/login')
  }
};
