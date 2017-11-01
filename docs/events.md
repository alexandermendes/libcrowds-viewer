# Events

LibCrowds Viewer follows the standard Vue parent-child relationship of props down, events up. Along with further events, whenever an Annotation is created, updated or deleted the result is emitted from the viewer component.

Note that the viewer creates Annotations with a random ID, so this should be updated and tracked by the client (for instance, using one generated by an Annotation server).

| Event      | Arguments        | Description          |
|------------|------------------|----------------------|
| submit     | task             | User input confirmed |
| update     | task, annotation | Annotation updated   |
| create     | task, annotation | Annotation created   |
| delete     | task, annotation | Annotation deleted   |
| taskchange | oldTask, newTask | Task changed         |
| taskliked  | task             | Task liked/unliked   |