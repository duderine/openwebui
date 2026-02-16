# 🐍 Scripts do Pyodide

Este diretório contém scripts para preparar e usar o Pyodide - um runtime Python completo rodando no navegador via WebAssembly.

## 📁 Arquivos

### `prepare-pyodide.js`
Script principal que prepara o Pyodide para desenvolvimento:

- **Função:** Baixa, instala e configura pacotes Python
- **Acionado por:** `npm run pyodide:fetch`
- **O que faz:**
  1. Carrega o Pyodide via CDN
  2. Detecta configurações de proxy de rede
  3. Instala pacotes Python via micropip
  4. Gera `pyodide-lock.json` (arquivo de lock)
  5. Copia binários para `static/pyodide`

### `pyodide-example.js`
Exemplos práticos de como usar o Pyodide:

- **10 exemplos diferentes** de funcionalidades
- **Pronto para copiar e adaptar** em seus componentes
- **Inclui tratamento de erros** e melhores práticas

---

## 🚀 Comandos Disponíveis

```bash
# Preparar Pyodide (baixar pacotes)
npm run pyodide:fetch

# Desenvolvimento com Pyodide pré-configurado
npm run dev
npm run dev:5050

# Build de produção
npm run build

# Build com watch mode
npm run build:watch
```

---

## 📚 Exemplos de Uso

### Exemplo 1: Python Simples
```javascript
import { loadPyodide } from 'pyodide';

const pyodide = await loadPyodide({
  packageCacheDir: 'static/pyodide'
});

const result = pyodide.runPython('2 + 2');
console.log(result); // 4
```

### Exemplo 2: Com NumPy e Pandas
```javascript
const result = pyodide.runPython(`
  import numpy as np
  import pandas as pd
  
  arr = np.array([1, 2, 3, 4, 5])
  df = pd.DataFrame({'valores': arr})
  
  df.describe().to_dict()
`);
```

### Exemplo 3: Passar dados do JS para Python
```javascript
const jsData = { nomes: ['Alice', 'Bob'], idades: [25, 30] };
pyodide.globals.set('data', jsData);

pyodide.runPython(`
  import pandas as pd
  df = pd.DataFrame(data)
  print(df)
`);
```

---

## 📦 Pacotes Python Disponíveis

| Categoria | Pacotes |
|-----------|---------|
| **Análise de Dados** | numpy, pandas, scipy, scikit-learn |
| **Visualização** | matplotlib, seaborn |
| **Web** | requests, beautifulsoup4 |
| **Processamento de Texto** | regex, tiktoken |
| **APIs** | openai, pydantic, httpx |
| **Utilitários** | pytz, packaging, sympy |

---

## 🔧 Configuração Customizada

Para adicionar novos pacotes Python:

1. Abra `scripts/prepare-pyodide.js`
2. Adicione o pacote à lista:
```javascript
const packages = [
  // ... pacotes existentes
  'novo-pacote'
];
```
3. Execute `npm run pyodide:fetch`

---

## ⚡ Performance e Otimizações

- ✅ **Cache local** - Arquivos em `static/pyodide` são servidos localmente
- ✅ **CORS** - Suporta requisições HTTP com CORS habilitado
- ✅ **Lock file** - `pyodide-lock.json` garante reprodutibilidade
- ✅ **Lazy loading** - Carregue Pyodide sob demanda

### Memory Management
```javascript
// Limpar variáveis do Pyodide para economizar memória
pyodide.runPython('del large_variable');

// Ou destruir a instância
pyodide.destroy();
```

---

## 🐛 Troubleshooting

### Problema: "Cannot find module 'pyodide'"
**Solução:** Execute `npm install --legacy-peer-deps` para instalar dependências

### Problema: Pacotes não carregam
**Solução:** Verifique se `npm run pyodide:fetch` foi executado

### Problema: CORS errors
**Solução:** Rodando localmente (localhost), CORS não é problema. Em produção, configure CORS no servidor

### Problema: Lentidão na primeira carga
**Solução:** Normal - primeira inicialização do WASM leva alguns segundos

---

## 📖 Referências

- [Documentação do Pyodide](https://pyodide.org/)
- [Repositório do Pyodide](https://github.com/pyodide/pyodide)
- [Pacotes Disponíveis](https://pyodide.org/en/stable/usage/packages.html)
- [Guia de API](https://pyodide.org/en/stable/usage/api/python-api.html)

---

## 💡 Dicas

1. **Use async/await** sempre - Pyodide é assíncrono
2. **Carregue uma única vez** - Reutilize a instância do Pyodide
3. **Teste no console** - Use o browser console para testar código Python
4. **Verifique o tamanho** - WASM é ~15MB, considerável para primeira carga
5. **Use workers** - Para computações pesadas, considere usar Web Workers

---

## 🎓 Casos de Uso

- 📊 **Análise de dados** - Processe dados diretamente no navegador
- 🤖 **Machine Learning** - Rode ML pequenos sem servidor
- 📝 **Processamento de texto** - Parse HTML, análise de strings
- 🔬 **Computação científica** - Cálculos complexos sem backend
- 🛠️ **Prototipagem** - Teste ideias rapidamente
- 🎓 **Educação** - Ensine Python interativamente

