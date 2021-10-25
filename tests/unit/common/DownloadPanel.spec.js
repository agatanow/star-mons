import { createLocalVue, mount } from '@vue/test-utils'
import DownloadPanel from '@/components/common/DownloadPanel'

const localVue = createLocalVue()

describe('DownloadPanel.vue', () => {
    let wrapper;

    beforeAll(async () => {
        wrapper = mount(DownloadPanel, {
            propsData: {
                downloadItemsNo: 0,
                getDownloadData: () => {

                    return new Promise((resolve, reject) => {
                        resolve([
                        {
                            name: "Dinosaur",
                            mood: "happy"
                        },
                        {
                            name: "King Kong",
                            mood: "sad"
                        }
                    ])
                })},
                downloadFileName: "test"
            }
        });
        await localVue.nextTick();
    });

  it('renders a download button that opens pop up', async () => {
    const downloadButton = wrapper.find('.download-panel__btn');
    expect(downloadButton.exists()).toBe(true);
    expect(wrapper.find('.download-panel__pop-up').exists()).toBe(false);
    await downloadButton.trigger('click', {});
    await localVue.nextTick();
    expect(wrapper.find('.download-panel__pop-up').exists()).toBe(true);
  });

  it('has a pop up that can be closed', async () => {
    await wrapper.find('.download-panel__btn').trigger('click', {});
    await localVue.nextTick();
    expect(wrapper.find('.download-panel__pop-up').exists()).toBe(true);
    await wrapper.find('.download-panel__btn--close').trigger('click', {});
    await localVue.nextTick();
    expect(wrapper.find('.download-panel__pop-up').exists()).toBe(false);
  });

  it('generates a downloadable json link', async () => {
    await wrapper.find('.download-panel__btn').trigger('click', {});
    expect(wrapper.find('.download-panel__link').exists()).toBe(false);
    await localVue.nextTick();
    expect(wrapper.find('.download-panel__pop-up').exists()).toBe(true);
    await Promise.resolve();
    expect(wrapper.find('.download-panel__link').exists()).toBe(true);
  });
});