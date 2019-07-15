import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'
import SlateEditor from '../components/slate-editor/SlateEditor'
import { Router } from '../routes'
import { toast } from 'react-toastify'

import { saveBlog } from '../actions/blog'
class BlogEditor extends React.Component {
  state = {
    isSaving: false
  }

  saveBlog = async (story, heading) => {
    let blog = {}

    // TODO author 랑 userId 처리
    blog.title = heading.title
    blog.subTitle = heading.subtitle
    blog.story = story
    blog.author = 'parkoon'
    blog.userId = 'parkoon'

    this.setState({
      isSaving: true
    })

    try {
      const savedBlog = await saveBlog(blog)
      this.setState({ isSaving: false })
      toast.success('Blog Saved Successfully')
      Router.pushRoute(`/blogs/${savedBlog._id}/edit`)
    } catch (err) {
      this.setState({ isSaving: false })
      toast.success(
        'Unexpected Error, Copy your progress and refresh browser please'
      )
      console.error(err)
    }
  }

  render() {
    const { isAuthenticated } = this.props
    const { isSaving } = this.state
    return (
      <BaseLayout isAuthenticated={isAuthenticated}>
        <BasePage className="blog-editor-page">
          <SlateEditor isSaving={isSaving} save={this.saveBlog} />
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(BlogEditor)
