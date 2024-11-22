import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ErrorMessageRegister } from "~/src/app/constants/errorMessages";
import { UserData, UserDetailData } from "~/src/app/models/auth_models";
import Auth from "~/src/app/api/auth/Auth";
import useAuth from "~/src/app/hooks/useAuth";
import axios from "axios";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import Invoice from "~/src/app/api/invoice/Invoice";
import { TaxCodeResponseData } from "~/src/app/models/invoice_models";
import Toast from "react-native-toast-message";
import { parse } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { Camera } from "lucide-react-native";
import RNPickerSelect from "react-native-picker-select";
import { cn } from "~/src/app/utils/cn";
import { formatDate } from "~/src/app/utils/dateformat";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";

const Profile = () => {
  const { userInfo } = useAuth();

  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [profile, setProfile] = useState<UserDetailData>();
  const [currentImage, setCurrentImage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [taxLoading, setTaxLoading] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(validate.email.required)
      .matches(/\.com$/, validate.email.invalidFormat),
    name: Yup.string().required(validate.name.required),
    phone: Yup.string()
      .required(validate.phone.required)
      .length(10, validate.phone.length),
    gender: Yup.string().required(validate.gender.required),
    dateBirth: Yup.string().required(validate.dateBirth.required),
    company: Yup.string().required(validate.company.required),
    position: Yup.string().required(validate.position.required),
    taxNumber: Yup.string().required(validate.taxNumber.required),
    address: Yup.string().required(validate.address.required),
    avatarImg: Yup.string().required(validate.avatarImg.required),
  });

  useEffect(() => {
    getUserDetail();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Cần quyền truy cập thư viện ảnh để thay đổi ảnh đại diện",
        });
      }
    })();
  }, []);

  const getUserDetail = async () => {
    try {
      const response = await Auth.getUserDetail();
      if (response) {
        setProfile(response);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
      gender: 1,
      dateBirth: "",
      company: "",
      position: "",
      taxNumber: "",
      avatarImg: "",
    } as UserDetailData,
    validationSchema,
    onSubmit: async (values: UserDetailData) => {
      setIsUpdateLoading(true);
      try {
        if (!isFormEmpty()) {
          let imagePath = values.avatarImg;

          if (selectedImage) {
            imagePath = await uploadImage(selectedImage);
          }
          console.log(values);
          const response = await Auth.updateUserDetail({
            name: values.name,
            email: values.email,
            address: values.address,
            phone: values.phone,
            gender: values.gender,
            dateBirth: values.dateBirth,
            company: values.company,
            position: values.position,
            taxNumber: values.taxNumber,
            avatarImg: imagePath,
          });
          if (response && userInfo) {
            const userData: UserData = {
              name: values.name,
              email: values.email,
              address: values.address,
              phone: values.phone,
              accountId: userInfo?.accountId,
              dateCreate: userInfo.dateCreate,
              roleId: userInfo.roleId,
              status: userInfo.status,
              username: userInfo.username,
              avatarImg: imagePath,
            };
            const stringifyUser = JSON.stringify(userData);
            await SecureStore.setItemAsync("user", stringifyUser);
            getUserDetail();
            Toast.show({
              type: "success",
              text1: "Cập nhật thông tin thành công",
            });
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // console.log(error.response.data);
            if (error.response.data) {
              Toast.show({
                type: "error",
                text1: error.response.data,
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Thay đổi thông tin thất bại",
              });
            }
          }
        }
      } finally {
        setIsUpdateLoading(false);
      }
    },
  });

  const useDebounceTaxNumber = useDebounce(formik.values.taxNumber);

  useEffect(() => {
    getCompany();
  }, [useDebounceTaxNumber]);

  const getCompany = async () => {
    setTaxLoading(true);
    try {
      const response = (await Invoice.getTaxCodeInfo(
        useDebounceTaxNumber
      )) as TaxCodeResponseData;
      if (response) {
        formik.setFieldValue("company", response.data.name);
        formik.setFieldValue("address", response.data.address);
      } else {
        formik.setFieldValue("company", "");
        formik.setFieldValue("address", "");
      }
    } catch (error) {
      formik.setFieldValue("company", "");
      formik.setFieldValue("address", "");
      return;
    } finally {
      setTaxLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      formik.setValues({
        name: profile.name,
        address: profile.address,
        avatarImg: profile.avatarImg,
        company: profile.company,
        dateBirth: parse(
          profile.dateBirth,
          "MM/dd/yyyy HH:mm:ss",
          new Date()
        ).toISOString(),
        email: profile.email,
        gender: profile.gender,
        phone: profile.phone,
        position: profile.position,
        taxNumber: profile.taxNumber,
      });
      setCurrentImage(profile.avatarImg);
      if (profile.dateBirth) {
        try {
          const parsedDate = parse(
            profile.dateBirth,
            "MM/dd/yyyy HH:mm:ss",
            new Date()
          );
          setDate(parsedDate);
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }
    }
  }, [profile]);

  const changeData = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString();
      formik.setFieldValue("dateBirth", formattedDate);
    }
    if (event.type === "dismissed") {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      setShowPicker(false);
    }
  }, [date]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Get the selected asset
        const selectedAsset = result.assets[0];

        // Compress the image
        const manipulatedImage = await manipulateAsync(
          selectedAsset.uri,
          [{ resize: { width: 500 } }],
          { compress: 0.7, format: SaveFormat.JPEG }
        );

        setCurrentImage(manipulatedImage.uri);
        setSelectedImage(manipulatedImage.uri);
        formik.setFieldValue("avatarImg", manipulatedImage.uri);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi khi chọn ảnh",
      });
    }
  };

  // Modify your uploadImage function for React Native
  const uploadImage = async (imageUri: string) => {
    const formData = new FormData();

    // Create file from local URI
    const filename = imageUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : `image`;

    formData.append("file", {
      uri: imageUri,
      name: filename,
      type,
    } as any);

    formData.append("upload_preset", "test-image");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dg9a4e1uw/image/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const isFormEmpty = () => {
    return (
      !formik.values.email ||
      !formik.values.name ||
      !formik.values.phone ||
      !formik.values.address ||
      !formik.values.gender ||
      !formik.values.dateBirth ||
      !formik.values.company ||
      !formik.values.position ||
      !formik.values.taxNumber ||
      !formik.values.avatarImg
    );
  };

  return isLoading ? (
    <View className="w-full h-full flex justify-center items-center">
      <ActivityIndicator color={mainBlue} size={"large"} />
    </View>
  ) : (
    <ScrollView className="flex-1 p-4 bg-white ">
      <TouchableOpacity onPress={pickImage} style={{ paddingBottom: 10 }}>
        <View className="items-center relative ">
          {currentImage ? (
            <Image
              source={{ uri: currentImage }}
              className="w-[100px] h-[100px] rounded-full"
            />
          ) : (
            <View className="w-[100px] h-[100px] rounded-full bg-gray-200 items-center justify-center">
              <ActivityIndicator size={"small"} color={mainBlue} />
            </View>
          )}
          <View className="absolute -bottom-1 right-40">
            <View className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg w-6 h-6 flex items-center justify-center">
              <Camera size={12} color={"#fff"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View className="w-full my-4">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "email" ? "text-blue-700" : ""
          )}
        >
          Email
          <Text className="text-red-600"> *</Text>
        </Text>

        <TextInput
          value={formik.values.email}
          onChangeText={(value) => {
            formik.setFieldValue("email", value);
          }}
          placeholder="Nhập email"
          className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
          onFocus={() => setFocusInput("email")}
          onBlur={() => {
            setFocusInput("");
            formik.setFieldTouched("email");
          }}
        />
        {formik.touched.email && formik.errors.email ? (
          <View>
            <Text className="text-red-600 text-sm">{formik.errors.email}</Text>
          </View>
        ) : null}
      </View>

      <View className="w-full mb-4">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "name" ? "text-blue-700" : ""
          )}
        >
          Họ và tên
          <Text className="text-red-600"> *</Text>
        </Text>
        <TextInput
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          placeholder="Họ và tên"
          className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
          onFocus={() => setFocusInput("name")}
          onBlur={() => {
            setFocusInput("");
            formik.setFieldTouched("name");
          }}
        />
        {formik.touched.name && formik.errors.name ? (
          <View>
            <Text className="text-red-600 text-sm">{formik.errors.name}</Text>
          </View>
        ) : null}
      </View>

      <View className="flex flex-row w-full gap-2 ">
        <View className="w-2/4 ">
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              focusInput === "dateBirth" ? "text-blue-700" : ""
            )}
          >
            Ngày sinh
            <Text className="text-red-600"> *</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              () => setFocusInput("dateBirth");
              setShowPicker(!showPicker);
            }}
          >
            <TextInput
              value={date && formatDate(date.toISOString())}
              onChangeText={formik.handleChange("dateBirth")}
              placeholder="Ngày sinh"
              className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
              onFocus={() => setFocusInput("dateBirth")}
              onBlur={() => {
                setFocusInput("");
                formik.setFieldTouched("dateBirth");
              }}
              editable={false}
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={changeData}
            />
          )}
        </View>
        <View className="w-2/4 ">
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              focusInput === "gender" ? "text-blue-700" : ""
            )}
          >
            Giới tính
            <Text className="text-red-600"> *</Text>
          </Text>
          <RNPickerSelect
            placeholder={{
              label: "Chọn giới tính",
              value: 0,
            }}
            value={formik.values.gender}
            onValueChange={(value) =>
              formik.setFieldValue("gender", parseInt(value))
            }
            onOpen={() => setFocusInput("gender")}
            items={[
              { label: "Nam", value: "1" },
              { label: "Nữ", value: "2" },
            ]}
          />
        </View>
      </View>
      <View className="flex flex-row w-full gap-2 mb-4">
        {formik.touched.dateBirth && formik.errors.dateBirth ? (
          <View className="w-2/4">
            <Text className="text-red-600 text-sm">
              {formik.errors.dateBirth}
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        {formik.touched.gender && formik.errors.gender ? (
          <View className="w-2/4">
            <Text className="text-red-600 text-sm">{formik.errors.gender}</Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View className="flex flex-row w-full gap-2">
        <View className="w-2/4 ">
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              focusInput === "phone" ? "text-blue-700" : ""
            )}
          >
            Số điện thoại
            <Text className="text-red-600"> *</Text>
          </Text>
          <TextInput
            value={formik.values.phone}
            onChangeText={formik.handleChange("phone")}
            placeholder="Số điện thoại"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("phone")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("phone");
            }}
            keyboardType="phone-pad"
          />
        </View>
        <View className="w-2/4">
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              focusInput === "position" ? "text-blue-700" : ""
            )}
          >
            Chức vụ
            <Text className="text-red-600"> *</Text>
          </Text>
          <RNPickerSelect
            placeholder={{ label: "Chọn chức vụ", value: "" }}
            value={formik.values.position}
            onValueChange={formik.handleChange("position")}
            onOpen={() => setFocusInput("position")}
            items={[
              { label: "Nhân viên", value: "Nhân viên" },
              { label: "Quản lý", value: "Quản lý" },
              { label: "Giám đốc", value: "Giám đốc" },
            ]}
          />
        </View>
      </View>
      <View className="flex flex-row w-full gap-2 mb-4">
        {formik.touched.phone && formik.errors.phone ? (
          <View className="w-2/4">
            <Text className="text-red-600 text-sm">{formik.errors.phone}</Text>
          </View>
        ) : (
          <View></View>
        )}
        {formik.touched.position && formik.errors.position ? (
          <View className="w-2/4">
            <Text className="text-red-600 text-sm">
              {formik.errors.position}
            </Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View className="w-full mb-4">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "taxNumber" ? "text-blue-700" : ""
          )}
        >
          Mã số thuế
          <Text className="text-red-600"> *</Text>
        </Text>
        <TextInput
          value={formik.values.taxNumber}
          onChangeText={formik.handleChange("taxNumber")}
          placeholder="Mã số thuế"
          className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
          onFocus={() => setFocusInput("taxNumber")}
          onBlur={() => {
            setFocusInput("");
            formik.setFieldTouched("taxNumber");
          }}
          keyboardType="phone-pad"
        />
        {formik.touched.taxNumber && formik.errors.taxNumber ? (
          <View className="w-2/4">
            <Text className="text-red-600 text-sm">
              {formik.errors.taxNumber}
            </Text>
          </View>
        ) : (
          <View className="mt-2">
            <View>
              <Text>
                <Text className="font-semibold">Công ty:</Text>{" "}
                {formik.values.company ? (
                  <Text>{formik.values.company}</Text>
                ) : (
                  <Text>
                    {taxLoading ? "Đang tìm kiếm..." : "Không tìm thấy"}
                  </Text>
                )}
              </Text>
            </View>
            <View>
              <Text>
                <Text className="font-semibold">Địa chỉ:</Text>{" "}
                {formik.values.address ? (
                  <Text>{formik.values.address}</Text>
                ) : (
                  <Text>
                    {taxLoading ? "Đang tìm kiếm..." : "Không tìm thấy"}
                  </Text>
                )}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View className="w-full my-4 pb-8">
        {isUpdateLoading ||
        isFormEmpty() ||
        !formik.isValid ||
        !!Object.keys(formik.errors).length ? (
          <TouchableOpacity
            style={[styles.buttonStyle, styles.disableButtonColor]}
            disabled
          >
            {isLoading ? (
              <ActivityIndicator color={"#6b7280"} size={"small"} />
            ) : (
              <Text className="text-lg text-center text-gray-500 font-semibold">
                Cập nhật thông tin
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttonStyle, styles.buttonColor]}
            disabled={
              isUpdateLoading ||
              isFormEmpty() ||
              !formik.isValid ||
              !!Object.keys(formik.errors).length
            }
            onPress={() => formik.handleSubmit()}
          >
            {isLoading ? (
              <ActivityIndicator color={"#6b7280"} size={"small"} />
            ) : (
              <Text className="text-lg text-center text-white font-semibold">
                Cập nhật thông tin
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
  },
  buttonColor: {
    backgroundColor: mainBlue,
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});
