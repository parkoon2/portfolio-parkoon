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

  updateBlog = blog => {
    console.log('here should be update!')
  }

  render() {
    const { isAuthenticated, blog } = this.props
    const { isSaving } = this.state

    return (
      <BaseLayout isAuthenticated={isAuthenticated}>
        <BasePage className="blog-editor-page">
          <SlateEditor
            initialValue={blog.story}
            isSaving={isSaving}
            save={this.updateBlog}
          />
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(BlogEditor)
