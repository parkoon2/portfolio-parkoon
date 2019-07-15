import { Button } from 'reactstrap'

const ControlMenu = ({ save, isSaving }) => {
  return (
    <div className="control-menu">
      <h1 className="title"> Write Your Story...</h1>
      <div className="status-box">{isSaving ? 'Saving now...' : 'Saved!'}</div>
      <Button /*disabled={isSaving}*/ color="success" onClick={save}>
        Save
      </Button>
    </div>
  )
}

export default ControlMenu
