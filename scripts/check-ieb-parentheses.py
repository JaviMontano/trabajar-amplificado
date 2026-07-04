#!/usr/bin/env python3
"""Valida paréntesis contextuales en la propuesta IEB."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "clientes" / "ieb" / "index.html"

CANONICAL_DEFINITIONS = {
    "pesos colombianos": ["(pesos colombianos)"],
    "fit_encaje": ["(encaje)", "(grado de ajuste entre necesidad, propuesta y condiciones reales)"],
    "prompt": ["(instrucción clara para pedir un resultado revisable)"],
    "prompting": ["(diseño de instrucciones para inteligencia artificial)", "(diseño de instrucciones y contexto para IA)"],
    "skill": ["(receta reutilizable)", "(recetas reutilizables)", "(receta reutilizable de trabajo)"],
    "agente": ["(flujo que ejecuta pasos con reglas)", "(flujos que ejecutan pasos con reglas y criterio humano)", "(flujos con pasos y control humano)"],
    "mini_app": ["(aplicación pequeña de prueba)", "(aplicaciones pequeñas de prueba)"],
    "multimodalidad": ["(uso de varios formatos)", "(uso de varios formatos: texto, imagen, documentos o datos)", "(uso de texto, tablas, imágenes o láminas)"],
    "copilot_365": ["(asistente de Microsoft 365)"],
    "copilot_studio": ["(herramienta de Microsoft para crear asistentes internos)"],
    "usuarios_avanzados": ["(usuarios avanzados)", "(usuarios avanzados que operan casos de uso)", "(usuarios avanzados que traducen necesidad en ejecución)", "(usuarios avanzados que convierten casos de negocio en prototipos)"],
    "lideres": ["(líderes)", "(líderes de area o proyecto)", "(líderes de gestión y proyectos)", "(líderes de negocio y equipos de apoyo)", "(líderes de equipos y proyectos)"],
    "conectores": ["(enlaces con sistemas o datos)"],
    "claude_cowork": ["(modo de Claude para análisis y redacción)"],
    "csv": ["(archivo de datos en filas y columnas)"],
    "p_l": ["(estado de resultados)"],
    "bim": ["(modelado digital de información de construcción)"],
    "vr": ["(realidad virtual)"],
    "licencias": ["(licencias)"],
    "automatizaciones": ["(automatizaciones)"],
    "sistema_guiado": ["(estructura práctica que reúne contexto, fuentes, pasos, controles, evidencia y cierre)"],
    "prueba_controlada": ["(prueba controlada)"],
    "backlog": ["(lista priorizada de pendientes)"],
    "checklist": ["(lista de verificación)"],
    "done": ["(condiciones para decir que la tarea quedó completa)"],
    "red_flags": ["(señales de alerta)"],
    "modelo_ia": ["(modelo de inteligencia artificial)"],
    "asistente_programacion": ["(asistente de programación)"],
}


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


def visible_body_text(html: str) -> str:
    if "<body>" not in html or "</body>" not in html:
        fail("HTML sin <body> completo")
    body = html.split("<body>", 1)[1].split("</body>", 1)[0]
    body = re.sub(r"<(script|style)\b.*?</\1>", " ", body, flags=re.I | re.S)
    body = re.sub(r"<[^>]+>", " ", body)
    body = body.replace("&amp;", "&")
    return re.sub(r"\s+", " ", body)


def main() -> int:
    html = HTML.read_text(encoding="utf-8", errors="replace")
    if "auto.5rem" in html:
        fail("typo CSS auto.5rem presente")
    if html.count('class="site-header__cobrand"') != 1:
        fail("header co-brand ausente o duplicado")
    if 'src="../../assets/metodologia_logo_primary.png"' not in html:
        fail("logo MetodologIA ausente")
    if "github.com/ejemplo-deo-repo/mao-brand-assets/blob/main/IEB-1.webp?raw=true" not in html:
        fail("logo IEB ausente")

    text = visible_body_text(html)
    forbidden = [
        "arnés es un conjunto de barandas",
        "arnes es un conjunto de barandas",
        "Arneses (barandas de control)",
        "barandas de control",
        "barandas para que la IA opere con reglas",
    ]
    for phrase in forbidden:
        if phrase.lower() in text.lower() or phrase in html:
            fail(f"lenguaje de arnes/barandas prohibido: {phrase}")
    if re.search(r"\barn[eé]s(?:es)?\b", text, flags=re.I):
        fail("la propuesta IEB no debe usar arnes como metafora visible")
    failures: list[str] = []
    for concept, variants in CANONICAL_DEFINITIONS.items():
        count = sum(text.count(variant) for variant in variants)
        if count > 1:
            failures.append(f"{concept}: {count}")
    if failures:
        fail("definiciones parenteticas repetidas: " + ", ".join(failures))
    if text.count("Copilot 365 (asistente de Microsoft 365)") != 1:
        fail("Copilot 365 debe contextualizarse exactamente una vez")
    print("OK: IEB parenthetical smoke passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
