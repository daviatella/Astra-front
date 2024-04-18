export async function updateUser(requestBody, userId) {
  try {
    console.log("HERE111")
    const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(response);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCategory(category, userId) {
    let b = {
        category: category,
        owner: userId
    }
    try {
      const response = await fetch(`http://localhost:4000/api/categories/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(b),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error(response);
      }
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }

export async function updateDocumentsWithTag(oldTag, newTagData, owner) {
  let o = {
    owner: owner,
  };
  try {
    const response = await fetch(
      `http://localhost:4000/api/docs/updateWithTag/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldTag, newTagData, o }),
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(response);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error updating documents:", error);
    throw error;
  }
}
export async function updateDocumentsWithCat(oldCat, newCat, owner, updateAllTags) {
    let b  = { oldCat, newCat, owner: owner, updateAll: updateAllTags }
    console.log(b)
  try {
    const response = await fetch(
      `http://localhost:4000/api/docs/updateWithCat/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(b),
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(response);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error updating documents:", error);
    throw error;
  }
}
