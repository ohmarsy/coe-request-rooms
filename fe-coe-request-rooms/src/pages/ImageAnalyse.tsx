import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Switch from "../components/Switch";
import { fetchAllImages,ImageData  } from "../services/getImages";

const ImageAnalysePage = () => {
  const [imageData, setImageData] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await fetchAllImages();
        // console.log("fetch all images : ", data);

        // const data = await getImages();

        setImageData(data);
        // console.log("image data : ", imageData);
      } catch (err) {
        console.log("img err : ", err);
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
      <div className="flex justify-center md:justify-start">
        <Switch
          leftname="Human face"
          rightname="Number plate"
          onClick_left={handleLeft}
          onClick_right={handleRight}
          className="sticky  pb-2 top-0 bg-[var(--background-color)]"
        />
      </div>
      {activeComponent === "Human face" ? (
        <div className="text-pretty grid grid-cols-1 flex-wrap md:grid-cols-3 gap-y-8 items-center mx-4 px-4 mt-8">
          {imageData!.map((data, index) => (
            <Card key={index} image={data.imageUrl} date={data.date} page="imageAnalyze" />
          ))}
        </div>
      ) : (
        <div className=" h-[80vh] flex justify-center items-center text-3xl ">
          Coming soon ...
        </div>
      )}
    </div>
  );
};

export default ImageAnalysePage;
