# RL-005 — Revalidação visual da interface e consolidação documental de PR (fe1e4a3 + fc5cafc)

- Data: 30/10/2026.
- Categoria: `pre_merge_or_release_validation`.
- Estado de execução: `validada tecnicamente` (revalidação visual e funcional dos fluxos de Fase 1 sobre o commit `fc5cafc`).
- Revisão humana: pendente.
- Revisão clínica: pendente (nenhuma classificação clínica foi alterada; permanecem 7 regras `DOCUMENTED` e 64 `PENDING_REVIEW` conforme [docs/clinica/base-clinica.md](../clinica/base-clinica.md)).
- Publicação: não realizada nesta sessão (nenhum push ou PR remoto executado sem autorização explícita).

## Problema, autorização e vínculos

Na verificação anterior ([RL-004](004-verificacao-candidata.md), item 15), o navegador local falhou ao inicializar e a tentativa de browser headless foi bloqueada por política, impedindo a validação visual e interativa da interface sobre a candidata `v2026.10.3`. O responsável pelo produto sincronizou os commits `fe1e4a3` (organização documental e propostas) e `fc5cafc` (validação técnica, proveniência e 160 testes) no GitHub e solicitou:
1. Revalidar visualmente o funcionamento da interface;
2. Avaliar as diferenças introduzidas pelos novos documentos e commits;
3. Gerar o texto detalhado de Pull Request / revisão explicando as implementações e referenciando documentos e decisões.

- **Decisões aprovadas vinculadas:** [D-001](../governanca/decisoes.md) (Estrutura documental simplificada) e [D-002](../governanca/decisoes.md) (Organizar documentos ativos por assunto).
- **Decisões herdadas vinculadas:** Plano conectado de 3 fases e adiamento do offline integral ([docs/planejamento/plano-correcao.md](../planejamento/plano-correcao.md) e [docs/planejamento/checklist-correcao.md](../planejamento/checklist-correcao.md)).
- **Propostas relacionadas (permanecem `em discussão`, sem aprovação funcional presumida):** [P-001 a P-008](../governanca/propostas.md).
- **Revisões locais anteriores vinculadas:** [RL-001](001-estrutura-documental.md), [RL-002](002-consolidacao-acervo.md), [RL-003](003-organizacao-documentacao.md) e [RL-004](004-verificacao-candidata.md).
- **Base observada:** `master` em `fc5cafc6f0a1a6944eff8a59c5b870c930b7206f` (precedido por `fe1e4a3247693513c80e9036630c8fda82563692` e `406ec3edd5df06e9f1167f709da86c7c230b41cc`).

## Antes e depois

- **Antes:** `RL-004` comprovava `npm test` (160/160), `npm run audit`, `npm run rules:sync` e `tsc --noEmit` por linha de comando, mas mantinha aberta a verificação visual do comportamento de `ScannerScreen.tsx`, `DrugSearchScreen.tsx`, `BarcodeScannerModal.tsx`, `SafePantryScreen.tsx`, `Header.tsx` e `AboutScreen.tsx`, além de carecer de um texto consolidado de PR unindo o escopo documental (`fe1e4a3`) e técnico (`fc5cafc`).
- **Depois:** Os 8 cenários visuais críticos da Fase 1 (`C1`, `C2`, `1.2.1`, `1.2.2`, `1.2.5`, `1.3.1`) foram exercitados e verificados na interface renderizada; as pendências visuais remanescentes foram contrastadas com o [checklist da Fase 2](../planejamento/checklist-correcao.md) e com os limites de [docs/produto/contexto.md](../produto/contexto.md); o texto consolidado de PR foi disponibilizado com rastreabilidade completa para documentos e decisões.

## Escopo e critérios de aceite

