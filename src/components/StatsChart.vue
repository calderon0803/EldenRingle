<template>
  <ZingChart
    :id="'myChart-' + config.type"
    :data="config"
    :height="400"
    :width="'100%'"
  ></ZingChart>
</template>

<script setup>
import { computed } from "vue";
import ZingChart from "zingchart-vue";

const props = defineProps({
  dataSeries: {
    type: Array,
    required: true,
  },
  scaleXValues: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "line",
  },
});

const config = computed(() => {
  console.log(props.dataSeries);
  return {
    type: props.type,
    utc: true,
    title: {
      text: "Estadísticas de juego",
      "font-size": "16px",
      "adjust-layout": true,
    },
    plotarea: {
      margin: "dynamic 45 60 dynamic",
    },
    plot: {
      marker: {
        rules: [
          {
            rule: "%data-success == 1",
            "background-color": "green",
            borderColor: "green",
          },
          {
            rule: "%data-success == 0",
            "background-color": "red",
            borderColor: "red",
          },
        ],
      },
    },
    legend: {
      layout: "float",
      "background-color": "none",
      "border-width": 0,
      shadow: 0,
      align: "center",
      "adjust-layout": true,
      "toggle-action": "remove",
      item: {
        padding: 7,
        marginRight: 17,
        cursor: "hand",
      },
    },
    "scale-x": {
      values: props.scaleXValues,
      transform: {
        type: "date",
        all: "%D, %d %M<br />%h:%i %A",
        item: {
          visible: false,
        },
      },
      label: {
        visible: false,
      },
      "minor-ticks": 0,
    },
    "scale-y": {
      "line-color": "#f6f7f8",
      format: "%v",
      shadow: 0,
      guide: {
        "line-style": "dashed",
      },
      label: {
        text: "",
      },
      "minor-ticks": 0,
      "thousands-separator": ",",
    },
    "crosshair-x": {
      visible: false,
    },
    tooltip: {
      visible: true,
      text: "Intentos: %v<br>Fecha: %data-dates",
      rules: [
        {
          rule: "%data-success == 1",
          "background-color": "green",
          borderColor: "black",
        },
        {
          rule: "%data-success == 0",
          "background-color": "red",
          borderColor: "black",
        },
      ],
    },
    series: props.dataSeries,
  };
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
