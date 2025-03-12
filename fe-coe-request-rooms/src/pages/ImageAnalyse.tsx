import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Switch from "../components/Switch";
import { getImages, ImageData } from "../services/getImages";

const ImageAnalysePage = () => {
  const [imageData, setImageData] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        setImageData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchImages();
  }, []);

  const [activeComponent, setActiveComponent] = React.useState<
    "Human face" | "Number plate"
  >("Human face");
  const handleLeft = () => {
    setActiveComponent("Human face");
    console.log("left");
  };
  const handleRight = () => {
    setActiveComponent("Number plate");
    console.log("right");
  };

  return (
    <div className="p-2">
      <div className="flex justify-center sm:justify-start">
        <Switch
          leftname="Human face"
          rightname="Number plate"
          onClick_left={handleLeft}
          onClick_right={handleRight}
          className="sticky  pb-2 top-0 bg-[var(--background-color)]"
        />
      </div>
      {activeComponent === "Human face" ? (
        <div className="text-pretty grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center mx-4 md:mx-0 px-8 md:px-0">
          {imageData!.map((data, index) => (
            <Card
              key={index}
              name={data.name}
              email={data.email}
              image={data.image}
              page="imageAnalyze"
            />
          ))}
        </div>
      ) : (
        <div className="max-w-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {imageData.map((data) => (
            <div>
              <img
                src={data.image}
                alt=""
                className="object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageAnalysePage;
