const heroesRoutes = require('./heroes_routes');
module.exports = (app, db) => {
	heroesRoutes(app, db);
};