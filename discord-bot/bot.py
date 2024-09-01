import discord
import requests

# Function to get meme
def get_meme():
    response = requests.get('https://meme-api.com/gimme')
    json_data = response.json()
    return json_data['url']

# Function to get AI response from Hugging Face GPT-2 model
def get_ai_response(prompt):
    headers = {
        'Authorization': 'Bearer {}', #Replace with HugginFace token
        'Content-Type': 'application/json'
    }
    data = {
        "inputs": prompt,
        "options": {"wait_for_model": True}
    }
    response = requests.post('https://api-inference.huggingface.co/models/gpt2', headers=headers, json=data)
    
    if response.status_code != 200:
        return f"Error: {response.status_code} - {response.text}"
    
    json_data = response.json()
    return json_data[0]['generated_text']

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')

    async def on_message(self, message):
        if message.author == self.user:
            return
    
        if message.content.startswith('$hello'):
            await message.channel.send('Hello World!')

        elif message.content.startswith('$meme'):
            await message.channel.send(get_meme())

        elif message.content.startswith('$story'):
            question = message.content[len('$story '):]
            response = get_ai_response(question)
            await message.channel.send(response)

intents = discord.Intents.default()
intents.message_content = True

client = MyClient(intents=intents)
client.run('') # Replace with your actual bot token

