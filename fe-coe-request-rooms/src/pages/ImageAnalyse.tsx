import { useEffect, useState } from "react";
import Card from "../components/Card";
import Switch from "../components/Switch";
import { fetchAllImages, ImageData } from "../services/getImages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ImageAnalysePage = () => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeComponent, setActiveComponent] = useState<
    "Human face" | "Number plate"
  >("Human face");

  // Fetch images when currentPage changes
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await fetchAllImages(currentPage); // ส่ง currentPage ไป
        setImageData(data);
        console.log("Fetched image data:", data);
      } catch (err) {
        console.log("Error fetching images:", err);
      }
    };
    fetchImages();
  }, [currentPage]); // รีโหลดข้อมูลเมื่อ currentPage เปลี่ยน

  // ตรวจสอบว่ามีข้อมูลก่อนใช้ .pages
  const totalPages = imageData.length > 0 ? imageData[0].pages : 1;

  return (
    <div className="p-2">
      {/* Toggle Switch */}
      <div className="flex justify-center md:justify-start">
        <Switch
          leftname="Human face"
          rightname="Number plate"
          onClick_left={() => setActiveComponent("Human face")}
          onClick_right={() => setActiveComponent("Number plate")}
          className="sticky pb-2 top-0 bg-[var(--background-color)]"
        />
      </div>

      {activeComponent === "Human face" ? (
        <>
          {/* Grid Layout */}
          <div className="text-pretty grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 items-center mx-4 px-4 mt-4">
            {imageData.map((data, index) => (
              <Card
                key={index}
                image={data.imageUrl}
                date={new Date(data.timestamps).toLocaleDateString()}
                time={new Date(data.timestamps).toLocaleTimeString([], { hour12: false })}
                page="imageAnalyze"
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="cursor-pointer"
                />
              </button>
              <span className="text-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="cursor-pointer"
                />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="h-[80vh] flex justify-center items-center text-3xl">
          Coming soon ...
        </div>
      )}
    </div>
  );
};

export default ImageAnalysePage;
