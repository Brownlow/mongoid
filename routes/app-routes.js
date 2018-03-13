var indexRoutes = require('./index-routes.js');

module.exports = function(app){
    app.use('/', indexRoutes);
};
