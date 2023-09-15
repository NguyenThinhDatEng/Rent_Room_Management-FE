// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";

export const useRoom = () => {
  // config to base
  const itemsName = "allRooms";
  const dispatchList = ["setAllRooms", "setAllRoomCategories"];
  // key
  const key = "room_id";

  const cols = {
    numerical_order: { ENG: "numerical_order", VN: "STT" },
    room_name: { ENG: "room_name", VN: "Tên phòng" },
    room_category_name: { ENG: "room_category_name", VN: "Loại phòng" },
    state: { ENG: "state", VN: "Trạng thái" },
    feature: { ENG: "feature", VN: "Tính năng" },
  };
  const tds = [
    {
      col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
      type: Enum.TableData.type.text,
      minWidth: "40px",
      width: "50px",
      align: "center",
    },
    {
      col: "room_name",
      type: Enum.TableData.type.text,
      minWidth: "90px",
      maxWidth: "180px",
      align: "left",
    },
    {
      col: "room_category_name",
      type: Enum.TableData.type.text,
      minWidth: "90px",
      maxWidth: "180px",
      align: "left",
    },
    {
      col: "state",
      type: Enum.TableData.type.boolean,
      width: "100px",
      align: "center",
      display: { no: "Đã thuê", yes: "Trống" },
    },
    {
      col: TableResource.TableRow.FixedAsset.feature.ENG,
      minWidth: "150px",
      width: "150px",
    },
  ];

  return {
    itemsName,
    cols,
    TableResource,
    tds,
    Resource,
    close,
    dispatchList,
    key,
  };
};
