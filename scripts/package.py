"""Create the minimal hosting ZIP and a self-contained offline preview."""
import base64
import re
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parent.parent
out = root / 'artifacts'
out.mkdir(exist_ok=True)
files = ['index.html', 'styles.css', 'script.js', 'assets/mark.svg', 'assets/journey.webp', 'assets/logo.webp']
background_images = list(dict.fromkeys(re.findall(r"assets/[A-Za-z0-9_-]+\.jpg", (root / 'index.html').read_text())))
missing_images = [name for name in background_images if not (root / name).is_file()]
files += [name for name in background_images if (root / name).is_file()]
with zipfile.ZipFile(out / 'adenglobal-shared-hosting.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in files:
        archive.write(root / name, name)
with zipfile.ZipFile(out / 'adenglobal-complete-source.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    source_files = [root / name for name in files] + [root / 'README.md', root / '.gitignore']
    source_files += list((root / 'branding').glob('*.png'))
    source_files += list((root / 'docs').glob('*.md')) + list((root / 'scripts').glob('*.py')) + list((root / 'scripts').glob('*.cjs'))
    for source in source_files:
        archive.write(source, source.relative_to(root))

def data_uri(name, mime):
    return f'data:{mime};base64,' + base64.b64encode((root / name).read_bytes()).decode()

html = (root / 'index.html').read_text()
css = (root / 'styles.css').read_text().replace('assets/journey.webp', data_uri('assets/journey.webp', 'image/webp'))
html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>{css}</style>')
html = html.replace('<script src="script.js" defer></script>', '')
html = html.replace('</body>', '<script>' + (root / 'script.js').read_text() + '</script></body>')
html = html.replace('assets/mark.svg', data_uri('assets/mark.svg', 'image/svg+xml'))
html = html.replace('assets/logo.webp', data_uri('assets/logo.webp', 'image/webp'))
for name in background_images:
    html = html.replace(name, data_uri(name, 'image/jpeg') if (root / name).is_file() else '../' + name)
(out / 'adenglobal-preview.html').write_text(html)
print('Hosting ZIP:', (out / 'adenglobal-shared-hosting.zip').stat().st_size, 'bytes')
print('Standalone preview:', (out / 'adenglobal-preview.html').stat().st_size, 'bytes')
if missing_images:
    print('Background images pending: ' + ', '.join(missing_images))
    print('Save the supplied images at these paths, then rerun this script to include them in both ZIPs and embed them in the preview.')
