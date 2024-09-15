import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import DropdownComponent from '~/components/EstadoCidadeSelect.vue'; // Substitua com o caminho correto do componente

// Mock da store
vi.mock('@/stores/useInfoStore', () => ({
  useInfoStore: () => ({
    estadoSelecionado: null,
    cidadeSelecionada: null,
    setEstado: vi.fn(),
    setCidade: vi.fn(),
    setPais: vi.fn(),
  }),
}));

// Mock do Nuxt app para simular o Axios
vi.mock('#app', () => ({
  useNuxtApp: () => ({
    $httpClient: {
      get: vi.fn().mockResolvedValue({
        status: 200,
        data: [
          {
            codigo: 1,
            nome: 'Estado 1',
            sigla: 'E1',
            pais: { codigo: 1, nome: 'País' },
            cidades: [{ codigo: 101, nome: 'Cidade 1', capital: true, codigoEstado: 1 }],
          },
          {
            codigo: 2,
            nome: 'Estado 2',
            sigla: 'E2',
            pais: { codigo: 1, nome: 'País' },
            cidades: [{ codigo: 102, nome: 'Cidade 2', codigoEstado: 2 }],
          },
        ],
      }),
    },
  }),
}));

describe('DropdownComponent', () => {
  it('mostra a mensagem "Carregando dados..." antes dos dados serem carregados', () => {
    const wrapper = mount(DropdownComponent);

    // Verifica se a mensagem de carregamento é exibida
    expect(wrapper.text()).toContain('Carregando dados...');
  });

  it('carrega e exibe os dropdowns após os dados serem carregados', async () => {
    const wrapper = mount(DropdownComponent);

    // Aguarda o ciclo de atualização após o onMounted carregar os dados
    await nextTick();
    await nextTick(); // Assegura que os dados foram atualizados e o DOM foi re-renderizado

    // Verifica se os dropdowns são exibidos após os dados serem carregados
    expect(wrapper.find('select').exists()).toBe(true);

    // Verifica se os estados estão corretamente renderizados
    const estadoOptions = wrapper.findAll('select').at(0)?.findAll('option');
    expect(estadoOptions?.length).toBe(3); // Inclui a opção desabilitada "Selecione um estado ..."
    expect(estadoOptions?.at(1)?.text()).toBe('E1');
    expect(estadoOptions?.at(2)?.text()).toBe('E2');

    // Simula a seleção de um estado (usando o `estado` completo)
    await wrapper.findAll('select').at(0)?.setValue(wrapper.vm.estados[0].codigo);
    await nextTick(); // Aguarda a sincronização da seleção com as cidades

    const cidadeOptions = wrapper.findAll('select').at(1)?.findAll('option');
    expect(cidadeOptions?.length).toBe(2); // Inclui a opção desabilitada "Selecione uma cidade ..."
    expect(cidadeOptions?.at(1)?.text()).toBe('Cidade 1');
  });

  it('atualiza as cidades ao selecionar um estado', async () => {
    const wrapper = mount(DropdownComponent);

    // Aguarda o ciclo de atualização após o onMounted carregar os dados
    await nextTick();
    await nextTick();

    // Simula a seleção do estado "Estado 1" (usando `estado.codigo`)
    await wrapper.findAll('select').at(0)?.setValue(wrapper.vm.estados[0].codigo);
    await nextTick();

    // Verifica se as cidades do estado 1 foram carregadas corretamente
    const cidadeOptions = wrapper.findAll('select').at(1)?.findAll('option');
    expect(cidadeOptions?.at(1)?.text()).toBe('Cidade 1');

    // Simula a seleção da cidade
    await wrapper.findAll('select').at(1)?.setValue(wrapper.vm.cidadesFiltradas[0].codigo);
    await nextTick();

    // Verifica se a cidade foi selecionada corretamente
    expect(wrapper.vm.cidadeSelecionadaWatcher).toBe(wrapper.vm.cidadesFiltradas[0]);
  });
});
