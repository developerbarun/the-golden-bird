const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path')
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const statesData = require('./states.json');

app.get("/", (req,res) => {
    res.render('home')
})

function getFoodData(req, res) {
    const state = req.params.state;

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


function getArtData(req, res) {
    const state = req.params.state;
    // console.log('Requested state for art:', state);

    fs.readFile(`${__dirname}/art.json`, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            const jsonData = JSON.parse(data);

            if (!jsonData[state]) {
                return res.status(404).send('Data not found for this state');
            }

            const artData = jsonData[state].map((item) => ({
                name: item.name,
                description: item.desc,
                image: item.link,
            }));

            res.render('art', { artData });
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send('Error parsing JSON data');
        }
    });
}

function getMonumentsData(req, res) {
    const state = req.params.state;
    // console.log('Requested state for art:', state);

    fs.readFile(`${__dirname}/monuments.json`, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            const jsonData = JSON.parse(data);

            if (!jsonData[state]) {
                return res.status(404).send('Data not found for this state');
            }

            const monData = jsonData[state].map((item) => ({
                name: item.name,
                description: item.desc,
                image: item.link,
            }));

            res.render('mon', { monData });
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send('Error parsing JSON data');
        }
    });
}
// function redirectToCategory(req, res) {
//     const state = req.params.state;
//     const category = req.params.category;

//     // Check if the state exists in your data
//     if (!statesData.states.includes(state)) {
//         return res.status(404).send('State not found');
//     }

//     // Render the category page with state and category information
//     res.render(category, { state });
// }



// app.get('/:state/:category', redirectToCategory);

statesData.states.forEach((state) => {
    app.get('/:state/food', getFoodData);
    app.get('/:state/art', getArtData); // Add this line
    app.get("/:state/monuments", getMonumentsData)
});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
