const ObjectID = require('mongodb').ObjectID;

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

	app.get('/api/heroes/:id', (req, res) => {
		const id = req.params.id;
		db.collection('heroes').findOne({ '_id': ObjectID(id) }, (err, hero) => {
			if (err) {
				res.send({ error: 'some error' });
			} else {
				res.send(hero);
			}
		})
	});

	app.put('/api/heroes/:id', (req, res) => {
			const id = req.params.id;
			const hero = {
				name: req.body.name,
				index: req.body.index
			};
			db.collection('heroes').update({ '_id': ObjectID(id) }, hero, (err, result) => {
				if (err) {
					res.send({ error: 'some error' });
				} else {
					res.send(hero);
				}
			});
	});

	app.post('/api/heroes', (req, res) => {
		const hero = { 
			name: req.body.name,
			index: req.body.index
		};
		db.collection('heroes').insert(hero, (err, result) => {
			if (err) {
				res.send({ error: 'some error' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});
}