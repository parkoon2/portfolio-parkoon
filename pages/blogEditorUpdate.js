import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'
import SlateEditor from '../components/slate-editor/SlateEditor'
import { getBlogById } from '../actions/blog'

class BlogEditor extends React.Component {
  state = {
    isSaving: false
  }

  static async getInitilProps({ query }) {
    const blogId = query.id
    console.log('hello blog')
    try {
      const blog = await getBlogById(blogId)
      return { blog }
    } catch (err) {
      console.error(err)
      return { err }
    }
  }

  render() {
    const { isAuthenticated } = this.props
    const { isSaving } = this.state

    console.log('========= LOG START =======')
    console.log(this.props.blog)
    console.log('========= LOG END =========')

    return (
      <BaseLayout isAuthenticated={isAuthenticated}>
        <BasePage className="blog-editor-page">
          <SlateEditor
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
