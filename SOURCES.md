# Fontes consultadas — Echoes of Mystralia (guia)

> Lista de tudo que foi acessado durante a pesquisa, com nota de confiabilidade,
> pra retomar depois sem repetir trabalho. Projeto: `F:\GitHub\mystralia-guide`.

## Confiáveis / usadas no site (dataminado, 18/08/2026, 4ª sessão)

- **Achei a tabela de localização oficial do jogo.** Ficava em `data.unity3d` (o arquivo
  principal, não nos bundles de addressables que eu já tinha minerado), num único
  MonoBehaviour de ~169KB (path_id 3830 nesse load específico — path_id não é estável
  entre loads, tem que buscar pelo conteúdo). Formato: `[chave]` seguido de 11 strings
  em sequência (EN, EN duplicado, FR, ES, **PT**, DE, IT, RU, JA, ZH, KO), repetido pra
  cada entrada. 310 chaves no total, sendo 197 `_name` e 96 `_desc`/`_effect_text`.
  Script: `dump_loc_blob2.py` (acha o objeto pelo conteúdo bruto) + `parse_loc_table2.py`
  (fatia em blocos de 11 strings por chave).
  - Cruzando essa tabela com os devId que eu já tinha: **103 das 173 Memórias e as 21
    variantes de feitiço-base bateram 100%** com nome oficial (EN+PT reais, não mais
    nome gerado do ID interno). As 4 variantes conhecidas da wiki entram nessa conta e
    bateram exatamente (Furi Igni, Nosta Aqua, Exae Aura, Cele Aer), o que valida a
    tabela como fonte confiável, não achado especulativo.
    27 Memórias também ganharam descrição oficial (texto real, limpo de tags de rich
    text tipo `<style="...">` e do placeholder `[attributes]`).
  - **Achei 4 Memórias novas** que eu nunca tinha capturado (não seguem o padrão
    "Rune_" nem tinham `isPrimordial`): `rune_thunder_strike` (Trovão/Thunderstrikes),
    `rune_earth_wall` (Parede de Terra/Earth Wall), `rune_beetle_bomb`
    (Bomba-Besouro/Beetle Bomb), `rune_explosion_trap` (Armadilha Explosiva/Explosion
    Trap). Usam um atlas de ícone diferente (`UI_Atlas_RuneTotem_*` em vez de
    `UI_Atlas_Evocation_*`), talvez uma categoria "totem" separada.
  - **Pendência real, não resolvida**: usuário reportou ter "Falling Sky" equipado no
    jogo. A chave `rune_fire_meteor_name` confirma o nome oficial ("Falling Sky" /
    "Queda dos Céus"), mas **não achei o objeto Rune correspondente em nenhum bundle
    nem no data.unity3d** — só a entrada de texto. Pode ser uma Relíquia (categoria que
    eu nunca minerei) ou estar em conteúdo ainda não baixado localmente. Não entrou no
    site pra não inventar dado. Idem pra ~65 outras chaves `_name` da tabela que
    parecem ser labels genéricos de atributo/formação (tipo `rune_apply_burn` →
    "Apply Burn", `rune_line` → "Straight Line") reaproveitados em várias descrições,
    não itens próprios — não são Memórias faltando, são peças de vocabulário.
  - Arquivo completo da tabela salvo em `loc_table.json` no scratchpad da sessão (não
    versionado no repo, só o resultado já aplicado aos dados do site).

## Confiáveis / usadas no site

