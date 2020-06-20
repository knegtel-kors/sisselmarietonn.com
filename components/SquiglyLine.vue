<template>
  <v-stage ref="stage" :config="configKonva">
    <v-layer>
      <v-line ref="line" :config="configLine" />
    </v-layer>
  </v-stage>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  data() {
    return {
      configKonva: {
        width: this.getWidth(),
        height: this.getHeight(),
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
    this.createAnimation()
    window.addEventListener('resize', debounce(this.updateWidth, 150))
  },
  beforeDestroy() {
    this.destroyAnimation()
  },
  methods: {
    updateWidth() {
      this.destroyAnimation()
      this.createAnimation()
    },
    createAnimation() {
      const vm = this
      const line = this.$refs.line.getNode()
      const stage = this.$refs.stage.getNode()

      const w = this.getWidth()
      const h = this.getHeight()
      const numberOfPoints = Math.round(w / 40)
      const points = this.getPoints(w, h, numberOfPoints)

      line.setPoints(points)
      const duration = 10000 // ms

      this.animateLines(line, duration)
      this.updateAnimation = setInterval(() => {
        this.animateLines(line, duration)
      }, duration)
    },
    destroyAnimation() {
      clearInterval(this.updateAnimation)
      window.removeEventListener('resize', this.updateWidth)
    },
    animateLines(line, duration) {
      const stage = this.$refs.stage.getNode()

      stage.width(this.getWidth())
      stage.height(this.getHeight())
      stage.draw()

      const w = stage.width()
      const h = stage.height()
      const numberOfPoints = Math.round(w / 40)

      var tween = new Konva.Tween({
        node: this.$refs.line.getNode(),
        easing: Konva.Easings.EaseInOut,
        duration: duration / 1000,
        points: this.getPoints(w, h, numberOfPoints),
      })

      tween.play()
      setTimeout(function () {
        tween.finish()
      }, duration)
    },
    getWidth() {
      let width = window.innerWidth

      return width
    },
    getHeight() {
      const width = window.innerWidth
      const fontSize = 16

      let rem = 3
      let baseliseAdjust = fontSize

      if (width <= 1200) {
        rem = 2.5
        baseliseAdjust = 0
      }

      if (width <= 768) {
        rem = 2
      }

      if (width <= 480) {
        rem = 1.75
      }

      if (width <= 1200) {
        rem = 2
      }

      const fontSizeRem = fontSize * rem
      return fontSizeRem * 2 - baseliseAdjust
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
        if (index <= numberOfPoints / 2) {
          customIndex = 0
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
