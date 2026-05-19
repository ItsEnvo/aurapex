#!/usr/bin/env python3
import requests
import os

urls = [
    "https://static.wixstatic.com/media/148617_0be7f837738d4410af82066efe70f6ff~mv2.jpg/v1/fit/w_960,h_641,q_90/148617_0be7f837738d4410af82066efe70f6ff~mv2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YXBwOjZiZTRmNGFmMjAzOTQwOTVhZDY5Y2NjMzk4ODkyYzhkIiwib2JqIjpbW3sicGF0aCI6Ii9tZWRpYS8xNDg2MTdfMGJlN2Y4Mzc3MzhkNDQxMGFmODIwNjZlZmU3MGY2ZmZ-bXYyLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sImlzcyI6InVybjphcHA6NmJlNGY0YWYyMDM5NDA5NWFkNjljY2MzOTg4OTJjOGQiLCJpYXQiOjEwMDAsImp0aSI6IjE3ODI4NjQwMDAiLCJleHAiOjE3ODI4NjQwMDAsIndtayI6eyJwYXRoIjoiL21lZGlhLzhiYjQzOF8zOWE3OGI0NmQ0ZmU0NzA2OWRhNjNkYTkzNDhiNGVlNX5tdjIucG5nIiwib3BhY2l0eSI6MSwicHJvcG9ydGlvbnMiOjAuMSwiZ3Jhdml0eSI6Im5vcnRoLXdlc3QifX0.IDEHU5f0TX_bED5ILkCFe8p-7h2fcp13Hpouc4gmmOU",
    "https://static.wixstatic.com/media/148617_059bbe8a64f348cba8e7fa82fd69766c~mv2.jpg/v1/fit/w_960,h_640,q_90/148617_059bbe8a64f348cba8e7fa82fd69766c~mv2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YXBwOjZiZTRmNGFmMjAzOTQwOTVhZDY5Y2NjMzk4ODkyYzhkIiwib2JqIjpbW3sicGF0aCI6Ii9tZWRpYS8xNDg2MTdfMDU5YmJlOGE2NGYzNDhjYmE4ZTdmYTgyZmQ2OTc2NmN-bXYyLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sImlzcyI6InVybjphcHA6NmJlNGY0YWYyMDM5NDA5NWFkNjljY2MzOTg4OTJjOGQiLCJpYXQiOjEwMDAsImp0aSI6IjE3ODI4NjQwMDAiLCJleHAiOjE3ODI4NjQwMDAsIndtayI6eyJwYXRoIjoiL21lZGlhLzhiYjQzOF8zOWE3OGI0NmQ0ZmU0NzA2OWRhNjNkYTkzNDhiNGVlNX5tdjIucG5nIiwib3BhY2l0eSI6MSwicHJvcG9ydGlvbnMiOjAuMSwiZ3Jhdml0eSI6Im5vcnRoLXdlc3QifX0.k6FVn6mGl0vWCnR_lyf10NYKjPvsvrh_NhxToEGq2os",
    "https://static.wixstatic.com/media/148617_c48cd6c784dd4d49a4735bb8b9f74e71~mv2.jpg/v1/fit/w_960,h_641,q_90/148617_c48cd6c784dd4d49a4735bb8b9f74e71~mv2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YXBwOjZiZTRmNGFmMjAzOTQwOTVhZDY5Y2NjMzk4ODkyYzhkIiwib2JqIjpbW3sicGF0aCI6Ii9tZWRpYS8xNDg2MTdfYzQ4Y2Q2Yzc4NGRkNGQ0OWE0NzM1YmI4YjlmNzRlNzF-bXYyLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sImlzcyI6InVybjphcHA6NmJlNGY0YWYyMDM5NDA5NWFkNjljY2MzOTg4OTJjOGQiLCJpYXQiOjEwMDAsImp0aSI6IjE3ODI4NjQwMDAiLCJleHAiOjE3ODI4NjQwMDAsIndtayI6eyJwYXRoIjoiL21lZGlhLzhiYjQzOF8zOWE3OGI0NmQ0ZmU0NzA2OWRhNjNkYTkzNDhiNGVlNX5tdjIucG5nIiwib3BhY2l0eSI6MSwicHJvcG9ydGlvbnMiOjAuMSwiZ3Jhdml0eSI6Im5vcnRoLXdlc3QifX0.3kqktyHUtE5tyYDnLfEbbeywARPMIUL5Wi7LsgukEbI",
    "https://static.wixstatic.com/media/148617_b0588329a9864c089190402ad142173b~mv2.jpg/v1/fit/w_960,h_640,q_90/148617_b0588329a9864c089190402ad142173b~mv2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YXBwOjZiZTRmNGFmMjAzOTQwOTVhZDY5Y2NjMzk4ODkyYzhkIiwib2JqIjpbW3sicGF0aCI6Ii9tZWRpYS8xNDg2MTdfYjA1ODgzMjlhOTg2NGMwODkxOTA0MDJhZDE0MjE3M2J-bXYyLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sImlzcyI6InVybjphcHA6NmJlNGY0YWYyMDM5NDA5NWFkNjljY2MzOTg4OTJjOGQiLCJpYXQiOjEwMDAsImp0aSI6IjE3ODI4NjQwMDAiLCJleHAiOjE3ODI4NjQwMDAsIndtayI6eyJwYXRoIjoiL21lZGlhLzhiYjQzOF8zOWE3OGI0NmQ0ZmU0NzA2OWRhNjNkYTkzNDhiNGVlNX5tdjIucG5nIiwib3BhY2l0eSI6MSwicHJvcG9ydGlvbnMiOjAuMSwiZ3Jhdml0eSI6Im5vcnRoLXdlc3QifX0.jUYWaXSPR4cKmfRxoXvn1ZgO-PUl1xWCBBUv5snraxc",
    "https://static.wixstatic.com/media/148617_dcdd0718b69d4ae5b42608d75b508796~mv2.jpg/v1/fit/w_960,h_640,q_90/148617_dcdd0718b69d4ae5b42608d75b508796~mv2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YXBwOjZiZTRmNGFmMjAzOTQwOTVhZDY5Y2NjMzk4ODkyYzhkIiwib2JqIjpbW3sicGF0aCI6Ii9tZWRpYS8xNDg2MTdfZGNkZDA3MThiNjlkNGFlNWI0MjYwOGQ3NWI1MDg3OTZ-bXYyLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sImlzcyI6InVybjphcHA6NmJlNGY0YWYyMDM5NDA5NWFkNjljY2MzOTg4OTJjOGQiLCJpYXQiOjEwMDAsImp0aSI6IjE3ODI4NjQwMDAiLCJleHAiOjE3ODI4NjQwMDAsIndtayI6eyJwYXRoIjoiL21lZGlhLzhiYjQzOF8zOWE3OGI0NmQ0ZmU0NzA2OWRhNjNkYTkzNDhiNGVlNX5tdjIucG5nIiwib3BhY2l0eSI6MSwicHJvcG9ydGlvbnMiOjAuMSwiZ3Jhdml0eSI6Im5vcnRoLXdlc3QifX0.KYBRH2dorG2wNpIpRtPIpSCP1A2af07wg0081E-yVio"
]

