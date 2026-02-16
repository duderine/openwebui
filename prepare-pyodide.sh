#!/bin/bash

# Script para preparar e configurar o Pyodide
# Este script executa o npm script que baixa e configura os pacotes Python necessários

set -e

echo "🐍 Iniciando preparação do Pyodide..."
echo ""

# Verifica se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o Node.js e npm."
    exit 1
fi

echo "📦 Executando npm run pyodide:fetch..."
npm run pyodide:fetch

echo ""
echo "✅ Pyodide preparado com sucesso!"
echo ""
echo "📂 Arquivos do Pyodide foram instalados em:"
echo "   - static/pyodide/"
echo ""
echo "📋 Pacotes disponíveis:"
echo "   - micropip, packaging, requests, beautifulsoup4"
echo "   - numpy, pandas, matplotlib, scikit-learn"
echo "   - scipy, regex, sympy, tiktoken"
echo "   - seaborn, pytz, black, openai"
echo ""
echo "🚀 Agora você pode usar npm run dev para iniciar o servidor de desenvolvimento"
