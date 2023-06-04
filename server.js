const server = require('fastify')();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 8000;
const Recipe = require('./recipe');

server.get('/', async (req, res) => {
    const recipe = new Recipe(req.params.id);
    await recipe.hydrate();
    return recipe;
});

server.listen({
    host: HOST,
    port: PORT,
}, (err, host) => {
   console.log(`Server listening at ${host}`);
});