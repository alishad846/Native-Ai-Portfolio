from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

projects = [
    ('DataInsights.ai', 'LLM Analytics Platform', 'public/projects/datainsights-preview.png', '#020617', '#1d4ed8'),
    ('Resume Data Extraction', 'NLP Automation', 'public/projects/resume-extraction-preview.png', '#0f172a', '#a855f7'),
    ('Customer Churn Prediction', 'Predictive Modeling', 'public/projects/customer-churn-preview.png', '#041f1e', '#14b8a6'),
    ('Deep Youtube Analysis', 'Analytics Dashboard', 'public/projects/deep-youtube-preview.png', '#090a0f', '#dc2626'),
]

font_bold = Path('C:/Windows/Fonts/seguisb.ttf')
font_semi = Path('C:/Windows/Fonts/seguisb.ttf')
if not font_bold.exists():
    font_bold = Path('C:/Windows/Fonts/Segoe UI Bold.ttf')
if not font_semi.exists():
    font_semi = Path('C:/Windows/Fonts/Segoe UI.ttf')

size = (480, 600)
for title, subtitle, output, start_color, end_color in projects:
    width, height = size
    image = Image.new('RGB', size, start_color)
    draw = ImageDraw.Draw(image)
    start_rgb = tuple(int(start_color[i:i+2], 16) for i in (1, 3, 5))
    end_rgb = tuple(int(end_color[i:i+2], 16) for i in (1, 3, 5))
    for y in range(height):
        ratio = y / (height - 1)
        color = tuple(int(start_rgb[i] + (end_rgb[i] - start_rgb[i]) * ratio) for i in range(3))
        draw.line([(0, y), (width, y)], fill=color)
    overlay_height = int(height * 0.55)
    overlay = Image.new('RGBA', (width, overlay_height), (0, 0, 0, 200))
    image.paste(overlay, (0, 0), overlay)
    try:
        title_font = ImageFont.truetype(str(font_bold), 42)
        subtitle_font = ImageFont.truetype(str(font_semi), 16)
    except OSError:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    text_x = 32
    subtitle_y = 28
    draw.text((text_x, subtitle_y), subtitle.upper(), font=subtitle_font, fill=(255, 255, 255))
    title_y = subtitle_y + 32
    draw.text((text_x, title_y), title, font=title_font, fill=(255, 255, 255))
    Path(output).parent.mkdir(parents=True, exist_ok=True)
    image.save(output, optimize=True)
