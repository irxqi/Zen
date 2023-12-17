const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const { createReadStream } = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new Client({
   intents: [
     GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildMessages,
     GatewayIntentBits.MessageContent,
     GatewayIntentBits.GuildVoiceStates,
   ],
});

client.once('ready', () => {
   console.log(`IT WORKS!`);
});

async function playVideo() {
    // Ask the user for the video file name
    rl.question('Enter the name of the video file (including extension), or type "exit" to stop: ', async (fileName) => {
        if (fileName.toLowerCase() === 'exit') {
            // Close the readline interface and exit the loop
            rl.close();
            return;
        }

        const channel = client.channels.cache.get('1182310071204577395');

        // Check if the channel is valid
        if (!channel) {
            console.log('Invalid channel. Make sure the bot is in the correct channel.');
            // Call playVideo again to continue the loop
            playVideo();
            return;
        }

        const filePath = path.join(__dirname, 'assets', fileName);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });

            // Create an audio player
            const player = createAudioPlayer();

            // Create a readable stream from the video file
            const videoStream = createReadStream(filePath);

            // Use FFmpeg to convert the video stream to PCM
            const ffmpegProcess = ffmpeg(videoStream)
                .inputFormat('mp4')  // Adjust this based on your video format
                .audioCodec('pcm_s16le')
                .audioChannels(2)
                .audioFrequency(48000)
                .format('s16le')
                .pipe();

            // Create an audio resource from the FFmpeg process
            const resource = createAudioResource(ffmpegProcess.stdout, {
                inputType: StreamType.Arbitrary,
            });

            // Subscribe the connection to the audio player
            connection.subscribe(player);

            // Play the audio resource
            player.play(resource);

            // Log when the audio player starts playing
            player.on('stateChange', (oldState, newState) => {
                if (newState.status === 'playing') {
                    console.log('The video is now streaming in the voice channel!');
                }
            });

            // Call playVideo again to continue the loop
            playVideo();
        } else {
            console.log(`File ${fileName} does not exist in the assets folder.`);
            // Call playVideo again to continue the loop
            playVideo();
        }
    });
}

// Start the infinite loop
playVideo();

client.login(process.env.TOKEN);
