import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import App from '~/app.vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

describe('App.vue', () => {
  it('renders Header, NuxtPage, and Footer components', () => {
    // Monta o componente
    const wrapper = mount(App, {
      global: {
        stubs: {
          NuxtPage: true, // Stub para o NuxtPage, pois ele geralmente depende da rota atual
          NuxtRouteAnnouncer: true, // Stub do NuxtRouteAnnouncer
        },
      },
    });

    // Verifica se o Header foi renderizado
    expect(wrapper.findComponent(Header).exists()).toBe(true);

    // Verifica se o NuxtPage foi renderizado
    expect(wrapper.findComponent({ name: 'NuxtPage' }).exists()).toBe(true);

    // Verifica se o Footer foi renderizado
    expect(wrapper.findComponent(Footer).exists()).toBe(true);

    // Verifica se o NuxtRouteAnnouncer foi renderizado
    expect(wrapper.findComponent({ name: 'NuxtRouteAnnouncer' }).exists()).toBe(true);
  });
});
