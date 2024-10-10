import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProductDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { MachineryDetailData } from "~/src/app/models/machinery_models";
import Machinery from "~/src/app/api/machinery/Machinery";
import Toast from "react-native-toast-message";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { ActivityIndicator, Button } from "react-native-paper";
import { mainBlue } from "~/src/app/constants/cssConstants";
import Carousel from "react-native-reanimated-carousel";
import { formatVND } from "~/src/app/utils/formatVND";
import { cn } from "~/src/app/utils/cn";

const ProductDetail = ({ navigation, route }: ProductDetailScreenProps) => {
  const { productId } = route.params;
  const [machinery, setMachinery] = useState<MachineryDetailData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
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
  }, [productId]);

  const getDetail = async () => {
    try {
      if (productId) {
        const response = await Machinery.getMachineryDetail(productId);
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

  const handleAddToCart = () => {
    // Add your add-to-cart logic here
    Toast.show({
      type: "success",
      text1: "Added to cart",
      text2: `Quantity: ${quantity}`,
    });
  };

  return isLoading ? (
    <View className="w-full h-full justify-center items-center">
      <ActivityIndicator color={mainBlue} size="large" />
    </View>
  ) : (
    <View className="flex bg-white pb-28">
      <ScrollView className="" onScroll={handleScroll}>
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            height={350}
            data={machinery?.productImageList || []}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: "100%",
                  height: 350,
                  borderBottomEndRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("ProductImagesSlide", {
                    imagesList: machinery?.productImageList || [],
                    chosenIndex: 1,
                  })
                }
              >
                <Image
                  src={item?.productImageUrl}
                  alt="Hình máy"
                  className="w-full h-full rounded-b-lg object-cover"
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="p-3">
          <Text className="text-2xl font-semibold">
            {machinery?.productName}
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
              {formatVND(100000000)} ~ {formatVND(120000000)}
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
            <View className="flex items-center flex-row">
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
                <View style={{ flex: 1 }}>
                  <Text style={{ flexWrap: "wrap" }}>Tên bộ phận</Text>
                </View>
                <View style={{ minWidth: 48, justifyContent: "center" }}>
                  <Text>Số lượng</Text>
                </View>
              </View>
              {machinery?.componentProductList.map((component, index) => (
                <View
                  className={cn(
                    "flex-row justify-between w-full gap-2 p-2 border-b-[0.5px] border-gray-500",
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  )}
                  key={index}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ flexWrap: "wrap" }}>
                      {component.componentName} ahad uk yuk has s s s s s gku
                      asgkuy auk uk s s s s s s s s aya das
                    </Text>
                  </View>
                  <View style={{ minWidth: 48, justifyContent: "center" }}>
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
              <View style={{ flex: 1 }}>
                <Text style={{ flexWrap: "wrap" }}>Thuộc tính</Text>
              </View>
              <View style={{ minWidth: 48, justifyContent: "center" }}>
                <Text>Thông số</Text>
              </View>
            </View>
            {machinery?.productAttributeList.map((attribute, index) => (
              <View
                className={cn(
                  "flex-row justify-between w-full gap-2 p-2 border-b-[0.5px] border-gray-500",
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                )}
                key={index}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ flexWrap: "wrap" }}>
                    {attribute.attributeName} ad asas ashas hjkas jkgk ajgk ajag
                    ks
                  </Text>
                </View>
                <View style={{ minWidth: 48, justifyContent: "center" }}>
                  <Text className="text-center">
                    {attribute.specifications} {attribute.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full bg-white flex-row justify-between items-center py-5 px-3 border-t border-gray-300">
        <View className="flex-row items-center ">
          <TouchableOpacity
            style={[styles.addItemButtonStyle, styles.minusButton]}
          >
            <Text className="text-2xl text-blue-700 font-semibold bottom-[2px]">
              -
            </Text>
          </TouchableOpacity>
          <Text className="px-4 text-lg font-semibold">{quantity}</Text>
          <TouchableOpacity
            style={[styles.addItemButtonStyle, styles.plusButton]}
          >
            <Text className="text-2xl text-[#ffffff] font-semibold bottom-[2px]">
              +
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          onPress={handleAddToCart}
          buttonColor={mainBlue}
          textColor="white"
          style={[styles.buttonStyle]}
        >
          <Text className="text-lg">Thêm vào giỏ hàng</Text>
        </Button>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 4,
    width: 250,
  },
  addItemButtonStyle: {
    borderRadius: 10,
    width: 30,
    height: 30,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderColor: mainBlue,
  },
  minusButton: {
    backgroundColor: "white",
  },
  plusButton: {
    backgroundColor: mainBlue,
  },
});
