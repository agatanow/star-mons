import { mount } from '@vue/test-utils'
import Loading from '@/components/common/Loading'

describe('Loading.vue', () => {
  it('is hidden when the prop is set to false', () => {
    const wrapper = mount(Loading, {
      propsData: {
        visible: false
      }
    });
    expect(wrapper.find('div.loading').exists()).toBe(false);
  })
  it('is shown when the prop is set to true', () => {
    const wrapper = mount(Loading, {
      propsData: {
        visible: true
      }
    });
    expect(wrapper.find('div.loading').exists()).toBe(true);
  })
})
