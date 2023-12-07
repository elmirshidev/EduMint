// 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
import OpenAI from 'openai';
import path from 'path';
import fs from "fs"
import express from 'express';
import cors from 'cors';

const app = express();

const name = Math.floor(Math.random() * 1000);
const speechFile = path.resolve(`./voices/${name}.mp3`);

const openai = new OpenAI({
    apiKey: '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',
});

app.use(cors());
app.use(express.json());


app.post('/text', async (req, res) => {
    const { text } = req.body;
    async function main() {
        try {
            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: 'Say this is a test' }],
                model: 'gpt-3.5-turbo',
            });

            return res.json({ message: chatCompletion.choices[0].message });
        }
        catch (err) {
            return res.json({ message: err });
        }
        
    }

    main();

})

app.post('/voice', async (req, res) => {
    const {text} = req.body;
    async function voice() {
        try {
            const mp3 = await openai.audio.speech.create({
                model: "tts-1",
                voice: "echo",
                input: 'This is an example of speech synthesis'
            })

            const buffer = Buffer.from(await mp3.arrayBuffer());

            await fs.promises.writeFile(speechFile, buffer);

            return res.json({ message: name });
        }
        catch (err) {
            return res.json({ message: err });
        }

    }
    voice();
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})