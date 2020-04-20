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
    const siteUrl = getSiteUrl(country);

    if (!siteUrl) return res.send('not found');

    try {
        const fetchRes = await fetch(siteUrl);
        const html = await fetchRes.text();
        const versionStr = getVersionString(html);
        if (versionStr) {
            return res.send({ version: extractVersionFromStr(versionStr) });
        }
    } catch (err) {
        return res.send({ version: extractVersionFromStr(versionStr) });
    }
});


app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
