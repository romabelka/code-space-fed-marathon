import React from 'react'
import {mount} from 'enzyme'
import Movie from './movie'
import movies from '../../movies'

describe('Movie', () => {
    it('should render a title', () => {
        const wrapper = mount(<Movie movie = {movies[0]}/>)
        expect(wrapper.find('.test__article--title').first().text()).toEqual(movies[0].title)
    });
});