<template>
  <div id="lv-help-modal-content">

    <!-- Slot for custom additional content -->
    <slot></slot>

    <h4>Viewer controls</h4>
    <p>
      Use the pan buttons on the lower left or your keyboard's arrow keys to
      move the image around the screen.
    </p>
    <p>On the top-left of the viewer:</p>
    <ul class="lv-modal-list">
      <li>
        <icon name="expand"></icon>Fullscreen
      </li>
      <li>
        <icon name="question-circle"></icon>View this help page
      </li>
      <li v-if="buttons.info">
        <icon name="info-circle"></icon>View information about the item
      </li>
      <li v-if="buttons.browse">
        <icon name="eye"></icon>Browse Tasks
      </li>
      <li v-if="buttons.download">
        <icon name="download"></icon>Download this image
      </li>
    </ul>
    <p>On the bottom-left of the viewer:</p>
    <ul class="lv-modal-list">
      <li><icon name="arrow-circle-up"></icon>Pan up</li>
      <li><icon name="arrow-circle-down"></icon>Pan down</li>
      <li><icon name="arrow-circle-left"></icon>Pan left</li>
      <li><icon name="arrow-circle-right"></icon>Pan right</li>
      <li><icon name="plus-circle"></icon>Zoom in</li>
      <li><icon name="minus-circle"></icon>Zoom out</li>
      <li><icon name="refresh"></icon>Reset zoom</li>

    </ul>
    <p v-if="browsable">
      To the left and right of the viewer are buttons to browse available
      tasks:
    </p>
    <ul class="lv-modal-list" v-if="browsable">
      <li><icon name="chevron-left"></icon>Previous task</li>
      <li><icon name="chevron-right"></icon>Next task</li>
    </ul>
    <div v-if="task && task.mode === 'select'">
      <h4>Select mode</h4>
      <p>
        When using the viewer in select mode an area of the image can
        be selected by clicking (or tapping) on the image. The following
        controls are provided to the right of the selection box:
      </p>
      <ul class="lv-modal-list">
        <li><icon name="check-circle"></icon>Confirm selection</li>
        <li><icon name="times-circle"></icon>Cancel selection</li>
      </ul>
      <p>
        Once a selection has been confirmed it will appear in the
        selections sidebar to the right of the screen, where the following
        controls are provided:
      </p>
      <ul class="lv-modal-list">
        <li v-if="selectionsEditable">
          <icon name="pencil"></icon>
          Edit selection
        </li>
        <li>
          <icon name="times-circle"></icon>
          Delete selection
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/minus-circle'
import 'vue-awesome/icons/pencil'
import 'vue-awesome/icons/refresh'
import 'vue-awesome/icons/expand'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/arrow-circle-up'
import 'vue-awesome/icons/arrow-circle-down'
import 'vue-awesome/icons/arrow-circle-left'
import 'vue-awesome/icons/arrow-circle-right'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/download'
import Task from '@/model/Task'

export default {
  props: {
    task: {
      type: Task,
      requried: true
    },
    buttons: {
      type: Object,
      required: true
    },
    browsable: {
      type: Boolean,
      requried: true
    },
    selectionsEditable: {
      type: Boolean,
      requried: true
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss">
#lv-help-modal-content {
  .lv-modal-list {
    li {
      display: flex;
      align-items: center;
    }
  }
}
</style>
