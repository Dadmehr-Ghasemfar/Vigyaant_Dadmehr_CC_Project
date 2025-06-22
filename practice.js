// js/your-script.js (or practice.js)
// Make sure your HTML script tag is <script type="module" src="js/practice.js"></script>

//import * as Tone from './node_modules/tone/build/esm/index.js'; // <-- This line is crucial for Tone object
//import { Midi } from '@tonejs/midi'; // ES Modules

const playBTN = document.getElementById("playbutton");
const synth = new Tone.PolySynth().toDestination();


/*console.log(document.getElementById("playbutton"));
document.addEventListener('DOMContentLoaded', function(){
  const playBTN = document.getElementById("playbutton");
  const synth = new Tone.Synth().toDestination(); // Now Tone.Synth should be defined
  playBTN.addEventListener("click", async() => {
  // Always start the audio context on user interaction
    if (Tone.context.state !== "running") {
      await Tone.start();
      console.log("Audio context started!");
    }
  // Play a note
  synth.triggerAttackRelease("C7", "16n"); 
  console.log("Playing C3"); // Add console log to confirm execution
  });
}); */




// The rest of your commented-out code remains commented out for now.

//... commented out fetch, midi, piano sampler code ...

  //fetch("Music/Backstreet Boys - I Want It That Way.mid");// looks for the provided file
  playBTN.addEventListener("click", async() => {
  // Always start the audio context on user interaction
    if (Tone.context.state !== "running") {
      await Tone.start();
      console.log("Audio context started!");
    }
    await LoadandPlayMidi();
  }); 

  async function LoadandPlayMidi(){
    const response = await fetch("Music/Backstreet Boys - I Want It That Way.mid");
    const arraybuffer = await response.arrayBuffer();// To open up the downloaded midi file and putting it in binary data
    if(!response.ok){
      console.log("Failed To Fetch File");
    }
    const midi = new Midi(arraybuffer); // here you are taking the binary midi file to a real midi file        
    console.log("Midi file parsed!", midi);
    const now = Tone.now();// this stores the current time to play the notes at precise moments
  
    midi.track.forEach((track, trackindex => {// loops through all the tracks
      track.notes.ForEach(note =>{//loops through all the notes
        synth.triggerAttackRelease(//plays notes with all the certain elements 
          note.name,
          note.duration,
          now + note.time,
          note.velocity
          );
      });
    }));
  }
    /*.then(res => {
      res.arrayBuffer(); 
    })                           
    .then(async (data) => {
      const midi = new Midi(data);
    })
      

      const now = Tone.now();
      midi.tracks.forEach(track => {
        track.notes.forEach(note => {
          synth.triggerAttackRelease(
            note.name,
            note.duration,
            now + note.time,
            note.velocity
          );
        });
      });
    });
const piano = new Tone.Sampler({
  urls: {
    C4: "C4.mp3", 
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
.toDestination();
*/
                        

