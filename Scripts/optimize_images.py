"""Optimiza las fotografías utilizadas por index.html y menú.html.

Conserva los archivos originales y genera copias WebP dentro de /optimized.
Puede ejecutarse nuevamente cuando se agreguen fotografías al menú.
"""

from pathlib import Path
import re
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
HTML_FILES = (ROOT / "index.html", ROOT / "menú.html", ROOT / "Recetas.html")
SCRIPT_FILES = (ROOT / "Scripts" / "scriptimg.js",)
OUTPUT_ROOT = ROOT / "optimized"
MAX_SIZE = (1600, 1600)
WEBP_QUALITY = 78

IMG_RE = re.compile(r'(<img\b[^>]*\bsrc=")([^"]+)("[^>]*>)', re.IGNORECASE)
RASTER_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def local_path(src: str) -> Path | None:
    if src.startswith(("http://", "https://", "data:")):
        return None
    path = ROOT / src.removeprefix("./").lstrip("/")
    return path if path.suffix.lower() in RASTER_EXTENSIONS else None


def optimized_path(source: Path) -> Path:
    relative = source.relative_to(ROOT).with_suffix(".webp")
    return OUTPUT_ROOT / relative


def is_content_image(source: Path) -> bool:
    relative = source.relative_to(ROOT)
    return bool(relative.parts) and relative.parts[0] in {"Menu", "Recetas"}


def convert(source: Path, destination: Path) -> None:
    if destination.exists() and destination.stat().st_mtime >= source.stat().st_mtime:
        return

    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(destination, "WEBP", quality=WEBP_QUALITY, method=6)


def optimize_html(html_path: Path) -> tuple[int, int]:
    html = html_path.read_text(encoding="utf-8")
    converted = 0
    lazy_added = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal converted, lazy_added
        prefix, src, suffix = match.groups()
        source = local_path(src)
        tag = match.group(0)

        if source and source.exists() and is_content_image(source):
            destination = optimized_path(source)
            convert(source, destination)
            src = "./" + destination.relative_to(ROOT).as_posix()
            converted += 1

            if "loading=" not in tag:
                suffix = suffix[:-1] + ' loading="lazy">'
                lazy_added += 1
            if "decoding=" not in tag:
                suffix = suffix[:-1] + ' decoding="async">'

        return prefix + src + suffix

    optimized = IMG_RE.sub(replace, html)
    html_path.write_text(optimized, encoding="utf-8", newline="\n")
    return converted, lazy_added


def main() -> None:
    for html_file in HTML_FILES:
        converted, lazy_added = optimize_html(html_file)
        print(f"{html_file.name}: {converted} referencias WebP, {lazy_added} imágenes lazy")

    for script_file in SCRIPT_FILES:
        script = script_file.read_text(encoding="utf-8")

        def replace_script_image(match: re.Match[str]) -> str:
            src = match.group(1)
            source = local_path(src)
            if not source or not source.exists() or "Menu/" not in src.replace("\\", "/"):
                return match.group(0)
            destination = optimized_path(source)
            convert(source, destination)
            return '"./' + destination.relative_to(ROOT).as_posix() + '"'

        script = re.sub(r'"(\./Menu/[^"]+\.(?:jpe?g|png))"', replace_script_image, script, flags=re.IGNORECASE)
        script_file.write_text(script, encoding="utf-8", newline="\n")
        print(f"{script_file.name}: imágenes rotativas optimizadas")


if __name__ == "__main__":
    main()
