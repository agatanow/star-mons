import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/common/NavBar'

describe('NavBar.vue', () => {
  it('router links are visible', () => {
    const wrapper = shallowMount(NavBar, {
      stubs: ['router-link']
    })
    expect(wrapper.text()).toContain('pokemons')
    expect(wrapper.text()).toContain('star wars')
  })
})
