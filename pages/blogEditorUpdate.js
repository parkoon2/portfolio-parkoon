import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'
import SlateEditor from '../components/slate-editor/SlateEditor'
import { getBlogById } from '../actions/blog'

class BlogEditor extends React.Component {
  state = {
    isSaving: false
  }

  static async getInitialProps({ query }) {
    const blogId = query.id
    let blog = {}
    try {
      blog = await getBlogById(blogId)
    } catch (err) {
      console.error(err)
    }
    return { blog }
  }

  render() {
    const { isAuthenticated } = this.props
    const { isSaving } = this.state

    return (
      <BaseLayout isAuthenticated={isAuthenticated}>
        <BasePage className="blog-editor-page">
          <SlateEditor
            initialValue={this.props.blog}
            isSaving={isSaving}
            save={() => {
              console.log('here should be update!')
            }}
          />
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(BlogEditor)
