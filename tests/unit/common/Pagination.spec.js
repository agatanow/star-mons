import { createLocalVue, mount } from '@vue/test-utils'
import Pagination from '@/components/common/Pagination'

const localVue = createLocalVue()

describe('Pagination.vue', () => {
  it('shows correctly for short neighborhood prop', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 1,
        pagesNo: 120,
        neighborPagesNo: 5,
      },
    })
    await localVue.nextTick();
    expect(wrapper.find('.pagination__btn').exists()).toBe(true)
    const pageButtons = wrapper.findAll('.pagination__btn');
    expect(pageButtons.at(0).text()).toBe('1');
    expect(pageButtons.at(3).text()).toBe('4');
    expect(pageButtons.at(5).text()).toBe('6');
    expect(pageButtons.at(6).text()).toBe('120');
    expect(pageButtons.at(-1).text()).toBe('120');
  })

  it('shows correctly for long neighborhood prop', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 6,
        pagesNo: 20,
        neighborPagesNo: 20,
      }
    })
    await localVue.nextTick();
    expect(wrapper.find('.pagination__btn').exists()).toBe(true)
    const pageButtons = wrapper.findAll('.pagination__btn');
    expect(pageButtons.length).toBe(20)
    expect(pageButtons.at(0).text()).toBe('1');
    expect(pageButtons.at(4).text()).toBe('5');
    expect(pageButtons.at(9).text()).toBe('10');
    expect(pageButtons.at(14).text()).toBe('15');
    expect(pageButtons.at(-1).text()).toBe('20');
  })

  it('is clickable and emits an event', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 1,
        pagesNo: 20,
        neighborPagesNo: 3,
      },
      listeners :{
        selectPage: () => {}
      }
    })
    await localVue.nextTick();
    expect(wrapper.find('.pagination__btn').exists()).toBe(true)
    const pageButtons1 = wrapper.findAll('.pagination__btn');
    expect(pageButtons1.at(3).text()).toBe('4');
    expect(pageButtons1.at(4).text()).toBe('20');
    //click second page
    await pageButtons1.at(1).trigger('click', {})
    expect(wrapper.emitted().selectPage).toBeTruthy()
    await localVue.nextTick();
    const pageButtons2 = wrapper.findAll('.pagination__btn');
    expect(wrapper.vm.currentPage).toBe(2);
    expect(pageButtons2.at(4).text()).toBe('5');
    expect(pageButtons2.at(5).text()).toBe('20');
  })
})