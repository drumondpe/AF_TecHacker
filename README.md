# Visão Geral

Este plugin para o navegador Firefox foi desenvolvido para identificar e bloquear rastreadores na web, utilizando uma lista de domínios de rastreamento conhecida (EasyList) e permitindo ao usuário gerenciar uma lista personalizada de domínios para bloqueio. O plugin também fornece uma interface simples para gerenciar o bloqueio de rastreadores, ativar/desativar a funcionalidade, e visualizar relatórios básicos de rastreadores detectados e bloqueados.

### Funcionalidades
## Conceito C (Nota C)

- Identificação Básica de Rastreadores: A extensão utiliza uma lista conhecida de rastreadores (EasyList) para identificar domínios de rastreamento. Cada requisição feita pelo navegador é comparada com a lista para verificar se é um domínio de rastreamento.

- Bloqueio de Conteúdo Básico: A extensão intercepta requisições para os domínios de rastreamento identificados e bloqueia essas conexões, garantindo maior privacidade ao usuário.

## Conceito B (Nota B)

1. Identificação e Bloqueio Avançados: 
- Além da EasyList, o usuário pode adicionar domínios personalizados para bloqueio através da interface.
- É possível adicionar e remover domínios manualmente na lista de rastreadores personalizados.

2. Interface de Configuração:
- Ativar/Desativar Bloqueio: A extensão permite ao usuário ativar ou desativar o bloqueio de rastreadores com um botão de alternância ("toggle").
- Gerenciamento de Lista Personalizada: A interface inclui campos para adicionar e remover domínios na lista personalizada de rastreadores.
- Exibição de Histórico: A interface exibe listas dos domínios de terceiros detectados, rastreadores bloqueados e rastreadores personalizados.

3. Histórico:
- A interface do plugin mostra quantos rastreadores foram bloqueados durante a sessão de navegação atual. Isso é exibido no painel "Rastreadores Bloqueados", permitindo que o usuário tenha uma visão rápida dos rastreadores impedidos de acessar informações durante a navegação.
- O botão "Limpar Histórico" permite ao usuário reiniciar o relatório, limpando as listas de domínios de terceiros e rastreadores bloqueados.

## Interface do Usuário
A interface inclui as seguintes seções:

- Configurações de Bloqueio: Um botão de alternância para ativar ou desativar o bloqueio de rastreadores.
- Domínios de Terceiros Detectados: Lista de todos os domínios de terceiros detectados na navegação, permitindo ao usuário ver quais domínios externos estão tentando se comunicar com o navegador.
- Rastreadores Bloqueados: Lista dos domínios de rastreadores bloqueados até o momento, com uma contagem das tentativas bloqueadas.
- Gerenciar Lista de Rastreadores Personalizados: Campos para adicionar e remover domínios de rastreamento personalizados.
- Lista de Rastreadores Personalizados: Exibe a lista de domínios adicionados manualmente pelo usuário.
- Limpar Histórico: Um botão para limpar o histórico de rastreadores bloqueados e domínios de terceiros detectados.

## Instruções de Uso
1. Ativar/Desativar Bloqueio de Rastreadores: Use o botão de alternância na interface para ativar ou desativar o bloqueio de rastreadores.

2. Adicionar/Remover Domínios Personalizados:
- Insira o domínio desejado no campo de texto e clique em "Adicionar" para incluí-lo na lista de rastreadores personalizados.
- Para remover, insira o domínio no campo e clique em "Remover".

3. Visualizar o Histórico de Rastreadores:
- A interface exibe as listas de "Domínios de Terceiros Detectados" e "Rastreadores Bloqueados".
- Clique em "Limpar Histórico" para resetar as listas.

4. Relatório de Rastreadores Bloqueados:
- Durante a navegação, o plugin registra todos os rastreadores que foram bloqueados e os exibe na seção "Rastreadores Bloqueados".
- Esse relatório oferece uma visão rápida da quantidade e dos tipos de rastreadores impedidos de acessar o navegador.