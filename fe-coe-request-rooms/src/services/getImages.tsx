import axios from 'axios';

// Define the structure of an image
// export interface ImagData {
//   name: string;
//   email: string;
//   image: string;
//   timestamps: number;
// }
// Define the structure of an image
export interface ImageData {
  imageUrl: string;
  timestamps: string;
  id:string;
}

interface Data {
  filename: string;
  id: number;
  uploaded_at: string;
}

// ฟังก์ชันดึงข้อมูลภาพจาก API
export const fetchAllImages = async (): Promise<ImageData[]> => {
  try {
    //  ดึงข้อมูลจาก API แรก
    const response = await axios.get("http://10.161.112.138:5001/allImages", {
      headers: {
        "x-api-key":
          "e90cfd82cd64ee7599b5f98180f743a6b03c762d6a10b1e69276d50a61f61fa6",
      },
    });
    console.log("Response data : ", response.data);

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

          return{ imageUrl: imgURL, date, id }; // คืนค่า URL ของรูปภาพ
        } catch (err) {
          console.error(`Error fetching image ID ${id}:`, err);
          return null; // คืนค่า null ถ้าเกิด error
        }
      })
    );
    console.log("imageUrls with date : ", imageUrls);

    // กรองเฉพาะค่าที่ไม่ใช่ null
    return imageUrls.filter((url) => url !== null);
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};

// export const getImages = async (): Promise<ImagData[]> => {
//   try {
//     const response = await axios.get(`http://127.0.0.1:5003/images`, {});

//     // console.log("Response data : ", response.data);
//     // const images = await fetchAllImages();
//     // console.log("images : ", images);
//     return response.data;
//   } catch (err) {
//     console.error("Error fetching images:", err);
//     throw err;
//   }
// };
