import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MachineDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { MachineryDetailData } from "~/src/app/models/machinery_models";
import Machinery from "~/src/app/api/machinery/Machinery";
import Toast from "react-native-toast-message";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { mainBlue } from "~/src/app/constants/cssConstants";
import Carousel from "react-native-reanimated-carousel";
import { formatVND } from "~/src/app/utils/formatVND";
import { cn } from "~/src/app/utils/cn";

const MachineDetail = ({ navigation, route }: MachineDetailScreenProps) => {
  const { machineId } = route.params;
  const [machinery, setMachinery] = useState<MachineryDetailData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imageHeight = 300;

  const width = Dimensions.get("window").width;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newTintColor = scrollY < imageHeight ? "white" : mainBlue;
    const newBackgroundColor =
      scrollY < imageHeight ? "rgba(128, 128, 128, 0.3)" : "rgb(255, 255, 255)";

    navigation.setParams({
      headerTintColor: newTintColor,
      headerBackgroundColor: newBackgroundColor,
    });
  };
  useEffect(() => {
    getDetail();
  }, [machineId]);

  const getDetail = async () => {
    try {
      if (machineId) {
        const response = await Machinery.getMachineryDetail(machineId);
        if (response) {
          setMachinery(response);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lấy dữ liệu thất bại",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeHtmlTags = (str: string) => {
    // Replace <p>, <ul>, and </ul> tags with newlines
    let formattedContent = str.replace(/<\/?(p|ul)>/g, "\n");

    // Replace <li> tags with a dash and ensure proper line breaks
    formattedContent = formattedContent.replace(/<\/?li>/g, (tag) =>
      tag === "<li>" ? "- " : "\n"
    );

    // Replace <br> tags with a newline
    formattedContent = formattedContent.replace(/<br\s*\/?>/g, "\n");

    // Remove any multiple consecutive newlines and replace with double newline
    formattedContent = formattedContent.replace(/\n\s*\n/g, "\n\n");

    // Trim leading and trailing spaces
    formattedContent = formattedContent.trim();

    // Add a space before hyphen if it follows a newline or is at the start of the string
    formattedContent = formattedContent.replace(/(?<=\n|^)-/g, " -");

    return formattedContent;
  };

  return isLoading ? (
    <View className="w-full h-full justify-center items-center">
      <ActivityIndicator color={mainBlue} size="large" />
    </View>
  ) : (
    <View
      className="flex bg-white"
      // pb23
    >
      <ScrollView className="" onScroll={handleScroll}>
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            height={350}
            data={machinery?.machineImageList || []}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: "100%",
                  height: 350,
                  borderBottomEndRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("MachineImagesSlide", {
                    imagesList: machinery?.machineImageList || [],
                    chosenIndex: 1,
                  })
                }
              >
                <Image
                  src={item?.machineImageUrl}
                  alt="Hình máy"
                  className="w-full h-full rounded-b-lg object-cover"
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="p-3">
          <Text className="text-2xl font-semibold">
            {machinery?.machineName}
          </Text>
          {/* <View className="items-start mt-2">
            <View className="bg-blue-700 p-1 rounded-2xl px-2 py-1">
              <Text style={{ color: "white" }} className="text-center text-sm">
                {machinery?.categoryName}
              </Text>
            </View>
          </View> */}
          <View className="flex items-center flex-row mt-2">
            <Text
              style={{ color: mainBlue }}
              className="text-center text-xl font-semibold"
            >
              {machinery?.rentPrice && formatVND(machinery?.rentPrice)}/ngày
            </Text>
            <Text className="text-muted-foreground"> (Giá thuê ước tính)</Text>
          </View>
          <View className="items-start mt-5">
            <View>
              <Text className="text-xl font-semibold mb-2">
                Thông tin chi tiết
              </Text>
            </View>
            <View className="flex items-center flex-row">
              <Text className="text-muted-foreground">Loại máy: </Text>
              <Text className="text-blue-700">{machinery?.categoryName}</Text>
            </View>
            <View className="flex items-center flex-row">
              <Text className="text-muted-foreground">Xuất xứ: </Text>
              <Text className="">{machinery?.origin}</Text>
            </View>
            <View className="flex items-center flex-row">
              <Text className="text-muted-foreground">Model: </Text>
              <Text className="">{machinery?.model}</Text>
            </View>
            <View className="flex items-start flex-row flex-wrap ">
              <Text className="text-muted-foreground">Chi tiết: </Text>
              <Text className="">{machinery?.description}</Text>
            </View>
          </View>
          <View className="items-start mt-5">
            <View>
              <Text className="text-xl font-semibold mb-2">Bộ phận máy</Text>
            </View>
            <View>
              <View
                className={
                  "flex-row justify-between w-full gap-2 p-2 border-b-[1px] border-gray-400"
                }
              >
                <View style={{ width: 36, justifyContent: "center" }}>
                  <Text style={{ flexWrap: "wrap" }} className="text-center">
                    No.
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ flexWrap: "wrap" }}>Tên bộ phận</Text>
                </View>
                <View style={{ minWidth: 60, justifyContent: "center" }}>
                  <Text>Số lượng</Text>
                </View>
              </View>
              {machinery?.machineComponentList.map((component, index) => (
                <View
                  className={cn(
                    "flex-row justify-between w-full gap-2 p-2 border-b-[0.5px] border-gray-500",
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  )}
                  key={index}
                >
                  <View style={{ width: 36, justifyContent: "center" }}>
                    <Text className="text-center">{index + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ flexWrap: "wrap" }}>
                      {component.componentName}
                    </Text>
                  </View>
                  <View style={{ minWidth: 60, justifyContent: "center" }}>
                    <Text className="text-center">{component.quantity}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View className="items-start mt-5">
            <View>
              <Text className="text-xl font-semibold mb-2">Thuộc tính máy</Text>
            </View>
            <View
              className={
                "flex-row justify-between w-full gap-2 p-2 border-b-[1px] border-gray-400"
              }
            >
              <View style={{ width: 36, justifyContent: "center" }}>
                <Text style={{ flexWrap: "wrap" }} className="text-center">
                  No.
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ flexWrap: "wrap" }}>Thuộc tính</Text>
              </View>
              <View style={{ minWidth: 60, justifyContent: "center" }}>
                <Text>Thông số</Text>
              </View>
            </View>
            {machinery?.machineAttributeList.map((attribute, index) => (
              <View
                className={cn(
                  "flex-row justify-between w-full gap-2 p-2 border-b-[0.5px] border-gray-500",
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                )}
                key={index}
              >
                <View style={{ width: 36, justifyContent: "center" }}>
                  <Text className="text-center">{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ flexWrap: "wrap" }}>
                    {attribute.attributeName}
                  </Text>
                </View>
                <View style={{ minWidth: 60, justifyContent: "center" }}>
                  <Text className="text-center">
                    {attribute.specifications} {attribute.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View className="items-start mt-5">
            <View>
              <Text className="text-xl font-semibold mb-2">Điều khoản máy</Text>
            </View>
            {machinery?.machineTermList.map((term, index) => (
              <View key={index}>
                <Text className="font-semibold">
                  {index + 1}. {term.title}
                </Text>
                <Text>{removeHtmlTags(term.content)}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MachineDetail;
