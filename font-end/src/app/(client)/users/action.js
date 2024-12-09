"use server"

export const handleCreateUser = async (formData) => {
  try {
    const response = await fetch(`${process.env.SERVER_API}/users`, {
      method: "POST",
      body: formData, // Directly pass the FormData object
    });

    // Kiểm tra mã trạng thái HTTP của phản hồi
    if (!response.ok) {
      // Nếu phản hồi không thành công (ví dụ: 4xx, 5xx)
      throw new Error(`Server error: ${response.statusText}`);
    }

    // Kiểm tra xem phản hồi có phải JSON không
    let responseBody;
    try {
      responseBody = await response.json();
    } catch (e) {
      // Nếu phản hồi không thể phân tích thành JSON, in thông báo lỗi
      console.error("Response is not JSON:", e);
      return false;
    }

    // Kiểm tra xem responseBody có chứa trường success hay không và trả kết quả
    if (responseBody.success) {
      return true;
    } else {
      console.error("Error from server:", responseBody.message);
      return false;
    }
  } catch (error) {
    // Nếu có lỗi trong quá trình gửi yêu cầu hoặc xử lý phản hồi
    console.error("Error creating user:", error);
    return false;
  }
};


export const handleUpdateUser = async (formData) => {

  const { id, ...data } = Object.fromEntries(formData);
  const response = await fetch(`${process.env.SERVER_API}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();

  if (responseBody.success) {
  // 
    return true;
   
  }
  return false;
};
