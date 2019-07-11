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

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    // Return with no changes if it's not the "`" key with ctrl pressed.
    if (event.key != '`' || !event.ctrlKey) return next()

    // Prevent the "`" from being inserted by default.
    event.preventDefault()

    // Determine whether any of the currently selected blocks are code blocks.
    console.log('editor.value.blocks', editor.value.blocks)
    const isCode = editor.value.blocks.some(block => block.type == 'code')

    // Toggle the block type depending on `isCode`.
    editor.setBlocks(isCode ? 'paragraph' : 'code')
  }

  // Render the editor.
  render() {
    return (
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderBlock={this.renderBlock}
      />
    )
  }
}
