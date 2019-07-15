import { Editor } from 'slate-react'
import { Value } from 'slate'
import HoverMenu from './HoverMenu'
import { initialValue } from './initialValue'
import { Button, Icon, Toolbar } from './components'
import ControlMenu from './ControlMenu'

import rules from './rules'
import Html from 'slate-html-serializer'
const html = new Html({ rules })
/**
 * Define the default node type.
 *
 * @type {String}
 */
const DEFAULT_NODE = 'paragraph'

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

function BoldMark(props) {
  return <strong>{props.children}</strong>
}

export default class SlateEditor extends React.Component {
  state = {
    value: Value.create(),
    isLoaded: false
  }
  menuRef = React.createRef()

  renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      case 'paragraph':
        return <p {...props.attributes}>{props.children}</p>
      case 'block-quote':
        return <blockquote {...props.attributes}>{props.children}</blockquote>
      case 'bulleted-list':
        return <ul {...props.attributes}>{props.children}</ul>
      case 'heading-one':
        return <h1 {...props.attributes}>{props.children}</h1>
      case 'heading-two':
        return <h2 {...props.attributes}>{props.children}</h2>
      case 'list-item':
        return <li {...props.attributes}>{props.children}</li>
      case 'numbered-list':
        return <ol {...props.attributes}>{props.children}</ol>
      default:
        return next()
    }
  }

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()
    console.log(event.key)

    const { isSaving } = this.props

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault()
        editor.toggleMark('bold')
        break
      }
      // When "`" is pressed, keep our existing code block logic.
      case '`': {
        const isCode = editor.value.blocks.some(block => block.type == 'code')
        event.preventDefault()
        editor.setBlocks(isCode ? 'paragraph' : 'code')
        break
      }

      case 's': {
        event.preventDefault()
        !isSaving && this.save()
        break
      }
      // Otherwise, let other plugins handle it.
      default: {
        return next()
      }
    }

    next()
  }

  componentDidMount = () => {
    const valueFromProps = this.props.initialValue

    const value = valueFromProps
      ? Value.fromJSON(html.deserialize(valueFromProps))
      : Value.fromJSON(initialValue)

    this.updateMenu()
    this.setState({
      isLoaded: true,
      value
    })
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const menu = this.menuRef.current
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }
  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

  renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <React.Fragment>
        {children}
        <HoverMenu ref={this.menuRef} editor={editor} />
      </React.Fragment>
    )
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
    this.editor = editor
  }

  getHeadingValue = () => {
    const { value } = this.state

    const firstBlock = value.document.getBlocks().get(0)
    const secondBlock = value.document.getBlocks().get(1)

    const title = (firstBlock && firstBlock.text) || 'No Title'
    const subtitle = (secondBlock && secondBlock.text) || 'No Sub Title'

    return {
      title,
      subtitle
    }
  }

  save = () => {
    const { value } = this.state
    const { save } = this.props

    const headingValue = this.getHeadingValue()
    const text = html.serialize(value)

    save(text, headingValue)
  }

  // Render the editor.
  render() {
    const { isLoaded } = this.state
    const { isSaving } = this.props
    return (
      isLoaded && (
        <>
          <ControlMenu isSaving={isSaving} save={this.save} />

          <Toolbar>
            {this.renderMarkButton('bold', 'format_bold')}
            {this.renderMarkButton('italic', 'format_italic')}
            {this.renderMarkButton('underlined', 'format_underlined')}
            {this.renderMarkButton('code', 'code')}
            {this.renderBlockButton('heading-one', 'looks_one')}
            {this.renderBlockButton('heading-two', 'looks_two')}
            {this.renderBlockButton('block-quote', 'format_quote')}
            {this.renderBlockButton('numbered-list', 'format_list_numbered')}
            {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
          </Toolbar>
          <Editor
            placeholder="Enter some text..."
            spellCheck
            autoFocus
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderBlock={this.renderBlock}
            renderMark={this.renderMark}
            renderEditor={this.renderEditor}
          />
        </>
      )
    )
  }
}
