# Convênios, Acordos e Termos de Cooperação — CFCC/DPE-RN

App de gestão (PWA, arquivo único, sem dependências) para convênios, acordos de cooperação
técnica (ACT), termos de cooperação técnica (TCT) e cessões de uso de imóvel.

## Arquitetura (idêntica à do app de contratos)
- `index.html` — HTML + CSS + JS vanilla. Sem framework, sem CDN, sem build.
- `manifest.webmanifest` + `sw.js` — PWA com cache versionado (`conv-cfcc-v1`).
- Persistência local: `localStorage` (chave `cfcc_convenios` / `cfcc_servidores`).
- **Base pública vazia** (`SEED = []`): o repositório nunca contém dados reais.

## Dados (fora do repositório)
- `convenios.json` e `servidores.json` ficam na **pasta do OneDrive sincronizada localmente**,
  nunca no GitHub.
- Sincronização: botão **Conectar OneDrive** → `showDirectoryPicker` aponta para a pasta;
  o handle é guardado em IndexedDB; merge otimista por campo `_v` (último a salvar vence).
  Requer navegador Chromium (Edge/Chrome). Fora dele, use **Exportar/Importar JSON**.

## Hospedagem
- GitHub Pages (só este diretório). Caminhos relativos (`./`) funcionam em raiz ou subpasta.
- `file://` não serve (bloqueia SW e File System Access) — usar `http://localhost` ou Pages.

## Manutenção
- A cada alteração de código, **subir a versão do cache** em `sw.js` (`conv-cfcc-v1` → `v2`)
  e orientar fechar abas / forçar recarregar.

© DPE/RN — CFCC. Elaboração: Rony Salles, Coordenador (matrícula 215.115-4).
Uso interno; citação exigida, vedadas alteração e utilização comercial (Lei 9.610/98).
