// Global Variables (declared but not assigned until DOM is ready)
let playBTN;
let statusDiv;

// Tone.js Synth (if you want to use it for non-sampled sounds, otherwise you can remove it)
//const synth = new Tone.PolySynth().toDestination();

// Base URL for the instrument audio samples
const SOUND_WEBSITE = "/audio/";

// Configuration for instruments, mapping MIDI program numbers to sound files
const instrumentConfigs = {
    // RE-ADD ALL YOUR INSTRUMENTS HERE
    0: { // Piano (You'll need a piano sample, e.g., Salamander)
        name: 'Piano',
        soundFile: 'piano/C4.mp3', // Adjust based on your piano sample filename
        noteKey: 'C4'
    },
    24: { // Guitar (From Philharmonia, assuming you have C4.mp3 in audio/guitar)
        name: 'Guitar',
        soundFile: 'guitar/C4.mp3', // Match your exact filename in audio/guitar/
        noteKey: 'C4'
    }
};

// Object to store loaded Tone.Sampler instances
const loadedInstruments = {};
let allInstrumentsLoaded = false;
let loadPromises = [];

// --- Asynchronous function to initialize and load all samplers ---
async function initializeInstruments() {
    playBTN = document.getElementById("playBTN");
    statusDiv = document.getElementById("status");

    statusDiv.textContent = "Loading instruments...";
    playBTN.disabled = true;

    for (const [midiNumber, info] of Object.entries(instrumentConfigs)) {
        //const midiNumber = parseInt(midiNumberStr, 10);
        const fullUrl = SOUND_WEBSITE + info.soundFile;

        console.log(`Downloading ${info.name} from: ${fullUrl}`);

        //let samplerPromise = new Promise((resolve, reject) => {
            loadedInstruments[midiNumber] = new Tone.Sampler({
                // CORRECTED: USE info.noteKey directly here!
                urls: {
                    [info.noteKey]: fullUrl // This is the fix for "url key is neither a note or midi pitch"
                },
                onload: () => {
                    console.log(`✓ ${info.name} loaded successfully!`);
                    resolve();
                },
                onerror: (error) => {
                    console.error(`X Failed to load ${info.name} from ${fullUrl}:`, error);
                    reject(`Failed to load ${info.name}`);
                }
            }).toDestination();
        //});
        //loadPromises.push(samplerPromise);
    }
    await Tone.loaded();// returns a promise 
    console.log("All sounds are ready!");
  }   
    try {
        //await Promise.all(loadPromises);
        allInstrumentsLoaded = true;
        playBTN.disabled = false;
        statusDiv.textContent = "Instruments ready! Click Play.";
        console.log("All instruments initialized and loaded!");
    } catch (error) {
        statusDiv.textContent = "Error loading some instruments. Check console.";
        console.error ("Failed to load all instruments:", error);
        playBTN.disabled = false;
    }

    playBTN.addEventListener("click", async () => {
        if (Tone.context.state !== "running") {
            await Tone.start();
            console.log("Audio context started!");
        }

        if (!allInstrumentsLoaded) {
            console.warn("Instruments not fully loaded yet. Please wait.");
            statusDiv.textContent = "Still loading instruments, please wait...";
            return;
        }

        statusDiv.textContent = "Playing MIDI...";
        await LoadandPlayMidi();
        statusDiv.textContent = "Playback finished.";
    }
)};  

document.addEventListener("DOMContentLoaded", initializeInstruments);

async function LoadandPlayMidi() {
    const response = await fetch("Music/Coldplay - Viva La Vida.mid");
    if (!response.ok) {
        console.error("Failed To Fetch MIDI File:", response.statusText);
        statusDiv.textContent = "Failed to load MIDI file.";
        return;
    }
    const arraybuffer = await response.arrayBuffer();
    const midi = new Midi(arraybuffer);
    console.log("Midi file parsed!", midi);
    const now = Tone.now();

    midi.tracks.forEach((track, trackIndex) => {
        let currentSampler = null;

        // Use MIDI program 0 (Piano) as the fallback instrument
        const PIANO_MIDI_PROGRAM = 0; 

        if (track.channel === 9) { // Drum track
            console.warn(`Track ${trackIndex} is Percussion (Channel 9). Using Piano as fallback.`);
            currentSampler = loadedInstruments[PIANO_MIDI_PROGRAM]; // Reference the actual Piano Sampler
        } else if (track.instrument && track.instrument.number !== undefined) {
            currentSampler = loadedInstruments[track.instrument.number];
            if (!currentSampler) {
                console.warn(`No specific sampler configured for GM Program ${track.instrument.number} (${track.instrument.name || 'Unknown Instrument'}) on Track ${trackIndex}. Falling back to Piano.`);
                currentSampler = loadedInstruments[PIANO_MIDI_PROGRAM]; // Reference the actual Piano Sampler
            } else {
                console.log(`Track ${trackIndex}: Assigned ${track.instrument.name} (GM Program ${track.instrument.number})`);
            }
        } else { // No instrument info
            console.warn(`No instrument info for Track ${trackIndex}. Falling back to Piano.`);
            currentSampler = loadedInstruments[PIANO_MIDI_PROGRAM]; // Reference the actual Piano Sampler
        }

        if (!currentSampler) {
            // This case should ideally not happen if PIANO_MIDI_PROGRAM (0) is always loaded
            // But it's a good safeguard if the piano also failed to load.
            console.error(`Could not find a valid sampler for Track ${trackIndex}. Skipping this track.`);
            return;
        }

        track.notes.forEach(note => {
            currentSampler.triggerAttackRelease(
                note.name,
                note.duration,
                now + note.time,
                note.velocity
            );
        });
    });
}