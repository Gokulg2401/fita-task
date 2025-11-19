# Fita Replica

This is a small HTML/CSS replica built from an Adobe XD spec.

## Files

- `index.html` — main page
- `css/styles.css` — styles
- `assets/logo.svg`, `assets/hero.svg` — simple SVG placeholders

## How to open

1. Open the folder in VS Code: `File -> Open Folder...` and select `C:\Fita-Task`, or run in PowerShell:

```powershell
code C:\Fita-Task
```

2. If you don't see files in the Explorer, click the Explorer refresh button or press `Ctrl+R` (reload window) from the Command Palette.
3. Preview the page in your default browser from PowerShell with:

```powershell
Set-Location C:\Fita-Task; Start-Process .\index.html
```

Or just open `index.html` directly from the editor and click "Open in Default Browser" if you have an extension.

## Next steps

- Tweak styles to more closely match the XD spec (colors, spacing, fonts)
- Add real assets and content

## Inspector (interactive)

- Click the main illustration (or any image with a `clickable` class) to open the right-side Inspector panel.
- The Inspector shows asset path, position, size, natural size, rotation, opacity and a small computed-CSS snippet — similar to the XD spec inspector.

## Recommended: run a local static server

Serving the page over `http://` is recommended for some behaviors (and is easy):

```powershell
Set-Location C:\Fita-Task
python -m http.server 8000

# then open http://localhost:8000 in your browser
```

Or use the VS Code Live Server extension and click "Go Live".

## Add the hero illustration image

I included a reference to `assets/marine.png` in the hero section. Please save the provided illustration attachment as that filename in the `assets` folder so the page shows the correct image.

Quick ways to add the file:

- Save attachment from the chat: right-click the attached image and "Save as..." to `C:\Fita-Task\assets\marine.png`.
- Or drag the image into the `assets/` folder in VS Code.

If you prefer, paste a base64 PNG here and I will create the file for you.

If you want, I can now fine-tune the CSS to match the Adobe XD design more precisely.
