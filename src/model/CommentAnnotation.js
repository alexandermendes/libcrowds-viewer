import Annotation from '@/model/Annotation'

/**
 * Represents a Web Annotation used for comments.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} value
 *   The comment value.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 */
class CommentAnnotation extends Annotation {

  constructor ({
    imgInfo,
    text,
    creator = null, 
    generator = null
  }) {
    super('commenting', imgInfo, creator, generator)
    this.addBody({
      type: 'TextualBody',
      value: value,
      purpose: 'commenting',
      format: 'text/plain'
    })
  }
}

export default CommentAnnotation