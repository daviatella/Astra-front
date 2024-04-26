const BASE_URL = "http://localhost:4000/api/docs/";

export async function createDocument(doc) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    });
    if (!response.ok) {
      throw new Error(response);
    } else {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (error) {
    throw new Error("Error creating document:", error);
  }
}

export async function updateDocument(id, data) {
  try {
    const response = await fetch(BASE_URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response);
    } else {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (error) {
    throw new Error("Error updating document:", error);
  }
}

export async function deleteDocument(id, rev) {
  try {
    const response = await fetch(BASE_URL + id + `?rev=${rev}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response);
    } else {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (error) {
    throw new Error("Error deleting document:", error);
  }
}
