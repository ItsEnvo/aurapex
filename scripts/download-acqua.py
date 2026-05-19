import urllib.request, os

folder = 'public/images/yachts/acqua'
os.makedirs(folder, exist_ok=True)
for f in os.listdir(folder):
    if f.endswith('.jpg'): os.remove(os.path.join(folder, f))

# First 73 URLs from Acqua gallery (with tokens)
urls_file = 'scripts/acqua-urls.txt'
with open(urls_file) as f:
    urls = [line.strip() for line in f if line.strip()]

ok = 0
for i, url in enumerate(urls):
    dest = os.path.join(folder, f'{i+1}.jpg')
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req, timeout=15).read()
        if len(data) > 5000:
            with open(dest, 'wb') as f2:
                f2.write(data)
            ok += 1
    except Exception as e:
        print(f'  ❌ {i+1}: {e}')
print(f'✅ Acqua: {ok}/{len(urls)} downloaded')
