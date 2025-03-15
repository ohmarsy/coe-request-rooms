import axios from 'axios';

// Define the structure of an image
export interface ImageData {
  imageUrl: string;
  timestamps: string;
  id: string;
  pages: number;
}

export interface Data {
  filename: string;
  id: number;
  uploaded_at: string;
}

// ฟังก์ชันดึงข้อมูลภาพจาก API
export const fetchAllImages = async (): Promise<ImageData[]> => {
  try {
    //  ดึงข้อมูลจาก API แรก
    const response = await axios.get(`http://10.161.112.138:5001/allImages`, {
      headers: {
        "x-api-key":
          "e90cfd82cd64ee7599b5f98180f743a6b03c762d6a10b1e69276d50a61f61fa6",
      },
    });

    // ดึงรายการ ID และวันที่ของภาพทั้งหมด
    const imageInfo = response.data.images.map((image: Data) => ({
      id: image.id,
      date: image.uploaded_at, // ดึงวันที่ที่อัปโหลด
    }));

    // สร้างเซ็ต ID เพื่อไม่ให้มีการเรียก API ซ้ำ
    const imageIds = new Set<number>();
    const imageUrls = await Promise.all(
      imageInfo.map(async ({ id, date }: { id: number; date: string }) => {
        if (imageIds.has(id)) return null; // ถ้า ID นี้เคยเรียกไปแล้วจะข้ามไป

        imageIds.add(id); // บันทึก ID ที่เรียกไปแล้ว

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
            id: id.toString(),
            pages: response.data.pages,
          };
        } catch (err) {
          console.error(`Error fetching image ID ${id}:`, err);
          return null; // คืนค่า null ถ้าเกิด error
        }
      })
    );

    // กรองเฉพาะค่าที่ไม่ใช่ null
    return imageUrls.filter((url) => url !== null);
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};
