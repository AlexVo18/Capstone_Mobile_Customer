import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { CreateCheckRequestScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { useFocusEffect } from "@react-navigation/native";
import MachineCheckRequest from "~/src/app/api/machineCheckRequest/MachineCheckRequest";
import Contract from "~/src/app/api/contract/Contract";
import { ContractData } from "~/src/app/models/contract_models";
import {
  ChosenContract,
  CriteriaRequest,
  MachineRequestParams,
} from "~/src/app/models/machineCheckRequest_models";
import Toast from "react-native-toast-message";
import {
  createErrorMsg,
  createSuccessMsg,
  listErrorMsg,
} from "~/src/app/constants/toastMessage";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ScrollText, Trash2, Wrench } from "lucide-react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CancelModalBoolean from "~/src/app/components/modal/CancelModalBoolean";

const CreateCheckRequest = ({
  navigation,
  route,
}: CreateCheckRequestScreenProps) => {
  const { checkRequestList } = route.params;
  const [createParams, setCreateParams] = useState<MachineRequestParams[]>([]);
  const [focusInput, setFocusInput] = useState("");
  const [criterias, setCriterias] = useState<CriteriaRequest[]>([]);
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [chosenContract, setChosenContract] = useState<ChosenContract>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [checkRequestList])
  );

  const getData = async () => {
    try {
      const criteriaRes = await MachineCheckRequest.getRequestCriterias();
      const contractRes = (await Contract.getContracts(
        "Renting"
      )) as ContractData[];

      if (criteriaRes && contractRes) {
        setCriterias(criteriaRes);
        const latestRequestsByContract = checkRequestList.reduce(
          (acc, request) => {
            const existingRequest = acc.get(request.contractId);

            if (
              !existingRequest ||
              new Date(request.dateCreate) >
                new Date(existingRequest.dateCreate)
            ) {
              acc.set(request.contractId, request);
            }

            return acc;
          },
          new Map()
        );

        // Get all contract IDs that have requests
        const contractsWithRequests = new Set(
          checkRequestList.map((r) => r.contractId)
        );

        // A contract is available if:
        // 1. It has no requests OR
        // 2. Its latest request is completed/canceled
        const availableContracts = contractRes.filter((contract) => {
          const latestRequest = latestRequestsByContract.get(
            contract.contractId
          );

          return (
            !contractsWithRequests.has(contract.contractId) || // No requests
            (latestRequest && // Has requests and latest is completed/canceled
              (latestRequest.status.toLowerCase() === "completed" ||
                latestRequest.status.toLowerCase() === "canceled"))
          );
        });

        setContracts(availableContracts);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: listErrorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await Promise.all(
        createParams.map((param) =>
          MachineCheckRequest.createMachineCheckReq(param)
        )
      );
      Toast.show({
        type: "success",
        text1: createSuccessMsg,
      });
      setCreateParams([]);
      setChosenContract(undefined);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: createErrorMsg,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleCriteria = (criteriaName: string) => {
    const contractId = chosenContract?.contractId;
    const currentContractIndex = createParams.findIndex(
      (contract) => contract.contractId === contractId
    );

    if (!contractId) return;

    setCreateParams((prevParams) => {
      const updatedParams = [...prevParams];
      const currentContract = updatedParams[currentContractIndex];

      if (currentContractIndex === -1) {
        // Ko có contract param
        return [
          ...prevParams,
          {
            contractId,
            checkCriterias: [{ criteriaName }],
            note: "",
          },
        ];
      } else {
        // Có contract param
        const criteriaIndex = currentContract.checkCriterias.findIndex(
          (criteria) => criteria.criteriaName === criteriaName
        );

        if (criteriaIndex === -1) {
          // Ko có criteria trong contract
          currentContract.checkCriterias.push({
            criteriaName,
          });
          return updatedParams;
        } else {
          // Có criteria trong contract
          if (
            currentContract.checkCriterias.length === 1 &&
            !currentContract.note
          ) {
            // Có criteria và ko có note, bỏ contract
            return updatedParams.filter(
              (contract) => contract.contractId !== contractId
            );
          } else {
            // Có criteria và có note, chỉ bỏ criteria
            currentContract.checkCriterias.splice(criteriaIndex, 1);
            return updatedParams;
          }
        }
      }
    });
  };

  const handleRemoveAllCriteria = () => {
    const contractId = chosenContract?.contractId;
    const currentContractIndex = createParams.findIndex(
      (contract) => contract.contractId === contractId
    );

    if (!contractId) return;

    setCreateParams((prevParams) => {
      const updatedParams = [...prevParams];
      const currentContract = updatedParams[currentContractIndex];
      if (currentContract) {
        if (!currentContract.note) {
          // No note, remove the entire contract
          return updatedParams.filter(
            (contract) => contract.contractId !== contractId
          );
        } else {
          // There is a note, clear the criteria only
          currentContract.checkCriterias = [];
          return updatedParams;
        }
      } else {
        // If currentContract is undefined, return the previous parameters
        return prevParams;
      }
    });
  };

  const handleAddNote = (e: string) => {
    const content = e;
    const contractId = chosenContract?.contractId;
    const currentContractIndex = createParams.findIndex(
      (contract) => contract.contractId === contractId
    );

    if (!contractId) return;

    setCreateParams((prevParams) => {
      const updatedParams = [...prevParams];
      const currentContract = updatedParams[currentContractIndex];

      if (content) {
        // Có content
        if (currentContractIndex === -1) {
          // Ko có contract param
          return [
            ...prevParams,
            { contractId, checkCriterias: [], note: content },
          ];
        } else {
          // Có contract param
          // Kiếm param dựa vào contract index và update note
          updatedParams[currentContractIndex].note = content;
          return updatedParams;
        }
      } else if (!content && currentContract.checkCriterias.length !== 0) {
        // Ko có content và có criteria
        updatedParams[currentContractIndex].note = "";
        return updatedParams;
      } else {
        // Ko có content và ko có criteria
        return updatedParams.filter(
          (contract) => contract.contractId !== contractId
        );
      }
    });
  };

  return isLoading ? (
    <View className="w-full h-full bg-white flex justify-center items-center">
      <ActivityIndicator color={mainBlue} size={"large"} />
    </View>
  ) : contracts.length !== 0 ? (
    <ScrollView className="h-full w-full bg-white">
      <CancelModalBoolean
        open={open}
        setOpen={setOpen}
        onPress={() => setCreateParams([])}
        isLoading={isLoading}
        type="Contract"
      />
      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.contractId}
          data={contracts}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.containerStyle,
                  createParams.find(
                    (paramContract) =>
                      paramContract.contractId === item.contractId
                  ) && styles.inListContainerStyle,
                  chosenContract?.contractId === item.contractId &&
                    styles.chosenContainerStyle,
                ]}
                onPress={() => {
                  chosenContract &&
                  chosenContract?.contractId === item.contractId
                    ? setChosenContract(undefined)
                    : setChosenContract({
                        contractId: item.contractId,
                        serialNumber: item.serialNumber,
                        machineName: item.machineName,
                        thumbnail: item.thumbnail,
                        address: item.contractAddress.addressBody,
                      });
                }}
              >
                <View className=" w-full">
                  <Image
                    src={item.thumbnail}
                    alt=""
                    className="h-52 w-full rounded-lg"
                  />
                </View>
                <Text className="line-clamp-2 font-semibold">
                  {item.machineName}
                </Text>
                <Text>Tên HĐ: {item.contractId}</Text>
                <Text>Mã máy: {item.serialNumber}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <View className="flex flex-row gap-4 px-2">
          <View className="flex flex-row gap-1 items-center">
            <View className="h-4 w-4 bg-blue-700 rounded-md"></View>
            <Text className="text-blue-700 font-semibold">Đang chọn</Text>
          </View>
          <View className="flex flex-row gap-1 items-center">
            <View className="h-4 w-4 bg-lime-400 rounded-md"></View>
            <Text className="text-lime-400 font-semibold">
              Trong danh sách tạo yêu cầu
            </Text>
          </View>
        </View>
      </View>

      {chosenContract ? (
        <View className="p-2 flex flex-col gap-2">
          <View className="flex flex-row gap-2 items-center">
            <View className="w-28">
              <Image
                src={chosenContract.thumbnail}
                alt=""
                className="h-28 w-full rounded-lg"
              />
            </View>
            <View className="flex flex-col">
              <View>
                <Text className="font-semibold">
                  Mã máy:{" "}
                  <Text className="font-normal">
                    {chosenContract.serialNumber}
                  </Text>
                </Text>
              </View>
              <View className="w-80">
                <Text className="font-semibold">
                  Tên máy:{" "}
                  <Text className="font-normal">
                    {chosenContract.machineName}
                  </Text>
                </Text>
              </View>
              <View>
                <Text className="font-semibold">
                  Mã HĐ:{" "}
                  <Text className="font-normal">
                    {chosenContract.contractId}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text className="font-semibold">
              Địa chỉ:{" "}
              <Text className="font-normal">{chosenContract.address}</Text>
            </Text>
          </View>
          <View>
            <Text className="font-semibold">Máy đang bị</Text>
            <View className="flex flex-row flex-wrap w-full overflow-hidden gap-2 py-1 ">
              <TouchableOpacity
                style={styles.removeCriteria}
                onPress={handleRemoveAllCriteria}
              >
                <View>
                  <Trash2 size={16} color={"#dc2626"} />
                </View>
              </TouchableOpacity>
              {criterias.map((criteria, index) => {
                const currentContract = createParams.find(
                  (contract) =>
                    contract.contractId === chosenContract.contractId
                );
                const currentCriteria = currentContract?.checkCriterias.find(
                  (chosenCriteria) =>
                    chosenCriteria.criteriaName === criteria.name
                );
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      currentCriteria
                        ? styles.chosenCriteria
                        : styles.unchosenCriteria,
                    ]}
                    onPress={() => handleToggleCriteria(criteria.name)}
                  >
                    <Text
                      className="text-center"
                      style={[
                        currentCriteria
                          ? { color: "#fff" }
                          : { color: "#1d4ed8" },
                      ]}
                    >
                      {criteria.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View>
            <Text className="font-semibold">Ghi chú</Text>
            <TextInput
              placeholder="Nhập ghi chú"
              className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
              onFocus={() => setFocusInput("note")}
              onBlur={() => {
                setFocusInput("");
              }}
              value={
                createParams.find(
                  (contract) =>
                    contract.contractId === chosenContract.contractId
                )?.note || ""
              }
              onChangeText={(e) => handleAddNote(e)}
            />
          </View>
        </View>
      ) : (
        <View
          className=" w-full flex justify-center items-center flex-col"
          style={styles.noChosenContainer}
        >
          <Wrench color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Hãy chọn 1 máy để bắt đầu tạo yêu cầu sửa chữa
          </Text>
        </View>
      )}
      <View className=" p-2 flex-row items-center">
        {isLoading || isCreating || createParams.length === 0 ? (
          <View className="flex-row items-center flex-1 gap-2 flex">
            <View className="mx-1">
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Trash2 className="text-red-600" size={24} color={"#dc2626"} />
              </TouchableOpacity>
            </View>
            <View className="w-[90%]">
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  styles.disableButtonColor,
                  { flex: 1 },
                ]}
                disabled
              >
                {isLoading ? (
                  <ActivityIndicator color={"#6b7280"} size={"small"} />
                ) : (
                  <Text className="text-lg text-center text-gray-500 font-semibold">
                    Tạo yêu cầu sửa chữa
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center flex-1 gap-2 flex">
            <View className="mx-1">
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Trash2 className="text-red-600" size={24} color={"#dc2626"} />
              </TouchableOpacity>
            </View>
            <View className="w-[90%]">
              <TouchableOpacity
                style={[styles.buttonStyle, styles.buttonColor, { flex: 1 }]}
                onPress={handleCreate}
                disabled={isLoading || isCreating || createParams.length === 0}
              >
                {isLoading ? (
                  <ActivityIndicator color={"#6b7280"} size={"small"} />
                ) : (
                  <Text className="text-lg text-center text-white font-semibold">
                    Tạo yêu cầu sửa chữa
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  ) : (
    <View className="w-full h-full flex justify-center items-center flex-col">
      <ScrollText color={`hsl(${mutedForground})`} size={48} />
      <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
        Bạn hiện tại chưa có hợp đồng nào đang thuê cả
      </Text>
    </View>
  );
};

export default CreateCheckRequest;

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: "#d1d5db",
    padding: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginVertical: 8,
    marginHorizontal: 4,
    width: 200,
  },
  chosenContainerStyle: {
    borderColor: "#1d4ed8",
  },
  inListContainerStyle: {
    borderColor: "#a3e635",
  },
  noChosenContainer: {
    height: 300,
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
  },
  buttonColor: {
    backgroundColor: mainBlue,
  },
  redButtonColor: {
    backgroundColor: "#dc2626",
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  removeCriteria: {
    borderColor: "#dc2626",
    borderWidth: 1,
    width: 110,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  unchosenCriteria: {
    borderColor: "#1d4ed8",
    color: "#fff",
    borderWidth: 1,
    width: 110,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  chosenCriteria: {
    borderColor: "#1d4ed8",
    borderWidth: 1,
    backgroundColor: "#1d4ed8",
    color: "#fff",
    width: 110,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
