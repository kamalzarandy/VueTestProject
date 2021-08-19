
import { shallowMount } from '@vue/test-utils';
import Component from '../../components/test.vue';
import {jest} from '@jest/globals';
import App from "../../App";

jest.useFakeTimers();

let wrapper;

beforeEach(() => {
    wrapper = shallowMount(Component, {
        propsData: {},
        mocks: {},
        stubs: {},
        methods: {},
    });
});

afterEach(() => {
    wrapper.destroy();
});

describe('Component', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });
});
