import axios from "axios";
import { Data, ImageData } from "./getImages";

interface FetchPagination {
  page: number;
  per_page: number;
}

export const fetchAllImagesWithPagination = async ({
  page,
  per_page,
}: FetchPagination): Promise<ImageData[]> => {
  try {
    //  ดึงข้อมูลจาก API แรก
    const response = await axios.get(
      `http://10.161.112.138:5001/images?page=${page}&per_page=${per_page}`,
      {
        headers: {
          "x-api-key":
            "e90cfd82cd64ee7599b5f98180f743a6b03c762d6a10b1e69276d50a61f61fa6",
        },
      }
    );
    // console.log("Response data : ", response.data);

    // ดึงรายการ ID และวันที่ของภาพทั้งหมด
    const imageInfo = response.data.images.map((image: Data) => ({
      id: image.id,
      date: image.uploaded_at, // ดึงวันที่ที่อัปโหลด
    }));

    // ใช้ Promise.all() เพื่อดึงข้อมูลจาก API ที่สองสำหรับแต่ละ ID
    const imageUrls = await Promise.all(
      imageInfo.map(async ({ id, date }: { id: number; date: string }) => {
        try {
          const imageResponse = await axios.get(
            `http://10.161.112.138:5001/image/${id}`,
            {
              headers: {
                "x-api-key":
                  "e90cfd82cd64ee7599b5f98180f743a6b03c762d6a10b1e69276d50a61f61fa6",
              },
              withCredentials: true,
              responseType: "blob",
            }
          );
          const imgURL = URL.createObjectURL(imageResponse.data);

          return {
            imageUrl: imgURL,
            timestamps: date,
            id,
            pages: response.data.pages,
          }; // คืนค่า URL ของรูปภาพ
        } catch (err) {
          console.error(`Error fetching image ID ${id}:`, err);
          return null; // คืนค่า null ถ้าเกิด error
        }
      })
    );
    // console.log("imageUrls with date : ", imageUrls);

    // กรองเฉพาะค่าที่ไม่ใช่ null
    return imageUrls.filter((url) => url !== null);
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};
