import React from 'react'
import {mount} from 'enzyme'
import Movie from './movie'
import {MovieDriver} from './driver'
import movies from '../../movies'


describe('Movie', () => {
    let driver = null

    beforeEach(() => {
        driver = new MovieDriver({ movie: movies[0]})
    })

    it('should render a title', () => {
        const wrapper = mount(<Movie movie = {movies[0]}/>)
        expect(wrapper.find('.test__article--title').first().text()).toEqual(movies[0].title)
    });

    it('should render a title with driver', () => {
        expect(driver.get.titleText()).toEqual(movies[0].title)
    });

    it('should be closed by default', () => {
        expect(driver.get.isAdvancedSectionOpen()).toBe(false)
    });

    it('should open advanced section on click', () => {
        driver.when.openBtnClicked()
        expect(driver.get.isAdvancedSectionOpen()).toBe(true)
    });
});