- **https://echoesofmystralia.fandom.com/wiki/Memories** — wiki comunitária (fandom).
  Tabela com 55 Memórias (nome, raridade, tipo, elemento, foco, origem, efeito com
  escalonamento por nível). Parece documentar a build de **DEMO** (4 feitiços-base),
  não a Early Access completa (16 feitiços, 110+ Memórias). Fonte principal do site
  atual. **Bloqueada por Cloudflare pra recrawl direto** (WebFetch dá 402, curl dá 403
  challenge). Só consegui ler via proxy `r.jina.ai` (`https://r.jina.ai/<url>`), e nas
  duas vezes que tentei bati dado idêntico — o que sugere que é um **snapshot em cache**
  do jina, não uma leitura ao vivo. Tentativa de forçar bypass de cache (mudando query
  string) caiu em captcha também. **Não dá pra confirmar se a wiki foi editada depois
  desse cache.** Se abrir no navegador manualmente (passa no captcha por ser humano) e
  achar valores diferentes dos que estão no site, isso é a fonte a corrigir.
- **https://echoesofmystralia.fandom.com/wiki/Spells** — os 4 feitiços-base da demo
  (Furi Igni/Fogo, Nosta Aqua/Água, Exae Aura/Raio, Cele Aer/Vento) com stats exatos.
  Mesmo aviso de cache do item acima.
- **https://echoesofmystralia.fandom.com/wiki/Effects** — glossário de status
  (Burn, Chill/Freeze, Static, Vortex, Bounce, Pierce, Knockback, Homing, Haste,
  Tangible, Critical, Low). Mesmo aviso de cache.
- **https://store.steampowered.com/app/974480/Echoes_of_Mystralia/** — página oficial
  Steam. Confirma: 7 elementos, 16 feitiços iniciais, 40+ Relíquias, 100+ Memórias,
  50+ upgrades de Altar, 3 regiões, hub "Azimuth Temple", 25 conquistas.
- **https://echoesofmystralia.com/** — site oficial Borealys Games. Personagem
  "Mazarim", região "Highlands", frases de flavor text.
- **https://borealysgames.com/announcing-echoes-of-mystralia/** — anúncio oficial do
  jogo (sequência de Mages of Mystralia).
- **https://www.tiktok.com/@echoesofmystralia** — TikTok oficial do jogo. Enquete de
  13/08/2026 revelou os 4 nomes estilizados dos elementos: Furi Igni (Fogo), Nosta Aqua
  (Água), Exae Aura (Raio), Cele Aer (Vento).
- **HeadClick Gaming (YouTube)** — canal jogando a Early Access ao vivo, gameplay real
  com transcript. Vídeos específicos puxados via skill `last30days`:
  - https://www.youtube.com/watch?v=YVbDukYc2qw (Fireball build)
  - https://www.youtube.com/watch?v=pVZPcVEYarg (Lightning build, "16 abilities total",
    "Watcher's Eyes")
  - https://www.youtube.com/watch?v=L8_OYOh5y-0 (Lightning Orb build)
  - https://www.youtube.com/watch?v=TgYr_3ohDfM (Ice/Water Shuriken build)
  - https://www.youtube.com/watch?v=_shnaCeE74o (Double Earth / terracotta bombs)
- **https://www.reddit.com/r/Games/comments/1vlja0i/** — thread de lançamento, recepção
  mista, comentários reais citados no guia.
- **https://www.reddit.com/r/roguelites/comments/1vmftfv/** — idem, reclamação de preço.
- **https://www.reddit.com/r/DecrepitGamers/comments/1vmdpm3/** — confirma números da EA
  direto de cobertura de imprensa: "three regions, seven magical elements, more than 40
  relics, more than 100 spell-modifying memories, and over 50 al[tars]".
- **RPGamer** (rpgamer.com, jul/2026) e **COGconnected** (cogconnected.com, jul/2026) —
  cobertura de lançamento em Early Access (11/08/2026).

## Confiáveis / usadas no site (dataminado, 18/08/2026)

