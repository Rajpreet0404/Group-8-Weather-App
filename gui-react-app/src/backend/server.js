require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.OPENAI_API_KEY); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/clothing-advice', async (req, res) => {
    const { temp, feelsLike, windSpeed, city } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: "You are an expert clothing advisor." },
                    {
                        role: "user",
                        content: `Based on the following weather data: 
                        - Temperature: ${temp}°C
                        - Feels Like: ${feelsLike}°C
                        - Wind Speed: ${windSpeed} mph
                        - Weather Condition: ${city}
                        Suggest the best clothing to wear specifically for athletes. Here is an example response keep it to roughly the same length: Wear a moisture-wicking t-shirt, shorts or lightweight leggings, and breathable sports shoes with sweat-wicking socks. Bring a light jacket for cooler moments and a cap or visor if it's sunny.`
                    }
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        console.log("OpenAI Response:", response.data);

        const advice = response.data.choices[0].message.content;
        res.json({ advice });
    } catch (error) {
        console.error("Error fetching clothing advice:", error.message);
        res.status(500).json({ error: 'Failed to get clothing advice' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
