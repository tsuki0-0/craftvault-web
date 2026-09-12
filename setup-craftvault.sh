#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "=========================================="
echo "       CRAFTVAULT — SETUP AUTOMÁTICO"
echo "=========================================="
echo

echo "[1/5] Verificando projeto..."
test -f package.json || {
  echo "ERRO: execute este script dentro de ~/projects/craftvault-web"
  exit 1
}

echo "[2/5] Verificando Supabase CLI..."
if ! command -v supabase >/dev/null 2>&1; then
  echo "Supabase CLI não encontrada."
  echo "Instale com:"
  echo "  npm install -g supabase"
  exit 1
fi

echo "[3/5] Corrigindo upload de arquivos .ic..."

python - <<'PY'
from pathlib import Path

path = Path("src/services/saveService.ts")

if not path.exists():
    raise SystemExit("ERRO: src/services/saveService.ts não encontrado.")

text = path.read_text()

old = """contentType: file.type || 'application/octet-stream',"""

new = """contentType: 'application/octet-stream',"""

if old in text:
    text = text.replace(old, new)
    path.write_text(text)
    print("OK: contentType do upload ajustado.")
elif new in text:
    print("OK: contentType já está ajustado.")
else:
    print("AVISO: não encontrei o contentType esperado.")
PY

echo
echo "[4/5] Verificando variáveis do Supabase..."

if [ ! -f .env.local ]; then
  echo "ERRO: .env.local não encontrado."
  echo "Crie/configure o arquivo antes de continuar."
  exit 1
fi

grep -q "VITE_SUPABASE_URL=" .env.local || {
  echo "ERRO: VITE_SUPABASE_URL não encontrada."
  exit 1
}

grep -q "VITE_SUPABASE_PUBLISHABLE_KEY=" .env.local || {
  echo "ERRO: VITE_SUPABASE_PUBLISHABLE_KEY não encontrada."
  exit 1
}

echo "OK: variáveis locais encontradas."

echo
echo "[5/5] Gerando build do CraftVault..."
npm run build

echo
echo "=========================================="
echo "             SETUP CONCLUÍDO"
echo "=========================================="
echo
echo "Upload .ic: corrigido"
echo "Build: concluído"
echo
echo "IMPORTANTE:"
echo "A configuração SQL do Supabase precisa ser aplicada"
echo "ao projeto Supabase usando o SQL Editor ou migrations."
echo
