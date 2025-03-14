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
            const formattedDate = dateObj.toISOString().split('T')[0];

            const checkinTime = item.checkin.substring(0, 5);
            const checkoutTime = item.checkout.substring(0, 5);

            const status = item.approved === "approved" ? 'Approved' : 'Pending';

            return {
                key: item.id.toString(),
                roomID: item.room_id,
                date: formattedDate,
                checkin: checkinTime,
                checkout: checkoutTime,
                status: status
            };
        });

        return formattedData;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
};