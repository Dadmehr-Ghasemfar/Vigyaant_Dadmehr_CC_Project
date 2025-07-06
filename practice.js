// Global Variables (declared but not assigned until DOM is ready)
let playBTN;
let statusDiv;

// Tone.js Synth (if you want to use it for non-sampled sounds, otherwise you can remove it)
//const synth = new Tone.PolySynth().toDestination();

// Base URL for the instrument audio samples
<<<<<<< HEAD
const SOUND_WEBSITE = "/audio/";
// Configuration for instruments, mapping MIDI program numbers to sound files
const instrumentConfigs = {
    // --- WOODWIND INSTRUMENTS ---
    73: { // Flute (MIDI Program 73)
        name: 'Flute',
        soundFile: 'flute/C4.mp3', // Common range C4-C7, C4 is a good sample base
        noteKey: 'C4'
    },
    72: { // Clarinet (MIDI Program 72)
        name: 'Clarinet',
        soundFile: 'clarinet/C4.mp3', // Common range E3-C7, C4 is a good sample base
        noteKey: 'C4'
    },
    69: { // Oboe (MIDI Program 69) - Less common in middle school, but present in high school
        name: 'Oboe',
        soundFile: 'oboe/C4.mp3', // Common range Bb3-G6, C4 is a good sample base
        noteKey: 'C4'
    },
    71: { // Bassoon (MIDI Program 71) - Another double-reed
        name: 'Bassoon',
        soundFile: 'bassoon/C3.mp3', // Lower range than Oboe, C3 or C2 might be better
        noteKey: 'C3' // Adjust if your sample is C2.mp3
    },
    65: { // Alto Sax (MIDI Program 65) - Very common!
        name: 'Alto Sax',
        soundFile: 'alto_sax/C4.mp3', // Common range Db3-Ab5, C4 is a good sample base
        noteKey: 'C4'
    },
    66: { // Tenor Sax (MIDI Program 66) - Very common!
        name: 'Tenor Sax',
        soundFile: 'tenor_sax/C3.mp3', // Lower range than Alto, C3 is a good sample base
        noteKey: 'C3'
    },
    67: { // Baritone Sax (MIDI Program 67) - Common in jazz/marching band
        name: 'Baritone Sax',
        soundFile: 'baritone_sax/C2.mp3', // Lowest sax, C2 is a good sample base
        noteKey: 'C2'
    },

    // --- BRASS INSTRUMENTS ---
    57: { // Trumpet (MIDI Program 57) - Essential!
        name: 'Trumpet',
        soundFile: 'trumpet/C4.mp3', // Common range E3-D6, C4 is a good sample base
        noteKey: 'C4'
    },
    58: { // Trombone (MIDI Program 58) - Essential!
        name: 'Trombone',
        soundFile: 'trombone/C3.mp3', // Common range E2-Bb4, C3 is a good sample base
        noteKey: 'C3'
    },
    60: { // French Horn (MIDI Program 60) - Common in high school concert band
        name: 'French Horn',
        soundFile: 'french_horn/C3.mp3', // Common range F#2-C6, C3 is a good sample base
        noteKey: 'C3'
    },
    59: { // Tuba (MIDI Program 59) - Foundation of the brass section!
        name: 'Tuba',
        soundFile: 'tuba/C2.mp3', // Lowest brass, C2 is a good sample base
        noteKey: 'C2'
    },
    // Note: Baritone/Euphonium often use similar samples to Trombone or Tuba,
    // or sometimes dedicated Euphonium samples if available.
    // MIDI program 59 is often used for Tuba/Euphonium.

    // --- KEYBOARD / RHYTHM SECTION (Common in Jazz/Pep Band, some concert settings) ---
    0: { // Acoustic Grand Piano (MIDI Program 0) - Often used as a primary accompaniment/practice instrument
        name: 'Piano',
        soundFile: 'piano/C4.mp3', // Make sure you have audio/piano/C4.mp3
=======
const SOUND_WEBSITE = "https://raw.githubusercontent.com/vjain3024/Vigyaant_Dadmehr_CC_Project/main/audio/";

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
>>>>>>> 473c2ce77be6e7317fdb3e3f4cc27994d83f8271
        noteKey: 'C4'
    }
};

// Object to store loaded Tone.Sampler instances
const loadedInstruments = {};
let allInstrumentsLoaded = false;
//let loadPromises = [];

// --- Asynchronous function to initialize and load all samplers ---
async function initializeInstruments() {
    playBTN = document.getElementById("playBTN");
    statusDiv = document.getElementById("status");

    statusDiv.textContent = "Loading instruments...";
    playBTN.disabled = true;
    try{
    for (const [midiNumberStr, info] of Object.entries(instrumentConfigs)) {
        const midiNumber = parseInt(midiNumberStr, 10);
        const fullUrl = SOUND_WEBSITE + info.soundFile;

        console.log(`Downloading ${info.name} from: ${fullUrl}`);

        //let samplerPromise = new Promise((resolve, reject) => {
          loadedInstruments[midiNumber] = new Tone.Sampler({
              // CORRECTED: USE info.noteKey directly here!
              urls: {
                  [info.noteKey]: fullUrl // This is the fix for "url key is neither a note or midi pitch"
              }     
              //onload: () => {
              //    console.log(`✓ ${info.name} loaded successfully!`);
            //},
              //onerror: (error) => {
                //  console.error(`X Failed to load ${info.name} from ${fullUrl}:`, error);
            //  }
          }).toDestination();
        //});
        //loadPromises.push(samplerPromise);
    }
    await Tone.loaded();// returns a promise 
    console.log("All sounds are ready!");
    //await Promise.all(loadPromises);
    allInstrumentsLoaded = true;
    playBTN.disabled = false;
    statusDiv.textContent = "Instruments ready! Click Play.";
    console.log("All instruments initialized and loaded!");
      
  } catch (error) {
      statusDiv.textContent = "Error loading some instruments. Check console.";
      console.error ("Failed to load all instruments:", error);
      playBTN.disabled = false;
      allInstrumentsLoaded = false;
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
    
      try{
        await LoadandPlayMidi();
        statusDiv.textContent = "Playback Finished,";
      }
      catch(error){
        console.error("Error during playback:", error);
      }
    });
}
//Initalize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeInstruments);

async function LoadandPlayMidi() {
<<<<<<< HEAD
    const response = await fetch(".mid");
=======
    const response = await fetch("Music/Coldplay - Viva La Vida.mid");
>>>>>>> 473c2ce77be6e7317fdb3e3f4cc27994d83f8271
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 473c2ce77be6e7317fdb3e3f4cc27994d83f8271