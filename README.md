# Guia Echoes of Mystralia

Guia comunitário não-oficial para *Echoes of Mystralia* (Borealys Games), com um combinador de builds interativo e dados extraídos direto dos arquivos do jogo.

[English version](README.en.md)

## O que tem aqui

- **Combinador de Feitiços**: monte uma run com até 2 feitiços-base, marque suas Memórias e veja a melhor combinação por categoria (Dano, Área, Controle, Mobilidade, Sustentação) dentro do seu orçamento de Foco.
- **171 Memórias únicas** confirmadas nos arquivos do jogo, além das 55 documentadas pela wiki comunitária com números reais.
- **21 variantes de feitiço-base** (4 famílias de arma × elementos, mais um Muro de Pedra único), incluindo os 4 feitiços oficiais conhecidos.
- Ícones reais extraídos do jogo para praticamente toda Memória e feitiço.
- Site em português e inglês.

## Como os dados foram obtidos

O site combina duas fontes:

1. A wiki comunitária [fandom.com](https://echoesofmystralia.fandom.com/) documentou 55 Memórias e 4 feitiços-base com números reais, aparentemente da build de demonstração do jogo.
2. Uma extração direta dos arquivos instalados do jogo (Unity, IL2CPP, via [UnityPy](https://github.com/K0lb3/UnityPy)) confirmou 171 Memórias adicionais, o sétimo elemento do jogo, 21 variantes reais de feitiço-base e os ícones originais.

Os itens vindos dos arquivos do jogo não têm valor numérico exato disponível nem localização oficial: o nome vem do identificador interno do jogo (traduzido programaticamente), e a descrição lista só quais atributos a Memória afeta. Isso está marcado em cada card do site.

O histórico completo da pesquisa, incluindo fontes rejeitadas por parecerem geradas artificialmente, está em [`SOURCES.md`](SOURCES.md).

## Stack

- [Astro](https://astro.build/) (site estático)
- JavaScript puro no cliente para o combinador e os filtros, sem framework de UI
- i18n nativo do Astro (`pt` como padrão, `en` em `/en/`)
- Deploy na [Vercel](https://vercel.com/)

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # serve o build de produção
```

## Aviso

*Echoes of Mystralia* é uma marca da Borealys Games. Este site não é afiliado, endossado ou patrocinado pelo estúdio. Todo o conteúdo extraído dos arquivos do jogo é usado com finalidade informativa, para uma comunidade de jogadores.

## Licença

Código sob [MIT](LICENSE). Dados do jogo pertencem à Borealys Games.
