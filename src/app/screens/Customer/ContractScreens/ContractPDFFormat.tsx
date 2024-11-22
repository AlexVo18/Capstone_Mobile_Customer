import {
  Page,
  Text,
  View,
  Document,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { differenceInMonths, getDay, getMonth, getYear } from "date-fns";
import { createTw } from "react-pdf-tailwind";
import { ContractDetailData } from "~/src/app/models/contract_models";
import { reverseFormatTimeDate } from "~/src/app/utils/dateformat";
import { formatVND } from "~/src/app/utils/formatVND";

Font.register({
  family: "Tinos",
  fonts: [
    {
      src: "~/assets/fonts/Tinos-Regular.ttf",
    },
    {
      src: "~/assets/fonts/Tinos-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "~/assets/fonts/Tinos-Italic.ttf",
      fontStyle: "italic",
    },
    {
      src: "~/assets/fonts/Tinos-BoldItalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const tw = createTw({
  theme: {
    extend: {
      colors: {},
    },
  },
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Tinos",
  },
  watermarkWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  watermarkText: {
    position: "absolute",
    top: "50%",
    left: "40%",
    fontSize: 80,
    opacity: 0.2,
    color: "#808080",
    transform: "translate(-50%, -50%) rotate(-45deg)",
  },
  contentWrapper: {
    position: "relative",
  },
  // italic: {
  //   fontStyle: "italic",
  // },
});

interface Props {
  contract: ContractDetailData;
}

const WatermarkedPage = ({ children }: { children: React.ReactNode }) => (
  <Page size="A4" style={[styles.page, tw("p-20 text-base")]}>
    <View fixed style={styles.watermarkWrapper}>
      <Text style={styles.watermarkText}>MMRMS</Text>
    </View>
    <View style={styles.contentWrapper}>{children}</View>
  </Page>
);

const ContractPDFFormat = ({ contract }: Props) => {
  const removeHtmlTags = (str: string) => {
    // Replace all HTML tags with spaces
    let formattedContent = str.replace(/<\/?(p|ul|li)>/g, " ");

    // Replace <br> tags with a space
    formattedContent = formattedContent.replace(/<br\s*\/?>/g, " ");

    // Replace multiple spaces with a single space
    formattedContent = formattedContent.replace(/\s+/g, " ");

    // Trim leading and trailing spaces
    formattedContent = formattedContent.trim();

    return formattedContent;
  };

  return (
    <Document>
      {/* Watermark */}
      <WatermarkedPage>
        <View style={tw("mb-8")}>
          <View style={tw("mb-6 text-center")}>
            <Text style={tw("text-lg font-bold")}>
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Text>
            <Text style={tw(" font-bold ")}>Độc lập – Tự do – Hạnh phúc</Text>
            <Text style={tw("text-lg font-bold ")}>------ o0o ------</Text>
            <Text style={tw("text-2xl font-bold mt-4")}>
              HỢP ĐỒNG {contract.baseContractId && "GIA HẠN"}
            </Text>
            <Text style={tw("font-bold italic mb-0")}>
              (V/v: Thuê máy móc, thiết bị)
            </Text>
            <Text style={tw("italic mb-0")}>
              Hợp đồng số: {contract.contractId}
            </Text>
          </View>

          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base italic")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Căn cứ Bộ luật Dân sự số 91/2015/QH11 số 33/2005/QH11, ngày
                    14/06/2005;
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Căn cứ Luật Thương Mại số 36/2005/QH11, ngày 14/06/2005;
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Căn cứ Thông tư số 45/2013/TT-BTC của Bộ Tài Chính về “Hướng
                    dẫn chế độ quản lý, sử dụng và trích khấu hao máy móc, thiết
                    bị cố định”;
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>Căn cứ các văn bản luật hướng dẫn thi hành;</Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Căn cứ chức năng, nhiệm vụ, nhu cầu và khả năng thực hiện
                    của hai bên.
                  </Text>
                </View>
              </View>

              {contract.dateSign ? (
                <Text style={tw("not-italic")}>
                  Hôm nay, ngày {getDay(contract.dateSign)} tháng{" "}
                  {getMonth(contract.dateSign)} năm {getYear(contract.dateSign)}
                  , chúng tôi gồm có:
                </Text>
              ) : (
                <Text style={tw("not-italic")}>
                  Hôm nay, ngày…….. tháng……năm……, chúng tôi gồm có:
                </Text>
              )}
            </View>
          </View>
          <View style={tw("mb-4")}>
            <Text style={tw("font-bold mb-2")}>BÊN A - BÊN THUÊ: </Text>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Đại diện: </Text>
              <Text style={tw("w-4/5")}>
                {contract?.accountOrder.name || "Nguyễn Văn A"}
              </Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Chức vụ: </Text>
              <Text style={tw("w-4/5")}>
                {contract?.accountBusiness.position || "Giám đốc"}
              </Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Địa chỉ:</Text>
              <Text style={tw("w-4/5")}>
                {contract?.accountBusiness.address || "456 đường X"}
              </Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Điện thoại: </Text>
              <Text style={tw("w-4/5")}>
                {contract?.accountOrder.phone || "0987654321"}
              </Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Công ty: </Text>
              <Text style={tw("w-4/5")}>
                {contract?.accountBusiness.company || "Công ty ABC"}
              </Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Mã số thuế: </Text>
              <Text style={tw("w-4/5")}>
                {contract?.accountBusiness.taxNumber || "0987654321"}
              </Text>
            </View>
          </View>
          <View style={tw("mb-4")}>
            <Text style={tw("font-bold mb-2")}>BÊN B - BÊN CHO THUÊ: </Text>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Đại diện: </Text>
              <Text style={tw("w-4/5")}>Nguyễn Minh Nguyên</Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Chức vụ: </Text>
              <Text style={tw("w-4/5")}>Giám đốc</Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Địa chỉ:</Text>
              <Text style={tw("w-4/5")}>
                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức
              </Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Điện thoại: </Text>
              <Text style={tw("w-4/5")}>0987654321</Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Công ty: </Text>
              <Text style={tw("w-4/5")}>MMRMS</Text>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <Text style={tw("w-1/5")}>Mã số thuế: </Text>
              <Text style={tw("w-4/5")}>15975348620</Text>
            </View>
          </View>
          <View style={tw("mb-4")}>
            <Text style={tw("italic")}>
              {"   "}
              {"   "}
              {"   "}Sau khi trao đổi, hai bên thống nhất ký hợp đồng thuê máy
              móc, thiết bị với các điều khoản như sau:
            </Text>
          </View>

          <View>
            <Text style={tw("font-bold")}>
              Điều 1. CÁC THUẬT NGỮ SỬ DỤNG TRONG HỢP ĐỒNG:
            </Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base pb-0")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>1.</Text>
                </View>
                <View>
                  <Text>
                    <Text style={tw("italic")}>
                      “Bảo dưỡng và sửa chữa nhỏ”:{" "}
                    </Text>
                    Là những sửa chữa không nằm trong định kỳ sửa chữa đã được
                    dự định trước theo thoả thuận của hai Bên hoặc định kỳ phân
                    bổ kế toán.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>2.</Text>
                </View>
                <View>
                  <Text>
                    <Text style={tw("italic")}>“Hao mòn tự nhiên”: </Text>
                    Là sự giảm giá trị máy móc, thiết bị một cách tự nhiên mặc
                    dù máy móc, thiết bị được sử dụng đúng công suất, bảo quản
                    theo đúng qui định.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>3.</Text>
                </View>
                <View>
                  <Text>
                    <Text style={tw("italic")}>“Máy móc, thiết bị”: </Text>
                    gồm các máy móc, thiết bị được qui định tại Điều 2 Hợp đồng
                    này.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text style={tw("font-bold")}>
              Điều 2. NỘI DUNG, ĐỐI TƯỢNG VÀ GIÁ CẢ CỦA HỢP ĐỒNG:
            </Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>1.</Text>
                </View>
                <View>
                  <Text>Bên A cho Bên B thuê máy móc, thiết bị như sau:</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={tw("mb-4")}>
            <View style={tw("flex-row")}>
              <View
                style={tw(
                  "w-[10%] flex justify-center items-center text-center  border-y-[1px] border-l-[1px] font-bold px-4 py-2"
                )}
              >
                <Text>STT</Text>
              </View>
              <View
                style={tw(
                  "w-2/6 flex justify-center items-center text-center  border-y-[1px] border-l-[1px] font-bold px-4 py-2"
                )}
              >
                <Text>Tên máy móc</Text>
              </View>
              <View
                style={tw(
                  "w-[25%] flex justify-center items-center text-center  border-y-[1px] border-l-[1px] font-bold px-4 py-2"
                )}
              >
                <Text>Mã máy</Text>
              </View>
              <View
                style={tw(
                  "w-1/6 flex justify-center items-center text-center  border-y-[1px] border-l-[1px] font-bold px-4 py-2"
                )}
              >
                <Text>Thời gian thuê</Text>
              </View>
              <View
                style={tw(
                  "w-1/6 flex justify-center items-center text-center  border-y-[1px] border-x-[1px] font-bold px-4 py-2"
                )}
              >
                <Text>Giá thuê/ngày</Text>
              </View>
            </View>
            <View style={tw("mb-2 flex-row")}>
              <View
                style={tw(
                  "w-[10%] flex justify-center items-center text-center  border-b-[1px] border-l-[1px] px-4 py-2"
                )}
              >
                <Text>1</Text>
              </View>
              <View
                style={tw(
                  "w-2/6 flex justify-center items-center text-start  border-b-[1px] border-l-[1px] px-4 py-2"
                )}
              >
                <Text>{contract.machineName}</Text>
              </View>
              <View
                style={tw(
                  "w-[25%] flex justify-center items-center text-center  border-b-[1px] border-l-[1px] px-4 py-2"
                )}
              >
                <Text>{contract.serialNumber}</Text>
              </View>
              <View
                style={tw(
                  "w-1/6 flex justify-center items-center text-center  border-b-[1px] border-l-[1px] px-4 py-2"
                )}
              >
                <Text>
                  {differenceInMonths(contract.dateEnd, contract.dateStart)}{" "}
                  tháng
                </Text>
              </View>
              <View
                style={tw(
                  "w-1/6 flex justify-center items-center text-center  border-b-[1px] border-x-[1px] px-4 py-2"
                )}
              >
                <Text>{formatVND(contract.rentPrice)}</Text>
              </View>
            </View>
          </View>
          <View style={tw("px-5 py-2 mb-4")}>
            <View style={tw("flex flex-col gap-2")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>2.</Text>
                </View>
                <View>
                  <Text>Giá thuê trên đã bao gồm VAT.</Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>3.</Text>
                </View>
                <View>
                  <Text>
                    Tiêu chuẩn chất lượng của máy móc, thiết bị: Tất cả máy móc
                    phải đang hoạt động tốt, đạt công suất quy định của máy.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("font-bold")}>
              Điều 3. MỤC ĐÍCH, THỜI HẠN THUÊ:
            </Text>
          </View>
          <View style={tw("px-5 py-2 mb-4")}>
            <View style={tw("flex flex-col gap-2")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>1.</Text>
                </View>
                <View>
                  <Text>
                    Mục đích thuê: Bên A thuê máy móc, thiết bị tại Điều 2 để
                    phục vụ sản xuất, kinh doanh.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>2.</Text>
                </View>
                <View>
                  <Text>
                    Thời hạn thuê: Từ ngày{" "}
                    {reverseFormatTimeDate(contract.dateStart)} đến hết ngày{" "}
                    {reverseFormatTimeDate(contract.dateEnd)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("font-bold")}>
              Điều 4. THỜI GIAN, ĐỊA ĐIỂM CHUYỂN GIAO MÁY MÓC, THIẾT BỊ:
            </Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base  pb-0")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>1.</Text>
                </View>
                <View>
                  <Text>
                    Bên B chuyển giao máy móc, thiết bị cho Bên A tại địa điểm
                    sản xuất của Bên A trong thời hạn 03 (ba) ngày làm việc kể
                    từ ngày ký kết hợp đồng (hoặc có thoả thuận khác).
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>2.</Text>
                </View>
                <View>
                  <Text>
                    Bên A chuyển giao lại máy móc, thiết bị thuê cho Bên B tại
                    địa điểm sản xuất của bên A trong vòng 3 (ba) ngày sau khi
                    hết thời hạn cho thuê (hoặc có thoả thuận khác).
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>3.</Text>
                </View>
                <View>
                  <Text>
                    Việc chuyển giao máy móc, thiết bị giữa hai bên phải được
                    lập thành biên bản bàn giao, có sự xác nhận của chủ thể có
                    thẩm quyền của hai bên.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("font-bold")}>
              Điều 5. THỜI HẠN VÀ PHƯƠNG THỨC THANH TOÁN:
            </Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base  pb-0")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>1.</Text>
                </View>
                <View>
                  <Text>
                    Thời hạn thanh toán: Bên A thanh toán cho Bên B trong vòng 7
                    (bảy) ngày làm việc kể từ khi nhận được hoá đơn tài chính
                    của Bên B.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>2.</Text>
                </View>
                <View>
                  <Text>Phương thức thanh toán: Chuyển khoản Ngân hàng.</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("font-bold")}>
              Điều 6. QUYỀN VÀ NGHĨA VỤ BÊN A:
            </Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base pb-0")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text style={tw("font-semibold")}>1.</Text>
                </View>
                <View>
                  <Text style={tw("underline font-semibold")}>
                    Bên A có các nghĩa vụ sau đây:
                  </Text>
                </View>
              </View>

              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Trả tiền thuê đúng và đủ theo quy định của Điều 2 và Điều 5
                    của hợp đồng này.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Bàn giao lại máy móc, thiết bị cho thuê đúng thời gian, số
                    lượng như đã thoả thuận và đúng tình trạng chất lượng như
                    khi nhận máy móc, thiết bị trừ hao mòn tự nhiên.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Nếu Bên A cố tình làm hư máy móc, thiết bị cho thuê thì hai
                    bên cùng nhau tìm cách khắc phục, nếu không khắc phục được
                    thì Bên A có nghĩa vụ bồi thường cho Bên B chi phí sửa chữa
                    máy móc, thiết bị, có hoá đơn, chứng từ kèm theo.
                  </Text>
                </View>
              </View>

              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Trường hợp máy móc, thiết bị thuê bị mất mát do lỗi của Bên
                    A thì Bên A có nghĩa vụ bồi thường toàn bộ giá trị còn lại
                    của máy móc, thiết bị thuê tại thời điểm máy móc, thiết bị
                    thuê bị mất mát.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Không cho bên thứ ba thuê, mượn lại máy móc, thiết bị mà Bên
                    B cho Bên A thuê trong thời hạn cho thuê, trừ khi có sự đồng
                    ý bằng văn bản của Bên B.
                  </Text>
                </View>
              </View>

              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text style={tw("font-semibold")}>2.</Text>
                </View>
                <View>
                  <Text style={tw("underline font-semibold")}>
                    Bên A có các quyền sau đây:
                  </Text>
                </View>
              </View>

              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Yêu cầu Bên B sửa chữa và bảo dưỡng định kì máy móc, thiết
                    bị cho thuê trừ hư hỏng nhỏ, yêu cầu Bên B sửa chữa máy móc,
                    thiết bị hoặc giảm giá thuê nếu máy móc, thiết bị bị hư hỏng
                    không do lỗi của Bên A.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Bên B có quyền đơn phương đình chỉ hợp đồng và yêu cầu Bên A
                    bồi thường thiệt hại trong những trường hợp sau đây:
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-col text-base px-10")}>
                <View style={tw("flex flex-row gap-2")}>
                  <View>
                    <Text>*</Text>
                  </View>{" "}
                  <View>
                    <Text>
                      Sau 3 (ba) ngày làm việc như đã thoả thuận gia hạn mà Bên
                      B vẫn không chuyển giao máy móc, thiết bị cho Bên A dẫn
                      đến Bên A bị chậm tiến trình sản xuất, trừ trường hợp bất
                      khả kháng theo quy định của pháp luật.
                    </Text>
                  </View>
                </View>
                <View style={tw("flex flex-row gap-2")}>
                  <View>
                    <Text>*</Text>
                  </View>{" "}
                  <View>
                    <Text>
                      Vi phạm nghiêm trọng các quy định về an ninh của Bên A
                      trong quá trình chuyển giao máy móc, thiết bị.
                    </Text>
                  </View>
                </View>
                <View style={tw("flex flex-row gap-2")}>
                  <View>
                    <Text>*</Text>
                  </View>{" "}
                  <View>
                    <Text>
                      Bên B chuyển giao cho Bên A máy móc, thiết bị thuê có
                      nguồn gốc không rõ ràng (không có hoá đơn, chứng từ chứng
                      minh nguồn gốc máy móc, thiết bị thuê).
                    </Text>
                  </View>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Bên A được ưu tiên tiếp tục thuê những máy móc, thiết bị đã
                    hết thời hạn thuê nếu sử dụng máy móc, thiết bị thuê đúng
                    mục đích, công dụng, không làm hư hại, mất mát máy móc,
                    thiết bị.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("font-bold")}>
              Điều 7. QUYỀN VÀ NGHĨA VỤ BÊN B:
            </Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base  pb-0")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text style={tw("font-semibold")}>1.</Text>
                </View>
                <View>
                  <Text style={tw("underline font-semibold")}>
                    Bên B có các nghĩa vụ sau đây:
                  </Text>
                </View>
              </View>

              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Giao máy móc, thiết bị cho thuê đúng loại và số lượng, đúng
                    thời gian và địa điểm đã thoả thuận, đảm bảo máy móc, thiết
                    bị còn nguyên vẹn, đạt tiêu chuẩn chất lượng như đã quy định
                    tại hợp đồng này.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Xuất biên bản bàn giao cho Bên A mỗi khi giao máy móc, thiết
                    bị cho thuê và xuất hoá đơn tài chính cho Bên A theo thoả
                    thuận.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Việc lắp đặt máy móc, thiết bị là nghĩa vụ của Bên B dưới sự
                    giám sát của Bên A.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Chịu mọi trách nhiệm về tính sở hữu của máy móc, thiết bị
                    cho thuê.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Bảo đảm quyền sử dụng máy móc, thiết bị ổn định, lâu dài cho
                    Bên B theo đúng thời hạn đã thoả thuận.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Sửa chữa những hư hỏng, khuyết tật của máy móc, thiết bị cho
                    thuê và bảo dưỡng định kỳ máy móc, thiết bị trừ những hư
                    hỏng nhỏ.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Sửa chữa hoặc giảm giá thuê đối với những máy móc, thiết bị
                    hư hỏng mà không do lỗi của Bên A.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Nếu phát hiện máy móc, thiết bị nhận lại có hư hại thì phải
                    thông báo cho Bên A bằng văn bản để hai bên cùng nhau khắc
                    phục hư hại.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Bồi thường thiệt hại cho Bên A theo thoả thuận trong trường
                    hợp giao máy móc, thiết bị không đúng loại, số lượng, chất
                    lượng như đã thoả thuận.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Trường hợp không thể giao máy móc, thiết bị cho thuê đúng
                    thời gian đã thoả thuận thì phải có thông báo bằng văn bản
                    cho Bên A và gia hạn lại thời gian chuyển giao máy móc,
                    thiết bị nhưng không được nhiều hơn 03 (ba) ngày làm việc.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Tuân thủ đúng mọi quy định về an ninh của Bên A khi ra vào
                    nhà máy của Bên A để chuyển giao máy móc, thiết bị. Nếu có
                    bất kỳ thiệt hại nào về máy móc, thiết bị và con người mà do
                    lỗi của Bên B thì Bên B buộc phải bồi thường cho Bên A theo
                    thoả thuận.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Trường hợp Bên B phát hiện ra Bên A sử dụng máy móc, thiết
                    bị thuê không đúng mục đích đã thoả thuận và công dụng của
                    từng loại máy móc, thiết bị thì Bên B phải gửi thông báo
                    bằng văn bản để nhắc nhở Bên A.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text style={tw("font-semibold")}>2.</Text>
                </View>
                <View>
                  <Text style={tw("underline font-semibold")}>
                    Bên B có các quyền sau đây:
                  </Text>
                </View>
              </View>

              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Nhận tiền thuê đúng và đủ theo quy định của Điều 2 và Điều 5
                    của hợp đồng này.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Nhận lại máy móc, thiết bị cho thuê đúng thời gian, số lượng
                    như đã thoả thuận và đúng tình trạng chất lượng như lúc ban
                    đầu trừ hao mòn tự nhiên.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Gia hạn thời hạn chuyển giao máy móc, thiết bị thuê nhưng
                    không nhiều hơn 3 (ba) ngày làm việc và phải có văn bản
                    thông báo cho Bên A.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4 mb-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Yêu cầu Bên A sử dụng máy móc, thiết bị cho thuê đúng mục
                    đích và công dụng.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Yêu cầu Bên A bồi thường thiệt hại theo thoả thuận nếu máy
                    móc, thiết bị thuê bị hư hại do lỗi của Bên A, sau khi hai
                    bên đã cùng nhau tìm cách khắc phục mà vẫn không thể khắc
                    phục được thiệt hại.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("font-bold")}>Điều 8. ĐIỀU KHOẢN CỦA MÁY:</Text>
          </View>
          <View style={tw("px-5 py-2")}>
            {contract.contractTerms &&
              contract.contractTerms.map((term, index) => (
                <View style={tw("flex flex-row gap-4 mb-4")} key={index}>
                  <View>
                    <Text>-</Text>
                  </View>
                  <View>
                    <Text>{removeHtmlTags(term.content)}</Text>
                  </View>
                </View>
              ))}
          </View>
          <View>
            <Text style={tw("font-bold")}>Điều 9. HIỆU LỰC CỦA HỢP ĐỒNG:</Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base  pb-0")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>1.</Text>
                </View>
                <View>
                  <Text>
                    Hợp đồng này có hiệu lực khi một trong các bên nhận được bản
                    hợp đồng đã được kí tên và đóng dấu pháp nhân của hai bên.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>2.</Text>
                </View>
                <View>
                  <Text>
                    Hợp đồng này hết hiệu lực trong các trường hợp sau:
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Hai bên đã hoàn tất mọi nghĩa vụ với nhau như thoả thuận.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>
                    Hai bên thoả thuận chấm dứt hợp đồng trước thời hạn.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>-</Text>
                </View>
                <View>
                  <Text>Máy móc, thiết bị thuê không còn.</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("font-bold")}>Điều 10. ĐIỀU KHOẢN CHUNG:</Text>
          </View>
          <View style={tw("px-5 py-2")}>
            <View style={tw("flex flex-col gap-2 text-base  pb-0")}>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>1.</Text>
                </View>
                <View>
                  <Text>
                    Hai bên cam kết thực hiện đúng các điều khoản của hợp đồng,
                    trong quá trình thực hiện nếu có gì trở ngại, khó khăn, hai
                    bên giải quyết, thương lượng trên tinh thần hợp tác cùng có
                    lợi.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>2.</Text>
                </View>
                <View>
                  <Text>
                    Trường hợp có vấn đề tranh chấp mà các bên không tự thương
                    lượng, giải quyết được thì một trong các bên được quyền yêu
                    cầu Tòa án nhân dân huyện, tỉnh giải quyết. Quyết định hay
                    bản án của Tòa án là phán quyền cuối cùng, các bên có nghĩa
                    vụ chấp hành.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>3.</Text>
                </View>
                <View>
                  <Text>
                    Trong trường hợp hai bên hoặc một trong hai bên muốn chấm
                    dứt hợp đồng trước hạn phải thông báo cho nhau trước 30 (ba
                    mươi) ngày và khi hai bên đã hoàn thành tất cả các nghĩa vụ
                    trong hợp đồng, không còn nợ nhau thì hợp đồng này có thêm
                    giá trị tự thanh lý.
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row gap-4")}>
                <View>
                  <Text>4.</Text>
                </View>
                <View>
                  <Text>
                    Hợp đồng được lập thành 04 (bốn) bản tiếng Việt, mỗi bên giữ
                    02 (hai) bản có giá trị pháp lý ngang nhau.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={tw("mb-4")}>
            <View style={tw("mb-2 flex-row")}>
              <View style={tw("w-1/2 text-center")}>
                <Text style={tw("font-bold")}>ĐẠI DIỆN BÊN A</Text>
                <Text>Giám đốc</Text>
                <Text> </Text>
                <Text>Nguyễn Minh Nguyên</Text>
                <Text> </Text>
              </View>
              <View style={tw("w-1/2 text-center")}>
                <Text style={tw("font-bold")}>ĐẠI DIỆN BÊN B</Text>
                {contract.status.toLowerCase() !== "notsigned" &&
                contract.status.toLowerCase() !== "canceled" &&
                contract.status.toLowerCase() !== "terminated" ? (
                  <>
                    <Text> </Text>
                    <Text>{contract.accountOrder.name}</Text>
                    <Text> </Text>
                  </>
                ) : (
                  <>
                    <Text> </Text>
                    <Text>
                      {contract.status.toLowerCase() !== "canceled" &&
                      contract.status.toLowerCase() !== "notsigned"
                        ? contract.accountOrder.name
                        : null}{" "}
                    </Text>
                    <Text> </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </WatermarkedPage>
    </Document>
  );
};

export default ContractPDFFormat;
