import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {
  const blog = {
    title: 'testi',
    author: 'Aku Ankka',
    url: 'http://localhost:4000',
    likes: 5000
  }

  const mockHandler = jest.fn()
  const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

  it('renders title, author and likes', () => {
    const titleAuthorDiv = simpleBlogComponent.find('.titleAuthor')
    const likesDiv = simpleBlogComponent.find('.likes')

    expect(titleAuthorDiv.text()).toContain(blog.title)
    expect(titleAuthorDiv.text()).toContain(blog.author)

    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking the like button twice calls event handler twice', () => {
    const likeButton = simpleBlogComponent.find('button')
    likeButton.simulate('click')
    likeButton.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})