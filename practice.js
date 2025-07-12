
const SOUND_WEBSITE = '/audio/'; // Update this to your actual sound server URL

const instrumentConfigs = { // *** FIXED: Added opening brace
 // --- WOODWIND INSTRUMENTS ---
 73: { // Flute
 name: 'Flute',
 samples: {
 'C3': 'flute/C3.mp3',
 'F3': 'flute/F3.mp3',
 'A3': 'flute/A3.mp3',
 'C4': 'flute/C4.mp3',
 'F4': 'flute/F4.mp3',
 'A4': 'flute/A4.mp3',
 'C5': 'flute/C5.mp3',
 'F5': 'flute/F5.mp3',
 'A5': 'flute/A5.mp3',
 'C6': 'flute/C6.mp3'
 }
 }, // *** FIXED: Added comma

 72: { // Clarinet
 name: 'Clarinet',
 samples: {
 'D3': 'clarinet/D3.mp3', // *** FIXED: Removed duplicate F3
 'E3': 'clarinet/E3.mp3',
 'F3': 'clarinet/F3.mp3',
 'A3': 'clarinet/A3.mp3',
 'B3': 'clarinet/B3.mp3',
 'C4': 'clarinet/C4.mp3',
 'D4': 'clarinet/D4.mp3',
 'F4': 'clarinet/F4.mp3',
 'A4': 'clarinet/A4.mp3',
 'C5': 'clarinet/C5.mp3',
 'D5': 'clarinet/D5.mp3',
 'F5': 'clarinet/F5.mp3',
 'A5': 'clarinet/A5.mp3',
 'C6': 'clarinet/C6.mp3',
 'D6': 'clarinet/D6.mp3',
 'A6': 'clarinet/A6.mp3',
 'C7': 'clarinet/C7.mp3'
 }
 }, // *** FIXED: Added comma

 65: { // AltoSax
 name: 'Alto-Sax',
 samples: {
 'A2': 'alto_sax/A2.wav',
 'A3': 'alto_sax/A3.wav',
 'A4': 'alto_sax/A4.wav',
 'C3': 'alto_sax/C3.wav',
 'C4': 'alto_sax/C4.wav',
 'Eb2': 'alto_sax/Eb2.wav',
 'Eb3': 'alto_sax/Eb3.wav',
 'Eb4': 'alto_sax/Eb4.wav',
 'Gb2': 'alto_sax/Gb2.wav',
 'Gb3': 'alto_sax/Gb3.wav',
 'Gb4': 'alto_sax/Gb4.wav'
 }
 }, // *** FIXED: Added comma

 66: { // TenorSax
 name: 'Tenor-Sax',
 samples: { 'C4': 'tenor_sax/C4.wav' }
 }, // *** FIXED: Added comma

 68: { // BariSax
 name: 'Bari-Sax',
 samples: { 'C2': 'bari_sax/C2.wav' }
 }, // *** FIXED: Added comma

 69: { // Oboe
 name: 'Oboe',
 samples: {
 'A4': 'oboe/A4.mp3',
 'A5': 'oboe/A5.mp3',
 'A6': 'oboe/A6.mp3',
 'B3': 'oboe/B3.mp3',
 'B4': 'oboe/B4.mp3',
 'B5': 'oboe/B5.mp3',
 'C4': 'oboe/C4.mp3',
 'C5': 'oboe/C5.mp3',
 'D4': 'oboe/D4.mp3',
 'D5': 'oboe/D5.mp3',
 'D6': 'oboe/D6.mp3',
 'E4': 'oboe/E4.mp3',
 'E5': 'oboe/E5.mp3',
 'E6': 'oboe/E6.mp3',
 'F4': 'oboe/F4.mp3',
 'F6': 'oboe/F6.mp3',
 'G5': 'oboe/G5.mp3',
 'G6': 'oboe/G6.mp3' // *** FIXED: Removed trailing comma
 }
 }, // *** FIXED: Added comma

 71: { // Bassoon
 name: 'Bassoon',
 samples: {
 'A2': 'bassoon/A2.mp3',
 'A3': 'bassoon/A3.mp3',
 'B3': 'bassoon/B3.mp3',
 'C2': 'bassoon/C2.mp3',
 'C4': 'bassoon/C4.mp3',
 'C5': 'bassoon/C5.mp3',
 'D3': 'bassoon/D3.mp3',
 'E5': 'bassoon/E5.mp3',
 'G2': 'bassoon/G2.mp3',
 'G4': 'bassoon/G4.mp3'
 }
 }, // *** FIXED: Added comma

 // --- BRASS INSTRUMENTS ---
 57: { // Trumpet
 name: 'Trumpet',
 samples: {
 'C3': 'trumpet/C3.mp3',
 'E3': 'trumpet/E3.mp3',
 'G3': 'trumpet/G3.mp3',
 'C4': 'trumpet/C4.mp3',
 'E4': 'trumpet/E4.mp3',
 'G4': 'trumpet/G4.mp3',
 'C5': 'trumpet/C5.mp3',
 'E5': 'trumpet/E5.mp3'
 }
 }, // *** FIXED: Added comma

 58: { // Trombone
 name: 'Trombone',
 samples: {
 'A2': 'trombone/A2.mp3',
 'A3': 'trombone/A3.mp3',
 'A4': 'trombone/A4.mp3', // *** FIXED: Changed from A2.mp3 to A4.mp3
 'A5': 'trombone/A5.mp3',
 'B2': 'trombone/B2.mp3',
 'B3': 'trombone/B3.mp3',
 'B4': 'trombone/B4.mp3',
 'B5': 'trombone/B5.mp3',
 'C3': 'trombone/C3.mp3',
 'C4': 'trombone/C4.mp3',
 'C5': 'trombone/C5.mp3',
 'C6': 'trombone/C6.mp3',
 'D3': 'trombone/D3.mp3',
 'D4': 'trombone/D4.mp3',
 'D5': 'trombone/D5.mp3',
 'D6': 'trombone/D6.mp3',
 'E2': 'trombone/E2.mp3',
 'E3': 'trombone/E3.mp3',
 'F2': 'trombone/F2.mp3',
 'F4': 'trombone/F4.mp3',
 'G2': 'trombone/G2.mp3',
 'G3': 'trombone/G3.mp3',
 'G5': 'trombone/G5.mp3' // *** FIXED: Removed trailing comma
 }
 }, // *** FIXED: Added comma

 60: { // FrenchHorn
 name: 'FrenchHorn',
 samples: {
 'A#1': 'french_horn/As1.mp3',
 'A2': 'french_horn/A2.mp3',
 'A3': 'french_horn/A3.mp3',
 'A4': 'french_horn/A4.mp3',
 'B1': 'french_horn/B1.mp3',
 'B2': 'french_horn/B2.mp3',
 'B3': 'french_horn/B3.mp3',
 'B4': 'french_horn/B4.mp3',
 'C2': 'french_horn/C2.mp3',
 'C3': 'french_horn/C3.mp3',
 'C4': 'french_horn/C4.mp3',
 'C5': 'french_horn/C5.mp3',
 'C#1': 'french_horn/Cs1.mp3',
 'D2': 'french_horn/D2.mp3',
 'D3': 'french_horn/D3.mp3',
 'D4': 'french_horn/D4.mp3',
 'D5': 'french_horn/D5.mp3',
 'E2': 'french_horn/E2.mp3',
 'F2': 'french_horn/F2.mp3',
 'F5': 'french_horn/F5.mp3',
 'G2': 'french_horn/G2.mp3',
 'G4': 'french_horn/G4.mp3'
 }
 }, // *** FIXED: Added comma

 59: { // Tuba
 name: 'Tuba',
 samples: {
 'A1': 'tuba/A1.mp3',
 'A2': 'tuba/A2.mp3',
 'A3': 'tuba/A3.mp3',
 'A#1': 'tuba/As1.mp3',
 'B1': 'tuba/B1.mp3',
 'C1': 'tuba/C1.mp3',
 'C3': 'tuba/C3.mp3',
 'C4': 'tuba/C4.mp3',
 'C#4': 'tuba/Cs4.mp3',
 'D2': 'tuba/D2.mp3',
 'D3': 'tuba/D3.mp3',
 'F1': 'tuba/F1.mp3',
 'G2': 'tuba/G2.mp3',
 'G#3': 'tuba/Gs3.mp3'
 }
 }, // *** FIXED: Added comma

 0: { // Piano
 name: 'Piano',
 samples: {
 'A#1': 'piano/A#1.wav',
 'A#2': 'piano/A#2.wav',
 'A#3': 'piano/A#3.wav',
 'A#4': 'piano/A#4.wav',
 'A#5': 'piano/A#5.wav',
 'A#6': 'piano/A#6.wav',
 'A1': 'piano/A1.wav',
 'A2': 'piano/A2.wav',
 'A3': 'piano/A3.wav',
 'A4': 'piano/A4.wav',
 'A5': 'piano/A5.wav',
 'A6': 'piano/A6.wav',
 'A7': 'piano/A7.wav',
 'B1': 'piano/B1.wav',
 'B2': 'piano/B2.wav',
 'B3': 'piano/B3.wav',
 'B4': 'piano/B4.wav',
 'B5': 'piano/B5.wav',
 'B6': 'piano/B6.wav',
 'B7': 'piano/B7.wav',
 'C#1': 'piano/C#1.wav',
 'C#2': 'piano/C#2.wav',
 'C#3': 'piano/C#3.wav',
 'C#4': 'piano/C#4.wav',
 'C#5': 'piano/C#5.wav',
 'C#6': 'piano/C#6.wav' // *** FIXED: Removed trailing comma
 }
 }, // *** FIXED: Added comma

 48: { // Timpani
 name: 'Timpani',
 samples: {
 'Bb2': 'timpani/Bb2.wav',
 'C4': 'timpani/C4.wav',
 'F2': 'timpani/F2.wav',
 'G3': 'timpani/G3.wav'
 }
 }, // *** FIXED: Added comma

 14: { // Xylophone
 name: 'Xylophone', // *** FIXED: Changed from 'Timpani' to 'Xylophone'
 samples: {
 'C4': 'xylophone/C4.wav',
 'C5': 'xylophone/C5.wav',
 'C6': 'xylophone/C6.wav',
 'G3': 'xylophone/G3.wav',
 'G4': 'xylophone/G4.wav',
 'G5': 'xylophone/G5.wav',
 'G6': 'xylophone/G6.wav'
 }
 }, // *** FIXED: Added comma

 13: { // Marimba
 name: 'Marimba',
 samples: {
 'B2': 'marimba/B2.wav',
 'B4': 'marimba/B4.wav',
 'C2': 'marimba/C2.wav',
 'C4': 'marimba/C4.wav',
 'F1': 'marimba/F1.wav',
 'F3': 'marimba/F3.wav',
 'F5': 'marimba/F5.wav',
 'G2': 'marimba/G2.wav',
 'G4': 'marimba/G4.wav'
 }
 }, // *** FIXED: Added comma

 12: { // Vibraphone
 name: 'Vibraphone',
 samples: { 'C4': 'vibraphone/C4.wav' }
 }, // *** FIXED: Added comma

 15: { // Tubular Bells
 name: 'Tubular Bells',
 samples: { 'C4': 'tubular_bells/C4.wav' }
 }, // *** FIXED: Added comma

 16: { // Dulcimer
 name: 'Dulcimer',
 samples: { 'C4': 'dulcimer/C4.wav' }
 }, // *** FIXED: Added comma

 // --- String instruments ---
 40: { // Violin
 name: 'Violin', // *** FIXED: Changed from 'Dulcimer' to 'Violin'
 samples: { 'C4': 'violin/C4.wav' } // *** FIXED: Changed path to violin
 }, // *** FIXED: Added comma

 41: { // Viola
 name: 'Viola', // *** FIXED: Changed from 'Dulcimer' to 'Viola'
 samples: { 'C4': 'viola/C4.wav' } // *** FIXED: Changed path to viola
 }, // *** FIXED: Added comma

 27: { // Clean Guitar
 name: 'Guitar',
 samples: {
 'A7': 'clean_guitar/A7.wav',
 'B7': 'clean_guitar/B7.wav',
 'C7': 'clean_guitar/C7.wav',
 'D7': 'clean_guitar/D7.wav',
 'E7': 'clean_guitar/E7.wav',
 'F7': 'clean_guitar/F7.wav',
 'G7': 'clean_guitar/G7.wav'
 }
 }
}; // *** FIXED: Properly closed the instrumentConfigs object

