import OpenAI from 'openai';

import { withNextSession } from '@/lib/session';
import { dbConnect } from '@/lib/lowDb';
import bots from './bots.json';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const USER_NAME = 'Human';
const AI_NAME = 'Walt';
const MEMORY_SIZE = 6;

export default withNextSession(async (req, res) => {
  if (req.method === 'POST') {
    const { stack } = req.query;
    const body = req.body;
    const prompt = body.prompt || '';

    try {
      //try here

      const db = await dbConnect();

      console.log('db init');
      db.data.messageHistory['human'] ||= []; //gets the specific user history OR empty array
      db.data.messageHistory['human'].push(`${USER_NAME}: ${prompt}\n`); //pushes HUMAN messages into db

      const aiPrompt = bots[stack].prompt; //this is where we're getting the bot personality

      const completion = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: aiPrompt + db.data.messageHistory['human'].join('') + 'Walt:',
        max_tokens: 1024,
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0].text.trim();

      db.data.messageHistory['human'].push(`${AI_NAME}: ${aiResponse}\n`); //pushes AI messages into db

      if (db.data.messageHistory['human'].length > MEMORY_SIZE) {
        db.data.messageHistory['human'].splice(0, 2);
      } //removes older messages to limit max_token count

      return res.status(200).json({ result: aiResponse });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: { message: e.message } });
    }
  } else if (req.method === 'DELETE') {
    //this is utilized when user switches from one learning item to another

    const db = await dbConnect();
    db.data.messageHistory['human'] = [];
    //clears current user db

    return res.status(200).json({ message: 'History cleared!' });
  } else {
    return res.status(500).json({ error: { message: 'Invalid Api Route' } });
  }
});
