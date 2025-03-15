export const GetHistoryData = async (userId: string) => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost";
    try {
        const response = await fetch(`${baseUrl}:5003/access-list/user/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch history data');
        }

        const data = await response.json();

        const formattedData = data.map((item: { id: number, room_id: string, date: string, checkin: string, checkout: string, approved: string }) => {
            const dateObj = new Date(item.date);
            // Format date as DD-MM-YYYY
            const day = dateObj.getDate().toString().padStart(2, '0');
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
            const year = dateObj.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            const checkinTime = item.checkin.substring(0, 5);
            const checkoutTime = item.checkout.substring(0, 5);

            const status = item.approved === "approved" ? 'Approved' :
                item.approved === "rejected" ? 'Rejected' : 'Pending';
            return {
                key: item.id.toString(),
                id: item.id,
                roomID: item.room_id,
                date: formattedDate,
                checkin: checkinTime,
                checkout: checkoutTime,
                status: status
            };
        });
        formattedData.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);


        return formattedData.map((item: { id: number; roomID: string; date: string; checkin: string; checkout: string; status: string }) => {
            const { id, ...rest } = item; // eslint-disable-line @typescript-eslint/no-unused-vars
            return rest;
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
};