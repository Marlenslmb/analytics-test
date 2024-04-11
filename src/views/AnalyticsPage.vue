<template>
  <v-app>
    <v-container class="analytics">
      <h1 class="page-title">Аналитика</h1>
      <h2 class="chart-title">Аналитика по визитам</h2>
      <v-card class="chart-card">
        <v-card-text>
          <div id="chartdiv" class="chart-container"></div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { XYChart, DateAxis, ValueAxis, LineSeries, XYCursor } from '@amcharts/amcharts4/charts';
import { create, percent } from '@amcharts/amcharts4/core';

export default {
  name: 'AnalyticsPage',
  data() {
    return {
      chartData: [
        {"date":"2020-07-01","visits":213},
        {"date":"2020-07-02","visits":249},
        {"date":"2020-07-03","visits":179},
        {"date":"2020-07-04","visits":170},
        {"date":"2020-07-05","visits":184},
        {"date":"2020-07-06","visits":202},
        {"date":"2020-07-07","visits":198},
        {"date":"2020-07-08","visits":168},
        {"date":"2020-07-09","visits":176},
        {"date":"2020-07-10","visits":171},
        {"date":"2020-07-11","visits":190},
        {"date":"2020-07-12","visits":154},
        {"date":"2020-07-13","visits":246},
        {"date":"2020-07-14","visits":250},
        {"date":"2020-07-15","visits":227},
        {"date":"2020-07-16","visits":140},
        {"date":"2020-07-17","visits":170},
        {"date":"2020-07-18","visits":125},
        {"date":"2020-07-19","visits":106},
        {"date":"2020-07-20","visits":207},
        {"date":"2020-07-21","visits":222},
        {"date":"2020-07-22","visits":198},
        {"date":"2020-07-23","visits":204},
        {"date":"2020-07-24","visits":213},
        {"date":"2020-07-25","visits":145},
        {"date":"2020-07-26","visits":166},
        {"date":"2020-07-27","visits":163},
        {"date":"2020-07-28","visits":135},
        {"date":"2020-07-29","visits":45}
      ]
    };
  },
  mounted() {
    // проверка наличия ключа в localStorage
    if (!localStorage.getItem('leadhit-site-id')) {
      this.$router.push('/authorization'); // перенаправление на страницу "Авторизация"
    } else {
      // Применяем тему графика
      const chart = create('chartdiv', XYChart);
      chart.hiddenState.properties.opacity = 0; // При переключении между графиками не видны анимированные элементы
      chart.paddingRight = percent(10);
      chart.paddingLeft = percent(10);
      chart.responsive.enabled = true;
      chart.responsive.useDefault = false;

      // Настройка осей графика
      let dateAxis = chart.xAxes.push(new DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      // Настройка серии данных
      let series = chart.series.push(new LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'visits';
      series.tooltipText = '{valueY}';
      series.strokeWidth = 2;
      series.minBulletDistance = 15;

      // Добавляем курсор
      chart.cursor = new XYCursor();
      chart.cursor.behavior = 'none';

      // Применяем анимацию
      chart.events.on('ready', function () {
        chart.series.each(function (series) {
          series.hide(0);
          series.show();
        });
      });

      // Устанавливаем данные графика
      chart.data = this.chartData;
  }
  }
};
</script>

<style scoped>
.analytics {
  text-align: center;
}
.page-title {
  margin-bottom: 20px;
  font-size: 24px;
}
.chart-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: rgba(24, 103, 192, 1);
}
.chart-container {
  width: 100%;
  height: 400px;
}
.chart-card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>