import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import App from '~/app.vue'; // O caminho do seu componente principal
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

describe('App.vue', () => {
  it('renders Header, NuxtPage, and Footer components', () => {
    // Monta o componente com stubs
    const wrapper = mount(App, {
      global: {
        stubs: {
          NuxtLink: true, // Stub do NuxtLink
          NuxtPage: true, // Stub do NuxtPage
          NuxtRouteAnnouncer: true, // Stub do NuxtRouteAnnouncer
          vIcon: true, // Stub do v-icon (caso não seja necessário renderizar)
        },
      },
    });

    // Verifica se o Header foi renderizado
    expect(wrapper.findComponent(Header).exists()).toBe(true);

    // Verifica se o NuxtPage foi renderizado
    expect(wrapper.findComponent({ name: 'NuxtPage' }).exists()).toBe(true);

    // Verifica se o Footer foi renderizado
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });
});
