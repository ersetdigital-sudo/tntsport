import re

with open(r'D:\TNT SPORT DATA WEB\tntsport\components\admin\PesananDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the return block boundaries
start_marker = '  return (\n    <div className="pas-sheet open">'
start = content.find(start_marker)
if start < 0:
    print("START NOT FOUND")
    exit(1)

# Find the zoom overlay end and closing tags
# The DetailSheet ends with zoom overlay, then closing tags
# Find "pas-sheet open" return block end
# Look for the closing pattern after the zoom overlay
zoom_end_pattern = '          <p className="pointer-events-none absolute bottom-4'
zoom_end_idx = content.find(zoom_end_pattern, start)
if zoom_end_idx < 0:
    print("ZOOM END NOT FOUND")
    exit(1)

# Find the closing of the zoom dialog and the sheet
close_pattern = '    </div>\n  );\n}'
close_idx = content.find(close_pattern, zoom_end_idx)
if close_idx < 0:
    # Try alternate
    close_pattern = '    </div>\n  );\n}\n'
    close_idx = content.find(close_pattern, zoom_end_idx)

if close_idx < 0:
    print("CLOSE NOT FOUND")
    exit(1)

print(f"START: {start}, CLOSE: {close_idx}")
old_block = content[start:close_idx + len(close_pattern)]
print(f"OLD BLOCK LENGTH: {len(old_block)}")
print(f"FIRST 80: {repr(old_block[:80])}")
print(f"LAST 80: {repr(old_block[-80:])}")
