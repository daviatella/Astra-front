
export async function updateUser(requestBody, userId) {
    try {
        const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            console.log(response);
            throw new Error(response);
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function updateDocumentsWithTag(oldTag, newTagData, owner) {
    let o = {
        owner: owner
    }
    try {
        const response = await fetch(`http://localhost:4000/api/docs/updateWithTag/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldTag, newTagData,o})
        });
        if (!response.ok) {
            console.log(response);
            throw new Error(response);
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error('Error updating documents:', error);
        throw error;
    }
}