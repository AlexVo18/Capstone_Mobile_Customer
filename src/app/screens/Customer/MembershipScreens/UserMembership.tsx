import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { UserMembershipProps } from "~/src/app/navigators/CustomerNavigators/MembershipNavigators/MembershipTopTabs";
import MemberShipLog from "~/src/app/components/Customer/MembershipScreen/MemberShipLog";
import {
  CustomerMemberShip,
  MembershipLog,
} from "~/src/app/models/membership_models";
import Membership from "~/src/app/api/membership/Membership";
import { formatVND } from "~/src/app/utils/formatVND";

const UserMembership = ({ route, navigation }: UserMembershipProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userMembership, setUserMembership] = useState<CustomerMemberShip>();
  const [displayList, setDisplayList] = useState<MembershipLog[]>([]);
  const [logList, setLogList] = useState<MembershipLog[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);
  const itemPerPage = 20;

  useEffect(() => {
    getUserRanksLog();
  }, []);

  const getUserRanksLog = async () => {
    setIsLoading(true);
    try {
      const response =
        (await Membership.getUserMembership()) as CustomerMemberShip;
      if (response) {
        setUserMembership(response);
        setDisplayList(response.membershipRankLogs.slice(0, itemPerPage));
        setLogList(response.membershipRankLogs);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);

      pageRef.current += 1;
      setDisplayList(logList.slice(0, itemPerPage * pageRef.current));

      setIsLoadingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      <MemberShipLog
        navigation={navigation}
        route={route}
        isLoading={isLoading}
        displayList={displayList}
        handleLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
        ListHeaderComponent={
          <View className="w-full flex justify-center text-center items-center p-5 gap-1">
            <Text className="font-semibold text-lg">Bạn hiện tại đang</Text>
            <View className="items-center justify-center ">
              <Image
                source={
                  userMembership?.membershipRankName === "Hạng Đồng"
                    ? require("~/assets/images/bronze-tier.jpg")
                    : userMembership?.membershipRankName === "Hạng Bạc"
                      ? require("~/assets/images/silver-tier.jpg")
                      : userMembership?.membershipRankName === "Hạng Vàng"
                        ? require("~/assets/images/gold-tier.jpg")
                        : userMembership?.membershipRankName ===
                            "Hạng Kim Cương"
                          ? require("~/assets/images/diamond-tier.jpg")
                          : userMembership?.membershipRankName ===
                              "Hạng Bạch Kim"
                            ? require("~/assets/images/emerald-tier.jpg")
                            : require("~/assets/images/normal-tier.jpg")
                }
                alt=""
                className="h-40 w-40"
              />
            </View>
            <Text className="text-2xl font-semibold">
              {userMembership?.membershipRankName}
            </Text>
            <Text>
              Số tiền tiêu đã vượt:{" "}
              {userMembership?.moneySpent &&
                formatVND(userMembership?.moneySpent)}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default UserMembership;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