# Add remaining URLs manually due to context limits
urls.extend([
    "https://static.wixstatic.com/media/148617_7f7251136b5a4523a7148a3347f0b5be~mv2.jpg/v1/fit/w_960,h_720,q_90/148617_7f7251136b5a4523a7148a3347f0b5be~mv2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YXBwOjZiZTRmNGFmMjAzOTQwOTVhZDY5Y2NjMzk4ODkyYzhkIiwib2JqIjpbW3sicGF0aCI6Ii9tZWRpYS8xNDg2MTdfN2Y3MjUxMTM2YjVhNDUyM2E3MTQ4YTMzNDdmMGI1YmV-bXYyLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sImlzcyI6InVybjphcHA6NmJlNGY0YWYyMDM5NDA5NWFkNjljY2MzOTg4OTJjOGQiLCJpYXQiOjEwMDAsImp0aSI6IjE3ODI4NjQwMDAiLCJleHAiOjE3ODI4NjQwMDAsIndtayI6eyJwYXRoIjoiL21lZGlhLzhiYjQzOF8zOWE3OGI0NmQ0ZmU0NzA2OWRhNjNkYTkzNDhiNGVlNX5tdjIucG5nIiwib3BhY2l0eSI6MSwicHJvcG9ydGlvbnMiOjAuMSwiZ3Jhdml0eSI6Im5vcnRoLXdlc3QifX0.GFzHN0jGH_mCosIRV1QE3difYQuCKJ5RECJ2SAjaLJs"
])

os.makedirs("public/images/yachts/money-waves", exist_ok=True)

count = 1
for url in urls:
    if url:
        print(f"Downloading image {count}...")
        response = requests.get(url)
        if response.status_code == 200:
            filename = f"public/images/yachts/money-waves/{count}.jpg"
            with open(filename, 'wb') as f:
                f.write(response.content)
            
            # Check file size
            size = os.path.getsize(filename)
            if size < 5120:  # 5KB
                print(f"Image {count} is too small ({size} bytes), removing...")
                os.remove(filename)
            else:
                print(f"Image {count} downloaded successfully ({size} bytes)")
                count += 1
        else:
            print(f"Failed to download image {count}: HTTP {response.status_code}")

print(f"\nDownloaded {count-1} images for Money Waves")