const fetch = require('node-fetch');
const test = require('tape');
const { spawn } = require('node:child_process');

const serverStart = () => new Promise((resolve, reject) => {
    const server = spawn('node', ['../server.js'], {
        env: Object.assign({}, process.env, { PORT: 0 }),
        cwd: __dirname,
    });
    server.stdout.once('data', async (data) => {
       const message = data.toString().trim();
       const url = /Server listening at (.+)$/.exec(message)[1];
       resolve({server, url});
    });
});

test('GET /recipes/42', async (t) => {
    const { server, url } = await serverStart();
    const result = await fetch(`${url}/recipes/42`).then(r => r.json());
    t.equal(result.id, 42);
    server.kill();
});

test('GET', async (t) => {
    const { server, url } = await serverStart();
    const result = await fetch(`${url}/`).then(r => r.text());
    t.equal(result, 'Hello from Distributed Node!');
    server.kill();
});