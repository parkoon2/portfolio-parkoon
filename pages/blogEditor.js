import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'
import SlateEditor from '../components/slate-editor/SlateEditor'

const BlogEditor = props => {
  return (
    <BaseLayout isAuthenticated={props.isAuthenticated}>
      <BasePage className="blog-editor-page" title="Im about BlogEditor">
        <SlateEditor />
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth('siteOwner')(BlogEditor)
