import { mount, createLocalVue } from '@vue/test-utils'
import DownloadSelectableList from '@/components/common/DownloadSelectableList'
import Pagination from '@/components/common/Pagination'
import Loading from '@/components/common/Loading'
import DownloadPanel from '@/components/common/DownloadPanel'

describe('DownloadSelectableList.vue', () => {
  const localVue = createLocalVue()
  let wrapper;

  beforeAll(async () => {
    wrapper = mount(DownloadSelectableList, {
      propsData: {
        pagesNo: 10,
        itemIdPropertyKey: "itemId",
        namePropertyKey: "name",
        itemsPerPage: 2,
        downloadFileName: 'test',
        getResourceList: (pageNo) => {
          /*eslint-disable no-unused-vars*/
          return new Promise((resolve, _) => {
            resolve({
              results: [
                {
                  itemId: `page-${pageNo}-id-1`,
                  name: `page-${pageNo}-name-1`,
                },
                {
                  itemId: `page-${pageNo}-id-2`,
                  name: `page-${pageNo}-name-2`,
                }
              ]
            })
        })},
        getResourceItem: (itemId) => {
          /*eslint-disable no-unused-vars*/
          return new Promise((resolve, _) => {
            resolve({
              itemId: itemId,
              name: 'name'
            })
        })},
      }
    });
    await localVue.nextTick();
  });

  it('can select and deselect all items on current page', async () => {
    //all should be off by default
    await localVue.nextTick();
    let checkboxes = wrapper.findAll('.download-selectable-list__list input');
    expect(checkboxes.length).toBe(2);
    expect(checkboxes.at(0).element.checked).toBe(false);
    expect(checkboxes.at(1).element.checked).toBe(false);
    expect(wrapper.vm.listValues['page-1-id-1']).toBe(false);
    expect(wrapper.vm.listValues['page-1-id-2']).toBe(false);

    //select all
    const setAllCheckbox = wrapper.find('.download-selectable-list__bar input');
    setAllCheckbox.trigger('click', {});
    await wrapper.vm.$nextTick();
    checkboxes = wrapper.findAll('.download-selectable-list__list input');
    expect(checkboxes.length).toBe(2);
    expect(checkboxes.at(0).element.checked).toBe(true);
    expect(checkboxes.at(1).element.checked).toBe(true);
    expect(wrapper.vm.listValues['page-1-id-1']).toBe(true);
    expect(wrapper.vm.listValues['page-1-id-2']).toBe(true);
  })

  it('can deselect all items on current page', async () => {
    let checkboxes = wrapper.findAll('.download-selectable-list__list input');
    //deselect only the first one
    checkboxes.at(0).trigger('click', {});
    await wrapper.vm.$nextTick();
    checkboxes = wrapper.findAll('.download-selectable-list__list input');
    expect(checkboxes.length).toBe(2);
    expect(checkboxes.at(0).element.checked).toBe(false);
    expect(checkboxes.at(1).element.checked).toBe(true);
    expect(wrapper.vm.listValues['page-1-id-1']).toBe(false);
    expect(wrapper.vm.listValues['page-1-id-2']).toBe(true);

    //deselect all
    const setAllCheckbox = wrapper.find('.download-selectable-list__bar input');
    setAllCheckbox.trigger('click', {});
    await wrapper.vm.$nextTick();
    checkboxes = wrapper.findAll('.download-selectable-list__list input');
    expect(checkboxes.length).toBe(2);
    expect(checkboxes.at(0).element.checked).toBe(false);
    expect(checkboxes.at(1).element.checked).toBe(false);
    expect(wrapper.vm.listValues['page-1-id-1']).toBe(false);
    expect(wrapper.vm.listValues['page-1-id-2']).toBe(false);
  })

  it('reloads list when page is selected', async () => {
    const pageOneItems = wrapper.findAll('.download-selectable-list__list li');
    expect(pageOneItems.length).toBe(2);
    expect(pageOneItems.at(0).text()).toBe("page-1-name-1");
    expect(pageOneItems.at(1).text()).toBe("page-1-name-2");
    const pagination = wrapper.findComponent(Pagination);
    expect(pagination.exists()).toBe(true)
    pagination.vm.$emit('selectPage', 4);
    expect(pagination.emitted().selectPage).toBeTruthy();
    await Promise.resolve();
    await wrapper.vm.$nextTick();
    const pageFourItems = wrapper.findAll('.download-selectable-list__list li');
    expect(pageFourItems.at(0).text()).toBe("page-4-name-1");
    expect(pageFourItems.at(1).text()).toBe("page-4-name-2");
  })

  it('remembers selected items between pages', async () => {
    const pagination = wrapper.findComponent(Pagination);
    expect(pagination.exists()).toBe(true);

    //load page one, make sure it's empty
    pagination.vm.$emit('selectPage', 1);
    await Promise.resolve();
    await localVue.nextTick();
    let checkboxes = wrapper.findAll('.download-selectable-list__list input');
    expect(checkboxes.length).toBe(2);
    expect(checkboxes.at(0).element.checked).toBe(false);
    expect(checkboxes.at(1).element.checked).toBe(false);
    expect(wrapper.vm.downloadItemsIds.has('page-1-id-1')).toBe(false);

    //select first item on page one
    checkboxes.at(0).trigger('click', {});
    await wrapper.vm.$nextTick();
    expect(checkboxes.at(0).element.checked).toBe(true);
    expect(wrapper.vm.downloadItemsIds.has('page-1-id-1')).toBe(true);

    //load page two, make sure it's empty
    pagination.vm.$emit('selectPage', 2);
    await Promise.resolve();
    await localVue.nextTick();
    await wrapper.vm.$nextTick();
    checkboxes = wrapper.findAll('.download-selectable-list__list input');
    expect(checkboxes.at(0).element.checked).toBe(false);
    expect(checkboxes.at(1).element.checked).toBe(false);
    expect(wrapper.vm.downloadItemsIds.has('page-1-id-1')).toBe(true);
    expect(wrapper.vm.downloadItemsIds.has('page-2-id-2')).toBe(false);

    //select second item on page two
    checkboxes.at(1).trigger('click', {});
    await wrapper.vm.$nextTick();
    expect(checkboxes.at(1).element.checked).toBe(true);
    expect(wrapper.vm.downloadItemsIds.has('page-1-id-1')).toBe(true);
    expect(wrapper.vm.downloadItemsIds.has('page-2-id-2')).toBe(true);
  })

  it('shows loader when list is being refreshed', async () => {
    const loading = wrapper.findComponent(Loading);
    expect(loading.exists()).toBe(true);
    expect(wrapper.find('div.loading').exists()).toBe(false);
    const pagination = wrapper.findComponent(Pagination);
    pagination.vm.$emit('selectPage', 4);
    expect(pagination.emitted().selectPage).toBeTruthy();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div.loading').exists()).toBe(true);
    await Promise.resolve();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div.loading').exists()).toBe(false);
  })

  it('displays Download Panel', async () => {
    const downloadPanel = wrapper.findComponent(DownloadPanel);
    expect(downloadPanel.exists()).toBe(true);
  })
})
