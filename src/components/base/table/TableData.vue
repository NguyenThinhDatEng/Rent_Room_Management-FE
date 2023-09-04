<template>
  <td
    :title="getTitle()"
    :style="[
      { 'min-width': config.minWidth },
      { 'max-width': config.maxWidth },
      { 'text-align': config.align },
      { 'margin-left': config.marginLeft },
      { width: config.width },
      { padding: config.padding },
      { color: config.color },
    ]"
  >
    <!-- check box -->
    <div
      v-if="config.type === tdType.checkbox"
      class="checkbox__wrapper col--checkbox"
    >
      <input
        type="checkbox"
        class="checkbox"
        :checked="isActive"
        @click.self="$emit('click-checkbox')"
      />
    </div>
    <!-- text box -->
    <p v-else-if="config.type === tdType.text">
      {{ content }}
    </p>
    <!-- number box -->
    <p v-else-if="isNumberData()">
      {{ Function.formatMoney(content) }}
    </p>
    <!-- Date box -->
    <p v-else-if="isDate()">{{ moment(content).format("DD/MM/YYYY") }}</p>
    <!-- Boolean -->
    <p v-else-if="isBoolean()">{{ displayBooleanType() }}</p>
    <!-- other -->
    <div v-else class="feature">
      <!-- edit button -->
      <div
        class="icon icon--edit"
        :title="title.edit"
        @click="onClickFeatureButton(Enum.Mode.Update)"
      ></div>
      <!-- delete button -->
      <div
        class="icon icon--18px icon--delete"
        :title="title.delete"
        @click="onClickFeatureButton(Enum.Mode.Delete)"
      ></div>
    </div>
  </td>
</template>

<script>
// Resources
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";
import Function from "@/commons/commonFunction";
import moment from "moment";

export default {
  name: "TableData",
  props: {
    // Trạng thái ấn kích hoạt của ô check box
    isActive: {
      type: Boolean,
      default: false,
    },
    // Nội dung
    content: {
      type: [String, Number, Boolean],
    },
    // style in css
    config: {
      type: Object,
      required: true,
      default: () => {
        return {
          minWidth: 100,
        };
      },
    },
  },
  emits: ["click-checkbox"],

  methods: {
    /**
     * @description xử lý sự kiện ấn vào nút tính năng (using $parent)
     * @param {Number} mode chế độ hiển thị popup
     * @author NVThinh 2/1/2022
     */
    onClickFeatureButton: function (mode) {
      this.$parent.carryOutFeature(mode);
    },

    /**
     * @return true nếu kiểu dữ liệu của td là kiểu số
     * @author NVThinh 9/1/2023
     */
    isNumberData: function () {
      return this.config.type === this.tdType.number;
    },

    /**
     * @return true nếu kiểu dữ liệu của td là kiểu thời gian
     * @author NVThinh 9/1/2023
     */
    isDate: function () {
      return this.config.type === this.tdType.date;
    },

    /**
     * @return true nếu kiểu dữ liệu của td là kiểu boolean
     * @author NVThinh 9/1/2023
     */
    isBoolean: function () {
      return this.config.type === this.tdType.boolean;
    },

    displayBooleanType: function () {
      if (this.content) {
        return this.config.display.yes;
      }
      return this.config.display.no;
    },

    /**
     * @description Lấy tooltip cho td
     * @author nvthinh 29.8.2023
     */
    getTitle: function () {
      const me = this;
      if (me.config?.type == me.tdType?.text) {
        return this.content;
      } else {
        return "";
      }
    },
  },

  data() {
    return {
      moment: moment,
      // Resources
      Enum,
      Function, // Hàm dùng chung
      tdType: Enum.TableData.type, // Các kiểu dữ liệu trong td
      title: Resource.Title, // tooltip
    };
  },
};
</script>

<style scoped>
/* td */
td {
  position: relative;
}

td p {
  padding: 0 8px;
}
/* Check box */
.checkbox__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.col--checkbox {
  margin-left: 1px;
}

.checkbox {
  position: absolute;
  top: 11px;
  left: 16px;
}
</style>