// Object to store loaded Tone.Sampler instances
const loadedInstruments = {};
let allInstrumentsLoaded = false;

// *** ADDED: Global variables for DOM elements
let playBTN;
let statusDiv;

// *** FIXED: Properly defined the function
async function initializeInstruments() {
 Tone.Destination.volume.value = -10;
 playBTN = document.getElementById("playBTN");
 statusDiv = document.getElementById("status");
 statusDiv.textContent = "Loading instruments...";
 playBTN.disabled = true;

 for (const [midiNumber, config] of Object.entries(instrumentConfigs)) {
 const urls = {};
 // Build the URLs object for multi-sampling
 for (const [note, file] of Object.entries(config.samples)) {
 urls[note] = SOUND_WEBSITE + file;
 }

 loadedInstruments[midiNumber] = new Tone.Sampler({
 urls: urls,
 release: 1,
 attack: 0.02 // Add smooth attack to prevent clicks
 }).toDestination();
 }

 await Tone.loaded();
 console.log("Multi-sampled instruments loaded!");
 allInstrumentsLoaded = true;
 playBTN.disabled = false;
 statusDiv.textContent = "Ready to play!"; // *** ADDED: Status update
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
 try {
 await LoadandPlayMidi();
 statusDiv.textContent = "Playback Finished."; // *** FIXED: Changed comma to period
 } catch(error) {
 console.error("Error during playback:", error);
 statusDiv.textContent = "Error during playback."; // *** ADDED: User feedback
 }
});

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeInstruments);

async function LoadandPlayMidi() {
 const response = await fetch("Music/LetitBe.mid");
 if (!response.ok) {
 console.error("Failed To Fetch MIDI File:", response.statusText);
 statusDiv.textContent = "Failed to load MIDI file.";
 return;
 }

 const arraybuffer = await response.arrayBuffer();
 const midi = new Midi(arraybuffer);
 console.log("Midi file parsed!", midi);

 const now = Tone.now();

 midi.tracks.forEach((track) => {
 let midiProgram = track.instrument?.number || 0;

 track.notes.forEach(note => {
 Tone.Transport.schedule((time) => {
 // *** FIXED: Changed from voiceManager.getInstrument to loadedInstruments
 const sampler = loadedInstruments[midiProgram];

 if (sampler) {
 sampler.triggerAttackRelease(
 note.name,
 note.duration,
 time,
 note.velocity
 );
 }
 }, note.time);
 });
 });

 Tone.Transport.start("+0.1");
}