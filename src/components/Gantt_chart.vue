<template>
  <div id="gantt_app">
    <GSTC
      :config="config"
      @state="onState"
      id="gantt"
    />
  </div>
</template>

<script>
import GSTC from "vue-gantt-schedule-timeline-calendar";
import Gantt from "gantt-schedule-timeline-calendar"
import ItemMovement from "gantt-schedule-timeline-calendar/dist/ItemMovement.plugin.js"
import Selection from "gantt-schedule-timeline-calendar/dist/Selection.plugin.js"
let subs = [];
/* eslint-disable */

export default {
  name: "app",
  components: {
    GSTC
  },
  data() {
    return {
      columns: {
        data: {
          label: {
            id: "label",
            data: "label",
            width: 200,
            header: {
              content: "Machine"
            },
          },
        },
      },
      chart_items: {
        "1": {
          id: "1",
          rowId: "1",
          label: "Item 1",
          time: {
            start: new Date('2020-03-20').getTime(),
            end: new Date('2020-03-20').getTime() + 14 * 60 * 60 * 1000
          },
          style: { background: 'grey'}
        },
        "2": {
          id: "2",
          rowId: "2",
          label: "Item 2",
          time: {
            start: new Date('2020-03-20').getTime() + 60 * 60 * 1000,
            end: new Date('2020-03-20').getTime() + 4 * 60 * 60 * 1000
          }
        },
        "3": {
          id: "3",
          rowId: "2",
          label: "Item 3",
          time: {
            start: new Date('2020-03-20').getTime() + 12 * 60 * 60 * 1000,
            end: new Date('2020-03-20').getTime() + 24 * 60 * 60 * 1000
          }
        },
        "4": {
          id: "4",
          rowId: "3",
          label: "Item 4",
          time: {
            start: new Date('2020-03-20').getTime() + 3 * 60 * 60 * 1000,
            end: new Date('2020-03-20').getTime() + 6 * 60 * 60 * 1000
          }
        },
        "5": {
          id: "5",
          rowId: "4",
          label: "Item 5",
          time: {
            start: new Date('2020-03-20').getTime() + 12 * 60 * 60 * 1000,
            end: new Date('2020-03-20').getTime() + 18 * 60 * 60 * 1000
          }
        }
      }
    };
  },
  props:{
    draggable: {
      type: Boolean,
      default: false
    },
    line: {
      type: String,
    }
  },
  computed: {
    config: function() {
      return {
        plugins: [
          ItemMovement({
            // snap item start time to start of the day
            snapStart(time, diff, item) {
              return Gantt.api
                .date(time)
                .add(diff, 'milliseconds')
                .startOf('hour')
                .valueOf();
            },
            // snap item end time to end of the day
            snapEnd(time, diff, item) {
              return Gantt.api
                .date(time)
                .add(diff, 'milliseconds')
                .endOf('hour')
                .valueOf();
            },
            moveable: this.draggable,
            ghostNode: false,
            resizable: false,
            collisionDetection: true
          }),
          Selection(),
        ],
        height: 700,
        list: {
          rows: this.rows,
          columns: this.columns,
          toggle: {
            display: false
          },
        },
        chart: {
          items: this.chart_items,
          time: {
            from: new Date('2020-03-20').getTime(),
            to: new Date('2020-03-20').getTime() +2* 24 * 60 * 60 * 1000,
            period: 'hour',
            maxWidth: {}

          },
        },
        components: {

        }
      }
    },
    rows: function() {
      if (this.line == 'A 線') {
        let new_row = {}
        for (let i=0;i<15;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row[i] = { 'id': i, label: 'A'+num }
        }
        return new_row
      }
      else if (this.line == 'B 線') {
        let new_row = {}
        for (let i=0;i<14;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row[i] = { 'id': i, label: 'B'+num }
        }
        return new_row
      }
      else if (this.line == 'C 線') {
        let new_row = {}
        for (let i=0;i<12;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row[i] = { 'id': i, label: 'C'+num }
        }
        return new_row
      }
      else if (this.line == 'D 線') {
        let new_row = {}
        for (let i=0;i<19;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row[i] = { 'id': i, label: 'D'+num }
        }
        return new_row
      }
      else if (this.line == 'E 線') {
        let new_row = {}
        for (let i=0;i<21;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row[i] = { 'id': i, label: 'E'+num }
        }
        return new_row
      }
      else if (this.line == 'F 線') {
        let new_row = {}
        for (let i=0;i<17;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row[i] = { 'id': i, label: 'F'+num }
        }
        return new_row
      }
      else if (this.line == 'G 線') {
        let new_row = {}
        for (let i=0;i<9;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row[i] = { 'id': i, label: 'G'+num }
        }
        return new_row
      }
    }
  },
  methods: {
    onState(state) {
      this.state = state;
      // console.log(state)
      // subs.push(
      //   state.subscribe("config.chart.items.1", item => {
      //     console.log("item 1 changed", item);
      //   })
      // );
      // subs.push(
      //   state.subscribe("config.list.rows.1", row => {
      //     console.log("row 1 changed", row);
      //   })
      // );
      // subs.push(
      //   state.subscribe("config.plugin.ItemMovement", item => {
      //     if (!item || !item.item) return;
      //     console.log("ItemMovement", item);
      //   })
      // );
      state.subscribe("config.plugin.ItemMovement", item => {
        // console.log(state)
          if (!item || !item.item) return;
          let move = item.movement
          if (move) {
            // console.log(move)
            if (move.moving && move.waiting) console.log('Start Moving',item.item)
            else if (!move.moving && !move.waiting) console.log('Stop moving')
          }
          // console.log("ItemMovement", item.movement);
        })
    },
    click() {
      // console.log(arguments)
    }
  },
  mounted() {
    // setTimeout(() => {
    //   const item1 = this.config.chart.items["1"];
    //   item1.label = "label changed dynamically";
    //   item1.time.end += 2 * 24 * 60 * 60 * 1000;
    // }, 2000);
  },
  beforeDestroy() {
    subs.forEach(unsub => unsub());
  }
};
</script>