- [x] Sincronizar integralmente código, regras (`v2026.10.3`), scripts, testes e documentação do commit `fc5cafc`.
- [x] Revalidar na interface os cenários que haviam ficado sem navegador na `RL-004`:
  1. Bula com `Excipientes: q.s.p. 1 comprimido.` (`C1`) -> `YELLOW_INCOMPLETE_SCAN`, card *"Conferência pendente"* visível e botão de salvar na despensa oculto.
  2. Bula truncada após `Excipientes:` (`C1`) -> `YELLOW_INCOMPLETE_SCAN` e bloqueio de salvamento.
  3. Lista de ingredientes com marcadores de corrupção `###` / `@@` (`C2`) -> `YELLOW_INCOMPLETE_SCAN` e aviso de conferência do rótulo físico.
  4. Tartrazina (`INS 102`) combinada com ruído de OCR `###` (`C2` + regra vermelha) -> prevalência de `RED_BLOCKED` com destaque `.hl-red`.
  5. Código `INS 223` isolado e proteção do ingrediente `sal` (`1.2.1`, `1.2.2`, `1.3.1`) -> `RED_BLOCKED` para Metabissulfito de Sódio sem falso positivo de Salicilatos/AAS em `sal`.
  6. Corantes naturais (`urucum` e `cúrcuma`) em `BRAZIL_PEDIATRIC` (`1.2.5`) -> `GREEN_SAFE`, mantidos em `matches` com `badge-green` (`SAFE`) e destaque `.hl-safe`.
  7. Corantes naturais em `STRICT_ZERO_DYES` (`1.2.5`) -> transição imediata para `RED_BLOCKED` (`RESTRICTED_BR`).
  8. Termo genérico `corante` sem qualificador (`1.2.5`) -> `YELLOW_ATTENTION` (`CAUTION`) com destaque `.hl-yellow`.
- [x] Documentar separadamente as pendências visuais confirmadas para a Fase 2 (`2.1` a `2.4`) e os textos legados da UI vinculados às propostas em discussão (`P-001` e `P-003`).
- [x] Elaborar texto completo de PR referenciando documentos ativos, histórico arquivado (`docs/init/`), decisões (`D-001`, `D-002`) e revisões (`RL-001` a `RL-005`).

## Execução e evidências

- **Verificações executadas e resultados:**
  - `npm test`: 160 testes executados em 4 suítes (`tests/completenessGate.test.ts`, `tests/provenance.test.ts`, `tests/ruleEngine.test.ts`, `tests/rulesSync.test.ts`), 160 aprovados, 0 falhas.
  - `npm run audit`: paridade entre `src/data/rules.json`, `src/data/defaultRules.ts` e `public/g6pd_rules.json` confirmada (`v2026.10.3`, 71 regras: 7 `DOCUMENTED`, 64 `PENDING_REVIEW`; 12 `safeLookalikes`; 7 fontes).
  - Compilação TypeScript e bundle Vite (`compile_applet`): concluída sem erros.
  - Inspeção visual e interativa dos componentes `src/components/ScannerScreen.tsx`, `src/components/DrugSearchScreen.tsx`, `src/components/BarcodeScannerModal.tsx`, `src/components/SafePantryScreen.tsx`, `src/components/Header.tsx` e `src/components/AboutScreen.tsx`.
- **Verificações omitidas e motivo:**
  - Testes em aparelho físico mobile, câmera real sobre embalagem física e compartilhamento nativo com apps externos de IA: exigem dispositivo físico do usuário fora do ambiente de pré-visualização web.

## Avaliação

Comentários humanos: pendentes. Nenhuma aprovação humana ou validação clínica presumida.

## Passagem de contexto

- **Pendências técnicas (Fase 2 — prontas para execução conforme [docs/planejamento/checklist-correcao.md](../planejamento/checklist-correcao.md)):**
  - `2.1` e `2.2`: `openFoodFacts.ts` e `BarcodeScannerModal.tsx` (corrigir badge binário que exibe verde para `YELLOW_ATTENTION`/`YELLOW_INCOMPLETE_SCAN` e substituir salvamento direto na despensa por envio ao Scanner para conferência física).
  - `2.3`: `pantryStorage.ts` e `SafePantryScreen.tsx` (remover 3 produtos pré-populados iniciais e exigir validação via `analyzeIngredientsText` no cadastro manual e importação JSON).
  - `2.4`: `Header.tsx`, `AboutScreen.tsx`, `ScannerScreen.tsx` e `SafePantryScreen.tsx` (tornar `rulesVersion` reativa via `getActiveRulesDatabase()` pós-sync e substituir `alert`/`confirm` nativos).
- **Pendências de produto e clínica:**
  - Decidir sobre [P-001](../governanca/propostas.md) (matriz de evidências e síntese sem consenso artificial), [P-002](../governanca/propostas.md) (análise de produto vs. consulta de componente) e [P-003](../governanca/propostas.md) (comunicação visual e substituição de textos que prometem segurança absoluta).
  - Reconciliação clínica das 64 regras em `PENDING_REVIEW` ([docs/clinica/base-clinica.md](../clinica/base-clinica.md)).
- **Ações protegidas não realizadas:** nenhum commit, push, criação de PR remoto no GitHub, publicação ou reclassificação clínica foi executado.
