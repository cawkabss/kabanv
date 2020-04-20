import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch  from 'node-fetch';

import {
    getSiteUrl,
    getVersionString,
    extractVersionFromStr,
} from './utils';

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/version/:country', async (req, res) => {
    const country = req.params.country;
    const siteUrl = getSiteUrl(country.toUpperCase());

    if (!siteUrl) {
        return res
            .status(404)
            .send(`Site url not found. Country - ${country}`)
            .end();
    }

    let html = '';

    try {
        const fetchRes = await fetch(siteUrl);
        html = await fetchRes.text();
    } catch (err) {
        return res
            .status(500)
            .send(`Site not available. Country - ${country}`)
            .end();
    }
    const versionStr = getVersionString(html);

    return versionStr
        ? res.send({ version: extractVersionFromStr(versionStr) }).end()
        : res.status(500).send(`Version not found. Country - ${country}`).end();
});


app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
