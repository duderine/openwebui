// Exemplo: scripts/pyodide-example.js
// Este arquivo demonstra como usar o Pyodide no Open WebUI

import { loadPyodide } from 'pyodide';

/**
 * Inicializa o Pyodide com cache local
 */
export async function initializePyodide() {
  try {
    console.log('🎬 Inicializando Pyodide...');
    
    const pyodide = await loadPyodide({
      packageCacheDir: 'static/pyodide' // Usa o cache local
    });
    
    console.log('✅ Pyodide carregado com sucesso');
    console.log(`📍 Versão do Pyodide: ${pyodide.version}`);
    
    return pyodide;
  } catch (error) {
    console.error('❌ Erro ao carregar Pyodide:', error);
    throw error;
  }
}

/**
 * Exemplo 1: Executar código Python simples
 */
export async function example1_SimplePython() {
  const pyodide = await initializePyodide();
  
  const result = pyodide.runPython(`
    import sys
    print(f'Python version: {sys.version}')
    2 + 2
  `);
  
  console.log('Resultado:', result);
  return result;
}

/**
 * Exemplo 2: Usar NumPy e Pandas
 */
export async function example2_DataAnalysis() {
  const pyodide = await initializePyodide();
  
  const result = pyodide.runPython(`
    import numpy as np
    import pandas as pd
    
    # Criar array NumPy
    arr = np.array([1, 2, 3, 4, 5])
    mean_value = np.mean(arr)
    
    # Criar DataFrame
    df = pd.DataFrame({'valores': arr})
    
    print(f'Média: {mean_value}')
    print(f'DataFrame:\\n{df}')
    
    {'mean': mean_value, 'sum': np.sum(arr)}
  `);
  
  console.log('Resultado análise de dados:', result);
  return result;
}

/**
 * Exemplo 3: Usar BeautifulSoup para parsing
 */
export async function example3_WebScraping() {
  const pyodide = await initializePyodide();
  
  const htmlContent = '<html><body><div class="test">Olá</div></body></html>';
  
  const result = pyodide.runPython(`
    from bs4 import BeautifulSoup
    
    html = '''${htmlContent}'''
    soup = BeautifulSoup(html, 'html.parser')
    
    # Encontrar elementos
    div_content = soup.find('div', class_='test').text
    print(f'Conteúdo encontrado: {div_content}')
    
    div_content
  `);
  
  console.log('Resultado parsing:', result);
  return result;
}

/**
 * Exemplo 4: Machine Learning com Scikit-Learn
 */
export async function example4_MachineLearning() {
  const pyodide = await initializePyodide();
  
  const result = pyodide.runPython(`
    from sklearn.datasets import load_iris
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    import numpy as np
    
    # Carregar dataset
    iris = load_iris()
    X = iris.data
    y = iris.target
    
    # Split train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Treinar modelo
    clf = RandomForestClassifier(n_estimators=10, random_state=42)
    clf.fit(X_train, y_train)
    
    # Avaliar
    accuracy = clf.score(X_test, y_test)
    print(f'Acurácia do modelo: {accuracy:.2%}')
    
    accuracy
  `);
  
  console.log('Resultado ML:', result);
  return result;
}

/**
 * Exemplo 5: Usar requests para fazer HTTP calls
 */
export async function example5_HTTPRequests() {
  const pyodide = await initializePyodide();
  
  const result = pyodide.runPython(`
    import requests
    
    # Nota: Em Pyodide, requests funciona com CORS
    try:
      response = requests.get('https://api.github.com/zen', timeout=5)
      if response.status_code == 200:
        print(f'GitHub Zen: {response.text}')
        result = response.text
      else:
        result = f'Erro: {response.status_code}'
    except Exception as e:
      result = f'Erro na requisição: {str(e)}'
    
    result
  `);
  
  console.log('Resultado HTTP:', result);
  return result;
}

/**
 * Exemplo 6: Transferir dados entre JavaScript e Python
 */
export async function example6_DataTransfer() {
  const pyodide = await initializePyodide();
  
  // JavaScript object
  const jsData = {
    nomes: ['Alice', 'Bob', 'Carlos'],
    idades: [25, 30, 28],
    salarios: [50000, 60000, 55000]
  };
  
  // Passar para Python
  pyodide.globals.set('js_data', jsData);
  
  const result = pyodide.runPython(`
    import pandas as pd
    
    # Acessar dados do JavaScript
    df = pd.DataFrame(js_data)
    
    # Processar
    df['categoria'] = df['idades'].apply(lambda x: 'Sênior' if x > 28 else 'Júnior')
    
    # Converter para dict para passar de volta
    df.to_dict(orient='records')
  `);
  
  console.log('Resultado transferência de dados:', result);
  return result;
}

/**
 * Exemplo 7: Manipular matplotlib e gerar gráficos
 */
export async function example7_Plotting() {
  const pyodide = await initializePyodide();
  
  const result = pyodide.runPython(`
    import matplotlib.pyplot as plt
    import numpy as np
    from io import BytesIO
    import base64
    
    # Criar dados
    x = np.linspace(0, 10, 100)
    y = np.sin(x)
    
    # Criar figura
    plt.figure(figsize=(8, 4))
    plt.plot(x, y, 'b-', linewidth=2)
    plt.title('Função Seno')
    plt.xlabel('X')
    plt.ylabel('sen(X)')
    plt.grid(True, alpha=0.3)
    
    # Salvar em buffer
    buf = BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    
    # Converter para base64
    img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    f'data:image/png;base64,{img_base64}'
  `);
  
  console.log('Imagem gerada (verificar no browser)');
  return result;
}

/**
 * Exemplo 8: Métodos úteis e utilities
 */
export async function example8_Utilities() {
  const pyodide = await initializePyodide();
  
  // Método 1: Capturar saída de stdout
  const output = [];
  const original_log = console.log;
  
  const result = pyodide.runPython(`
    import sys
    
    # Função customizada
    def processar_dados(lista):
        return [x * 2 for x in lista if x > 0]
    
    resultado = processar_dados([1, -2, 3, -4, 5])
    resultado
  `);
  
  console.log('Resultado utilities:', result);
  return result;
}

/**
 * Exemplo 9: Tratamento de erros
 */
export async function example9_ErrorHandling() {
  const pyodide = await initializePyodide();
  
  try {
    pyodide.runPython(`
      # Isto causará um erro
      resultado = 1 / 0
    `);
  } catch (error) {
    console.error('❌ Erro capturado:', error.message);
    return { erro: error.message };
  }
}

/**
 * Exemplo 10: Usar SymPy para computação simbólica
 */
export async function example10_SymbolicMath() {
  const pyodide = await initializePyodide();
  
  const result = pyodide.runPython(`
    from sympy import symbols, solve, expand, diff, integrate, simplify
    
    # Variáveis simbólicas
    x, y = symbols('x y')
    
    # Equação
    eq = x**2 + 2*x + 1
    
    # Resolver
    solution = solve(eq, x)
    
    # Derivada
    derivative = diff(eq, x)
    
    # Integral
    integral = integrate(eq, x)
    
    {
      'equacao': str(eq),
      'solução': str(solution),
      'derivada': str(derivative),
      'integral': str(integral)
    }
  `);
  
  console.log('Resultado computação simbólica:', result);
  return result;
}

// Exportar função genérica para executar Python customizado
export async function runPythonCode(code) {
  const pyodide = await initializePyodide();
  try {
    return pyodide.runPython(code);
  } catch (error) {
    console.error('Erro ao executar código Python:', error);
    throw error;
  }
}
