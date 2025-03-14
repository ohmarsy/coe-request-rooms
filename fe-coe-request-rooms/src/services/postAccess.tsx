interface RequestBody {
    rooms: string[];
    date: string;
    checkin: string;
    checkout: string;
    user_id: string;
}

export const submitAccessListRequest = async (requestBody: RequestBody) => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost";
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${baseUrl}:5003/access-list/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to submit');
        }

        return response.json();
    } catch (error) {
        console.error('Error submitting access list request:', error);
        throw error;
    }
};