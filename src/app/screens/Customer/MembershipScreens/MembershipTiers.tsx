import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Membership from "~/src/app/api/membership/Membership";
import { MembershipRankData } from "~/src/app/models/membership_models";
import Toast from "react-native-toast-message";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { formatVND } from "~/src/app/utils/formatVND";

const MembershipTiers = () => {
  const [membershipList, setMembershipList] = useState<MembershipRankData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRank();
  }, []);

  const getRank = async () => {
    try {
      const response = await Membership.getMembershipRanks();
      if (response) {
        setMembershipList(response);
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

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View className="py-5">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : (
        <View className="p-3">
          {membershipList.map((membership, index) => (
            <View key={index} style={{ marginHorizontal: 15 }}>
              <View
                style={[styles.card, styles.elevation]}
                className="p-[10px] flex flex-row gap-2"
              >
                <View className="items-center justify-center relative">
                  <Image
                    source={
                      membership.membershipRankName === "Hạng Đồng"
                        ? require("~/assets/images/bronze-tier.jpg")
                        : membership.membershipRankName === "Hạng Bạc"
                          ? require("~/assets/images/silver-tier.jpg")
                          : membership.membershipRankName === "Hạng Vàng"
                            ? require("~/assets/images/gold-tier.jpg")
                            : membership.membershipRankName === "Hạng Kim Cương"
                              ? require("~/assets/images/diamond-tier.jpg")
                              : membership.membershipRankName ===
                                  "Hạng Bạch Kim"
                                ? require("~/assets/images/emerald-tier.jpg")
                                : require("~/assets/images/normal-tier.jpg")
                    }
                    alt=""
                    className="h-20 w-20"
                  />
                </View>
                <View style={{ flex: 1 }} className="flex justify-between">
                  <Text className="text-lg font-semibold">
                    {membership.membershipRankName}
                  </Text>
                  <Text>
                    Số tiền chi tiêu:{" "}
                    <Text className="font-semibold">
                      {formatVND(membership.moneySpent)}
                    </Text>
                  </Text>
                  <Text>Chi tiết: {membership.content}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default MembershipTiers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: mutedForground,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: mutedForground,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
