import express from 'express';

import conn from '../lib/mongodb.mjs';
import { ObjectId } from 'mongodb';

const api = express.Router();

api.get('/', async (req, res) => {
    res.json({ status: 400, message: 'No API here at /api' }).status(400);
});

async function downloadData(uuid) {
    const db = conn.db(process.env.DATABASE_NAME);
    try {
        const data = await db.collection('todos').findOne({ uuid });
        // console.log('download: ' + JSON.stringify({ uuid: data.uuid, todoList: data.todoList }));
        return { uuid: data.uuid, todoList: data.todoList, timestamp: data.timestamp };
    } catch (e) {
        console.error(e);
    }
}

async function uploadData(uuid, todoList) {
    // console.log('upload: ' + JSON.stringify({ uuid, todoList }));
    const db = conn.db(process.env.DATABASE_NAME);
    try {
        const res = await db.collection('todos').replaceOne(
            { uuid },
            { uuid, todoList, timestamp: (new Date()).toLocaleString() },
            { upsert : true }
        );
        return { echo: { uuid, todoList }, response: { status: 200, message: 'OK', ...res }};
    } catch (e) {
        console.error(e);
        return { echo: { uuid, todoList }, response: { status: 400, message: e.toString() }};
    }
}

api.get('/todos', async (req, res) => {
    if (req.method !== 'POST') {
        res.json({ status: 405, message: 'only POST request is supported' });
        return;
    }
});

api.post('/todos', async (req, res) => {
    const reqBody = req.body;
    if (!reqBody?.method) {
        res.json({ status: 400, message: 'POST should have `method` field' });
        return;
    }
    try {
        switch (reqBody.method) {
            case 'READ':
                if (!reqBody.uuid) {
                    res.json({
                        status: 400,
                        message: 'POST READ should have `uuid` field',
                    });
                    return;
                }
                const data = await downloadData(reqBody.uuid);
                res.json({ status: 200, data });
                return;
            case 'CREATE':
            case 'UPDATE':
                if (!reqBody.uuid || !reqBody.todoList) {
                    res.json({
                        status: 400,
                        message: 'POST CREATE or UPDATE should have `uuid` and `todoList` fields',
                    });
                    return;
                }
                let {echo, response} = await uploadData(reqBody.uuid, reqBody.todoList);
                res.json({ status: 200, echo, response });
                return;
            default:
                res.json({
                    status: 405,
                    message: 'POST `method` field should be `CREATE`, `UPDATE` or `READ`',
                });
                return;
        }
    } catch (e) {
        res.json({ status: 400, message: e.toString() });
        throw e;
    }
});

export default api;
