import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.'
          }
        ]
      }
    ]
  }
})

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
    value: initialValue
  }

  renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      case 'paragraph':
        return <p {...props.attributes}>{props.children}</p>
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      default:
        return next()
    }
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()

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
      // Otherwise, let other plugins handle it.
      default: {
        return next()
      }
    }
  }

  // Render the editor.
  render() {
    return (
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderBlock={this.renderBlock}
        renderMark={this.renderMark}
      />
    )
  }
}
