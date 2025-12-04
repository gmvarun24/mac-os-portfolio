import React, { useState } from "react";
import { Welcome, Navbar, Dock, Home, Startup } from "#components";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  Image,
  Contact,
  Photos,
} from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  const [startupComplete, setStartupComplete] = useState(false);

  return (
    <main>
      {!startupComplete && (
        <Startup onComplete={() => setStartupComplete(true)} />
      )}

      <div
        style={{
          opacity: startupComplete ? 1 : 0,
          transition: "opacity 0.5s ease-in",
        }}
      >
        <Navbar />
        <Welcome />
        <Home />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
        <Photos />
      </div>
    </main>
  );
};

export default App;
