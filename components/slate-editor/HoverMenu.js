import { Button, Icon, Menu } from './components'
import ReactDOM from 'react-dom'
import { cx, css } from 'emotion'

const MarkButton = ({ editor, type, icon }) => {
  const { value } = editor
  const isActive = value.activeMarks.some(mark => mark.type === type)
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={event => {
        event.preventDefault()
        editor.toggleMark(type)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const HoverMenu = React.forwardRef(({ editor }, ref) => {
  const root = window && window.document.getElementById('__next')
  return ReactDOM.createPortal(
    <Menu
      ref={ref}
      className={css`
        padding: 8px 7px 6px;
        position: absolute;
        z-index: 1;
        top: -10000px;
        left: -10000px;
        margin-top: -6px;
        opacity: 0;
        background-color: #222;
        border-radius: 4px;
        transition: opacity 0.75s;
      `}
    >
      <MarkButton editor={editor} type="bold" icon="format_bold" />
      <MarkButton editor={editor} type="italic" icon="format_italic" />
      <MarkButton editor={editor} type="underlined" icon="format_underlined" />
      <MarkButton editor={editor} type="code" icon="code" />
    </Menu>,
    root
  )
})

export default HoverMenu