- **Arquivos do jogo instalado localmente** (`C:\Games\Echoes.of.Mystralia\...\game\Echoes_Data\`,
  Unity + IL2CPP). Extraído com `UnityPy` (Python) direto do
  `StreamingAssets\aa\StandaloneWindows64\databases_assets_all.bundle` — os MonoBehaviour
  vêm com typetree embutido (não precisou de dump IL2CPP separado). Achados:
  - **171 Memórias (Runes) únicas** confirmadas por `devId` (400 entradas contando
    variantes de nível L1/L2/L3). Bem acima das 55 documentadas pela wiki e dos "110+"
    citados pela imprensa/Steam — pode incluir conteúdo cortado/não liberado ainda.
  - **7º elemento confirmado: Vazio (`Void`)**. Lista completa via `elementalTypeModel`:
    Fire, Ice (chamado assim internamente, não "Water"), Lightning, Air, Earth, Light,
    Void — mais uma categoria `Neutral` que não conta como elemento de combate.
  - Cada Rune tem `tier` (1/2/3, mapeado por distribuição pra Common/Rare/Epic — 199/129/72,
    condizente com Common sendo o mais comum), `level`/`maxLevel` (1-3), `power` (candidato
    a Custo de Foco), `poolId` (pools `blessing_*` parecem ser de Altar).
  - **Não achei**: tabela de localização (nomes ficam como chave `[rune_x_name]`, sem
    texto em inglês/português resolvido) nem o sistema de fórmulas que calcula dano/duração
    por nível (os "transformers" no asset só dizem *quais* atributos a Rune afeta, não os
    valores numéricos). Também não achei os feitiços-base reais (Furi Igni etc. não estão
    sob `devId` prefixado `spell_` — isso pegou só tutoriais de UI da spell-crafting).
  - O enum `runeSubType` (valores 1-5 encontrados) devia mapear pra Modificador/Gatilho,
    mas não deu pra decodificar com confiança sem dump IL2CPP completo — entradas novas
    ficaram marcadas `type:'desconhecido'` no site.
  - Script usado: UnityPy `obj.read_typetree()` por objeto, resolvendo PPtr internas
    (`m_PathID` no mesmo bundle) pra pegar nome do elemento e dos atributos afetados.
  - **18/08/2026 (2ª sessão)**: extraí os ícones reais também. `itemIconRef.m_SubObjectName`
    de cada Rune aponta pro nome do sprite (`UI_Atlas_Evocation_*`) dentro de
    `content_common_assets_all.bundle`. Exportei 266 ícones únicos (128x128 PNG) via
    `Sprite.image.save()` do UnityPy pra `images/runes/`. Os 7 ícones de elemento
    (`UI_Atlas_Reward_0..6`) também saíram do mesmo bundle, resolvidos pelo `m_PathID`
    direto do campo `icon` de cada `ElementalTypeModel` — foram pra `images/elements/`.
    Cobertura: ~100% das 171 Memórias dataminadas têm ícone específico; das 55 da wiki,
    só 2 bateram por nome (a maioria usa nome/grafia diferente do devId do jogo), as
    outras caem no fallback de ícone do elemento.
  - **18/08/2026 (3ª sessão)**: achei os feitiços-base de verdade. Eles são Runes normais
    com `isPrimordial:1` no `MaterializationRuneModel` (mesma estrutura das Memórias),
    então o filtro anterior (`m_Name.startswith("Rune_")`) não pegava — o nome interno é
    `{Família}_{Elemento}_Rune` (ex: `Punch_Fire_Rune`), sem prefixo "Rune_". Busquei por
    `isPrimordial==1` direto no `runeModel` de cada MonoBehaviour do bundle e achei 29
    resultados; filtrei os que tinham `maxPower` real e atributos (21 ficaram — o resto é
    lixo de inimigo/ambiente tipo `Spider_Mortar`, `Bomber_Cluster` que reusa o mesmo
    sistema de Rune). Resultado: **4 famílias de arma (Soco/Feixe/Bumerangue/Disparo
    Carregado) x 5 elementos (Fogo/Água/Raio/Vento/Terra) = 20 variantes + 1 Muro de
    Pedra único = 21 feitiços-base reais**. Confirmei o mapeamento família→feitiço
    conhecido resolvendo `Weapon.weaponEntries[0].spellModel` de cada um dos 5 objetos
    `*_Weapon` (Beam/Boomerang/Slash/Ice_Snipe/Demo_Starting): Slash→Fire_Punch (=Furi
    Igni), Beam→Lightning_Beam (=Exae Aura), Boomerang→Boomerang_Wind (=Cele Aer),
    Ice_Snipe→IceSnipe (=Nosta Aqua). Mesma limitação de sempre: sem número exato pras
    17 variantes novas, só quais atributos afetam (heurística, igual as Memórias).
    Nenhuma variante em Luz ou Vazio apareceu — ou não existem ainda, ou ficam pra depois.

## Rejeitadas / não-confiáveis (não usar sem checar duas vezes)

- **https://mystraliawiki.vercel.app/** — site tipo "wiki" que aparenta ser gerado
  rápido demais pra ser real (jogo tinha poucos dias de lançado quando isso já tinha
  conteúdo "completo"). Foi a origem do dado errado "Fogo+Gelo=Vapor" e do elemento
  "Gelo" que **removi do site** por contradizer a fonte oficial (TikTok mostrou Água,
  não Gelo).
- **https://echoesofmystralia.wiki/** e subpáginas (`/guides/`, `/builds/`) — mesmo
  padrão suspeito de conteúdo detalhado demais pra um jogo recém-lançado.
- **https://www.echoes-of-mystralia.wiki/** — domínio quase-idêntico ao de cima
  (cluster de SEO/conteúdo duvidoso, possivelmente a mesma origem).
- **https://www.echoes-of-mystralia-guide.wiki/** — mesmo cluster suspeito.
- Todos os três acima: **nunca usar como confirmação cruzada entre si** — podem
  compartilhar a mesma origem fabricada.

## Tentativas sem sucesso (pra não repetir)

- `echoesofmystralia.fandom.com/api.php?action=parse...` — WebFetch: 402.
- `echoesofmystralia.fandom.com/wiki/Memories?action=raw` — WebFetch: 402.
- `curl` direto no fandom — 403, challenge Cloudflare ("Just a moment...").
- `r.jina.ai` com bypass de cache (query string alterada) — cai em captcha também.
- `Special:AllPages` e `api.php?action=query&list=allpages` via jina — captcha.
- Busca por variantes de feitiço por elemento (hipótese: 4 elementos × 4 formas = 16
  da EA) — página Spells da wiki confirma ter só os 4 da demo, sem variantes/tiers.
  **Não encontrado em nenhuma fonte pública até agora.**

## Pendências pra próxima sessão

- ~~Achar o 7º elemento~~ — **resolvido 18/08/2026**: é Vazio (Void), via dataminado.
- ~~Achar nomes das Memórias adicionais da EA~~ — **parcialmente resolvido 18/08/2026**:
  171 únicas confirmadas via dataminado, mas sem nome legível (só ID interno) nem valor
  numérico. Se achar a tabela de localização (provavelmente carregada de fora dos bundles
  locais, não achei nos arquivos do jogo instalado), dá pra resolver os nomes reais.
- Confirmar/corrigir focus points dos 55 Memórias originais (wiki) contra o campo `power`
  do dataminado — não fiz o cruzamento ainda (os `devId` do dataminado não batem 1:1 com
  os slugs que usei pra identificar as 55 da wiki).
- Decodificar o enum `runeSubType` (1-5) pra separar Modificador/Gatilho nas 171 novas —
  precisaria de dump IL2CPP (`GameAssembly.dll` + `global-metadata.dat`) pra ler os nomes
  reais do enum C#.
- Achar nomes dos feitiços-base reais (Furi Igni etc.) nos arquivos do jogo — o prefixo
  `devId` "spell_" no dataminado só trouxe tutoriais de UI, não os feitiços em si. Talvez
  estejam numa classe Weapon/Caster separada (`FSMWeaponStyle`, `Data_CasterMage_V1_*`
  apareceram nos nomes internos, ainda não explorados).
