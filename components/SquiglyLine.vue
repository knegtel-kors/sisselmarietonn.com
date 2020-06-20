<template>
  <v-stage style="padding-left: 1rem;" ref="stage" :config="configKonva">
    <v-layer>
      <v-line ref="line" :config="configLine" />
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  data() {
    return {
      configKonva: {
        width: 600,
        height: 48 * 2 - 4,
      },
      configLine: {
        w: 400,
        h: 100,
        points: [10, 10],
        tension: 0.4,
        closed: false,
        stroke: '#262626',
        strokeWidth: 1,
        fillLinearGradientStartPoint: { x: -50, y: -50 },
        fillLinearGradientEndPoint: { x: 50, y: 50 },
      },
      updateAnimation: null,
    }
  },
  mounted() {
    const vm = this
    const line = this.$refs.line.getNode()

    const w = this.configKonva.width
    const h = this.configKonva.height
    const points = this.getPoints(w, h, 20)

    line.setPoints(points)
    const duration = 10000 // ms

    this.animateLines(line, duration)
    this.updateAnimation = setInterval(() => {
      this.animateLines(line, duration)
    }, duration)
  },
  beforeDestroy() {
    clearInterval(this.updateAnimation)
  },
  methods: {
    animateLines(line, duration) {
      const w = this.configKonva.width
      const h = this.configKonva.height

      var tween = new Konva.Tween({
        node: this.$refs.line.getNode(),
        easing: Konva.Easings.EaseInOut,
        duration: duration / 1000,
        points: this.getPoints(w, h, 20),
      })

      tween.play()
      setTimeout(function () {
        tween.finish()
      }, duration)
    },
    getPoints(width, height, numberOfPoints, padding = 4) {
      const array = []
      const step = width / numberOfPoints
      const max = height - padding

      const center = max / 2
      const spread = center / numberOfPoints

      // loop through the number of steps
      for (let index = 0; index <= numberOfPoints; index++) {
        // set x to step forward with each loop
        const x = step * index

        // setup the diviation so the line
        // progressively gets more squigly
        let customIndex = index
        if (index <= numberOfPoints / 8) {
          customIndex = 0
        }

        if (index <= numberOfPoints / 4) {
          customIndex = index / 2
        }

        const diviation = spread * customIndex

        // get Y based on the diviation
        // y starts in the center and goes either up or down
        const y = this.getRandomInt(-diviation, diviation) + center

        // add X and Y to array
        array.push(x)
        array.push(y)
      }

      return array
    },
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
  },
}
</script>

<style lang="sass"></style>
