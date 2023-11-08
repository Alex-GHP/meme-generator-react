import React, { useState } from "react";
import { useEffect } from "react";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  };

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      });
  }, []);

  console.log(allMemes);

  const handleNewMemeBtn = () => {
    let max = allMemes.length;
    let randomMemeIndex = Math.floor(Math.random() * max);
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: allMemes[randomMemeIndex].url,
      };
    });
  };
  return (
    <main>
      <div action="" className="flex flex-col gap-5 p-10">
        <div className="flex justify-center gap-5">
          <input
            className="border-2 border-[#D5D4D8] rounded-md py-1 px-4 w-screen"
            type="text"
            placeholder="Top Text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            className="border-2 border-[#D5D4D8] rounded-md py-1 px-4 w-screen"
            type="text"
            placeholder="Bottom Text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleNewMemeBtn}
          className="py-2 rounded-lg font-bold text-white bg-gradient-to-r from-[#672280] to-[#A626D3]"
        >
          Get a new meme image🖼️
        </button>
      </div>
      <div className="relative">
        <img
          src={meme.randomImage}
          alt="Meme Image"
          className="block mx-auto max-w-full rounded-md"
        />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
