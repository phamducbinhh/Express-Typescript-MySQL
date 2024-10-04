const generateCode = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // Tập hợp ký tự có thể sử dụng
  let result = ''

  // Tạo ra mã ngẫu nhiên
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length) // Tạo chỉ số ngẫu nhiên
    result += characters.charAt(randomIndex) // Thêm ký tự ngẫu nhiên vào kết quả
  }

  return result // Trả về mã được tạo
}

module.exports = generateCode
