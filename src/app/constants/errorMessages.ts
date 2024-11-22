export const ErrorMessageLogin = {
  email: {
    required: "Email đang trống",
  },
  password: {
    required: "Mật khẩu đang trống",
  },
};

export const ErrorMessageRegister = {
  email: {
    required: "Email đang trống",
    invalidFormat: "Email không đúng định dạng",
  },
  password: {
    required: "Mật khẩu đang trống",
    length: "Mật khẩu cần tối thiểu 8 kí tự",
    invalidFormat:
      "Mật khẩu cần bắt đầu bằng chữ in hoa và có ít nhất 1 ký tự đặt biệt",
  },
  rePassword: {
    required: "Mật khẩu nhập lại đang trống",
    invalid: "Mật khẩu nhập lại không trùng với mật khẩu ở trên",
  },
  name: {
    required: "Họ tên nhập lại đang trống",
  },
  phone: {
    required: "Số điện thoại đang trống",
    length: "Số điện thoại không hợp lệ",
  },
  gender: {
    required: "Giới tính đang trống",
  },
  dateBirth: {
    required: "Ngày sinh đang trống",
    tooYoung: "Bạn không đủ tuổi để đăng ký",
    invalid: "Ngày sinh không hợp lệ",
  },
  company: { required: "Tên công ty đang trống" },
  address: { required: "Địa chỉ đang trống" },
  position: { required: "Chức vụ đang trống " },
  taxNumber: {
    required: "Mã số thuế đang trống ",
    invalid: "Mã số thuế không hợp lệ",
  },
  avatarImg: {
    required: "Ảnh đại diện không được trống",
    notImg: "Loại tập tin không phù hợp",
  },
};

export const ErrorMessageForgetPassword = {
  email: {
    required: "Email đang trống",
    invalidFormat: "Email không đúng định dạng",
  },
  password: {
    required: "Mật khẩu đang trống",
    length: "Mật khẩu cần tối thiểu 8 kí tự",
    invalidFormat:
      "Mật khẩu cần bắt đầu bằng chữ in hoa và có ít nhất 1 ký tự đặt biệt",
  },
  rePassword: {
    required: "Mật khẩu nhập lại đang trống",
    invalid: "Mật khẩu nhập lại không trùng với mật khẩu ở trên",
  },
  otp: {
    required: "OTP đang trống",
  },
};

export const ErrorMessageChangePassword = {
  oldPassword: {
    required: "Mật khẩu đang trống",
  },
  password: {
    required: "Mật khẩu đang trống",
    length: "Mật khẩu cần tối thiểu 8 kí tự",
    invalidFormat:
      "Mật khẩu cần bắt đầu bằng chữ in hoa và có ít nhất 1 ký tự đặt biệt",
  },
  rePassword: {
    required: "Mật khẩu nhập lại đang trống",
    invalid: "Mật khẩu nhập lại không trùng với mật khẩu ở trên",
  },
};

export const ErrorMessageAddNewAddress = {
  compound: {
    province: {
      noSupport: "Hệ thống hiện tại chỉ giao trong nội thành TP.HCM",
    },
  },
  address_components: {
    length: "Địa chỉ cần được xác định chi tiết hơn",
  },
};

export const ErrorMessageNewRequest = {
  addressId: {
    required: "Địa chỉ giao hàng đang trống",
  },
  dateStart: {
    required: "Thời gian giao hàng đang trống",
  },
  numberOfMonth: {
    required: "Thời gian thuê máy đang trống",
  },
  rentingRequestSerialNumbers: {
    required: "Giỏ hàng đang trống",
  },
};
