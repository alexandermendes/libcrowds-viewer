# libcrowds-viewer

[![npm version](https://badge.fury.io/js/libcrowds-viewer.svg)](https://badge.fury.io/js/libcrowds-viewer)

> IIIF-compatible image viewer Vue component for microtasks

Originally designed for the LibCrowds crowdsourcing platform, this Vue.js
component presents a zoomable image and provides options for users to mark
and transcribe areas of that image.

An array of options is used to configure tasks that are presented to
the user. The output from these tasks is serialised according to the
[W3C Web Annotations spec](https://www.w3.org/annotation/) and returned via
events.

[**DEMO**](https://libcrowds.github.io/libcrowds-viewer/)

## Install

```bash
npm install libcrowds-viewer --save
```

## Usage

```js
import Vue from 'vue';
import LibcrowdsViewer from 'libcrowds-viewer';

Vue.use(LibcrowdsViewer);
```

You can now use the component like this:

```vue
<libcrowds-viewer
  :task-opts="[{ mode: 'select', imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json' }]">
</libcrowds-viewer>
```

### Properties

| Property                | Type          | Default | Description                                      |
|-------------------------|---------------|---------|--------------------------------------------------|
| task-opts               | String        | null    | An array of task options                         |
| pan-by                  | Number        | 0.1     | Multiplier by which to pan                       |
| lang                    | String        | 'en'    | Language for manifest metadata (where available) |
| confirm-before-unload   | Boolean       | false   | Confirm before leaving the page                  |
| show-help               | Boolean       | true    | Include the help modal                           |
| show-info               | Boolean       | true    | Include the metadata modal                       |
| show-note               | Boolean       | true    | Include the note input                           |
| show-browse             | Boolean       | true    | Include the browse sidebar                       |
| show-form-errors        | Boolean       | true    | Show form errors on submit                       |

### Events

| Event         | Arguments        | Description          |
|---------------|------------------|----------------------|
| submit        | task             | User input confirmed |
| update        | task, annotation | Annotation updated   |
| create        | task, annotation | Annotation created   |
| delete        | task, annotation | Annotation deleted   |

## Tasks

The core data structure for LibCrowds Viewer is the Task object, an array of
which are created from the task options passed to the viewer.

### Task properties

| Property                | Type   | Attributes  | Description                                                                                                    |
|-------------------------|--------|-------------|----------------------------------------------------------------------------------------------------------------|
| mode                    | String |             | `'select'` or `'transcribe'`                                                                                   |
| imgInfoUri              | String |             | Image info URI (see the [IIIF Image API](http://iiif.io/api/image/2.1/#image-information-request-uri-syntax/)) |
| manifestUri             | String | \<optional> | Manifest URI (see the [IIIF Presentation API](http://iiif.io/api/presentation/2.1/#resource-structure))        |
| id                      | String | \<optional> | Task identifier                                                                                                |
| objective               | String | \<optional> | The main objective                                                                                             |
| guidance                | String | \<optional> | Additional guidance                                                                                            |
| form                    | Object | \<optional> | Model and schema for `transcribe` mode (see [vue-form-generator](https://github.com/icebob/vue-form-generator))|
| highlight               | Array  | \<optional> | Coordinates identifying regions of the image to highlight                                                      |
| tag                     | String | \<optional> | The tag to add when in `select` mode                                                                           |

## Modes

LibCrowds Viewer currently provides the following modes, each configurable via
the task options passed to the viewer.

### Select Mode

In select mode users can use their mouse (or finger) to tag areas of the image,
potentially preparing them for subsequent transcription.

Note that the `tag` property is required when in `select` mode.

#### Example task

```json
{
  "mode": "transcribe",
  "imgInfoUri": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifestUri": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "id": 123,
  "tag": "title",
  "objective": "Tag all of the titles",
  "guidance": "Draw a box around each title, including any subtitles"
}
```

#### Example annotation

```json
{
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "id": "d008efa2-42e5-494e-b463-c7b9b6744b67",
  "type": "Annotation",
  "motivation": "tagging",
  "created": "2017-07-16T00:44:28.454Z",
  "target": {
    "id": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
    "type": "Image",
    "format" : "image/jpeg",
    "selector": {
      "type": "FragmentSelector",
      "value": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/291,1498,1737,244/full/0/default.jpg",
      "conformsTo": "http://iiif.io/api/image/2/context.json"
    }
  },
  "body": {
    "type": "TextualBody",
    "purpose": "tagging",
    "value": "title"
  },
  "modified": "2017-07-16T00:44:28.454Z"
}
```

### Transcribe Mode

In transcribe mode a form schema is passed to the viewer along with optional
coordinates to highlight regions of the image (such as those returned from a
previous selection task) allowing for transcription of specific details found
in the image.

Note that the `form` property is required when in `transcribe` mode.

#### Example task

```json
{
  "mode": "transcribe",
  "imgInfoUri": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifestUri": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "id": 123,
  "objective": "Transcribe the required info",
  "guidance": "Write everything exactly as you see on the page.",
  "form": {
    "model": {
      "title": "",
      "date": "",
      "genre": []
    },
    "schema": {
      "fields": [
        {
          "type": "input",
          "inputType": "text",
          "label": "Title",
          "model": "title",
          "placeholder": "Enter the title",
          "required": true
        },
        {
          "type": "input",
          "inputType": "date",
          "label": "Date",
          "model": "date"
        },
        {
          "type": "select",
          "label": "Genre",
          "model": "genre",
          "values": ["Comedy", "Tragedy", "Drama"]
        }
      ]
    }
  },
  "highlight": [
    {
      "x": 100,
      "y": 100,
      "width": 100,
      "height": 100
    }
  ]
}
```

#### Example annotation

```json

```
