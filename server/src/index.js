const app = require('express')();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const faunadb = require('faunadb');
const client = new faunadb.Client({ secret: 'fnAD4UGh0xACBTwm-0B0iYeGBdUbxYH7Hm5dvrFW' });

const {
    Paginate,
    Get,
    Select,
    Match,
    Index,
    Create,
    Ref,
    Collection,
    Map,
    Lambda,
    Var,
    Join,
    Delete
} = faunadb.query;


// remove feed
app.delete('/feed', async (req, res) => {
    console.log('deleting feed:', req.query);
    console.log('deleting feed:', req.query.id);

    client.query(
        Delete(
            Ref(Collection('feeds'), req.query.id)
        )
    )
    .then((ret) => {
        console.log('delete feed', req.query.id);
        res.send('ok');
    })
    .catch(e => {
        console.log('could not delete feed', e);
        res.send('could not delete feed');
});

    // return res.send('ok');
});

// add feed
app.post('/feed', async (req, res) => {
    console.log('adding new feed: ', req.body);

    try {
        // find user
        // let user = Select('ref', Get(Match(Index('users_by_name'), req.body.author)));

        const data = {
            // author: Select('ref', Get(Match(Index('users_by_name'), req.body.author))),
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            images: req.body.images
        };

        console.log('saving feed:', data);

        const doc = await client.query(
            Create(
                Collection('feeds'),
                { data }
            )
        )

        res.send(doc);
    }
    catch (e) {
        console.error(e);
        res.send(null);
    }
});

// alle user
app.get('/users', async (req, res) => {
    try {
        const docs = await client.query(
            Map(Paginate(Match(Index('all_users'))), Lambda("X", Get(Var("X"))))
        );

        res.send(docs);
    }
    catch (e) {
        console.log('no users found', e);
        return res.send([]);
    }
});

// alle feeds
app.get('/feeds', async (req, res) => {
    try {
        const docs = await client.query(
            Map(Paginate(Match(Index('all_feeds'))), Lambda("X", Get(Var("X"))))
        );
        res.send(docs);
    }
    catch (e) {
        console.log('no feeds found', e);
        return res.send([]);
    }
});

app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});