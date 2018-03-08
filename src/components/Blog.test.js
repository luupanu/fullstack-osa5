import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog/>', () => {
  const blog = {
    title: 'testi',
    author: 'Aku Ankka',
    url: 'http://localhost:4000',
    likes: 5000
  }

  const mockHandler = jest.fn()
  const blogComponent = shallow(<Blog blog={blog}/>)
  const contentDiv = blogComponent.find('.blog')

  it('renders title and author at start', () => {
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.title)
  })

  it('renders detailed version when clicked', () => {
    contentDiv.simulate('click')
    const detailedDiv = blogComponent.find('.blog-detailed')
    expect(detailedDiv.text()).toContain(blog.author)
    expect(detailedDiv.text()).toContain(blog.title)
    expect(detailedDiv.text()).toContain(blog.url)
    expect(detailedDiv.text()).toContain(blog.likes)
  })  
})