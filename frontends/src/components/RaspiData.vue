<template>
  <div>
    <h1>Raspberry-Pi {{ device }} Data</h1>
    <br />
    <h2>Temperature Current Reading: {{ temperature }}</h2>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Temperature</th>
            <th>Device</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.tempReadingId">
            <td>{{ item.tempReadingId }}</td>
            <td>{{ item.temperature }}</td>
            <td>{{ item.deviceId }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      temperature: 1,
      device: 'Temperature Sensor (DHT-22) ',
      data: [],
    };
  },
  methods: {
    readData() {
      axios
        .get('http://localhost:5000/api/temperature/view')
        .then((response) => {
          //console.log(response.data.res.reverse()[0].temperature);
          this.data = response.data.res;
          this.temperature = response.data.res.reverse()[0].temperature;
        });
    },
  },
  mounted() {
    setInterval(() => {
      this.readData();
    }, 1000);
  },
};
</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

table {
  margin: auto;
}
</style>
