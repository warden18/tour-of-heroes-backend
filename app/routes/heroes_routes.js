module.exports = (app, db) => {
	app.get('/api/heroes', (req, res) => {
		db.collection('heroes').find({}).toArray((err, heroes) => {
			if (err) {
		 		res.send({ error: 'some error' });
			} else {
				res.send(heroes);
			}
		});	
	});

	app.post('/api/heroes', (req, res) => {
		const hero = { name: req.body.name };
		db.collection('heroes').insert(hero, (err, result) => {
			if (err) {
				res.send({ error: 'some error' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});
}