import Annotation from '@/model/Annotation'

/**
 * Represents a Web Annotation used for descriptions.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} value
 *   The description value.
 * @param {String} tag
 *   The tag value.
 * @param {String} fragmentURI
 *   An IIIF image region.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 * @param {String} classification
 *   A classification.
 */
class DescriptionAnnotation extends Annotation {
  constructor ({
    imgInfo,
    value,
    tag = null,
    fragmentURI = null,
    creator = null,
    generator = null,
    classification = null
  }) {
    super({
      motivation: 'describing',
      imgInfo: imgInfo,
      creator: creator,
      generator: generator
    })
    this.addDescription(value)
    if (tag) {
      this.addTag(tag, fragmentURI)
    }
    if (classification) {
      this.addClassification(classification)
    }
  }
}

export default DescriptionAnnotation