const express = require('express');
const fs = require('fs');
const app = express();
app.set('view engine', 'ejs');


app.use(express.static(__dirname));

const statesData = require('./states.json');

app.get("/",(req,res) => {
    res.render('main');
})

function getFoodData(req, res) {
    const state = req.params.state;
    console.log('Requested state:', state);

    if (!statesData.states.includes(state)) {
        return res.status(404).send('State not found');
    }

    fs.readFile(`${__dirname}/food.json`, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            const jsonData = JSON.parse(data);

            if (!jsonData[state]) {
                return res.status(404).send('Data not found for this state');
            }

            const foodData = jsonData[state].map((item) => ({
                name: item.name,
                description: item.desc,
                image: item.link,
            }));

            res.render('index', { foodData });
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send('Error parsing JSON data');
        }
    });
}

statesData.states.forEach((state) => {
    app.get('/:state/food', getFoodData);
    // app.get("/:state/monuments",getMonumentsData);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
