const express = require('express');
const { sequelize, User, Post } = require('./models');

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
    const { name, email, role } = req.body;
    try{
        const user = await User.create({ name, email, role });
        res.status(201).json(user);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.get('/users', async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.get('/users/:uuid', async (req, res) => {
    const { uuid } = req.params;
    try{
        const user = await User.findOne({where: {uuid}, include: 'posts'});
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.put('/users/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const { name, email, role } = req.body;
    try{
        const user = await User.findOne({where: {uuid}});
        if(!user) return res.status(404).json({ message: 'User not found' });
        
        user.name = name;
        user.email = email;
        user.role = role;
        await user.save();
        res.status(200).json({ message: 'User updated' });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.delete('/users/:uuid', async (req, res) => {
    const { uuid } = req.params;
    try{
        const user = await User.findOne({where: {uuid}});
        if(!user) return res.status(404).json({ message: 'User not found' });
        await user.destroy();
        res.status(200).json({ message: 'User deleted' });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.post('/posts', async (req, res) => {
    const { userUuid, body } = req.body;
    try{
        const user = await User.findOne({where: {uuid: userUuid}});
        const post = await Post.create({ body, userId: user.id });
        res.status(201).json(post);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.get('/posts', async (req, res) => {
    try{
        const posts = await Post.findAll({include: [{model: User, as: 'user'}]});
        res.status(200).json(posts);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

app.listen(3000, async () => {
    console.log('Server started on port 3000');
    await sequelize.authenticate();
    console.log('Database connected');
});