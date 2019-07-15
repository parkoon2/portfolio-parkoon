import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'
import SlateEditor from '../components/slate-editor/SlateEditor'
import { getBlogById, updateBlogById } from '../actions/blog'
import { ToastContainer, toast } from 'react-toastify'
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

  updateBlog = async (story, heading) => {
    const { blog } = this.props

    const updatedBlog = {}
    updatedBlog.title = heading.title || blog.title
    updatedBlog.subTitle = heading.subtitle || blog.subTitle
    updatedBlog.story = story || blog.story

    this.setState({ isSaving: true })

    try {
      const res = await updateBlogById(blog._id, updatedBlog)

      this.setState({ isSaving: false })

      toast.success('Blog Updated Successfully')
      console.log('success updated', res)
    } catch (err) {
      const message = err.message || err
      this.setState({ isSaving: false })
      console.error(message)
      toast.success(
        'Unexpected Error, Copy your progress and refresh browser please'
      )
    }
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
