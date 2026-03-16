#!/bin/bash

# ============================================================
#  setup-changelog.sh — Ejecutar UNA VEZ en la raíz del repo
#  bash setup-changelog.sh
# ============================================================

GREEN='\033[0;32m'; RED='\033[0;31m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

echo ""
echo -e "${CYAN}${BOLD}⚙️  Instalando .changelog...${RESET}"
echo ""

if [ ! -d ".git" ]; then
    echo -e "${RED}✗ No hay repositorio Git aquí. Ejecuta git init primero.${RESET}"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cp "${SCRIPT_DIR}/post-commit" ".git/hooks/post-commit"
chmod +x ".git/hooks/post-commit"
echo -e "${GREEN}  ✓ Hook instalado en .git/hooks/post-commit${RESET}"

if ! command -v python3 &>/dev/null; then
    echo -e "${RED}  ✗ python3 no encontrado. Es necesario para el hook.${RESET}"
    exit 1
fi
echo -e "${GREEN}  ✓ python3 disponible${RESET}"

mkdir -p ".changelog/branches"
cp "${SCRIPT_DIR}/changelog-viewer.html" ".changelog/index.html"
echo -e "${GREEN}  ✓ Visor instalado en .changelog/index.html${RESET}"

echo ""
echo -e "${GREEN}${BOLD}🎉 Instalación completa${RESET}"
echo ""
echo -e "  Haz un commit normal y el hook se activará automáticamente:"
echo -e "  ${CYAN}git add . && git commit -m \"feat: mi primer commit\"${RESET}"
echo ""
echo -e "  Para ver el visor: abre ${CYAN}.changelog/index.html${RESET} con Live Server en VS Code."
echo -e "  ${BOLD}Cada miembro del equipo debe ejecutar este script una vez.${RESET}"
echo ""
