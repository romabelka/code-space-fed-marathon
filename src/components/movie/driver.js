import React from 'react'
import {mount} from 'enzyme'
import Movie from './movie'

export class MovieDriver {
    constructor(defaultProps = {}) {
        this.wrapper = mount(<Movie {...defaultProps} />)
    }

    get = {
        title: () => this.wrapper.find('.test__article--title').first(),
        titleText: () => this.get.title().text(),
        openBtn: () => this.wrapper.find('.test__article--open-btn').first(),
        isAdvancedSectionOpen: () => this.wrapper.find('.test__article--advanced-section').exists()
    }

    when = {
        openBtnClicked: () => this.get.openBtn().simulate('click')
    }
}